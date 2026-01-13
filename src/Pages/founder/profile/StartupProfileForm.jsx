import { useEffect, useState } from "react";
import api from "../../../services/api";
import { showToast } from "../../../utils/showToast";

/* ================= INITIAL STATE ================= */
const startupProfileTestDataList = [
  {
    name: "AgroSense AI",
    tagline: "AI-powered precision agriculture",
    logo: "",
    foundingYear: 2022,
    sector: ["Agriculture", "Technology"],
    industry: ["AgriTech", "AI", "SaaS"],
    location: { city: "Pune", country: "india", region: "asia" },
    founders: [
      {
        name: "Rohit Sharma",
        role: "CEO",
        background: "AgriTech founder, ex-IIT",
      },
    ],
    teamSize: "11–50",
    summary:
      "AgroSense helps farmers improve yield using satellite imagery and AI.",
    problemStatement: "Farmers lack real-time crop and soil health insights.",
    solution: "AI dashboards powered by satellite + IoT data.",
    businessModel: "SaaS subscription",
    productStage: "Live",
    traction: {
      revenue: "₹50L ARR",
      users: "3000+ farmers",
      growth: "12% MoM",
    },
    funding: {
      raisedTillNow: "₹1.5Cr",
      currentRound: "Seed",
      ask: {
        min: "₹2Cr",
        max: "₹4Cr",
        useOfFunds: "Product & expansion",
      },
    },
  },

  {
    name: "FinTrack",
    tagline: "Expense tracking for SMEs",
    logo: "",
    foundingYear: 2021,
    sector: ["Finance", "Technology"],
    industry: ["FinTech", "SaaS"],
    location: { city: "Bangalore", country: "india", region: "asia" },
    founders: [
      {
        name: "Ankit Verma",
        role: "CEO",
        background: "Ex-Paytm product lead",
      },
    ],
    teamSize: "1–10",
    summary: "FinTrack simplifies expense management for small businesses.",
    problemStatement:
      "SMEs struggle with manual expense tracking and compliance.",
    solution: "Automated expense tracking with GST-ready reports.",
    businessModel: "Monthly subscription",
    productStage: "Beta",
    traction: {
      revenue: "Pre-revenue",
      users: "120 SMEs",
      growth: "8% MoM",
    },
    funding: {
      raisedTillNow: "Bootstrapped",
      currentRound: "Pre-seed",
      ask: {
        min: "₹50L",
        max: "₹1Cr",
        useOfFunds: "Go-to-market",
      },
    },
  },

  {
    name: "HealthBridge",
    tagline: "Connecting patients to doctors remotely",
    logo: "",
    foundingYear: 2020,
    sector: ["Healthcare"],
    industry: ["HealthTech", "AI"],
    location: { city: "Delhi", country: "india", region: "asia" },
    founders: [
      {
        name: "Dr. Neha Kapoor",
        role: "CEO",
        background: "MD, healthcare entrepreneur",
      },
    ],
    teamSize: "51–100",
    summary: "HealthBridge connects rural patients with urban doctors.",
    problemStatement: "Rural patients lack access to quality healthcare.",
    solution: "Telemedicine platform with AI triage.",
    businessModel: "Per-consultation + hospitals",
    productStage: "Scaling",
    traction: {
      revenue: "₹3Cr ARR",
      users: "1M+ patients",
      growth: "18% QoQ",
    },
    funding: {
      raisedTillNow: "₹12Cr",
      currentRound: "Series A",
      ask: {
        min: "₹20Cr",
        max: "₹35Cr",
        useOfFunds: "Expansion & hiring",
      },
    },
  },

  {
    name: "EduSpark",
    tagline: "Personalized learning with AI tutors",
    logo: "",
    foundingYear: 2022,
    sector: ["Education"],
    industry: ["EdTech", "AI"],
    location: { city: "Hyderabad", country: "india", region: "asia" },
    founders: [
      {
        name: "Sandeep Rao",
        role: "Founder",
        background: "Ex-Byju’s educator",
      },
    ],
    teamSize: "11–50",
    summary: "EduSpark delivers AI-based personalized learning paths.",
    problemStatement: "Students struggle with one-size-fits-all education.",
    solution: "AI tutors adapting to student pace.",
    businessModel: "Subscription",
    productStage: "Live",
    traction: {
      revenue: "₹80L ARR",
      users: "50K students",
      growth: "20% MoM",
    },
    funding: {
      raisedTillNow: "₹3Cr",
      currentRound: "Seed",
      ask: {
        min: "₹5Cr",
        max: "₹8Cr",
        useOfFunds: "Content + AI",
      },
    },
  },

  {
    name: "LogiFlow",
    tagline: "Supply chain automation for D2C brands",
    logo: "",
    foundingYear: 2019,
    sector: ["Logistics"],
    industry: ["SaaS"],
    location: { city: "Mumbai", country: "india", region: "asia" },
    founders: [
      {
        name: "Kunal Mehta",
        role: "CEO",
        background: "Ex-Amazon logistics",
      },
    ],
    teamSize: "51–100",
    summary: "LogiFlow automates logistics for fast-growing D2C brands.",
    problemStatement: "D2C brands face fragmented logistics systems.",
    solution: "Unified SaaS logistics dashboard.",
    businessModel: "SaaS + usage based",
    productStage: "Scaling",
    traction: {
      revenue: "₹5Cr ARR",
      users: "200+ brands",
      growth: "15% MoM",
    },
    funding: {
      raisedTillNow: "₹18Cr",
      currentRound: "Series A",
      ask: {
        min: "₹30Cr",
        max: "₹50Cr",
        useOfFunds: "International expansion",
      },
    },
  },

  {
    name: "ClimateGrid",
    tagline: "Carbon tracking for enterprises",
    logo: "",
    foundingYear: 2021,
    sector: ["Climate"],
    industry: ["ClimateTech", "SaaS"],
    location: { city: "Chennai", country: "india", region: "asia" },
    founders: [
      {
        name: "Arjun Iyer",
        role: "CEO",
        background: "Sustainability consultant",
      },
    ],
    teamSize: "11–50",
    summary: "ClimateGrid helps enterprises track and reduce emissions.",
    problemStatement: "Companies lack visibility into carbon footprint.",
    solution: "Automated carbon analytics platform.",
    businessModel: "Annual contracts",
    productStage: "Live",
    traction: {
      revenue: "₹40L ARR",
      users: "90 enterprises",
      growth: "10% MoM",
    },
    funding: {
      raisedTillNow: "₹2Cr",
      currentRound: "Seed",
      ask: {
        min: "₹4Cr",
        max: "₹6Cr",
        useOfFunds: "Sales & compliance",
      },
    },
  },

  {
    name: "RetailIQ",
    tagline: "AI analytics for offline retail",
    logo: "",
    foundingYear: 2023,
    sector: ["Retail"],
    industry: ["RetailTech", "AI"],
    location: { city: "Indore", country: "india", region: "asia" },
    founders: [
      {
        name: "Nikhil Jain",
        role: "Founder",
        background: "Retail analytics expert",
      },
    ],
    teamSize: "1–10",
    summary: "RetailIQ gives insights into offline retail performance.",
    problemStatement: "Offline retailers lack data-driven insights.",
    solution: "AI-powered retail analytics.",
    businessModel: "Pilot + SaaS",
    productStage: "Pilot",
    traction: {
      revenue: "Pilot stage",
      users: "25 stores",
      growth: "N/A",
    },
    funding: {
      raisedTillNow: "Bootstrapped",
      currentRound: "Pre-seed",
      ask: {
        min: "₹30L",
        max: "₹60L",
        useOfFunds: "Product validation",
      },
    },
  },

  {
    name: "BuildOps",
    tagline: "Construction project management SaaS",
    logo: "",
    foundingYear: 2020,
    sector: ["Construction"],
    industry: ["PropTech", "SaaS"],
    location: { city: "Ahmedabad", country: "india", region: "asia" },
    founders: [
      {
        name: "Amit Patel",
        role: "CEO",
        background: "Civil engineer & founder",
      },
    ],
    teamSize: "11–50",
    summary: "BuildOps streamlines construction project workflows.",
    problemStatement:
      "Construction projects suffer from delays & mismanagement.",
    solution: "Centralized project management SaaS.",
    businessModel: "Subscription",
    productStage: "Live",
    traction: {
      revenue: "₹1Cr ARR",
      users: "150 contractors",
      growth: "9% MoM",
    },
    funding: {
      raisedTillNow: "₹3Cr",
      currentRound: "Seed",
      ask: {
        min: "₹5Cr",
        max: "₹7Cr",
        useOfFunds: "Sales & ops",
      },
    },
  },

  {
    name: "AutoMind",
    tagline: "AI automation for customer support",
    logo: "",
    foundingYear: 2018,
    sector: ["Technology"],
    industry: ["AI", "SaaS"],
    location: { city: "Bangalore", country: "india", region: "asia" },
    founders: [
      {
        name: "Rahul Khanna",
        role: "CEO",
        background: "Ex-Google AI engineer",
      },
    ],
    teamSize: "51–100",
    summary: "AutoMind automates customer support using AI agents.",
    problemStatement: "Customer support costs are high for scaling companies.",
    solution: "AI chat & automation platform.",
    businessModel: "SaaS + usage",
    productStage: "Scaling",
    traction: {
      revenue: "₹7Cr ARR",
      users: "500+ companies",
      growth: "22% YoY",
    },
    funding: {
      raisedTillNow: "₹25Cr",
      currentRound: "Series A",
      ask: {
        min: "₹40Cr",
        max: "₹60Cr",
        useOfFunds: "Global expansion",
      },
    },
  },

  {
    name: "FoodChain",
    tagline: "Farm-to-fork transparency platform",
    logo: "",
    foundingYear: 2021,
    sector: ["Food"],
    industry: ["FoodTech", "Blockchain"],
    location: { city: "Jaipur", country: "india", region: "asia" },
    founders: [
      {
        name: "Pooja Meena",
        role: "Founder",
        background: "Supply chain specialist",
      },
    ],
    teamSize: "11–50",
    summary: "FoodChain ensures transparency in food supply chains.",
    problemStatement: "Lack of trust & transparency in food sourcing.",
    solution: "Blockchain-based traceability platform.",
    businessModel: "B2B SaaS",
    productStage: "Live",
    traction: {
      revenue: "₹60L ARR",
      users: "100+ restaurants",
      growth: "14% MoM",
    },
    funding: {
      raisedTillNow: "₹2.5Cr",
      currentRound: "Seed",
      ask: {
        min: "₹4Cr",
        max: "₹6Cr",
        useOfFunds: "Tech & partnerships",
      },
    },
  },
];

