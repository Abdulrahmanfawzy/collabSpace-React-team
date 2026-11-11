import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "@/lib/auth";

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;