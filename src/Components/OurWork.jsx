import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import { motion } from "motion/react";

const OurWork = () => {
  const founderData = [
    {
      title: "Upload Documents",
      description: "Upload pitch decks, business plans, financial statements, and other relevant documents to the platform.",
      image: assets.upload,
    },
    {
      title: "AI Processing",
      description: "Our AI validates, extracts, and analyzes your data to identify key metrics, market opportunities, and competitive advantages.",
      image: assets.brain,
    },
    {
      title: "Profile Enhancement",
      description:
        "AI enriches your profile with market research, competitor insights, and industry benchmarks from external sources.",
      image: assets.ai,
    },  
       {
      title: "Smart Matching",
      description:
        "Get matched with relevant investors based on domain, stage, geography, and investment thesis alignment.",
      image: assets.search,
    },
       {
      title: "Connect & Close",
      description:
        "Engage with interested investors, track your progress, and close deals faster with streamlined communication.",
      image: assets.link,
    },
  ];
  const investorData = [
    {
      title: "Set Preferences",
      description: "Define your investment criteria including sectors, stages, geography, ticket size, and specific requirements.",
      image: assets.preferences ,
    },
    {
      title: "Receive Matches",
      description: "Get AI-curated startup profiles that match your investment thesis and portfolio strategy.",
      image: assets.receive,
    },
    {
      title: "Review Insights",
      description:
        "Access comprehensive profiles with validated data, market analysis, and AI-generated investment summaries.",
      image: assets.insight,
    },
       {
      title: "Make Decisions",
      description:
        "Leverage AI insights and automated due diligence to make faster, more informed investment decisions.",
      image: assets.decision,
    },
  ];
  return (
    <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{staggerChildren:0.2}} 
        viewport={{once:true}}
      id="our-work"
      className="flex flex-col items-center gap-7
    px-4 sm:px-12 lg:px-24 xl:px-40 pt-36 text-gray-700 dark:text-white"
    >
      <Title
        title="How PitchPerfect Works"
        desc="A streamlined process designed for both startups and investors to connect efficiently and effectively. "
      />

<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 w-full ">
       {/* for founders */}  
       <div className=" flex flex-col items-start gap-4  ">
         <div className="pb-4">
           <h3 className="text-2xl font-semibold text-primary">For Founders</h3>
           <p className="text-gray-500  text-base">Your journey from pitch to funded</p>
         </div> 
           {    
            founderData.map((work,index)=>(
                 <motion.div
                    initial={{opacity:0,y:30}}
                     whileInView={{opacity:1,y:0}}
                     transition={{duration:0.5, delay:index*0.2}}
                     viewport={{once:true}}
                 key={index} className="focus:outline-none   border-2 border-gray-300 rounded-xl  
                  flex items-center gap-6 p-4 hover:border-indigo-400  transition-all duration-500">
    
                  <div className="bg-[#1606f65c] rounded-full p-4">
                     <img src={work.image} alt="" className="w-14 shrink-0 "/>
                  </div>

                 <div className="">
                    <h3 className=" text-lg font-semibold ">{work.title}</h3>
                   <p className="text-sm  opacity-60 ">{work.description}</p>
                 </div>
                 </motion.div>
        
            ))
           }
      </div>
      {/* for Investors*/}
      <div className=" flex flex-col items-start gap-4  ">
         <div className="pb-4">
           <h3 className="text-2xl font-semibold text-[#147aff]">For Investors</h3>
           <p className="text-gray-500  text-base">Your journey from pitch to funded</p>
         </div> 
           {    
            investorData.map((work,index)=>(
                 <motion.div
                    initial={{opacity:0,y:30}}
                     whileInView={{opacity:1,y:0}}
                     transition={{duration:0.5, delay:index*0.2}}
                     viewport={{once:true}}
                 key={index} className="focus:outline-none   border-2 border-gray-300 rounded-xl  
                  flex items-center gap-6 p-4 hover:border-[#1f73e175] transition-all duration-500  ">
                    <div className="bg-[#147aff59] rounded-full p-4">
                      <img src={work.image} alt=""className="w-14 shrink-0 "/>
                    </div>
                 <div className="">
                    <h3 className=" text-lg font-semibold ">{work.title}</h3>
                   <p className="text-sm  opacity-60 ">{work.description}</p>
                 </div>
                 </motion.div>
        
            ))
           }
      </div>
      </div>
    </motion.div>
  );
};

export default OurWork;
