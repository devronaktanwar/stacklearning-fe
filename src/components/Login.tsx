
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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 
import { Button } from "./ui/button";
import Toast from "./Toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSucces] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        emailAddress:email,
        passWord:password,
      });

      if (response.data.isSuccess) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.fullName);
        setShowToast(true);
        setMessage("Logged in successfully");
        setIsSucces(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
          window.location.reload()
        }, 1000);
      } else {
      }
    } catch (error:any) {
      console.error("An error occurred during sign-up:", error);
      setShowToast(true);
      setMessage(error.response.data.message);
      setIsSucces(false);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <Card className="w-[90%] sm:w-[400px] m-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">{emailError}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="o83#hkfd8%^7h"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">{passwordError}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="bg-primaryNew text-white w-full flex justify-center items-center"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : (
              "Login"
            )}
          </Button>
          <div className="flex gap-1">
            <p className="text-xs">Not a user?</p>
            <Link
              to={"/signup"}
              className="text-orange text-xs font-medium underline"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
      {showToast && <Toast isSuccess={isSuccess} message={message} />}
    </div>
  );
};

export default Login;
