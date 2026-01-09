import { useState, useMemo, useEffect } from "react";
import DiscoverFilters from "../../Components/discover/DiscoverFilters";
import DiscoverHeader from "../../Components/discover/DiscoverHeader";
import InvestorCard from "../investor/card/InvestorCard";
import StartupCard from "../founder/card/StartupCard";
// import { getRecommendedItems } from "../../utils/recommendation";
import { getUserFromStorage } from "../../utils/auth";
import api from "../../services/api";
// import { getRecommendedItems } from "../../utils/recommendation/recommend.service";

//  NORMALIZATION HELPERS (ONLY FOR MATCHING)
// const normalizeIndustry = (val = "") =>
//   val
//     .toLowerCase()
//     .replace(/ & /g, " ")
//     .replace(/machine learning/g, "ai")
//     .replace(/\s+/g, "");
// const normalizeStage = (val = "") => val.toLowerCase().replace(/\s+/g, "-");
// const normalizeCountry = (val = "") => val.toLowerCase();
const matchTicketSize = (ticket, fundingAsk) => {
  if (!ticket) return true;
  if (!fundingAsk) return true;

  const { min, max } = fundingAsk;

  if (ticket === "$50K – $250K") return min >= 50000 && max <= 250000;
  if (ticket === "$250K – $1M") return min >= 250000 && max <= 1000000;
  if (ticket === "$1M – $5M") return min >= 1000000 && max <= 5000000;
  if (ticket === "$5M+") return min >= 5000000;

  return true;
};

