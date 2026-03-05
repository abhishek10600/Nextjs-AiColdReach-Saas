"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/features/auth/schema";
import { loginUser } from "@/features/auth/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);

    try {
      const response = await loginUser(data);
      dispatch(setUser(response.data));
      toast.success("Logged In Successfully");
      router.replace("/dashboard");
    } catch (error: any) {
      setServerError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="text-sm text-muted-foreground">Login To Continue</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter Your Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Link href="/register" className="text-xs font-semibold">
              Don't have an account?{" "}
            </Link>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-1">
                  <Spinner />
                  Signing You In
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