const emptyForm = {
  /* ===== BASIC IDENTITY ===== */
  name: "",
  tagline: "",
  logo: "",
  foundingYear: "",
  sector: [],
  industry: [],
  location: {
    city: "",
    country: "",
    region: "",
  },

  /* ===== FOUNDERS & TEAM ===== */
  founders: [
    {
      name: "",
      role: "",
      background: "",
    },
  ],
  teamSize: "",

  /* ===== SUMMARY ===== */
  summary: "",

  /* ===== BUSINESS ===== */
  problemStatement: "",
  solution: "",
  businessModel: "",
  productStage: "",

  /* ===== TRACTION ===== */
  traction: {
    revenue: "",
    users: "",
    growth: "",
  },

  /* ===== FUNDING ===== */
  funding: {
    raisedTillNow: "",
    currentRound: "",
    ask: {
      min: "",
      max: "",
      useOfFunds: "",
    },
  },
};

const StartupProfileForm = ({ onSaved }) => {
  const [form, setForm] = useState(startupProfileTestDataList[0]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  /* ============ PREFILL (EDIT MODE) ============ */
  // useEffect(() => {
  //   const profiles = JSON.parse(localStorage.getItem("startupProfiles")) || [];

  //   if (!userId) return;

  //   const existing = profiles.find((p) => p.userId === userId);
  //   if (existing) {
  //     const { userId: _uid, ...rest } = existing;
  //     setForm({ ...emptyForm, ...rest });
  //   }
  // }, [userId]);

  /*==== PREFILL (EDIT MODE) -BACKEND===== */
  useEffect(() => {
    if (!userId) return;

    const loadProfile = async () => {
      try {
        const res = await api.get("/startup-profiles/me");
        if (res.data) {
          setForm({ ...emptyForm, ...res.data });
        }
      } catch {
        // no profile yet → keep empty form
      }
    };

    loadProfile();
  }, [userId]);

  /* ================= HELPERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    });
  };

  const handleNestedChange = (section, key, value) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [key]: value,
      },
    });
  };

  const handleFounderChange = (key, value) => {
    setForm({
      ...form,
      founders: [{ ...form.founders[0], [key]: value }],
    });
  };

  /* ================= SAVE ================= */

  // const handleSaveProfile = () => {
  //   if (
  //     !form.name ||
  //     !form.tagline ||
  //     !form.foundingYear ||
  //     !form.sector.length ||
  //     !form.industry.length ||
  //     !form.location.country ||
  //     !form.founders[0].name ||
  //     !form.founders[0].role ||
  //     !form.summary ||
  //     !form.problemStatement ||
  //     !form.solution ||
  //     !form.businessModel ||
  //     !form.productStage
  //   ) {
  //     alert("Please fill all required startup profile fields");
  //     return;
  //   }

  //   const profiles = JSON.parse(localStorage.getItem("startupProfiles")) || [];

  //   const payload = {
  //     userId,
  //     ...form,
  //   };

  //   const updated = profiles.some((p) => p.userId === userId)
  //     ? profiles.map((p) => (p.userId === userId ? payload : p))
  //     : [...profiles, payload];

  //   localStorage.setItem("startupProfiles", JSON.stringify(updated));
  //   onSaved?.();
  // };

  /* ===== SAVE-BACKEND ================= */

  const handleSaveProfile = async () => {
    if (
      !form.name ||
      !form.tagline ||
      !form.foundingYear ||
      !form.sector.length ||
      !form.industry.length ||
      !form.location.country ||
      !form.founders[0].name ||
      !form.founders[0].role ||
      !form.summary ||
      !form.problemStatement ||
      !form.solution ||
      !form.businessModel ||
      !form.productStage
    ) {
      showToast({
        message: "Please fill all required startup profile fields",
        type: "warning",
      });
      return;
    }

    try {
      await api.post("/startup-profiles", form);

      showToast({
        message: "Startup profile saved successfully",
        type: "success",
      });

      onSaved?.();
    } catch (err) {
      showToast({
        message:
          err.response?.data?.message || "Failed to save startup profile",
        type: "danger",
      });
    }
  };

  /* ================= UI ================= */

  return (
    <div className="bg-white border rounded-xl px-4 py-6 sm:px-6 sm:py-8 max-w-4xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
        Startup Profile Details
      </h2>

      <Section title="Basic Information">
        <Input
          label="Startup Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Tagline"
          name="tagline"
          value={form.tagline}
          onChange={handleChange}
          required
        />
        <Input
          label="Logo URL"
          name="logo"
          value={form.logo}
          onChange={handleChange}
        />
        <Input
          label="Founding Year"
          name="foundingYear"
          value={form.foundingYear}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Sector (comma separated)"
          value={form.sector.join(", ")}
          onChange={(e) => handleArrayChange("sector", e.target.value)}
          required
        />
        <Textarea
          label="Industry (comma separated)"
          value={form.industry.join(", ")}
          onChange={(e) => handleArrayChange("industry", e.target.value)}
          required
        />
        <Input
          label="City"
          value={form.location.city}
          onChange={(e) =>
            handleNestedChange("location", "city", e.target.value)
          }
          required
        />
        <Input
          label="Country"
          value={form.location.country}
          onChange={(e) =>
            handleNestedChange("location", "country", e.target.value)
          }
          required
        />
        <Input
          label="Region"
          value={form.location.region}
          onChange={(e) =>
            handleNestedChange("location", "region", e.target.value)
          }
          required
        />
      </Section>

      <Section title="Founder & Team">
        <Input
          label="Founder Name"
          value={form.founders[0].name}
          onChange={(e) => handleFounderChange("name", e.target.value)}
          required
        />
        <Input
          label="Role"
          value={form.founders[0].role}
          onChange={(e) => handleFounderChange("role", e.target.value)}
          required
        />
        <Input
          label="Background"
          value={form.founders[0].background}
          onChange={(e) => handleFounderChange("background", e.target.value)}
        />
        <Input
          label="Team Size"
          name="teamSize"
          value={form.teamSize}
          onChange={handleChange}
        />
      </Section>

      <Section title="Startup Overview">
        <Textarea
          label="Summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Problem Statement"
          name="problemStatement"
          value={form.problemStatement}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Solution"
          name="solution"
          value={form.solution}
          onChange={handleChange}
          required
        />
        <Input
          label="Business Model"
          name="businessModel"
          value={form.businessModel}
          onChange={handleChange}
          required
        />
        <Input
          label="Product Stage"
          name="productStage"
          value={form.productStage}
          onChange={handleChange}
          required
        />
      </Section>

      <Section title="Traction">
        <Input
          label="Revenue"
          value={form.traction.revenue}
          onChange={(e) =>
            handleNestedChange("traction", "revenue", e.target.value)
          }
          required
        />
        <Input
          label="Users / Clients"
          value={form.traction.users}
          onChange={(e) =>
            handleNestedChange("traction", "users", e.target.value)
          }
        />
        <Input
          label="Growth"
          value={form.traction.growth}
          onChange={(e) =>
            handleNestedChange("traction", "growth", e.target.value)
          }
        />
      </Section>

      <Section title="Funding">
        <Input
          label="Raised Till Now"
          value={form.funding.raisedTillNow}
          onChange={(e) =>
            handleNestedChange("funding", "raisedTillNow", e.target.value)
          }
        />
        <Input
          label="Current Round"
          value={form.funding.currentRound}
          onChange={(e) =>
            handleNestedChange("funding", "currentRound", e.target.value)
          }
        />
        <Input
          label="Funding Ask Min"
          value={form.funding.ask.min}
          onChange={(e) =>
            handleNestedChange("funding", "ask", {
              ...form.funding.ask,
              min: e.target.value,
            })
          }
        />
        <Input
          label="Funding Ask Max"
          value={form.funding.ask.max}
          onChange={(e) =>
            handleNestedChange("funding", "ask", {
              ...form.funding.ask,
              max: e.target.value,
            })
          }
        />
        <Textarea
          label="Use of Funds"
          value={form.funding.ask.useOfFunds}
          onChange={(e) =>
            handleNestedChange("funding", "ask", {
              ...form.funding.ask,
              useOfFunds: e.target.value,
            })
          }
        />
      </Section>
      <button
        onClick={handleSaveProfile}
        className="mt-6 sm:mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Save Startup Profile
      </button>
    </div>
  );
};

export default StartupProfileForm;

/* ================= UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div className="mb-8 sm:mb-10 space-y-4">
    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

const Input = ({ label, required = false, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm sm:text-base"
    />
  </div>
);

const Textarea = ({ label, required = false, ...props }) => (
  <div>
    <label className="text-xs sm:text-sm text-gray-600">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <textarea
      {...props}
      rows={3}
      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm sm:text-base"
    />
  </div>
);
