import React, { useEffect } from "react";
import assets from "../assets/assets";

const ThemeToggleBtn = ({ theme, setTheme }) => {

  //Website ka UI change karna hota hai
// Theme ko localStorage me save karna hota hai
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    //add theme value in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  //but when we reload then seted theme is refreshes(removed) so to stop this we use another useeefects  (here we take theme stored in loacl storage)
  //theme preferences from device means theme according them which set(jo theme chnage nahi hoga jo last time set kiya tha)
  // in device
  // [] dependency array is empty means it execute the function onces when the components is loaded
  //
  useEffect(() => {
    //if mode is dark the prefersDarkMode is true else false
    //based on it we set the website theme
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;  
    setTheme(theme || (prefersDarkMode ? "dark" : "light"))
  }, []);
    
  return (
    <>
      <button>
        {theme === "dark" ? (
          <img
            onClick={() => setTheme("light")}
            src={assets.sun_icon}
            className="size-8.5 p-1.5 border border-gray-500 rounded-full "
            alt=""
          />
        ) : (
          <img
            onClick={() => setTheme("dark")}
            src={assets.moon_icon}
            className="size-8.5 p-1.5 border border-gray-500 rounded-full "
          />
        )}
      </button>
    </>
  );
};

export default ThemeToggleBtn;