const Discover = ({ role }) => {
  const user = getUserFromStorage();

  // const prefs = user?.preferences || {};

  const [investors, setInvestors] = useState([]);
  const [startups, setStartups] = useState([]);
  //Ab frontend ko pata hai:
  //false → preferences match hua
  //true → public fallback
  const [isFallback, setIsFallback] = useState(false);

  //wishlist-backend
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const fetchWishlistIds = async () => {
    const res = await api.get("/wishlist/me");
    const ids = res.data.map((item) => item.id);
    setWishlistIds(new Set(ids));
  };

  useEffect(() => {
    if (!user?.token) return;
    fetchWishlistIds();
  }, [user?.token]);

  const handleWishlistToggleLocal = (id, added) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (added) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  //Discover.jsx me preferences ko API se fetch karo--temp
  const [debugPrefs, setDebugPrefs] = useState(null);
  // useEffect(() => {
  //   const fetchPrefs = async () => {
  //     try {
  //       const token = user?.token;
  //       if (!token) return;

  //       const url =
  //         role === "investor"
  //           ? "http://localhost:5000/api/onboarding/investor"
  //           : "http://localhost:5000/api/onboarding/founder";

  //       const res = await fetch(url, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const prefsData = await res.json();
  //       setDebugPrefs(prefsData);

  //       // TEMP DEBUG
  //       localStorage.setItem("debug_preferences", JSON.stringify(prefsData));
  //     } catch (e) {
  //       console.error("Failed to fetch prefs", e);
  //     }
  //   };

  //   fetchPrefs();
  // }, [role, user]);

  //   ye kya karega
  // Founder tab → startup add
  // Investor tab → auto refresh
  // Reload ki zarurat nahi
  // useEffect(() => {
  //   const syncData = () => {
  //     setInvestors(JSON.parse(localStorage.getItem("investors")) || []);
  //     setStartups(JSON.parse(localStorage.getItem("startups")) || []);
  //   };

  //   syncData(); // THIS WAS MISSING
  //   window.addEventListener("storage", syncData);

  //   return () => window.removeEventListener("storage", syncData);
  // }, []);

  //...................BACKEND.................
  // useEffect(() => {
  //   const fetchDiscoverData = async () => {
  //     try {
  //       const token = user?.token;
  //       if (!token) return;

  //       // Investor → Discover Startups
  //       if (role === "investor") {
  //         const res = await fetch("http://localhost:5000/discover/startups", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         const result = await res.json();
  //         // IMPORTANT
  //         setStartups(result.data || []);
  //         setIsFallback(!!result.fallback); //  IMPORTANT
  //         //  TEMP DEBUG (YAHIN ADD KARO)
  //         localStorage.setItem(
  //           "discover_debug",
  //           JSON.stringify({
  //             role,
  //             fallback: result.fallback,
  //             count: result.data?.length || 0,
  //             preferences: debugPrefs,
  //           })
  //         );
  //       }

  //       // Founder → Discover Investors
  //       if (role === "founder") {
  //         const res = await fetch("http://localhost:5000/discover/investors", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         const result = await res.json();

  //         //  IMPORTANT
  //         setInvestors(result.data || []);
  //         setIsFallback(!!result.fallback); //  IMPORTANT
  //         //  TEMP DEBUG (YAHIN ADD KARO)
  //         localStorage.setItem(
  //           "discover_debug",
  //           JSON.stringify({
  //             role,
  //             fallback: result.fallback,
  //             count: result.data?.length || 0,
  //             preferences: debugPrefs,
  //           })
  //         );
  //       }
  //     } catch (err) {
  //       console.error("Discover fetch failed", err);
  //     }
  //   };

  //   fetchDiscoverData();
  // }, [role, user]);

  // ...................BACKEND (PRODUCTION SAFE).................
  // Discover.jsx me preferences ko API se fetch karo (PRODUCTION SAFE)
  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        if (!user?.token) return;

        const res = await api.get(
          role === "investor" ? "/onboarding/investor" : "/onboarding/founder"
        );

        setDebugPrefs(res.data);

        // TEMP DEBUG
        localStorage.setItem("debug_preferences", JSON.stringify(res.data));
      } catch (e) {
        console.error("Failed to fetch prefs", e);
      }
    };

    fetchPrefs();
  }, [role, user?.token]);

  useEffect(() => {
    const fetchDiscoverData = async () => {
      try {
        if (!user?.token) return;

        // Investor → Discover Startups
        if (role === "investor") {
          const res = await api.get("/discover/startups");
          const result = res.data;

          setStartups(result.data || []);
          setIsFallback(!!result.fallback);
        }

        // Founder → Discover Investors
        if (role === "founder") {
          const res = await api.get("/discover/investors");
          const result = res.data;

          setInvestors(result.data || []);
          setIsFallback(!!result.fallback);
        }
      } catch (err) {
        console.error("Discover fetch failed", err);
      }
    };

    fetchDiscoverData();
  }, [role, user?.token]);

  //recommendation
  // const recommendedInvestors =
  //   role === "founder"
  //     ? getRecommendedItems({
  //         user,
  //         items: investors,
  //         targetType: "investor",
  //       })
  //     : investors;
  // const recommendedStartups =
  //   role === "investor"
  //     ? getRecommendedItems({
  //         user,
  //         items: startups,
  //         targetType: "startup",
  //       })
  //     : startups;

  //without recmmendation to show all cards
  // const recommendedInvestors = investors;
  // const recommendedStartups = startups;

  // role/preferences  ke hisaab se data
  //now with recommendations
  // const rawData =
  //   role === "founder"
  //     ? recommendedInvestors.filter((investor) => {
  //         if (investor.visibility !== "public") return false;

  //         // 🔹 INDUSTRY MATCH
  //         const industryMatch =
  //           !prefs.industries?.length ||
  //           investor.industries?.some((ind) =>
  //             prefs.industries
  //               .map(normalizeIndustry)
  //               .includes(normalizeIndustry(ind))
  //           );

  //         // 🔹 STAGE MATCH
  //         const stageMatch =
  //           !prefs.fundingStage ||
  //           investor.stages?.includes(normalizeStage(prefs.fundingStage));

  //         // 🔹 COUNTRY MATCH
  //         const countryMatch =
  //           !prefs.geography ||
  //           normalizeCountry(prefs.geography) ===
  //             normalizeCountry(investor.location.country);

  //         return industryMatch && stageMatch && countryMatch;
  //       })
  //     : recommendedStartups.filter((startup) => {
  //         if (startup.visibility !== "public") return false;

  //         // 🔹 INDUSTRY MATCH
  //         // const industryMatch = startup.industries.some((ind) =>
  //         //   prefs.industries
  //         //     ?.map(normalizeIndustry)
  //         //     .includes(normalizeIndustry(ind))
  //         // );
  //         const industryMatch =
  //           !prefs.industries?.length ||
  //           startup.industries.some((ind) =>
  //             prefs.industries
  //               .map(normalizeIndustry)
  //               .includes(normalizeIndustry(ind))
  //           );

  //         // 🔹 STAGE MATCH
  //         // const stageMatch = prefs.startupStage
  //         //   ?.map(normalizeStage)
  //         //   .includes(startup.stage);
  //         const stageMatch =
  //           !prefs.startupStage?.length ||
  //           prefs.startupStage.map(normalizeStage).includes(startup.stage);

  //         // 🔹 COUNTRY MATCH
  //         const countryMatch =
  //           !prefs.geography ||
  //           normalizeCountry(prefs.geography) ===
  //             normalizeCountry(startup.location.country);

  //         return industryMatch && stageMatch && countryMatch;
  //       });

  ///RAW DATA = BACKEND DATA ONLY
  //for prefences Backend already filtered hai.
  const rawData = role === "founder" ? investors : startups;
  //  RECOMMENDATION LAYER (FRONTEND ONLY)
  // const recommendedData = useMemo(() => {
  //   if (!user) return rawData;

  //   return getRecommendedItems({
  //     user,
  //     items: rawData,
  //     targetType: role === "founder" ? "investor" : "startup",
  //   });
  // }, [rawData, user, role]);

  //KEEP SEARCH & FILTERS-frontend only

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    industry: "",
    stages: [],
    ticket: "",
    investorType: "",
    country: "",
    verified: false,
    teamSize: "",
  });

  // ---------------------------
  // SEARCH (standard, lowercase-safe)
  // ---------------------------
  const searchedData = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rawData;
    return rawData.filter((item) => {
      return (
        item.name?.toLowerCase().includes(query) ||
        item.firm?.toLowerCase().includes(query) ||
        item.tagline?.toLowerCase().includes(query) ||
        item.industries?.some((i) => i.includes(query))
      );
    });
  }, [search, rawData]);

  //   // SEARCH (standard, lowercase-safe)-BACKEND-RECOMMEDADTION
  // const searchedData = useMemo(() => {
  //   const query = search.trim().toLowerCase();

  //   if (!query) return recommendedData;

  //   return recommendedData.filter((item) => {
  //     return (
  //       item.name?.toLowerCase().includes(query) ||
  //       item.firm?.toLowerCase().includes(query) ||
  //       item.tagline?.toLowerCase().includes(query) ||
  //       item.industries?.some((i) => i.includes(query))
  //     );
  //   });
  // }, [search, recommendedData]);

  // ---------------------------
  // FILTERS (standard enums)
  // ---------------------------
  const filteredData = useMemo(() => {
    return searchedData.filter((item) => {
      // Industry
      if (
        filters.industry &&
        !item.industries
          ?.map((i) => i.toLowerCase())
          .includes(filters.industry.toLowerCase())
      )
        return false;

      // Stage
      if (filters.stages.length > 0) {
        // Founder discovering investors
        if (role === "founder") {
          if (!filters.stages.some((s) => item.stages?.includes(s)))
            return false;
        }

        // Investor discovering startups
        else {
          if (!filters.stages.includes(item.stage?.toLowerCase())) return false;
        }
        // 🔹 TICKET SIZE MATCH (Investor → Startup)
        if (filters.ticket && role === "investor") {
          const ticketMatch = matchTicketSize(filters.ticket, item.fundingAsk);

          if (!ticketMatch) return false;
        }
      }

      // Country  FIXED
      if (
        filters.country &&
        item.location?.country?.toLowerCase() !== filters.country.toLowerCase()
      )
        return false;

      // Verified
      if (filters.verified && !item.verified) return false;

      // Investor Type
      if (filters.investorType && item.investorType !== filters.investorType)
        return false;

      // Ticket / Funding
      // Startup funding (investor discovering startups)
      if (filters.ticket && role === "investor") {
        const { min, max } = item.fundingAsk;

        if (
          filters.ticket === "$50K – $250K" &&
          !(min >= 50000 && max <= 250000)
        )
          return false;
        if (
          filters.ticket === "$250K – $1M" &&
          !(min >= 250000 && max <= 1000000)
        )
          return false;
        if (
          filters.ticket === "$1M – $5M" &&
          !(min >= 1000000 && max <= 5000000)
        )
          return false;
        if (filters.ticket === "$5M+" && min < 5000000) return false;
      }

      // Investor ticket size (founder discovering investors)
      if (filters.ticket && role === "founder") {
        const { min, max } = item.ticketSize || {};

        if (
          filters.ticket === "$50K – $250K" &&
          !(min >= 50000 && max <= 250000)
        )
          return false;
        if (
          filters.ticket === "$250K – $1M" &&
          !(min >= 250000 && max <= 1000000)
        )
          return false;
        if (
          filters.ticket === "$1M – $5M" &&
          !(min >= 1000000 && max <= 5000000)
        )
          return false;
        if (filters.ticket === "$5M+" && min < 5000000) return false;
      }

      return true;
    });
  }, [searchedData, filters, role]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <DiscoverHeader role={role} search={search} setSearch={setSearch} />

      {/* Filters + Cards */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="h-fit">
          <DiscoverFilters
            role={role}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Cards */}
        <div className="lg:col-span-3 pr-2">
          {isFallback && (
            <p className="text-yellow-600 text-sm mb-2">
              Showing public profiles. Update preferences for better matches.
            </p>
          )}
          <p
            className={`text-sm mb-4 ${
              filteredData.length === 0
                ? "text-red-500 text-center"
                : "text-green-600"
            }`}
          >
            {filteredData.length} results found
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {filteredData.map((item) =>
              role === "founder" ? (
                <InvestorCard
                  key={item._id}
                  data={item}
                  isWishlist={wishlistIds.has(item._id)}
                  onWishlistToggle={handleWishlistToggleLocal}
                />
              ) : (
                <StartupCard
                  key={item._id}
                  data={item}
                  isWishlist={wishlistIds.has(item._id)}
                  onWishlistToggle={handleWishlistToggleLocal}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;

// FINAL DECISION (LOCK THIS)
//  Preferences filtering = BACKEND ONLY
// Frontend = search + UI filters only
// Backend:
// preferences filter
// → activity score
// → sort
// → response

// Frontend:
// render
// → search
// → UI filters
