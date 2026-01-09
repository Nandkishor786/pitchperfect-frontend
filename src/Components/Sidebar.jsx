import assets from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  FileText,
  Heart,
  MessageCircle,
  Settings,
  HelpCircle,
  LogOut,
  PlusCircle,
  Briefcase,
} from "lucide-react";
import { logout } from "../utils/auth";

const founderMenu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/founder/dashboard" },
  {
    label: "Create Startup",
    icon: PlusCircle,
    path: "/founder/create-startup",
  },
  { label: "Discover Investors", icon: Search, path: "/founder/discover" },
  { label: "Pitches", icon: FileText, path: "/founder/pitches" },
  { label: "Wishlist", icon: Heart, path: "/founder/wishlist" },
  { label: "Messages", icon: MessageCircle, path: "/founder/messages" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const investorMenu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/investor/dashboard" },
  {
    label: "Investments",
    icon: Briefcase,
    path: "/investor/create-investor",
  },
  { label: "Discover Startups", icon: Search, path: "/investor/discover" },
  { label: "Wishlist", icon: Heart, path: "/investor/wishlist" },
  { label: "Messages", icon: MessageCircle, path: "/investor/messages" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "founder";
  const menu = role === "founder" ? founderMenu : investorMenu;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-white border-r px-6 py-6">
      {/* logo */}
      <img src={assets.logo5} alt="Logo" className="mb-8" />

      {/* menu */}
      <nav className="space-y-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* // bottom → common */}
      <div className="pt-4 border-t  space-y-2">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Contact Support</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
