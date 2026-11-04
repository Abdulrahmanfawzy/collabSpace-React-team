import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {useSearchParams} from "react-router-dom"

type SearchInputProps = {
  placeholder: string,
  width : string,
  style : string,
  iconStyle: string
}
const SearchInput = ({placeholder , width , style , iconStyle} : SearchInputProps) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";

  const handleSearch = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value });
  }

  return (
    <div className={`relative w-${width}`}>
      
      <Search className={`absolute ${iconStyle} top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer`} />

      <Input
        type="text"
        placeholder={placeholder}
        className={` ${style} rounded-pill py-1 text-black font-normal text-small shadow-none border-0`}
        value={searchValue}
        onChange={handleSearch}
      />

    </div>
  );
};

export default SearchInput;
