import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/auth.service";
import { RESET_EMAIL_KEY, RESET_OTP_KEY } from "@/lib/auth";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem(RESET_EMAIL_KEY);
    const storedOtp = localStorage.getItem(RESET_OTP_KEY);
    if (!storedEmail || !storedOtp) {
      toast.error("Please verify your OTP first.");
      navigate("/forgot-password", { replace: true });
      return;
    }
    setEmail(storedEmail);
    setOtp(storedOtp);
  }, [navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await resetPassword({
        email,
        otp,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      if (response.success) {
        localStorage.removeItem(RESET_EMAIL_KEY);
        localStorage.removeItem(RESET_OTP_KEY);
        toast.success(response.message || "Password reset successfully!");
        navigate("/sign-in");
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to reset password. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[537px] bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
            Create a new password for <br />
            <strong className="text-gray-800 font-semibold">{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div className="relative">
            <Label
              htmlFor="password"
              className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-500 z-10 font-medium"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="New Password"
              startIcon={<Lock className="w-4 h-4 text-gray-400" />}
              {...register("password")}
              variant={errors.password ? "error" : "default"}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Label
              htmlFor="confirmPassword"
              className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-500 z-10 font-medium"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              startIcon={<Lock className="w-4 h-4 text-gray-400" />}
              {...register("confirmPassword")}
              variant={errors.confirmPassword ? "error" : "default"}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-[473px] h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-[32px] text-sm shadow-none cursor-pointer transition-all mx-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Resetting...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/sign-in"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;