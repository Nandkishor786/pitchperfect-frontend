import {
  Building2,
  MapPin,
  DollarSign,
  Heart,
  BadgeCheck,
  Briefcase,
  HeartOff,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { showToast } from "../../../utils/showToast";
import { logActivity } from "../../../utils/activity/logActivity";
import InvestorProfile from "../profile/InvestorProfile";
import api from "../../../services/api";

const InvestorCard = ({
  data,
  onRemove,
  isWishlist,
  isInvestorView = false,
  onWishlistToggle,
}) => {
  ///Profile popup open / close control karna
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  /* ================= USER ================= */
  const user = JSON.parse(localStorage.getItem("user"));
  const visibility = data.visibility === "draft" ? "draft" : "public";

  // Unified profile loader (Founder + Investor)-BACKEND

  const investorCardId = data?._id || data?.id;

  const loadProfile = async () => {
    if (!investorCardId) {
      showToast({
        message: "Invalid investor reference",
        type: "warning",
      });
      return;
    }

    try {
      const res = await api.get(`/investor-profiles/by-card/${investorCardId}`);
      setProfile(res.data);
      setShowProfile(true);
    } catch {
      showToast({
        message: "Investor profile is not available",
        type: "warning",
      });
    }
  };

  /* ================= VIEW ACTIVITY ================= */
  const handleView = async () => {
    if (!user) return;

    // logActivity({
    //   userEmail: user.email,
    //   role: "founder",
    //   type: "VIEW",
    //   targetType: "investor",
    //   targetId: data._id,
    // });

    // backend
    await api.post("/activities", {
      type: "VIEW",
      targetType: "investor",
      targetId: data._id,
    });
  };

  /* ================= WISHLIST ================= */
  // const isInWishlist =
  //   JSON.parse(localStorage.getItem("wishlist"))?.some(
  //     (item) => item.id === data._id
  //   ) || false;

  // const [added, setAdded] = useState(() => (isWishlist ? true : isInWishlist));

  // const handleWishlistToggle = () => {
  //   const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  //   if (added) {
  //     const updated = storedWishlist.filter((i) => i.id !== data._id);
  //     localStorage.setItem("wishlist", JSON.stringify(updated));
  //     setAdded(false);

  //     showToast({
  //       icon: <HeartOff className="w-4 h-4 text-white" />,
  //       message: `${data.name} removed from wishlist`,
  //       type: "danger",
  //       position: "top-right",
  //     });
  //   } else {
  //     const updated = [
  //       ...storedWishlist,
  //       { id: data._id, type: "investor", payload: data },
  //     ];
  //     localStorage.setItem("wishlist", JSON.stringify(updated));
  //     setAdded(true);

  //     showToast({
  //       icon: <Check className="w-4 h-4 text-white" />,
  //       message: `${data.name} added to wishlist`,
  //       type: "success",
  //       position: "top-right",
  //     });
  //   }
  // };

  // const handleWishlistClick = () => {
  //   if (!user) return;

  //   if (isWishlist) onRemove?.();
  //   else handleWishlistToggle();

  //   logActivity({
  //     userEmail: user.email,
  //     role: "founder",
  //     type: "WISHLIST",
  //     targetType: "investor",
  //     targetId: data._id,
  //   });
  // };

  /* ========= WISHLIST-backend ================= */
  /* ================= WISHLIST (BACKEND) ================= */
  /* ================= WISHLIST (BACKEND) ================= */
  const [added, setAdded] = useState(!!isWishlist);

  const handleWishlistClick = async () => {
    try {
      const res = await api.post("/wishlist/toggle", {
        targetType: "investor",
        targetId: data._id,
      });

      setAdded(res.data.added);
      onWishlistToggle?.(data._id, res.data.added);
      //  ACTIVITY LOG — ONLY WHEN ADDED
      if (res.data.added) {
        await api.post("/activities", {
          type: "WISHLIST",
          targetType: "investor",
          targetId: data._id,
        });
      }

      showToast({
        message: res.data.added ? "Added to wishlist" : "Removed from wishlist",
        type: res.data.added ? "success" : "danger",
      });

      if (isWishlist && !res.data.added) {
        onRemove?.();
      }
    } catch {
      showToast({ message: "Wishlist failed", type: "danger" });
    }
  };

  /* ================= MAKE PUBLIC ================= */
  // const makePublic = (investorId) => {
  //   const investors = JSON.parse(localStorage.getItem("investors")) || [];

  //   const updated = investors.map((i) =>
  //     i.id === investorId ? { ...i, visibility: "public" } : i
  //   );

  //   localStorage.setItem("investors", JSON.stringify(updated));

  //   showToast({
  //     message: "Investor card is now public",
  //     type: "success",
  //     position: "top-right",
  //   });

  //   window.dispatchEvent(new Event("storage"));
  // };

  /* ================= MAKE DRAFT ================= */
  // const makeDraft = (investorId) => {
  //   const investors = JSON.parse(localStorage.getItem("investors")) || [];

  //   const updated = investors.map((i) =>
  //     i.id === investorId ? { ...i, visibility: "draft" } : i
  //   );

  //   localStorage.setItem("investors", JSON.stringify(updated));

  //   showToast({
  //     message: "Investor card is now private (draft)",
  //     type: "info",
  //     position: "top-right",
  //   });

  //   window.dispatchEvent(new Event("storage"));
  // };

  /* ========== MAKE PUBLIC-backend ========= */

  const makePublic = async () => {
    try {
      await api.patch(`/investor-cards/${data._id}/public`);
      showToast({ message: "Investor card is now public", type: "success" });
      //  notify parent to refetch
      window.dispatchEvent(new Event("investor-updated"));
    } catch {
      showToast({ message: "Failed to make card public", type: "danger" });
    }
  };

  /* ================= MAKE DRAFT-BACKEND================= */
  const makeDraft = async () => {
    try {
      await api.patch(`/investor-cards/${data._id}/draft`);

      showToast({
        message: "Investor card moved to draft",
        type: "info",
      });
      window.dispatchEvent(new Event("investor-updated"));
    } catch {
      showToast({
        message: "Failed to make card draft",
        type: "danger",
      });
    }
  };

  /* =======ADD PROFILE TO CARD=========== */
  // const handleAddProfile = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const profiles = JSON.parse(localStorage.getItem("investorProfiles")) || [];

  //   // Profile exist nahi karti
  //   const profile = profiles.find((p) => p.userId === user.id);

  //   if (!profile) {
  //     showToast({
  //       message: "Create your profile to add it to your public card",
  //       type: "warning",
  //       position: "top-right",
  //     });
  //     return;
  //   }

  //   // Profile exists → attach to card
  //   const investors = JSON.parse(localStorage.getItem("investors")) || [];

  //   const updated = investors.map((c) =>
  //     c.id === data._id
  //       ? {
  //           ...c,
  //           profileUserId: user.id,
  //           profileLinked: true,
  //         }
  //       : c
  //   );

  //   localStorage.setItem("investors", JSON.stringify(updated));
  //   window.dispatchEvent(new Event("storage"));

  //   showToast({
  //     message: "Your profile is now added to the public card",
  //     type: "success",
  //     position: "top-right",
  //   });
  // };

  /* ====ADD PROFILE TO CARD-BACKEND======== */
  const handleAddProfile = async () => {
    try {
      await api.patch(`/investor-cards/${data._id}/link-profile`, {
        profileUserId: user.id,
      });

      showToast({
        message: "Investor profile linked successfully",
        type: "success",
      });

      window.location.reload();
    } catch {
      showToast({
        message: "Create investor profile first",
        type: "warning",
      });
    }
  };

  //Profile open logic (FOUNDERS ONLY)
  // const profiles = JSON.parse(localStorage.getItem("investorProfiles")) || [];

  // const profile = profiles.find((p) => p.userId === data.profileUserId);

  /* ================= UI ================= */
  // Founder → VIEW activity
  // Investor → NO view activity
  return (
    <>
      <div
        onClick={!isInvestorView ? handleView : undefined}
        className="bg-white border rounded-2xl p-6 hover:shadow-lg transition cursor-pointer"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-lg text-gray-900">
                  {data.name}
                </h3>

                {data.verified && (
                  <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}

                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {data.investorType}
                </span>
              </div>

              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-4 h-4" />
                {data.firm}
              </p>
            </div>
          </div>

          {!isInvestorView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistClick();
              }}
            >
              <Heart
                className={`w-5 h-5 transition ${
                  added
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          )}
        </div>

        {/* INFO */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Ticket Size: {data.ticketSize?.label ?? "Not disclosed"}
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {data.location?.city}, {data.location?.country},
            {data.location.region && ` ${data.location.region}`}
          </p>
        </div>

        {/* STAGES */}
        <div className="flex flex-wrap gap-2 mt-3">
          {data.stages?.map((stage) => (
            <span
              key={stage}
              className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600"
            >
              {stage}
            </span>
          ))}
        </div>

        {/* INDUSTRIES */}
        <div className="flex flex-wrap gap-2 mt-3">
          {data.industries?.map((industry) => (
            <span
              key={industry}
              className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
            >
              {industry}
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        {/* ACTIONS */}
        {/* ACTIONS */}
        <div className="flex gap-3 mt-5">
          {/* LEFT BUTTON */}
          {isInvestorView ? (
            /* ===== INVESTOR = OWNER (same as StartupCard founder view) ===== */
            !data.profileLinked ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddProfile();
                }}
                className="flex-1 border border-indigo-600 text-indigo-600 py-2.5 rounded-lg"
              >
                Add Profile
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadProfile();
                }}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg"
              >
                View Profile
              </button>
            )
          ) : (
            /* ===== FOUNDER = CONSUMER (NO profileLinked check) ===== */
            <button
              onClick={(e) => {
                e.stopPropagation();
                loadProfile(); // backend decides
              }}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg"
            >
              View Profile
            </button>
          )}

          {/* RIGHT BUTTON */}
          {isInvestorView ? (
            visibility === "draft" ? (
              <button
                onClick={makePublic}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg"
              >
                Make Public
              </button>
            ) : (
              <button
                onClick={makeDraft}
                className="flex-1 border border-gray-400 text-gray-700 py-2.5 rounded-lg"
              >
                Make Draft
              </button>
            )
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistClick();
              }}
              className={`flex-1 border rounded-lg ${
                added
                  ? "border-red-500 text-red-500"
                  : "border-indigo-600 text-indigo-600"
              }`}
            >
              {added ? "Remove" : "Add to Wishlist"}
            </button>
          )}
        </div>
      </div>
      {/* // founder side open as popup */}
      {showProfile && profile && (
        <InvestorProfile
          profileData={profile} // // founder side me
          embedded={false} // to open popup mode
          onClose={() => setShowProfile(false)} //to  CLOSE
        />
      )}
    </>
  );
};

export default InvestorCard;

//ye investorcard layout hai yahan card data aata hai
//or proper layout ke sath show karta hai
//isi formate mein fouder side dikhenge

// mbedded (true/false)
// batata hai ki profile
// page ke andar dikhani hai
// ya
// popup / modal ke form me
//default false ->as pop pop open hoga
//ye sirf true and false ke liye hai
//baki pop up ka code we write self
