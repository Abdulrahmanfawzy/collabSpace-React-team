import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const CalendarViewFilter = () => {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent text-small font-normal cursor-pointer flex items-center gap-2.5 py-2.5 pr-2.5 pl-3 rounded-xl border border-secondary-gray-500">
          This Week
          <ChevronDown className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>This Week</DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  );
};

export default CalendarViewFilter;