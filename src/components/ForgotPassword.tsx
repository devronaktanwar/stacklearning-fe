import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { LuKeyRound } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import BACKEND_BASE_URL from "../../config";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const ForgotPassword = ({
  handleBackToLogin,
}: {
  handleBackToLogin: () => void;
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [forgetStep, setForgetStep] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSendVerificationCode = async ({ email }: { email: string }) => {
    try {
      const userAlreadyExists = await axios.post(
        `${BACKEND_BASE_URL}/api/check-if-email-exists`,
        {
          emailId: email,
        }
      );
      if (!userAlreadyExists.data) {
        toast.error("User not found, please sign up", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });

        return;
      }
      const response = await axios.post(`${BACKEND_BASE_URL}/api/send-otp`, {
        emailAddress: email,
        isForgetFlow: true,
      });
      if (response.data.isSuccess) {
        setForgetStep(2);
        toast.success("OTP sent successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
      } else {
        toast.error("something went wrong", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
      }
    } catch (err) {}
  };
  const handleVerifyOtp = async () => {
    let userInputOtp = otp.join("");
    let newuserInputOtp = Number(userInputOtp);
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/api/verify-otp`, {
        userInputOtp: newuserInputOtp,
        email: email,
      });
      if (response.data.isSuccess) {
        toast.success("OTP verified successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
        setForgetStep(3);
      } else {
        toast.error("Invalid OTP!!", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
      }
    } catch (err) {
      toast.error("something went wrong", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize: "12px",
        },
      });
    }
  };
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/reset-password`,
        {
          email: email,
          password: password,
        }
      );

      if (response.data.isSuccess) {
        toast.success("Password changed successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
        // navigate("/login");
      } else {
        toast.error("something went wrong", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
          },
        });
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("something went wrong", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize: "12px",
        },
      });
    }
  };
  return (
    <div className="pt-16">
      <Card className="w-[90%] sm:w-[420px] m-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl flex flex-col gap-4">
            Change Password
            <div className="flex justify-center">
              <div className="p-3 border-[0.5px] rounded border-primaryNew bg-green-50 text-primaryNew">
                <LuKeyRound size={24} />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        {forgetStep === 1 && (
          <>
            <CardContent>
              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-secondaryNew">
                      Enter email address
                    </Label>
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between">
              <div>
                <Button
                  variant="link"
                  className="text-xs text-primaryNew flex items-center gap-2"
                  onClick={handleBackToLogin}
                >
                  <IoIosArrowRoundBack size={34} />
                  Back to Login
                </Button>
              </div>
              <div>
                <Button
                  className="bg-primaryNew hover:bg-primaryNew"
                  onClick={() => handleSendVerificationCode({ email })}
                >
                  Send verification code
                </Button>
              </div>
            </CardFooter>
          </>
        )}
        {forgetStep === 2 && (
          <>
            <CardContent>
              <form className="flex flex-col gap-5">
                <div className="flex flex-col justify-center items-center gap-3">
                  <Label className="text-xs text-secondaryNew">
                    Enter verification code sent to mail
                  </Label>
                  <div className="flex w-full gap-3 mx-auto justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputs.current[index] = el)}
                        className="w-12 h-12 text-center font-bold text-base caret-transparent"
                      />
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between ">
              <Button
                variant="link"
                className="text-xs text-primaryNew flex items-center gap-2"
                onClick={handleBackToLogin}
              >
                <IoIosArrowRoundBack size={34} />
                Back to Login
              </Button>
              <Button
                className="bg-primaryNew hover:bg-primaryNew"
                onClick={handleVerifyOtp}
              >
                Verify
              </Button>
            </CardFooter>
          </>
        )}
        {forgetStep === 3 && (
          <>
            <CardContent>
              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-secondaryNew">
                      New Password
                    </Label>
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* <div className="flex flex-col gap-1">
                    <Label className="text-xs text-secondaryNew">
                      Confirm New Password
                    </Label>
                    <Input type="password" />
                  </div> */}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between ">
              <Button
                variant="link"
                className="text-xs text-primaryNew flex items-center gap-2"
                onClick={handleBackToLogin}
              >
                <IoIosArrowRoundBack size={34} />
                Back to Login
              </Button>
              <Button
                className="bg-primaryNew hover:bg-primaryNew"
                onClick={handleSave}
              >
                Save
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
