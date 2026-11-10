import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyResetOtp } from "@/services/auth.service";
import { RESET_EMAIL_KEY, RESET_OTP_KEY } from "@/lib/auth";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem(RESET_EMAIL_KEY);
    if (!storedEmail) {
      toast.error("Please enter your email first.");
      navigate("/forgot-password", { replace: true });
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (otp.length < 4) {
      toast.error("Please enter the complete OTP.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await verifyResetOtp(email, otp);
      if (response.success) {
        localStorage.setItem(RESET_OTP_KEY, otp);
        toast.success(response.message || "OTP verified successfully!");
        navigate("/reset-password");
      } else {
        toast.error(response.message || "Invalid OTP.");
      }
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "OTP verification failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[537px] bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Verify OTP
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
            Enter the 4-digit code sent to <br />
            <strong className="text-gray-800 font-semibold">{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={email}
              readOnly
              startIcon={<Mail className="w-4 h-4 text-gray-400" />}
              variant="default"
            />
          </div>

          <div className="flex justify-center">
            <OTPInput
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <div className="flex gap-3">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 flex items-center justify-center border border-input rounded-xl bg-[#F9FAFB] text-lg font-semibold text-gray-900"
                    >
                      {slot.char ?? slot.placeholderChar ?? ""}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || otp.length < 4}
            className="w-full max-w-[473px] h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-[32px] text-sm shadow-none cursor-pointer transition-all mx-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtpPage;