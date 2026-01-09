import { useEffect, useState } from "react";
import RecentActivity from "../../Components/dashboard/RecentActivity";
import api from "../../services/api";

const InvestorDashboard = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    api.get("/activities/investor/feed").then((res) => {
      setFeed(res.data || []);
    });
  }, []);

  return (
    <div className="p-4">
      {/* Other stat cards here */}

      {/*  RECENT ACTIVITY */}
      <div className="mt-6">
        <RecentActivity activities={feed} />
      </div>
    </div>
  );
};

export default InvestorDashboard;
