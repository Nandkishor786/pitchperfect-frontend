import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/auth";


//onboarding direct ke liye (safe redirect)
// ProtectedRoute dashboard ko secure karta hai, OnboardingRedirect user ko sahi onboarding page par bhejta hai — isliye DONO chahiye.
 
const OnboardingRedirect = () => {
  const user = getUserFromStorage();

  //  localStorage se user data uthate hain
  // agar user hi nahi mila → matlab login / signup nahi hua
  // is case me user ko signup page par bhej do
  if (!user) return <Navigate to="/signup" replace />;

  // agar user login hai lekin role "investor" hai
  // to investor ke onboarding flow par redirect kar
  if (user.role === "investor") {
    return <Navigate to="/onboarding/investor" replace />;
  }

  // default = founder
  return <Navigate to="/onboarding/founder" replace />;
};

export default OnboardingRedirect;
