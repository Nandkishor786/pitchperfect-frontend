import toast from "react-hot-toast";
import AuthToast from "../Components/AuthToast";

export const showToast = (
  {icon,
  message,
  position = "top-right",
  type = "success" }  //success | danger
) => {
  const duration = 2000;

  toast(
    <AuthToast icon={icon} message={message} duration={duration} type={type} />,
    {
      duration,
      position,
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      },
    }
  );
};
