import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  return (
    <nav className="flex items-center gap-2 text-small ">
      <a
        href="#"
        className="text-black/60 hover:text-foreground transition duration-300 font-medium"
      >
        Meetings
      </a>

      <ChevronRight className="size-4 text-black" />

      <span className="font-medium text-black">
        Design Review
      </span>
    </nav>
  );
};

export default Breadcrumb;