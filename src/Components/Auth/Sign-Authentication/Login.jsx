import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuth } from "@c/Context/AuthContext";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const Login = () => {
  const { loginUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const loginRes = await loginUser(data);
      if (loginRes) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Failed:", err);

      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-1/2 lg:w-1/3 md:w-1/2">
          <CardHeader>
            <CardTitle className="flex justify-self-center text-4xl">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col space-y-3">
              <Label className="text-md">Email</Label>
              <Input {...register("email")} />
              {errors.email && (
                <div className="text-red-600">{errors.email.message}</div>
              )}
              <Label className="text-md">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                {errors.password && (
                  <div className="text-red-600">{errors.password.message}</div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button className="w-full font-semibold" type="submit">
                Sign in
              </Button>
              <div className="flex justify-between py-3">
                <div className="flex items-center">
                  <Checkbox />
                  <p className="px-2">remember me</p>
                </div>
                <Link
                  to="/Reset-Password-Authentication"
                  className="text-blue-400 hover:text-blue-500 font-medium"
                >
                  forgot password
                </Link>
              </div>
            </CardContent>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-primary-foreground px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
            <Button className="w-full font-semibold" varaint="outlone">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>

            <Button className="w-full font-semibold" varaint="outlone">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <CardFooter className="felx justify-center">
            <div>
              Don't have an account ?{" "}
              <Link
                to="/Register"
                className="text-blue-400 hover:text-blue-500 font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
