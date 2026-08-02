import { Outlet } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#030305] text-white flex flex-col" data-testid="site-layout">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
