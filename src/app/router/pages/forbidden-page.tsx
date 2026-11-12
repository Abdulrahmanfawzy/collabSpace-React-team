import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-main px-4 text-center">
      <div className="mb-5 rounded-full bg-red-100 p-5">
        <ShieldX size={48} className="text-red-500" />
      </div>

      <h1 className="text-3xl font-bold text-secondary-gray-900">
        Access Denied
      </h1>

      <p className="mt-3 max-w-md text-secondary-gray-600">
        You don't have permission to access this page.
        Please contact your administrator if you think this is a mistake.
      </p>

      <Button
        className="mt-6"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
}