import React from "react";
import assets from "../assets/assets";
import { motion } from "motion/react";
import { Navigate, useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      id="hero"
      className="flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white"
    >
      {/* group_profile */}
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }} //one time
        className="inline-flex items-center gap-2 border border-gray-300  p-1.5 pr-4 rounded-full"
      >
        <img src={assets.group_profile} alt="" className="w-20" />
        <p className="text-xl font-medium">Trusted by 10k+ people</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl xl:text-[83px] font-medium xl:leading-95  max-w-5xl"
      >
        Where Founders {" "}
        <span className="bg-gradient-to-r from-[#5044E5] to-[#4d8eca] bg-clip-text text-transparent ">
        and Investors 
        </span>{" "}
      Connect.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 sm:max-w-lg p-3 "
      >
        Discover investors based on your preferences. Pitch smarter. Fund
        faster.
      </motion.p>
      {/* CTA BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 pb-4  ">
        <button
          onClick={() => navigate("/signup?role=founder")}
          className="bg-primary hover:bg-indigo-800 rounded-xl text-white font-bold text-lg px-8 py-5  cursor-pointer  transition-all duration-300 ease-out "
        >
          Join as Founder 
        </button>
        <button
          onClick={() => navigate("/signup?role=investor")}
          className="bg-white border-2 border-primary rounded-xl font-bold text-lg px-8 py-5 text-primary cursor-pointer hover:bg-white/65   transition-all duration-300 ease-out  focus:outline-none "
        >
          Join as Investor
        </button>
      </div>

      {/* Heroimg */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* {gradient image} */}
        <img
          src={assets.bgImage1}
          className="absolute -top-80 -right-72 sm:-top-100 sm:-right-70 -z-10 dark:hidden"
          alt=""
        />
        <img src={assets.hero_img} alt="" className="w-full max-w-6xl " />
      </motion.div>
    </div>
  );
};

export default Hero;
