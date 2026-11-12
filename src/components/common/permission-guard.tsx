import { Navigate } from "react-router-dom";
import { hasPermission } from "@/features/auth/constants/permissions";
import type { Permission } from "@/features/auth/constants/permissions";


interface PermissionGuardProps {
  permission: Permission;
  children: React.ReactNode;
}

export function PermissionGuard({
  permission,
  children,
}: PermissionGuardProps) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.roles?.[0];

  const allowed = hasPermission(role, permission);

 
  if (!allowed) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}