import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

function Layout() {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
      <Analytics />
      <Footer />
    </div>
  );
}

export default Layout;