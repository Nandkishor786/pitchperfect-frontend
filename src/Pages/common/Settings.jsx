import { Outlet } from "react-router-dom";
import SettingsSidebar from "../../Components/settings/SettingsSidebar";

const Settings = () => {
  return (
    // dashboard ke content ke andar
    <div className="h-full">
      {/* settings container */}
      <div className="flex h-full bg-white rounded-xl border overflow-hidden">
        {/* LEFT: settings sidebar (NOT FIXED) */}
        <SettingsSidebar />

        {/* RIGHT: scrollable content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Settings;
