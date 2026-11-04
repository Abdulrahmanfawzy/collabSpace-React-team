import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

 
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-110 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
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

            
            <form onSubmit={handleSubmit} className="space-y-5">
             
              <div className="relative">
                <Label
                  htmlFor="reset-email"
                  className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-500 z-10 font-medium"
                >
                  Email
                </Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Your Email"
                  startIcon={<Mail className="w-4 h-4 text-gray-400" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

             
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-base shadow-none cursor-pointer transition-all"
              >
                {isLoading ? (
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
              <strong className="text-gray-800 font-semibold">{email}</strong>
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="w-full h-11 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium"
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
