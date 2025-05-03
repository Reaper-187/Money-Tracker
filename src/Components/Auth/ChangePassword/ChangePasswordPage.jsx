import React from "react";

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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies

const formSchema = z.object({
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

export const ChangePasswordPage = () => {
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
      await forgotUserPw(data);
      navigate("/login");
    } catch (err) {
      console.error(err, "Error with the Registration");
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
            <CardTitle className="flex justify-self-center text-3xl">
              Password-Authentication
            </CardTitle>
            <CardDescription className="text-center">
              Enter the new password
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col space-y-3">
              <Label className="text-md">New Password</Label>
              <Input {...register("password")} />
              {errors.password && (
                <div className="text-red-600">{errors.password.message}</div>
              )}
              <Button className="w-full font-semibold" type="submit">
                recreate a new password
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
