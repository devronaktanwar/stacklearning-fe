import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../config";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    let isValid = true;

    if (!emailId) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/send-otp`,
        {
          emailAddress: emailId,
        },
        {
          headers: {
            authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
          },
          withCredentials: true,
        }
      );

      if (data.isSuccess) {
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
        setCurrentStep(2);
      } else {
        toast.error("Email already exists, please login", {
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
    } catch (error: any) {
      console.log(error);
      toast.success(error.response.data.message, {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize: "12px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <Toaster position="bottom-center" />
      {currentStep === 1 && (
        <Card className="w-[90%] sm:w-[400px] m-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Ronak Tanwar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <p className="text-red-500 text-[10px] mt-1 ml-2">
                    {nameError}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="abc@gmail.com"
                  value={emailId}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-[10px] mt-1 ml-2">
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-[10px] mt-1 ml-2">
                    {passwordError}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="bg-primaryNew text-white w-full flex justify-center items-center"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="flex gap-1">
              <p className="text-xs">Already a user?</p>
              <Link
                to="/login"
                className="text-orange text-xs font-medium underline"
              >
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
      {currentStep === 2 && (
        <OtpModal email={emailId} name={name} password={password} />
      )}
    </div>
  );
};

interface OtpModalProps {
  email: string;
  name: string;
  password: string;
}

const OtpModal: FC<OtpModalProps> = ({ email, name, password }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

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

  const handleVerifyOtp = async () => {
    setLoading(true);
    let userInputOtp = otp.join("");
    let newuserInputOtp = Number(userInputOtp);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/verify-otp`,
        { userInputOtp: newuserInputOtp, email },
        { withCredentials: true }
      );

      if (data.isSuccess) {
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
        try {
          const response = await axios.post(
            `${BASE_URL}/api/signup`,
            { emailAddress: email, fullName: name, passWord: password },
            {
              headers: {
                authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
              },
            }
          );
          if (response.data.isSuccess) {
            toast.success("Signed up successfully", {
              duration: 2000,
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
                padding: "6px 10px",
                fontSize: "12px",
              },
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user._id);
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          }
        } catch (err: any) {
          toast.error(err.response.data.message, {
            duration: 2000,
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
              padding: "6px 10px",
              fontSize: "12px",
            },
          });
          console.log("Error:", err);
        }
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    console.log("Resend OTP");
    setTimeLeft(10);
  };

  return (
    <Card className="w-[90%] sm:w-[400px] m-auto">
      <Toaster position="bottom-center" />
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-2xl">
          OTP Verification
        </CardTitle>
        <p className="text-center text-xs">
          Verify OTP sent to {email.replace(/(.{3}).*(@.*)/, "$1*********$2")}
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex w-full gap-3 mx-auto justify-center">
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="bg-primaryNew text-white w-full flex justify-center items-center hover:bg-[#25a984ef]"
          onClick={handleVerifyOtp}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            "Verify"
          )}
        </Button>
        <div className="flex items-center gap-2 pt-2">
          {timeLeft > 0 ? (
            <p className="text-sm">Resend OTP in {timeLeft}</p>
          ) : (
            <p
              className="text-semibold text-sm text-orange cursor-pointer"
              onClick={handleResendOtp}
            >
              Resend OTP
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Signup;
