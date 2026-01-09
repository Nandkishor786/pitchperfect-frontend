import { useEffect, useState } from "react";
import { Pencil, PlusCircle } from "lucide-react";
import InvestorProfile from "./InvestorProfile";
import InvestorProfileForm from "./InvestorProfileForm";
import Modal from "../../../Components/ui/Modal";
import api from "../../../services/api";


const InvestorProfilePage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?.id;

  const [existingProfile, setExistingProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const profiles = JSON.parse(localStorage.getItem("investorProfiles")) || [];

  //   const found = profiles.find((p) => p.userId === userId);
  //   setExistingProfile(found || null);
  // }, [userId]);

  //backend
  useEffect(() => {
  const loadProfile = async () => {
    try {
      const res = await api.get("/investor-profiles/me");
      setExistingProfile(res.data);
    } catch {
      setExistingProfile(null);
    }
  };

  loadProfile();
}, []);

  // const refreshProfile = () => {
  //   const profiles = JSON.parse(localStorage.getItem("investorProfiles")) || [];

  //   const found = profiles.find((p) => p.userId === userId);
  //   setExistingProfile(found || null);
  //   setIsModalOpen(false);
  // };
 
  const refreshProfile = async () => {
  const res = await api.get("/investor-profiles/me");
  setExistingProfile(res.data);
  setIsModalOpen(false);
};

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Investor Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create or update your investor information.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          {existingProfile ? (
            <>
              <Pencil className="w-4 h-4" />
              Edit Profile
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              Create Profile
            </>
          )}
        </button>
      </div>

      {/* PROFILE PREVIEW */}
      {existingProfile ? (
        <div className="bg-white border rounded-2xl p-6">
          <InvestorProfile profileData={existingProfile} embedded />
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed rounded-xl p-10 text-center text-gray-500">
          No profile yet. Click “Create Profile” to get started.
        </div>
      )}

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          existingProfile ? "Edit Investor Profile" : "Create Investor Profile"
        }
      >
        <InvestorProfileForm onSaved={refreshProfile} />
      </Modal>


    </div>
  );
};

export default InvestorProfilePage;
