import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Building2, Eye } from "lucide-react";

/* ===== STEP LINK ===== */
const StepLink = ({ to, end, icon, label, step }) => {
  const IconComponent = icon;

  return (
    <NavLink end={end} to={to}>
      {({ isActive }) => (
        <div className="flex items-center gap-3 cursor-pointer">
          {/* STEP CIRCLE */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            {step}
          </div>

          {/* ICON + LABEL */}
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <IconComponent className="w-4 h-4" />
            {label}
          </div>
        </div>
      )}
    </NavLink>
  );
};

/* ===== MAIN LAYOUT ===== */
const CreateStartupLayout = () => {
  return (
    <div className="space-y-6">
      {/* ===== TOP STEP BAR ===== */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-4">
          {/* STEP 1 — OVERVIEW */}
          <StepLink
            end
            to="."
            icon={LayoutDashboard}
            label="Overview"
            step={1}
          />

          {/* CONNECTOR */}
          <div className="flex-1 h-px bg-gray-300" />

          {/* STEP 2 — STARTUP PROFILE */}
          <StepLink
            to="profile"
            icon={Building2}
            label="Startup Profile"
            step={2}
          />

          {/* CONNECTOR */}
          <div className="flex-1 h-px bg-gray-300" />

          {/* STEP 3 — PUBLIC CARD */}
          <StepLink to="startup-card" icon={Eye} label="Public Card" step={3} />
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default CreateStartupLayout;
