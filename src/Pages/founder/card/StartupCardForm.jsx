import { useEffect, useState } from "react";
import api from "../../../services/api";
import { showToast } from "../../../utils/showToast";

const startupCardTestData = [
  {
    name: "AgroSense AI",
    tagline: "AI-driven precision farming for India",
    industries: "agritech, ai, saas",
    stage: "seed",
    fundingMin: "500000",
    fundingMax: "2000000",
    teamSize: "11–50",
    city: "Pune",
    country: "india",
    region: "asia",
    revenue: "₹50L ARR",
    users: "3000+ farmers",
    growth: "12% MoM",
  },
  {
    name: "FinTrack",
    tagline: "Smart expense tracking for SMEs",
    industries: "fintech, saas",
    stage: "pre-seed",
    fundingMin: "250000",
    fundingMax: "1000000",
    teamSize: "1–10",
    city: "Bangalore",
    country: "india",
    region: "asia",
    revenue: "Pre-revenue",
    users: "120 businesses",
    growth: "8% MoM",
  },
  {
    name: "HealthBridge",
    tagline: "Connecting rural patients to doctors",
    industries: "healthtech, ai",
    stage: "series-a",
    fundingMin: "3000000",
    fundingMax: "8000000",
    teamSize: "51–100",
    city: "Delhi",
    country: "india",
    region: "asia",
    revenue: "₹3Cr ARR",
    users: "1M+ patients",
    growth: "18% QoQ",
  },
  {
    name: "EduSpark",
    tagline: "Personalized learning with AI tutors",
    industries: "edtech, ai",
    stage: "seed",
    fundingMin: "1000000",
    fundingMax: "4000000",
    teamSize: "11–50",
    city: "Hyderabad",
    country: "india",
    region: "asia",
    revenue: "₹80L ARR",
    users: "50K students",
    growth: "20% MoM",
  },
  {
    name: "LogiFlow",
    tagline: "Supply chain automation for D2C brands",
    industries: "logistics, saas",
    stage: "series-a",
    fundingMin: "5000000",
    fundingMax: "12000000",
    teamSize: "51–100",
    city: "Mumbai",
    country: "india",
    region: "asia",
    revenue: "₹5Cr ARR",
    users: "200+ brands",
    growth: "15% MoM",
  },
  {
    name: "ClimateGrid",
    tagline: "Carbon tracking for enterprises",
    industries: "climate, saas",
    stage: "seed",
    fundingMin: "750000",
    fundingMax: "2500000",
    teamSize: "11–50",
    city: "Chennai",
    country: "india",
    region: "asia",
    revenue: "₹40L ARR",
    users: "90 enterprises",
    growth: "10% MoM",
  },
  {
    name: "RetailIQ",
    tagline: "AI analytics for offline retail",
    industries: "retailtech, ai",
    stage: "pre-seed",
    fundingMin: "300000",
    fundingMax: "900000",
    teamSize: "1–10",
    city: "Indore",
    country: "india",
    region: "asia",
    revenue: "Pilot stage",
    users: "25 stores",
    growth: "N/A",
  },
  {
    name: "BuildOps",
    tagline: "Construction project management SaaS",
    industries: "proptech, saas",
    stage: "seed",
    fundingMin: "1200000",
    fundingMax: "3500000",
    teamSize: "11–50",
    city: "Ahmedabad",
    country: "india",
    region: "asia",
    revenue: "₹1Cr ARR",
    users: "150 contractors",
    growth: "9% MoM",
  },
  {
    name: "AutoMind",
    tagline: "AI automation for customer support",
    industries: "ai, saas",
    stage: "series-a",
    fundingMin: "6000000",
    fundingMax: "15000000",
    teamSize: "51–100",
    city: "Bangalore",
    country: "india",
    region: "asia",
    revenue: "₹7Cr ARR",
    users: "500+ companies",
    growth: "22% YoY",
  },
  {
    name: "FoodChain",
    tagline: "Farm-to-fork supply transparency",
    industries: "foodtech, blockchain",
    stage: "seed",
    fundingMin: "800000",
    fundingMax: "2200000",
    teamSize: "11–50",
    city: "Jaipur",
    country: "india",
    region: "asia",
    revenue: "₹60L ARR",
    users: "100+ restaurants",
    growth: "14% MoM",
  },
];

const emptyForm = {
  name: "",
  tagline: "",
  industries: "",
  stage: "",
  fundingMin: "",
  fundingMax: "",
  teamSize: "",
  city: "",
  country: "",
  region: "",
  revenue: "",
  users: "",
  growth: "",
};

const StartupCardForm = ({ onSaved, existingData }) => {
  const [form, setForm] = useState(startupCardTestData[0]);

  /* ================= PREFILL (EDIT MODE) ================= */
  useEffect(() => {
    if (!existingData) return;

    setForm({
      name: existingData.name || "",
      tagline: existingData.tagline || "",
      industries: existingData.industries?.join(", ") || "",
      stage: existingData.stage || "",
      fundingMin: existingData.fundingAsk?.min || "",
      fundingMax: existingData.fundingAsk?.max || "",
      teamSize: existingData.teamSize || "",
      city: existingData.location?.city || "",
      country: existingData.location?.country || "",
      region: existingData.location?.region || "",
      revenue: existingData.traction?.revenue || "",
      users: existingData.traction?.users || "",
      growth: existingData.traction?.growth || "",
    });
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SAVE CARD ================= */
  // const handleGenerateStartupCard = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) return;

  //   /* ---------- REQUIRED FIELD CHECK ---------- */
  //   if (
  //     !form.name.trim() ||
  //     !form.industries.trim() ||
  //     !form.stage.trim() ||
  //     !form.country.trim()
  //   ) {
  //     alert("Please fill all required card fields");
  //     return;
  //   }

  //   const startups = JSON.parse(localStorage.getItem("startups")) || [];

  //   const startupId = existingData?.id || `startup_${Date.now()}`;

  //   const fundingMin = Number(form.fundingMin) || 0;
  //   const fundingMax = Number(form.fundingMax) || 0;

  //   const fundingLabel =
  //     fundingMax >= 5_000_000
  //       ? "$5M+"
  //       : fundingMax >= 1_000_000
  //       ? "$1M – $5M"
  //       : fundingMax >= 250_000
  //       ? "$250K – $1M"
  //       : "$50K – $250K";

  //   const newStartup = {
  //     id: startupId,
  //     ownerEmail: user.email,

  //     name: form.name.trim(),
  //     tagline: form.tagline.trim(),

  //     industries: form.industries
  //       .split(",")
  //       .map((i) => i.trim().toLowerCase())
  //       .filter(Boolean),

  //     stage: form.stage.trim().toLowerCase(),

  //     fundingAsk: {
  //       min: fundingMin,
  //       max: fundingMax,
  //       label: fundingLabel,
  //     },

  //     teamSize: form.teamSize || "1–10",

  //     location: {
  //       city: form.city.trim(),
  //       country: form.country.trim().toLowerCase(),
  //       region: form.region.trim().toLowerCase(),
  //     },

  //     traction: {
  //       revenue: form.revenue || "Pre-revenue",
  //       users: form.users || "-",
  //       growth: form.growth || "-",
  //     },

  //     verified: false,
  //     visibility: existingData?.visibility || "draft",
  //     profileUserId: null,
  //     profileLinked: false,
  //   };

  //   const updatedStartups = startups.some((s) => s.id === startupId)
  //     ? startups.map((s) => (s.id === startupId ? newStartup : s))
  //     : [...startups, newStartup];

  //   localStorage.setItem("startups", JSON.stringify(updatedStartups));

  //   // link startup with user (same as investor side logic)
  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({
  //       ...user,
  //       startupId,
  //     })
  //   );

  //   onSaved?.();
  // };

  /* ================= BACKEND ================= */
  const handleGenerateStartupCard = async () => {
    /* ---------- REQUIRED FIELD CHECK ---------- */
    if (
      !form.name.trim() ||
      !form.industries.trim() ||
      !form.stage.trim() ||
      !form.country.trim()
    ) {
      showToast({
        message: "Please fill all required card fields",
        type: "warning",
      });
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        tagline: form.tagline.trim(),

        industries: form.industries
          .split(",")
          .map((i) => i.trim().toLowerCase())
          .filter(Boolean),

        stage: form.stage.trim().toLowerCase(),

        fundingAsk: {
          min: Number(form.fundingMin) || 0,
          max: Number(form.fundingMax) || 0,
        },

        teamSize: form.teamSize || "1–10",

        location: {
          city: form.city.trim(),
          country: form.country.trim().toLowerCase(),
          region: form.region.trim().toLowerCase(),
        },

        traction: {
          revenue: form.revenue || "Pre-revenue",
          users: form.users || "-",
          growth: form.growth || "-",
        },
      };

      await api.post("/startups", payload);

      showToast({
        message: "Startup card saved successfully",
        type: "success",
      });

      onSaved?.();
    } catch (err) {
      showToast({
        message: err.response?.data?.message || "Failed to save startup card",
        type: "danger",
      });
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white border rounded-xl p-6 max-w-4xl">
      <h2 className="text-lg font-semibold mb-6">Startup Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          placeholder="Startup Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tagline"
          value={form.tagline}
          placeholder="Tagline"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="industries"
          value={form.industries}
          placeholder="Industries (climate, ai, saas)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="stage"
          value={form.stage}
          placeholder="Stage (pre-seed / seed / series-a)"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="fundingMin"
          value={form.fundingMin}
          placeholder="Funding Min"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="fundingMax"
          value={form.fundingMax}
          placeholder="Funding Max"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="teamSize"
          value={form.teamSize}
          placeholder="Team Size (1–10 / 11–50)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="city"
          value={form.city}
          placeholder="City"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="country"
          value={form.country}
          placeholder="Country (india / usa)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="region"
          value={form.region}
          placeholder="Region (asia / europe)"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="revenue"
          value={form.revenue}
          placeholder="Revenue (₹10L ARR)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="users"
          value={form.users}
          placeholder="Users (10 enterprises)"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="growth"
          value={form.growth}
          placeholder="Growth (15% MoM)"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
      </div>

      <button
        onClick={handleGenerateStartupCard}
        className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition"
      >
        Generate Startup Card
      </button>
    </div>
  );
};

export default StartupCardForm;
