import FounderProfile from "../../Components/profile/FounderProfile";
import InvestorProfile from "../../Components/profile/InvestorProfile";
import { getUserFromStorage } from "../../utils/auth";

const Profile = () => {
  const user = getUserFromStorage();

  const role = user?.role; // "founder" | "investor"

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-8">
      {role === "founder" && <FounderProfile user={user} />}
      {role === "investor" && <InvestorProfile user={user} />}
    </div>
  );
};

export default Profile;
