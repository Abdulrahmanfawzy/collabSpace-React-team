import SearchInput from "../SearchInput";
import avtar from "../../../assets/images/profile-avtar.svg";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarActions = () => {
  return (
    <div className="flex items-center gap-6">
        
        <SearchInput />

        <button className="relative cursor-pointer">
            <Bell  className=" w-4.5 h-5 "/>

            <span className="absolute right-0 top-0 size-2 rounded-full bg-support-danger w-1.75 h-1.75 " />
        </button>

        <Link to="/profile" className="flex items-center gap-2 cursor-pointer hover:opacity-90">
            <p className="flex flex-col whitespace-nowrap font-medium text-caption-small items-end">
                Mohamed Salah
                <span className="text-text-secondary/80 font-medium">
                    UI/UX
                </span>
            </p>

            <img src={avtar} alt="profile avtar" />
        </Link>
    </div>
  )
}

export default NavbarActions