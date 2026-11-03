import NavbarActions from "./NavbarActions"
import NavbarBrand from "./NavbarBrand"
import NavbarLinks from "./NavbarLinks"

const Navbar = () => {
  return (
    <nav className="relative bg-white px-16 flex justify-between items-center h-18  ">
      <div className="absolute top-full left-0 w-full h-1 bg-navbar-shadow pointer-events-none" />
        <div className="flex items-center gap-6 ">
            <NavbarBrand />
            <NavbarLinks />
        </div>

        <NavbarActions />
    </nav>
  )
}

export default Navbar