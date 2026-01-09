import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const DashboardLayout = () => {
  return (
    //  Root container ko lock scroll-overflow-hidden
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* fixed on dashboard */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* fixed on dashboard */}
        <Topbar />
        {/* main content of dashboard either f or i */}
        {/* changes based on routes render on dashboard */}
        {/* main ko scrollable banao -overflow-y-auto*/}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Outlet bolta hai: “Jo route match hua hai, uska component yahin dikhao.” */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
