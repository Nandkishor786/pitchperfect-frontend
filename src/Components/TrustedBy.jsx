import React, { useEffect, useState } from "react";
import { company_logos } from "../assets/assets";
import { motion } from "motion/react";
import { getUsersCount } from "../services/UserApi"; 

const TrustedBy = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    getUsersCount()
      .then((count) => setUserCount(count))
      .catch((err) => {
        console.error("Failed to fetch users count", err);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center px-4 sm:px-12 lg:px-24 xl:px-40 gap-10 text-gray-700 dark:text-white/80"
    >
      {/* 🔥 TEXT CHANGE HERE */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-semibold text-center"
      >
        {userCount ? (
          <>
            Trusted by{" "}
            <span className="text-indigo-600 font-bold">
              {userCount.toLocaleString()}+
            </span>{" "}
            users & leading companies
          </>
        ) : (
          "Trusted by leading companies"
        )}
      </motion.h3>

      {/* LOGOS SAME AS BEFORE */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center flex-wrap gap-10 m-4"
      >
        {company_logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="max-h-5 sm:max-h-6 dark:drop-shadow-xl"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TrustedBy;
