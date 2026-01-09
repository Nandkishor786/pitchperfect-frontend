  import React, { useState } from "react";
  import assets from "../assets/assets";
  import ThemeToggleBtn from "./ThemeToggleBtn";
  import { motion } from "motion/react";
  // import { useNavigate } from "react-router-dom";
  import SignupDropdown from "./SignupDropdown";
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom";

  const Navbar = ({ theme, setTheme }) => {
    const navigate = useNavigate();
    //to close and open the side bar(menu) in mobile
    const [sidebarOpen, setsidebarOpen] = useState(false);
    // //for sign popup of founder and investor
    // const [open,setOpen] = useState(false)
    // const navigate = useNavigate()

    return (
      // logo
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4  sticky top-0 z-20 backdrop:blur-xl font-medium bg-white dark:bg-gray-900"
        //sticky  :we make this parent as conatiner for dropdown menu
      >
        <img
          src={theme === "dark" ? assets.logo_dark5 : assets.logo5}
          alt=""
          className="w-40 sm::w-40"
        />
        {/* these shown on both desktop or mobile */}
        {/* div for navlinks for both mobile and desktop  */}
        {/* max-sm =mobile screens */}
        <div
          className={`text-gray-700 dark:text-white sm:text-sm 
          ${
            !sidebarOpen //sidebarOpen === false
              ? "max-sm:w-0 overflow-hidden" //Sidebar gayab
              : //sidebarOpen === true
                "max-sm:w-60 max-sm:pl-10"
          }  
          max-sm:fixed top-0 bottom-0 right-0  max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
          // max-sm:fixed:dropdown menu open just closed near to navbar
          //make this child as fiexed to parent sticky
        >
          {/* menuicons for mobile and for close menu logic*/}
          <img
            src={assets.close_icon}
            alt=""
            className="w-5 absolute right-4 top-4 sm:hidden"
            onClick={() => setsidebarOpen(false)}
          />

          {/* navlinks */}
          <Link
            to="/"
            className="border-b-2 border-indigo-700 border-transparent transition-colors duration-200 hover:border-indigo-700"
            onClick={() => setsidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="border-b-2 border-indigo-700 border-transparent transition-colors duration-200 hover:border-indigo-700"
            onClick={() => setsidebarOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/our-work"
            className="border-b-2 border-indigo-700 border-transparent transition-colors duration-200 hover:border-indigo-700"
            onClick={() => setsidebarOpen(false)}
          >
            How it Work
          </Link>
          <Link
            to="/getstart"
            className="border-b-2 border-indigo-700 border-transparent transition-colors duration-200 hover:border-indigo-700"
            onClick={() => setsidebarOpen(false)}
          >
            Contact Us
          </Link>

          <div className="sm:hidden">
            <button
              onClick={() => {
                setsidebarOpen(false);
                navigate("/login");
              }}
              className="mt-2 sm:hidden"
            >
              Login
            </button>
          </div>
        </div>

        {/* these shown only desktop not on mobile */}

        {/* {arrow_icon} and menu icons with open logic */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <img
            src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
            alt=""
            onClick={() => setsidebarOpen(true)}
            className="w-8 sm:hidden"
          />

          <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
            className="text-sm font-medium  max-sm:hidden  flex items-center  gap-2 text-gray-800 dark:text-white px-6 py-2 rounded-full cursor-pointer transition-all duration-300 border border-gray-300  focus:outline-none hover:text-indigo-800 hover:bg-indigo-100  hover:ring-offset-0 hover:ring-4 hover:border-indigo-700 hover:ring-indigo-200 hover:outline-2 "
          >
            Login
          </button>
          {/* Sign Up Button */}
          <div className="flex items-center gap-4">
            <SignupDropdown />
          </div>
        </div>
      </motion.div>
    );
  };

  export default Navbar;
