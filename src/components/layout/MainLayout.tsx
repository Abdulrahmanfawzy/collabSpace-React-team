import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background-main">
      <Navbar />

      <main className="w-full mx-auto px-6.5">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;