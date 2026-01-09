import React from "react";
import assets from "../assets/assets";
import { motion } from "motion/react";


const GetStart = () => {
  return (
    <motion.div 
    initial={{opacity:0,y:30}}
    whileInView={{opacity:1,y:1}}
    transition={{duration:0.5}}
    viewport={{once:true}}
    
    className=" px-4 sm:px-12 lg:px-24 xl:px-40  mt-40  text-center bg-[#220d26] text-white space-y-8 pt-16 pb-16 dark:bg-[#5045e6]" id="getstart">
      <motion.h2 
      initial={{opacity:0,y:20}}
    whileInView={{opacity:1,y:1}}
    transition={{duration:0.5}}
    viewport={{once:true}}
      className="text-2xl  sm:text-6xl font-semibold">
        Ready to Pitch Smarter?
      </motion.h2>
      <motion.p
      initial={{opacity:0,y:30}}
    whileInView={{opacity:1,y:1}}
    transition={{duration:0.5}}
    viewport={{once:true}}
      className="text-base font-medium">
        Join thousands of founders and investors already using PitchPerfect
      </motion.p>
      <motion.div 
    initial={{opacity:0,y:30}}
    whileInView={{opacity:1,y:1}}
    transition={{duration:0.5}}
    viewport={{once:true}}
      className="pt-4 flex justify-center items-center">
        <a
          href="/signup"
          className="group bg-[#e0fa93] px-8  py-3 rounded-full text-black text-xl font-semibold 
        flex items-center gap-2 cursor-pointer  "
        >
          <span
            className="
        transition-transform duration-300
        group-hover:-translate-x-2"
          >
            Get Started{" "}
          </span>
          <img
            src={assets.arrow}
            alt=""
            width={16}
            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 translate-x-2 group-hover:scale-105 "
          />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default GetStart;
