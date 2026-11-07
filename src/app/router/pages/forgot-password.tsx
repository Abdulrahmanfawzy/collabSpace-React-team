import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* Step 1: define zod validation schema for Forgot Password */
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Step 2: useForm setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Step 3: Handle Submit
  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmittedEmail(data.email);
    setIsSubmitted(true);
    toast.success("Reset link sent to your email!");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[537px] bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                No worries! Enter your registered email address and we'll send you
                a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-[473px] h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-[32px] text-sm shadow-none cursor-pointer transition-all mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Sending link...</span>
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Check your inbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
              We've sent a password reset link to <br />
              <strong className="text-gray-800 font-semibold">{submittedEmail}</strong>
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="w-full max-w-[473px] h-10 rounded-[32px] border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium mx-auto"
            >
              Didn't receive the email? Resend
            </Button>
          </div>
        )}

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

export default ForgotPasswordPage;
