import { NavLink } from "react-router-dom";
import { User, Bell, Shield } from "lucide-react";

const SettingsSidebar = () => {
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
     ${
       isActive
         ? "bg-indigo-50 text-indigo-600"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <aside className="w-64 border-r bg-white p-4 flex-shrink-0">
      <NavLink to={`/settings/${role}/account`} className={linkClass}>
        <User size={18} />
        Account Information
      </NavLink>

      <NavLink to={`/settings/${role}/notifications`} className={linkClass}>
        <Bell size={18} />
        Notification Settings
      </NavLink>

      <NavLink to={`/settings/${role}/security`} className={linkClass}>
        <Shield size={18} />
        Security
      </NavLink>
    </aside>
  );
};

export default SettingsSidebar;
