import React, { useState } from "react";
import assets from "../assets/assets";
import { useSearchParams, useNavigate } from "react-router-dom";
import { showToast } from "../utils/showToast";
import { Check } from "lucide-react";
// import { generateUserId } from "../utils/generateUserId";,
import api from "../services/api";

const SignUp = ({ theme }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get("role")?.toLowerCase();
  const [userRole, setUserRole] = useState(roleFromUrl || "founder");

  const [isSubmitting, setIsSubmitting] = useState(false);
  // true : form submitted hua hai

  ///save data in loacal storage for testing
  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   if (isSubmitting) return; //aready submit hai do noithing
  //   if (!e.target.terms.checked) {
  //     alert("Please accept Terms & Conditions");
  //     return;
  //   }

  //   //get email to send success sms using toaster
  //   const email = e.target.email.value;
  //   const fullName = e.target.fullname.value;
  //   // console.log(e.target.email.value);
  //   // console.log(e.target.fullname.value);
  //   setIsSubmitting(true); // button loading ON

  //   //save temp data in loacal storage
  //   const user = {
  //     id: generateUserId(userRole),
  //     role: userRole,
  //     preferencesCompleted: false,
  //     preferences: {},
  //     email,
  //     name: fullName,
  //   };
  //   localStorage.setItem("user", JSON.stringify(user));

  //   // SUCCESS TOAST
  //   // simulate API delay
  //   setTimeout(() => {
  //     showToast({
  //       icon: <Check className="w-4 h-4 text-white" />,
  //       message: `Welcome ${fullName}! Signed up as ${email}`,
  //       type: "success",
  //       position: "bottom-right",
  //     });

  //     // redirect after short delay
  //     setTimeout(() => {
  //       navigate(`/onboarding/${userRole}`, { replace: true });
  //       setIsSubmitting(false);
  //     }, 1000); //redirect after 1 second
  //   }, 1300); //pop show after from sumit
  // };

  // BACKEND ................................
  const handleSignup = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!e.target.terms.checked) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await api.post("/auth/signup", {
        name: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: userRole,
      });

      const { user, token } = res.data;

      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      showToast({
        icon: <Check className="w-4 h-4 text-white" />,
        message: `Welcome ${user.name}!`,
        type: "success",
        position: "bottom-right",
      });
      console.log(localStorage.getItem("user"));

      navigate(`/onboarding/${user.role}`, { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex flex-col sm:flex-row justify-start items-start min-w-full min-h-screen gap-12 ">
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
          <p className="sm:text-base text-[#333] dark:text-gray-400">
            {userRole === "investor"
              ? "Access curated startup insights and invest with confidence."
              : "Connect with the right investors and accelerate your growth."}
          </p>
        </div>
      </div>
      {/* signup form */}
      <div
        className="sm:w-2/5 px-6 sm:px-12 flex flex-col
          justify-center items-center pt-4"
      >
        <div className="space-y-4  ">
          <h3 className=" text-2xl sm:text-3xl font-bold dark:text-white text-center">
            Create your account
          </h3>
          <p className="text-base font-medium text-center dark:text-white/60 text-black">
            Start your journey to smarter pitching!
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
          //   onSubmit={(e)=>{
          //     e.preventDefault()
          //     navigate(`/login?role=${userRole}`)
          //  }}
          onSubmit={handleSignup}
          className="pt-6 grid grid-cols-1 gap-3  w-full "
        >
          {/* name */}
          <div className="flex flex-col  justify-start  gap-2 ">
            <label htmlFor="name" className="font-bold dark:text-white">
              Full Name
            </label>
            <input
              id="name"
              name="fullname"
              type="text"
              placeholder="John Doe"
              className=" focus:outline-none  text-left border border-gray-500 pr-8 pl-4 py-2 rounded-md hover:border-indigo-800 hover:ring hover:ring-offset-0 hover:ring-indigo-100 "
              required
            />
          </div>
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
          {/* buttons */}
          <div className="flex flex-col justify-start gap-2">
            <p className="text-base font-medium dark:text-white">I am a</p>
            <div className="flex gap-2">
              <button
                onClick={() => setUserRole("founder")}
                type="button"
                className={`px-4 py-3 rounded-md w-1/2 border-2 font-medium transition-all duration-300 ${
                  userRole === "founder"
                    ? "border-primary bg-[#edf1ff] text-primary"
                    : "border-gray-400 text-black dark:text-white"
                }`}
              >
                Founder
              </button>
              <button
                onClick={() => setUserRole("investor")}
                type="button"
                className={`px-4 py-2 rounded-md w-1/2  font-medium text-base border-2  transition-all duration-300  ${
                  userRole === "investor"
                    ? "bg-[#edf1ff] border-primary text-primary"
                    : "border-gray-400 text-black dark:text-white "
                }`}
              >
                Investor
              </button>
            </div>
          </div>
          {/* terms and conditions */}
          <div className="flex gap-3 dark:text-white">
            <input name="terms" type="checkbox" className="accent-indigo-600" />
            <p className="text-sm font-normal leading-relaxed">
              I agree to the{" "}
              <span className="text-primary">Terms of Service</span> and{" "}
              <span className="text-primary">Privacy Policy</span>
            </p>
          </div>
          {/* bottons create account */}
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
            {isSubmitting ? "Creating your account..." : "Create Account"}
          </button>
          <div className="text-center ">
            <p className="text-sm dark:text-white">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:underline cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
