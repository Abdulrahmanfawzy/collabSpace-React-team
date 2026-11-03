import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
const SearchInput = () => {
  return (
    <div className="relative w-51.5">
      <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer" />

      <Input
        type="text"
        placeholder="Search..."
        className=" bg-background-main rounded-pill py-1 pr-1 pl-8 text-black font-normal text-small shadow-none border-0"
      />
    </div>
  );
};

export default SearchInput;
