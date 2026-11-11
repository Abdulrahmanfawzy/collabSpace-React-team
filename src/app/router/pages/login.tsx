import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import AuthDivider from "@/components/layout/AuthDivider";
import { login } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
/* Step 1: define zod validation schema for Login */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  // Step 2: useForm setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  // Step 3: Handle Submit
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data.email, data.password);
      if (response.success) {
        toast.success(response.message || "Signed in successfully!");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[537px] bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            Welcome back, you've been missed!
          </p>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full max-w-[473px] h-10 rounded-[32px] border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm flex items-center justify-center gap-2 cursor-pointer shadow-none mx-auto"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.37 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Sign With Google</span>
        </Button>

        {/* OR Divider */}
        <AuthDivider />

        {/* Form with React Hook Form + Zod */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Label
              htmlFor="email"
              className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-500 z-10 font-medium"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              startIcon={<Mail className="w-4 h-4 text-gray-400" />}
              {...register("email")}
              variant={errors.email ? "error" : "default"}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

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
              placeholder="Password"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 pb-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
              />
              <Label
                htmlFor="rememberMe"
                className="text-xs sm:text-sm font-medium text-gray-600 cursor-pointer select-none"
              >
                Remember Me
              </Label>
            </div>

            <Link
              to="/forgot-password"
              className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
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
                <span>Signing in...</span>
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Don't have an account yet?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
