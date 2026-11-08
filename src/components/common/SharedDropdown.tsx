
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type DropdownItem = {
  label: string;
  value: string;
};

type SharedDropdownProps = {
  text: string;
  items: DropdownItem[];
  className?: string;
  contentClassName?: string;
};

const SharedDropdown = ({ text, items, className = "", contentClassName = "",}: SharedDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`bg-transparent text-small font-normal cursor-pointer flex items-center gap-2.5 py-2.5 pr-2.5 pl-3 rounded-xl border border-secondary-gray-500 ${className}`}
        >
          {text}
          <ChevronDown className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={contentClassName}>
        {items.map((item) => (
          <DropdownMenuItem key={item.value}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SharedDropdown;
