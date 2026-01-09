import { motion } from "framer-motion";
const AuthToast = ({ icon, message, type = "success", duration = 4000 }) => {
  const isSuccess = type === "success";

  return (
    <div  
      className="
        relative overflow-hidden
        min-w-[280px]
        rounded-xl
        border border-white/10
        bg-white text-gray-800
        px-4 py-3 
        shadow-2xl
      "
    >
      {/* Content */}
      <div className="flex items-center gap-3">
        {/* Icon circle */}
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {icon}
        </div>

        <span className="text-sm font-medium leading-snug">{message}</span>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${
          isSuccess ? "from-green-400 to-green-600" : "from-red-400 to-red-600"
        }`}
      />
    </div>
  );
};

export default AuthToast;
