import SearchInput from "../SearchInput";
import avtar from "../../../assets/images/profile-avtar.svg";
import { Bell, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth.service";

const NavbarActions = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const jobTitle = localStorage.getItem("job_title") || "";
  const avatarUrl = localStorage.getItem("avatar_url") || "";

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully.");
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="flex items-center gap-6">
      <SearchInput
        placeholder="Search..."
        width={"51.5"}
        style={"bg-background-main pr-1 pl-8"}
        iconStyle="left-1"
        paramKey="globalSearch"
      />

      <button className="relative cursor-pointer">
        <Bell className=" w-4.5 h-5 " />

        <span className="absolute right-0 top-0 size-2 rounded-full bg-support-danger w-1.75 h-1.75 " />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 cursor-pointer outline-none">
            <p className="flex flex-col whitespace-nowrap font-medium text-caption-small items-end">
              {username}
              <span className="text-text-secondary/80 font-medium">
                {jobTitle}
              </span>
            </p>

            <img
              src={avatarUrl || avtar}
              alt="profile avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <UserIcon className="w-4 h-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarActions;