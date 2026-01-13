import { User } from "lucide-react";
import Notifications from "./dashboard/Notifications";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserFromStorage, logout } from "../utils/auth";

const Topbar = ({ onMenuClick }) => {
  const user = getUserFromStorage();

  const role = user?.role;
  const email = user?.email;
  const name = user?.name;

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  // Agar click dropdown ke bahar hua → close kar do......
  // Dropdown ke parent ko ref do
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickoutside = (e) => {
      // agar click dropdown ke andar nahi hua then close the dropdown
      //    profileRef.current.contains(event.target)
      // check karta hai: click dropdown ke andar hua ya nahi
      // Agar nahi -> close
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickoutside);

    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, []);
  ///.........................................................

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 sm:px-6 lg:px-8 py-3 border-b">
      {/* left */}
      <div className="flex items-center gap-3">
        {/* menu icon – mobile only */}
        <button className="text-gray-600 md:hidden" onClick={onMenuClick}>
          ☰
        </button>

        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* right */}
      {/* notification */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="pr-2 sm:pr-3">
          <Notifications />
        </div>
        {/* icons PROFILE  */}
        <div ref={profileRef} className="relative ">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="bg-indigo-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer active:scale-95 transition"
          >
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          {/* dropdown */}
          {showProfile && (
            <div
              className="
    absolute  mt-3 w-60
    bg-white border rounded-lg shadow-2xl z-50 py-2
    right-0
    max-sm:fixed max-sm:inset-x-16 max-sm:top-16
  "
            >
              {/* info */}
              <div className="py-2 px-4 pb-4 border-b space-y-3 ">
                <h3 className="text-base font-bold text-black">{name}</h3>
                <p className="text-sm font-normal text-gray-800">{email}</p>
              </div>

              {/* list */}
              <ul className="py-2 text-sm border-b  ">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-indigo-100 hover:underline"
                    onClick={() => setShowProfile(false)}
                  >
                    View Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 hover:bg-indigo-100 hover:underline"
                    onClick={() => setShowProfile(false)}
                  >
                    Account Settings
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={`/settings/${role}/security`}
                    className="block px-4 py-2 hover:bg-indigo-100 hover:underline"
                    onClick={() => setShowProfile(false)}
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/settings/${role}/notifications`}
                    className="block px-4 py-2 hover:bg-indigo-100 hover:underline"
                    onClick={() => setShowProfile(false)}
                  >
                    Notification Settings
                  </NavLink>
                </li>
              </ul>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleLogout}
                  className=" mt-3 mb-1  text-indigo-600 hover:bg-indigo-100 rounded-md w-3/4 font-semibold border py-1 "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* names */}
        <div className="hidden sm:flex flex-col justify-center items-center">
          <span className="text-sm text-gray-800 font-medium">
            {user.name || "User"}
          </span>
          <span className="text-xs text-gray-500 font-normal">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
