import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useState } from "react";

const DashboardLayout = () => {
  const [openSidebar, setSidebarOpen] = useState(false);
  return (
    //  Root container ko lock scroll-overflow-hidden
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* fixed on dashboard */}
      <div
        className={`
    fixed inset-y-0 left-0 z-40 w-64 bg-white
    transform transition-transform duration-300
    ${openSidebar ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0
  `}  
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* fixed on dashboard */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        {/* main content of dashboard either f or i */}
        {/* changes based on routes render on dashboard */}
        {/* main ko scrollable banao -overflow-y-auto*/}
        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Outlet bolta hai: “Jo route match hua hai, uska component yahin dikhao.” */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
