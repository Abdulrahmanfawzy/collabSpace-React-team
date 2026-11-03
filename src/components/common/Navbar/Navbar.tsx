import NavbarActions from "./NavbarActions"
import NavbarBrand from "./NavbarBrand"
import NavbarLinks from "./NavbarLinks"

const Navbar = () => {
  return (
    <nav className="bg-white px-[64px] flex justify-between items-center h-[72px] border-b border-[#E6E8EB]">
        <div className="flex items-center gap-6 ">
            <NavbarBrand />
            <NavbarLinks />
        </div>

        <NavbarActions />
    </nav>
  )
}

export default Navbar