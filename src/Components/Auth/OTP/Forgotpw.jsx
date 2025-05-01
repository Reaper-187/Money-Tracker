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
import { Label } from "../../ui/label";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies
const registerApi = import.meta.env.VITE_API_REGISTER;

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "Name must contain only letters"),
  email: z.string().toLowerCase().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

export const Forgotpw = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(registerApi, data);
      navigate("/login");
    } catch (err) {
      console.error(err, "Error with the Registration");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-1/2 lg:w-1/3 md:w-1/2">
          <CardHeader>
            <CardTitle className="flex justify-self-center text-4xl">
              Reset-Authentication
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to Reset the password
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col space-y-3">
              <Label className="text-md">Email</Label>
              <Input {...register("email")} />
              {errors.email && (
                <div className="text-red-600">{errors.email.message}</div>
              )}
              <Button className="w-full font-semibold" type="submit">
                Reset password
              </Button>
            </CardContent>
          </form>
          <CardFooter className="felx justify-center">
            <div>
              back to{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-500 font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
