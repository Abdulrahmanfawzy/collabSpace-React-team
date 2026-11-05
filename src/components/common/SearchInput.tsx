/* eslint-disable react-hooks/set-state-in-effect */
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {useSearchParams} from "react-router-dom"

type SearchInputProps = {
  placeholder: string,
  width : string,
  style : string,
  iconStyle: string ,
  paramKey: string
}
const SearchInput = ({placeholder , width , style , iconStyle , paramKey} : SearchInputProps) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get(paramKey) || "";

  const [inputValue , setInputValue] = useState(searchValue);


  // to update searchParams
  useEffect(()=> { 
    const timeDebounce = setTimeout(() => {      
      setSearchParams((prev) => {
        const currentSearch = prev.get(paramKey) || "";
        if(currentSearch === inputValue){
          return prev;
        }
        if(inputValue.trim()){
          prev.set(paramKey , inputValue)
        }else {
          prev.delete(paramKey)
        }
        return prev;
      });
    }, 500);

    return ()=> {
      clearTimeout(timeDebounce)
    }
  } , [inputValue  , setSearchParams , paramKey])


  // update inputValue when change searchParams
  useEffect(() => {
    setInputValue(searchValue)
  }, [searchValue]);

  
  const handleSearch = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={`relative w-${width}`}>
      
      <Search className={`absolute ${iconStyle} top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer`} />

      <Input
        type="text"
        placeholder={placeholder}
        className={` ${style} rounded-pill py-1 text-black font-normal text-small shadow-none border-0`}
        value={inputValue}
        onChange={handleSearch}
      />

    </div>
  );
};

export default SearchInput;



