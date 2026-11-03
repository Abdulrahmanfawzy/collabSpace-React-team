import { Bell } from "lucide-react";
import SearchInput from "./SearchInput";
import avtar from "../../../assets/icons/profile-avtar.svg";

const NavbarActions = () => {
  return (
    <div className="flex items-center gap-6">
        
        <SearchInput />

        <button className="relative cursor-pointer">
            <Bell className="size-6 text-black w-{18px] h-[20px]" />

            <span className="absolute right-0 top-0 size-2 rounded-full bg-[#DC1500] w-[7px] h-[7px]" />
        </button>

        <div className="flex items-center gap-2">
            <h3 className="flex flex-col whitespace-nowrap font-medium text-caption-small items-end">
                Mohamed Salah
                <span className="text-[#4A4A4A] font-normal">
                    UI/UX
                </span>
            </h3>

            <img src={avtar} alt="profile avtar" />
        </div>
    </div>
  )
}

export default NavbarActions