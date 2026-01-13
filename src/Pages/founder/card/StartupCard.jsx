import {
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Heart,
  BadgeCheck,
  Check,
  HeartOff,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { showToast } from "../../../utils/showToast";
import { logActivity } from "../../../utils/activity/logActivity";
import StartupProfile from "../profile/StartupProfile";
import api from "../../../services/api";

const StartupCard = ({
  data,
  onRemove,
  isWishlist,
  isFounderView = false,
  onWishlistToggle,
}) => {
  /* ======== PROFILE POPUP ================= */
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  /* ================= USER ================= */
  const user = JSON.parse(localStorage.getItem("user"));
  const visibility = data.visibility === "draft" ? "draft" : "public";

  // Unified profile loader (Founder + Investor)-BACKEND
  const startupId = data?._id || data?.id;

  const loadProfile = async () => {
    if (!startupId) {
      showToast({
        message: "Invalid startup reference",
        type: "warning",
      });
      return;
    }

    try {
      const res = await api.get(`/startup-profiles/by-startup/${startupId}`);
      setProfile(res.data);
      setShowProfile(true);
    } catch {
      showToast({
        message: "Startup profile is not available",
        type: "warning",
      });
    }
  };

  /* === VIEW ACTIVITY (INVESTOR) ====== */
  const handleView = async () => {
    if (!user) return;

    // logActivity({
    //   userEmail: user.email,
    //   role: "investor",
    //   type: "VIEW",
    //   targetType: "startup",
    //   targetId: data._id,
    // });
    //backend...............
    await api.post("/activities", {
      type: "VIEW",
      targetType: "startup",
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
  //       { id: data._id, type: "startup", payload: data },
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
  //     role: "investor",
  //     type: "WISHLIST",
  //     targetType: "startup",
  //     targetId: data._id,
  //   });
  // };
  /* =========== WISHLIST -backend================= */
  /* ================= WISHLIST (BACKEND) ================= */
  /* ================= WISHLIST (BACKEND) ================= */
  const [added, setAdded] = useState(!!isWishlist);
  const handleWishlistClick = async () => {
    try {
      const res = await api.post("/wishlist/toggle", {
        targetType: "startup",
        targetId: data._id,
      });

      setAdded(res.data.added);
      onWishlistToggle?.(data._id, res.data.added);
      // ACTIVITY LOG — ONLY WHEN ADDED
      if (res.data.added) {
        await api.post("/activities", {
          type: "WISHLIST",
          targetType: "startup",
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

  /* ========= MAKE PUBLIC / DRAFT ================= */
  // const makePublic = (startupId) => {
  //   const startups = JSON.parse(localStorage.getItem("startups")) || [];

  //   const updated = startups.map((s) =>
  //     s.id === startupId ? { ...s, visibility: "public" } : s
  //   );

  //   localStorage.setItem("startups", JSON.stringify(updated));

  //   showToast({
  //     message: "Startup card is now public",
  //     type: "success",
  //     position: "top-right",
  //   });

  //   window.dispatchEvent(new Event("storage"));
  // };

  // const makeDraft = (startupId) => {
  //   const startups = JSON.parse(localStorage.getItem("startups")) || [];

  //   const updated = startups.map((s) =>
  //     s.id === startupId ? { ...s, visibility: "draft" } : s
  //   );

  //   localStorage.setItem("startups", JSON.stringify(updated));

  //   showToast({
  //     message: "Startup card is now private (draft)",
  //     type: "info",
  //     position: "top-right",
  //   });

  //   window.dispatchEvent(new Event("storage"));
  // };

  /* ========= BACKEND========= */
  const makePublic = async () => {
    try {
      await api.patch(`/startups/${data._id}/public`);
      showToast({ message: "Startup card is now public", type: "success" });
      // IMPORTANT: refetch latest card
      window.dispatchEvent(new Event("startup-updated"));
    } catch {
      showToast({ message: "Failed to make startup public", type: "danger" });
    }
  };

  const makeDraft = async () => {
    try {
      await api.patch(`/startups/${data._id}/draft`);
      showToast({
        message: "Startup card is now private (draft)",
        type: "info",
      });
      window.dispatchEvent(new Event("startup-updated"));
    } catch {
      showToast({ message: "Failed to make startup draft", type: "danger" });
    }
  };

  /* == ADD PROFILE TO CARD (FOUNDER)======= */
  // const handleAddProfile = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const profiles = JSON.parse(localStorage.getItem("startupProfiles")) || [];

  //   const profile = profiles.find((p) => p.userId === user.id);

  //   if (!profile) {
  //     showToast({
  //       message: "Create your startup profile to add it to your public card",
  //       type: "warning",
  //       position: "top-right",
  //     });
  //     return;
  //   }

  //   const startups = JSON.parse(localStorage.getItem("startups")) || [];

  //   const updated = startups.map((s) =>
  //     s.id === data._id
  //       ? {
  //           ...s,
  //           profileUserId: user.id,
  //           profileLinked: true,
  //         }
  //       : s
  //   );

  //   localStorage.setItem("startups", JSON.stringify(updated));
  //   window.dispatchEvent(new Event("storage"));

  //   showToast({
  //     message: "Startup profile added to public card",
  //     type: "success",
  //     position: "top-right",
  //   });
  // };

  /* == ADD PROFILE TO CARD (FOUNDER)-BACKEND======= */
  const handleAddProfile = async () => {
    try {
      await api.patch(`/startups/${data._id}/link-profile`, {
        profileUserId: user.id, // backend expects this
      });

      showToast({
        message: "Startup profile linked successfully",
        type: "success",
      });

      //  IMPORTANT: refresh card data
      window.location.reload();
      // (or better: refetch cards via parent later)
    } catch {
      showToast({
        message: "Failed to link startup profile",
        type: "danger",
      });
    }
  };

  /* === PROFILE OPEN (INVESTOR) ================= */
  // const profiles = JSON.parse(localStorage.getItem("startupProfiles")) || [];

  // const profile = profiles.find((p) => p.userId === data.profileUserId);

  /* ================= UI ================= */
  return (
    <>
      <div
        onClick={!isFounderView ? handleView : undefined}
        className="bg-white border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition cursor-pointer"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                {data.name}
              </h3>

              {data.verified && (
                <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}

              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {data.stage}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {data.tagline}
            </p>
          </div>

          {!isFounderView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistClick();
              }}
            >
              <Heart
                className={`w-5 h-5sm:w-5 sm:h-5 p-1 ${
                  added
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          )}
        </div>

        {/* INFO */}
        <div className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Funding Ask: {data.fundingAsk?.label ?? "Not disclosed"}
          </p>
          {data.traction && (
            <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-gray-700">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                {data.traction.revenue}
              </div>

              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-600" />
                {data.traction.users}
              </div>

              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                {data.traction.growth}
              </div>
            </div>
          )}

          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {data.teamSize} team members
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {data.location?.city
              ? `${data.location.city}, ${data.location.country}`
              : "Location not disclosed"}
          </p>

          <p className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {data.industries?.map((ind, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {ind}
              </span>
            ))}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-5">
          {/* LEFT BUTTON */}
          {isFounderView ? (
            !data.profileLinked ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddProfile();
                }}
                className="flex-1 border border-indigo-600 text-indigo-600 py-3 sm:py-2.5 rounded-lg text-sm"
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
            // INVESTOR SIDE (NO profileLinked CHECK)
            <button
              onClick={(e) => {
                e.stopPropagation();
                loadProfile();
              }}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg"
            >
              View Profile
            </button>
          )}

          {/* RIGHT BUTTON — NO CHANGE */}
          {isFounderView ? (
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

      {/* INVESTOR VIEW POPUP */}
      {showProfile && profile && (
        <StartupProfile
          profileData={profile}
          embedded={false}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
};

export default StartupCard;
// targetType = jis cheez ko dekha ja raha hai
// Investor → StartupCard dekh raha → targetType: "startup"

// Founder → InvestorCard dekh raha → targetType: "investor"
