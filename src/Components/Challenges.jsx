import React from "react";
import Title from "./Title";
import assets from "../assets/assets";

const problems = [
  "Founders struggle to find suitable investors in a fragmented market",
  "Investors waste hours manually reviewing scattered documents",
  "Information asymmetry leads to poor investment decisions",
  "Traditional processes are slow, inefficient, and error-prone",
  "Lack of standardization makes comparison difficult",
  "Due diligence is time-consuming and resource-intensive",
];

const solutions = [
  "AI-driven matching connects founders with the most relevant investors",
  "Automated document analysis saves investors hours of manual work",
  "Structured data reduces information asymmetry and improves decisions",
  "Streamlined workflows replace slow and error-prone traditional processes",
  "Standardized startup profiles enable easy and fair comparison",
  "Smart due diligence tools reduce time, cost, and resource usage",
];

const Challenges = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-36 gap-6 dark:text-white px-4 sm:px-12 lg:px-24 xl:px-40">
      <Title
        title="Solving Real Investment Challenges"
        desc="Traditional investment processes are broken. PitchPerfect brings modern AI solutions to age-old problems."
      />  
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-10 sm:gap-16  ">
        <div className="flex flex-col justify-start sm:justify-center  items-start bg-[#fffbfa] px-4 sm:px-8 lg:px-12 pt-6 pb-8 rounded-2xl border-2 border-[#ffe3e3] dark:bg-transparent dark:border-[#dc6e6e] ">
          <Title
            title="The Problem"
            desc="Current investment landscape challenges "
            className="text-xl sm:text-3xl "
          />  
          <ul className="space-y-4 mt-2">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                <img src={assets.decrease} alt=""  className="w-5 h-5 mt-1 shrink-0"/>
              <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-start bg-[#fafffc] px-4 sm:px-8 lg:px-12 pt-6 pb-8 rounded-2xl border-2 border-[#dcfce8] dark:bg-transparent dark:border-[#65e694]">
          <Title
            title="Our Solution"
            desc="Current investment landscape challenges"
            className="text-xl sm:text-3xl "
          />
          <ul className="space-y-4 mt-2">  
            {solutions.map((solution, index) => (
              <li key={index} className="flex  items-start gap-3 text-sm sm:text-base leading-relaxed">
                <img src={assets.increase} alt=""  className="w-5 h-5 mt-1 shrink-0"/>
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
