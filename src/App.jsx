import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Signup from "./Pages/SignUp";
import "./App.css";
import Login from "./Pages/Login";
import FounderPreferences from "./Pages/onboarding/FounderPreferences";
import InvestorPreferences from "./Pages/onboarding/InvestorPreferences";
import FounderDashboard from "./Pages/founder/FounderDashboard";
import InvestorDashboard from "./Pages/investor/InvestorDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import OnboardingRedirect from "./routes/OnboardingRedirect";
import DashboardLayout from "./layouts/DashboardLayout";

import Discover from "./Pages/common/Discover";
import Wishlist from "./Pages/common/Wishlist";
import Messages from "./Pages/common/Messages";
import Settings from "./Pages/common/Settings";
import FounderPitches from "./Pages/founder/Pitches";
import Profile from "./Pages/common/Profile";
import CreateStartupLayout from "./Pages/founder/profile/CreateStartupLayout";
import StartupCardPage from "./Pages/founder/card/StartupCardPage";
import ProfileHome from "./Pages/founder/profile/StartupOverview";
// import {
//   investors as mockInvestors,
//   startups as mockStartups,
// } from "./data/discover";
import FounderAccount from "./Components/settings/founder/FounderAccount";
import FounderNotifications from "./Components/settings/founder/FounderNotifications";
import FounderSecurity from "./Components/settings/founder/FounderSecurity";
import InvestorAccount from "./Components/settings/investor/InvestorAccount";
import InvestorNotifications from "./Components/settings/investor/InvestorNotifications";
import InvestorSecurity from "./Components/settings/investor/InvestorSecurity";
import CreateInvestorLayout from "./Pages/investor/profile/CreateInvestorLayout";
import InvestorProfileHome from "./Pages/investor/profile/InvestorOverview";
import InvestorCardPage from "./Pages/investor/card/InvestorCardPage";
// import { seedInvestorProfiles } from "./utils/seedInvestorProfiles";
import InvestorProfilePage from "./Pages/investor/profile/InvestorProfilePage";
import StartupOverview from "./Pages/founder/profile/StartupOverview";
import StartupProfilePage from "./Pages/founder/profile/StartupProfilePage";
import { getUserFromStorage } from "./utils/auth";

function App() {
  const user = getUserFromStorage();

  // // data to local storage
  // //cards data
  // useEffect(() => {
  //   // seed investors
  //   if (!localStorage.getItem("investors")) {
  //     localStorage.setItem("investors", JSON.stringify(mockInvestors));
  //   }

  //   // seed startups
  //   if (!localStorage.getItem("startups")) {
  //     localStorage.setItem("startups", JSON.stringify(mockStartups));
  //   }

  //   // MIGRATION: add visibility to old startups
  //   const startups = JSON.parse(localStorage.getItem("startups")) || [];

  //   const migratedStartups = startups.map((s) => ({
  //     ...s,
  //     visibility: s.visibility ?? "public",
  //   }));

  //   localStorage.setItem("startups", JSON.stringify(migratedStartups));

  //   //MIGRATION: add visibility to old investors
  //   const investors = JSON.parse(localStorage.getItem("investors")) || [];

  //   const migratedInvestors = investors.map((i) => ({
  //     ...i,
  //     visibility: i.visibility ?? "public",
  //   }));

  //   localStorage.setItem("investors", JSON.stringify(migratedInvestors));
  // }, []);
  // //Profilesdata
  // useEffect(() => {
  //   seedInvestorProfiles();
  // }, []);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // cursor refs
  const outlineRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1;
      position.current.y += (mouse.current.y - position.current.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${
          mouse.current.x - 6
        }px,${mouse.current.y - 6}px,0)`;
        outlineRef.current.style.transform = `translate3d(${
          position.current.x - 20
        }px,${position.current.y - 20}px,0)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="dark:bg-black relative">
      {/*toaster used to send success or failuler popup on submit */}
      <Toaster
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/signup" element={<Signup theme={theme} />} />
        <Route path="/login" element={<Login theme={theme} />} />
        {/* onbarding parent routes(OnboardingRedirect)  */}
        <Route path="/onboarding" element={<OnboardingRedirect />} />
        <Route
          path="/onboarding/investor"
          element={<InvestorPreferences />}
        />{" "}
        <Route path="/onboarding/founder" element={<FounderPreferences />} />
        {/*dashboard routes with protectedRoutes  */}
        {/*passes as props in ProtectedRoute to verifying it from users */}
        {/* parent dashboard layout */}
        <Route element={<DashboardLayout />}>
          {/* Index route = default page */}
          {/* Dashboard ka default page set karne ke liye */}

          {/* founder */}
          <Route
            path="/founder/dashboard"
            element={
              <ProtectedRoute>
                <FounderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/founder/discover"
            element={
              <ProtectedRoute>
                <Discover role="founder" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/founder/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist role="founder" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/founder/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/founder/pitches"
            element={
              <ProtectedRoute>
                <FounderPitches />
              </ProtectedRoute>
            }
          />
          {/* startup setups */}
          <Route
            path="/founder/create-startup"
            element={
              <ProtectedRoute>
                <CreateStartupLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StartupOverview />} />
            <Route path="profile" element={<StartupProfilePage />} />
            <Route path="startup-card" element={<StartupCardPage />} />
          </Route>

          {/* investor */}
          <Route
            path="/investor/dashboard"
            element={
              <ProtectedRoute>
                <InvestorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investor/discover"
            element={
              <ProtectedRoute>
                <Discover role="investor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investor/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist role="investor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investor/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          {/* Investor setups */}
          <Route
            path="/investor/create-investor"
            element={
              <ProtectedRoute>
                <CreateInvestorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<InvestorProfileHome />} />
            <Route path="profile" element={<InvestorProfilePage />} />
            <Route path="investor-card" element={<InvestorCardPage />} />
          </Route>
          {/* Common */}
          {/* Settings*/}
          <Route path="settings" element={<Settings />}>
            <Route
              index
              element={
                <Navigate
                  to={`/settings/${user?.role || "founder"}/account`}
                  replace
                />
              }
            />
            {/* FOUNDER */}
            <Route path="founder/account" element={<FounderAccount />} />
            <Route
              path="founder/notifications"
              element={<FounderNotifications />}
            />
            <Route path="founder/security" element={<FounderSecurity />} />

            {/* INVESTOR */}
            <Route path="investor/account" element={<InvestorAccount />} />
            <Route
              path="investor/notifications"
              element={<InvestorNotifications />}
            />
            <Route path="investor/security" element={<InvestorSecurity />} />
          </Route>

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {/* Custom cursor */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]"
      />
    </div>
  );
}

export default App;
