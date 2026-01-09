import { useEffect, useState } from "react";
import StatCard from "../../Components/StatCard";
import { Eye, Send, Heart, TrendingUp, User } from "lucide-react";
import { fetchFounderDashboardStats } from "../../data/dummyDashboardApi";
import RecentActivity from "../../Components/dashboard/RecentActivity";
import { useNavigate } from "react-router-dom";
import DashboardCTA from "../../components/dashboard/DashboardCTA";
import WelcomeMessage from "../../Components/dashboard/WelcomeMessage";
import api from "../../services/api";

// const activities = [
//   {
//     icon: Heart,
//     iconBg: "bg-green-200",
//     iconColor: "text-green-600",
//     title: "Sarah Johnson from Sequoia Capital showed interest in your pitch",
//     time: "2 hours ago",
//   },
//   {
//     icon: Eye,
//     iconBg: "bg-blue-200",
//     iconColor: "text-blue-600",
//     title: "Michael Chen from Andreessen Horowitz viewed your profile",
//     time: "5 hours ago",
//   },
//   {
//     icon: Send,
//     iconBg: "bg-indigo-200",
//     iconColor: "text-indigo-600",
//     title: "You sent a pitch to Emily Rodriguez at Accel Partners",
//     time: "1 day ago",
//   },
//   {
//     icon: Eye,
//     iconBg: "bg-purple-200",
//     iconColor: "text-purple-600",
//     title: "Your profile was viewed by 3 new investors",
//     time: "2 days ago",
//   },
// ];

const FounderDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);

  const name = JSON.parse(localStorage.getItem("user"))?.name || "there";

  // fetch dummy data from dummy api
  useEffect(() => {
    fetchFounderDashboardStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //get activity from backend
  useEffect(() => {
    api
      .get("/activities/founder/feed")
      .then((res) => {
        setFeed(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load activity feed", err);
      });
    console.log(feed);
  }, []);

  return (
    <>
      {/* (PAGE CONTENT) */}
      {/* WelcomeMessage */}
      <WelcomeMessage name={name} role="founder" />
      {/* Stat cards only  */}
      <div className="p-2 grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <>
            <StatCard
              title="Profile Views"
              value={stats.profileViews}
              change={stats.profileViewsChange}
              icon={Eye}
            />

            <StatCard
              title="Pitches Sent"
              value={stats.pitchesSent}
              change={stats.pitchesThisWeek}
              icon={Send}
            />

            <StatCard
              title="Interested Investors"
              value={stats.interestedInvestors}
              change={stats.newInterested}
              icon={Heart}
            />

            <StatCard
              title="Response Rate"
              value={stats.responseRate}
              change={stats.responseImprovement}
              icon={TrendingUp}
            />
          </>
        )}
      </div>
      {/* activities  */}
      <div className="p-2 pt-6">
        {/* <RecentActivity activities={activities} /> */}
        <RecentActivity activities={feed} />
      </div>
      {/* CTA Sections */}
      <div className="p-2 pt-6">
        <DashboardCTA
          title="Ready to grow your investor network?"
          description="Discover investors that match your startup's needs and send personalized pitches."
          primaryBtnText="Discover Investors"
          primaryBtnAction={() => navigate("/founder/discover")}
          secondaryBtnText="View Wishlist"
          secondaryBtnAction={() => navigate("/founder/wishlist")}
        />
      </div>
    </>
  );
};

export default FounderDashboard;
