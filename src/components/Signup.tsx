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
import Toast from "./Toast";

const Signup = () => {
  const [showToast, setShowToast] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSucces] = useState(false);
  const navigate = useNavigate();
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
        "https://stacklearning-be.onrender.com/api/send-otp",
        {
          emailAddress: emailId,
        },
        {
          headers: {
            authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
          },
        }
      );
      if (data.isSuccess) {
        setCurrentStep(2);
      }
      console.log("data", data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // try {
    //   const { data } = await axios.post(
    //     "https://stacklearning-be.onrender.com/api/signup",
    //     { emailAddress: emailId, fullName: name, passWord: password },
    //     {
    //       headers: {
    //         authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
    //       },
    //     }
    //   );

    //   if (data.isSuccess) {
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("name", data.user.fullName);
    //     setShowToast(true);
    //     setMessage("Signed up successfully");
    //     setIsSucces(true);
    //     setTimeout(() => {
    //       setShowToast(false);
    //       navigate("/");
    //       window.location.reload();
    //     }, 1000);
    //   }
    // } catch (error: any) {
    //   console.error("An error occurred during sign-up:", error);
    //   setShowToast(true);
    //   setMessage(error.response.data.message);
    //   setIsSucces(false);
    //   setTimeout(() => {
    //     setShowToast(false);
    //   }, 3000);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="pt-16">
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
      {showToast && <Toast isSuccess={isSuccess} message={message} />}
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
    const userInputOtp = otp.join("");
    try {
      const { data } = await axios.post(
        "https://stacklearning-be.onrender.com/api/verify-otp",
        { userInputOtp },
        { withCredentials: true }
      );
      console.log("data--->>>", data);

      if (data.isSuccess) {
        try {
          const response = await axios.post(
            "https://stacklearning-be.onrender.com/api/signup",
            { emailAddress: email, fullName: name, passWord: password },
            {
              headers: {
                authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
              },
            }
          );
          console.log("response---->>>",response)
          if (response.data.isSuccess) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.fullName);
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          }
        } catch {
          alert("Signup failed.");
        }
        setTimeout(() => navigate("/"), 3000);
      } else {
      }
    } catch {
      alert("Something went wrong");
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
