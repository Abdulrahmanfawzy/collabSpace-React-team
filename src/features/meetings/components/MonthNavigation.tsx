import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MonthNavigation = () => {
  return (
    <div className="grow flex items-center gap-4">

        <Button variant="default" size="icon" className="bg-transparent cursor-pointer text-black hover:bg-background-main">
          <ChevronLeft className="size-6" />
        </Button>

        <h2 className="text-xl font-medium ">
            December 2025
        </h2>

        <Button variant="default" size="icon" className="bg-background-main cursor-pointer text-black hover:bg-background-main">
          <ChevronRight className="size-6" />
        </Button>
    </div>
  );
};

export default MonthNavigation;