
import { Link, useLocation } from "react-router-dom"

const NavbarLinks = () => {
  const location = useLocation()

  const links = [
    { text: "Dashboard", path: "/" },
    { text: "Projects", path: "/projects" },
    { text: "Chats", path: "/chats" },
    { text: "Meetings", path: "/meetings" },
    { text: "Reports", path: "/reports" },
  ]

  return (
    <ul className="flex gap-4.75 py-1 pl-1 pr-2 bg-background-main rounded-pill">
      {links.map((link) => {
        const isActive =
          location.pathname === link.path ||
          (link.path !== "/" && location.pathname.startsWith(link.path))

        return (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`text-caption-small font-normal py-1 px-2.5 rounded-pill leading-4 transition duration-300 ${
                isActive
                  ? "bg-primary-blue-500 text-white"
                  : "hover:bg-primary-blue-500 hover:text-white"
              }`}
            >
              {link.text}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavbarLinks
