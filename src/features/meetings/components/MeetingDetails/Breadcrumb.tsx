import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  title?: string;
};

const Breadcrumb = ({ title }: Props) => {
  return (
    <nav className="flex items-center gap-2 text-small">
      <NavLink
        to="/meetings"
        className="text-black/60 hover:text-foreground transition duration-300 font-medium"
      >
        Meetings
      </NavLink>
      <ChevronRight className="size-4 text-black" />
      <span className="font-medium text-black line-clamp-1">{title || "..."}</span>
    </nav>
  );
};

export default Breadcrumb;