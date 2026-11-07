import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/Navbar/Navbar"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-gray-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-8 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout