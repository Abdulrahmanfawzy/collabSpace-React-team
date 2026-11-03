import { Input } from "@/components/ui/input";
import searchIcon from "../../../assets/icons/search.svg";
const SearchInput = () => {
  return (
    <div className="relative w-[206px]">
      <img src={searchIcon} alt="Search" className="absolute left-1 top-1/2 -translate-y-1/2 " />

      <Input
        type="text"
        placeholder="Search..."
        className=" bg-background-main rounded-[100px] py-1 pr-1 pl-8 text-black font-normal text-small shadow-none border-0"
      />
    </div>
  );
};

export default SearchInput;
