import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/auth";

///ProtectedRoute = security guard at dashboard door
//“ProtectedRoute ensures users cannot access dashboards unless onboarding s  teps are completed, even via direct URLs or refresh.”
//agar user direct /founder/dashboard dalta hai to bo na ja sake pahle usse signup karana hoga

const ProtectedRoute = ({ children }) => {
  const user = getUserFromStorage();

  //agar sign nahi kiya to back signup page/ not logged in
  if (!user) return <Navigate to="/signup" replace />;

  // onboarding not completed
  if (!user.preferencesCompleted) return <Navigate to="/onboarding" replace />;

  // access allowed
  return children;
};

export default ProtectedRoute;
