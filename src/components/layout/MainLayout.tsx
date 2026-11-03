import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/Navbar/Navbar"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-gray-50">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout