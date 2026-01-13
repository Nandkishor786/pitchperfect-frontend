import { Eye, Heart, Send } from "lucide-react";
import ActivityItem from "./ActivityItem";

const ICON_MAP = {
  VIEW: {
    icon: Eye,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  WISHLIST: {
    icon: Heart,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  PITCH: {
    icon: Send,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
};
 
//postman activity feed testing  rule
//Token ≠ jis par activity hui
// Token = jis ka dashboard / view hai
const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Investor Activity</h2>
      <div className="border-b border-gray-200 my-4"></div>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-400">No recent activity</p>
      ) : (
        activities.map((activity) => {
          const config = ICON_MAP[activity.type] || {};

          return (
            <ActivityItem
              key={activity._id}
              icon={config.icon}
              iconBg={config.iconBg}
              iconColor={config.iconColor}
              title={activity.message}  
              time={new Date(activity.createdAt).toLocaleString()}
            />
          );
        })
      )}
    </div>
  );
};

export default RecentActivity;
