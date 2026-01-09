import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { showToast } from "../utils/showToast";
import { Check } from "lucide-react";
import api from "../services/api";

const Login = ({ theme }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleFromUrl = searchParams.get("role")?.toLowerCase() || "founder";
  // const [userRole, setUserRole] = useState(roleFromUrl || "founder");
  const userRole = roleFromUrl;

  const [isSubmitting, setIsSubmitting] = useState(false);

  ///ONLY FOR RETURNING USERS
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   if (isSubmitting) return; //if signed in donot show anything
  //   setIsSubmitting(true); //start processing

  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) {
  //     setIsSubmitting(false);
  //     toast.error("No account found. Please sign up first.");
  //     return;
  //   }
  //   // login processing
  //   //to show success popup
  //   setTimeout(() => {
  //     showToast({
  //       icon: <Check className="w-4 h-4 text-white" />,
  //       message: `Welcome back!   Signed in as ${user.email}`,
  //       type: "success",
  //       position: "bottom-right", // ya top-right
  //     });

  //     // redirect after toast
  //     setTimeout(() => {
  //       if (!user.preferencesCompleted) {
  //         navigate(`/onboarding/${user.role}`, { replace: true });
  //       } else {
  //         navigate(`/${user.role}/dashboard`, { replace: true });
  //       }
  //       setIsSubmitting(false); // unlock button
  //     }, 1000);
  //   }, 1200);
  // };

  //Backend
  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const res = await api.post("/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
        role: userRole, // optional if backend ignores
      });

      const { token, user } = res.data;

      //  save real auth data
      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      showToast({
        icon: <Check className="w-4 h-4 text-white" />,
        message: `Welcome back ${user.name}`,
        type: "success",
        position: "bottom-right",
      });

      //  redirect logic (MOST IMPORTANT)
      if (!user.preferencesCompleted) {
        navigate(`/onboarding/${user.role}`, { replace: true });
      } else {
        navigate(`/${user.role}/dashboard`, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex flex-col sm:flex-row justify-start items-start min-w-full min-h-screen gap-12 ">
      {/* Login form */}
      <div
        className="sm:w-2/5 px-6 sm:px-12 flex flex-col
           justify-center items -center pt-4"
      >
        <div className="space-y-4  ">
          <h3 className=" text-2xl sm:text-4xl font-bold dark:text-white text-center">
            Login
          </h3>
          <p className="text-base font-medium text-center dark:text-white/60 text-black">
            {userRole === "founder"
              ? "Find investors made for your startup!"
              : "Find investors made for your startup!"}
            "{" "}
          </p>
        </div>

        {/* google sign up */}
        <div className="w-full pt-6 ">
          <button className="text-sm font-medium flex justify-center items-center gap-3  px-4 py-2 w-full rounded-md border border-gray-500 hover:bg-gray-200 focus:outline-none dark:text-white ">
            <img src={assets.google} alt="" className="w-6 h-6" />
            Sign up with Google
          </button>
        </div>

        <div className="flex items-center gap-3 w-full pt-6">
          <div className="flex-1 h-px bg-gray-300 "></div>
          <span className="font-medium text-gray-500 text-sm dark:text-white/60">
            or Sign up with Email
          </span>
          <div className="flex-1 h-px bg-gray-300 "></div>
        </div>

        <form
          //  onSubmit={(e)=>{
          //   e.preventDefault()
          //   console.log("Logging in as :",userRole);
          //   alert(`you logged in as: ${userRole}`)

          //  }}
          onSubmit={handleLogin}
          className="pt-6 grid grid-cols-1 gap-3  w-full "
        >
          {/* email */}
          <div className="flex flex-col justify-start  gap-2">
            <label htmlFor="email" className="font-bold dark:text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="John@gmail.com"
              className=" focus:outline-none  text-left border border-gray-500 pr-8 pl-4 py-2 rounded-md hover:border-indigo-800 hover:ring hover:ring-offset-0 hover:ring-indigo-100 "
              required
            />
          </div>
          {/* password*/}
          <div className="flex flex-col  justify-start gap-2">
            <label htmlFor="password" className="font-bold dark:text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className=" focus:outline-none  text-left border border-gray-500 pr-8 pl-4 py-2 rounded-md hover:border-indigo-800 hover:ring hover:ring-offset-0 hover:ring-indigo-100"
              required
            />
          </div>
          {/* forgot password */}
          <div className="flex gap-3 dark:text-white">
            <button className="text-sm font-normal leading-relaxed underline  hover:text-indigo-800  ">
              Forgot password?
            </button>
          </div>
          {/* bottons login */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={` rounded-md w-full px-4 py-3  text-white hover:text-white/60 transition-all duration-300 
               ${
                 isSubmitting
                   ? "bg-indigo-300 cursor-not-allowed"
                   : "bg-primary hover:bg-indigo-900"
               }
              `}
          >
            {isSubmitting ? "Signing in..." : "Login in"}
          </button>
          <div className="text-center ">
            <p className="text-sm dark:text-white">
              Not registered?{" "}
              <a
                href="/signup"
                className="text-primary hover:underline cursor-pointer"
              >
                Create an Account
              </a>
            </p>
          </div>
        </form>
      </div>
      {/* {Image} */}
      <div className="sm:w-3/5 min-h-screen p-4 space-y-12 ">
        <div className="pl-4 sm:pl-8 ">
          <img
            src={theme === "dark" ? assets.logo_dark5 : assets.logo5}
            alt=""
            className=""
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={
              userRole === "founder" ? assets.findInvestor : assets.findFounder
            }
            alt=""
            className="drop-shadow-2xl rounded-xl w-full max-w-sm sm:max-w-2xl px-2  "
          />
        </div>
        <div className="space-y-4 dark:text-white  flex flex-col justify-center text-center ">
          <h2 className=" text-2xl sm:text-4xl font-bold px-2  ">
            {userRole === "investor"
              ? "Discover High-Potential Startups"
              : "Connect with investors who understand your vision."}
          </h2>
          <p className="sm:text-base text-black dark:text-gray-400">
            {userRole === "investor"
              ? "Access curated startup insights and invest with confidence."
              : "Connect with the right investors and accelerate your growth."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
