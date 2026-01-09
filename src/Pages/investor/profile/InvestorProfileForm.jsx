import { useEffect, useState } from "react";
import api from "../../../services/api";

/* ================= INITIAL STATE ================= */

const testFormData = [
  {
    name: "Rohit Mehta",
    firm: "Alpha Ventures",
    investorType: "vc",
    industries: ["healthtech", "biotech"],
    stages: ["seed", "series-a"],
    ticketSize: "$250K – $1M",
    location: {
      city: "Mumbai",
      country: "india",
      region: "asia",
    },
    organizationType: "Venture Capital Fund",
    investmentType: "Equity",
    totalAUM: "$120M",
    returnGoals: "Backing scalable healthcare startups in India",
    alignmentWithValues: "Strong focus on ethical healthcare innovation",
    sectors: ["HealthTech", "BioTech"],
    approachToImpact: {
      percentAUMAssessed: "80%",
      impactLead: "External ESG Partner",
      sdgs: ["SDG 3"],
      attributingImpactShare: "Portfolio weighted",
    },
    impactMethodologies: {
      preInvestmentScreen: "Medical + ESG due diligence",
      ghgMethods: [],
      otherMethods: [],
      publiclyReported: [],
      projectionTimeframe: "7 years",
    },
    website: "https://alphaventures.com",
    impactReport: "",
  },
  {
    name: "Neha Kapoor",
    firm: "GrowthX",
    investorType: "angel",
    industries: ["edtech", "saas"],
    stages: ["pre-seed"],
    ticketSize: "$25K – $100K",
    location: {
      city: "Delhi",
      country: "india",
      region: "asia",
    },
    organizationType: "Angel Investor",
    investmentType: "Equity",
    totalAUM: "$2M",
    returnGoals: "Supporting early EdTech founders",
    alignmentWithValues: "Founder empathy & long-term vision",
    sectors: ["EdTech", "SaaS"],
    approachToImpact: {
      percentAUMAssessed: "100%",
      impactLead: "Self",
      sdgs: ["SDG 4"],
      attributingImpactShare: "Deal based",
    },
    impactMethodologies: {
      preInvestmentScreen: "Founder background checks",
      ghgMethods: [],
      otherMethods: [],
      publiclyReported: [],
      projectionTimeframe: "5 years",
    },
    website: "",
    impactReport: "",
  },
  {
    name: "Sahil Jain",
    firm: "Future Fund",
    investorType: "vc",
    industries: ["climate", "energy"],
    stages: ["seed"],
    ticketSize: "$100K – $500K",
    location: {
      city: "Pune",
      country: "india",
      region: "asia",
    },
    organizationType: "Climate VC",
    investmentType: "Equity",
    totalAUM: "$60M",
    returnGoals: "Accelerating climate-positive technologies",
    alignmentWithValues: "Sustainability-first investing",
    sectors: ["ClimateTech", "Energy"],
    approachToImpact: {
      percentAUMAssessed: "100%",
      impactLead: "In-house team",
      sdgs: ["SDG 7", "SDG 13"],
      attributingImpactShare: "Emission-based",
    },
    impactMethodologies: {
      preInvestmentScreen: "Climate impact score",
      ghgMethods: ["Scope 1 & 2"],
      otherMethods: [],
      publiclyReported: ["Annual climate report"],
      projectionTimeframe: "10 years",
    },
    website: "https://futurefund.vc",
    impactReport: "",
  },
  {
    name: "Pooja Sharma",
    firm: "Women Capital",
    investorType: "angel",
    industries: ["healthtech", "femtech"],
    stages: ["pre-seed", "seed"],
    ticketSize: "$50K – $200K",
    location: {
      city: "Jaipur",
      country: "india",
      region: "asia",
    },
    organizationType: "Angel Network",
    investmentType: "Equity",
    totalAUM: "$8M",
    returnGoals: "Backing women-led startups",
    alignmentWithValues: "Gender inclusion & equity",
    sectors: ["FemTech", "HealthTech"],
    approachToImpact: {
      percentAUMAssessed: "90%",
      impactLead: "Network committee",
      sdgs: ["SDG 5"],
      attributingImpactShare: "Founder impact reports",
    },
    impactMethodologies: {
      preInvestmentScreen: "Founder diversity review",
      ghgMethods: [],
      otherMethods: [],
      publiclyReported: [],
      projectionTimeframe: "6 years",
    },
    website: "",
    impactReport: "",
  },
  {
    name: "Arjun Malhotra",
    firm: "NextGen Angels",
    investorType: "angel",
    industries: ["fintech", "saas"],
    stages: ["pre-seed"],
    ticketSize: "$30K – $150K",
    location: {
      city: "Gurgaon",
      country: "india",
      region: "asia",
    },
    organizationType: "Angel Investor",
    investmentType: "Equity",
    totalAUM: "$3M",
    returnGoals: "Early fintech experimentation",
    alignmentWithValues: "Speed & execution",
    sectors: ["FinTech", "SaaS"],
    approachToImpact: {
      percentAUMAssessed: "70%",
      impactLead: "Self",
      sdgs: ["SDG 8"],
      attributingImpactShare: "Revenue based",
    },
    impactMethodologies: {
      preInvestmentScreen: "Market validation",
      ghgMethods: [],
      otherMethods: [],
      publiclyReported: [],
      projectionTimeframe: "4 years",
    },
    website: "",
    impactReport: "",
  },
];

const emptyForm = {
  /* ===== BASIC PROFILE ===== */
  name: "",
  firm: "",
  investorType: "vc",

  industries: [],
  stages: [],
  ticketSize: "",

  location: {
    city: "",
    country: "",
    region: "",
  },

  /* ===== FUND ===== */
  organizationType: "",
  investmentType: "",
  totalAUM: "",
  returnGoals: "",
  alignmentWithValues: "",
  sectors: [],

  /* ===== IMPACT ===== */
  approachToImpact: {
    percentAUMAssessed: "",
    impactLead: "",
    sdgs: [],
    attributingImpactShare: "",
  },

  /* ===== METHODS ===== */
  impactMethodologies: {
    preInvestmentScreen: "",
    ghgMethods: [],
    otherMethods: [],
    publiclyReported: [],
    projectionTimeframe: "",
  },

  /* ===== LINKS ===== */
  website: "",
  impactReport: "",
};

const InvestorProfileForm = ({ onSaved }) => {
  const [form, setForm] = useState(testFormData[0]);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?.id;

  /* ============ PREFILL (EDIT MODE) ======= */

  // useEffect(() => {
  //   const profiles = JSON.parse(localStorage.getItem("investorProfiles")) || [];

  //   if (!userId) return;

  //   const existing = profiles.find((p) => p.userId === userId);

  //   if (existing) {
  //     const { userId: _uid, ...rest } = existing;
  //     setForm({ ...emptyForm, ...rest });
  //   }
  // }, [userId]);

  /* ==== PREFILL (EDIT MODE)-backend ======= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/investor-profiles/me");
        if (res.data) {
          setForm({ ...emptyForm, ...res.data });
        }
      } catch {
        // no profile yet
      }
    };

    loadProfile();
  }, []);
  /* ================= HELPERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  const handleNestedArrayChange = (section, key, value) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [key]: value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
      },
    });
  };

  // /* ========== SAVE LOGIC ================= */
  // const handleSaveProfile = () => {
  //   if (
  //     !form.name ||
  //     !form.firm ||
  //     !form.industries.length ||
  //     !form.stages.length ||
  //     !form.location.country ||
  //     !form.organizationType ||
  //     !form.investmentType
  //   ) {
  //     alert("Please fill all required profile fields");
  //     return;
  //   }

  //   // const user = JSON.parse(localStorage.getItem("user"));
  //   const profiles = JSON.parse(localStorage.getItem("investorProfiles")) || [];

  //   const payload = {
  //     userId, //  profile belongs to logged-in user
  //     ...form,
  //   };

  //   const updatedProfiles = profiles.some((p) => p.userId === userId)
  //     ? profiles.map((p) => (p.userId === userId ? payload : p))
  //     : [...profiles, payload];

  //   localStorage.setItem("investorProfiles", JSON.stringify(updatedProfiles));

  //   onSaved?.();
  // };

  // /* ========== SAVE LOGIC -BACKEND========= */
  const handleSaveProfile = async () => {
    if (
      !form.name ||
      !form.firm ||
      !form.industries.length ||
      !form.stages.length ||
      !form.location.country ||
      !form.organizationType ||
      !form.investmentType
    ) {
      alert("Please fill all required profile fields");
      return;
    }

    try {
      await api.post("/investor-profiles", form);
      onSaved?.();
    } catch {
      alert("Failed to save investor profile");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="bg-white border rounded-xl p-8 max-w-4xl">
      <h2 className="text-xl font-semibold mb-8">Investor Profile Details</h2>
      <Section title="Basic Information">
        <Input
          label="Investor Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Firm"
          name="firm"
          value={form.firm}
          onChange={handleChange}
        />

        <Input
          label="Investor Type (angel / vc / micro-vc)"
          name="investorType"
          value={form.investorType}
          onChange={handleChange}
        />

        <Textarea
          label="Industries (comma separated)"
          value={form.industries.join(", ")}
          onChange={(e) => handleArrayChange("industries", e.target.value)}
        />

        <Textarea
          label="Stages (comma separated)"
          value={form.stages.join(", ")}
          onChange={(e) => handleArrayChange("stages", e.target.value)}
        />

        <Input
          label="Ticket Size (e.g. $1M – $5M)"
          name="ticketSize"
          value={form.ticketSize}
          onChange={handleChange}
        />

        <Input
          label="City"
          value={form.location.city}
          onChange={(e) =>
            handleNestedChange("location", "city", e.target.value)
          }
        />

        <Input
          label="Country"
          value={form.location.country}
          onChange={(e) =>
            handleNestedChange("location", "country", e.target.value)
          }
        />

        <Input
          label="Region"
          value={form.location.region}
          onChange={(e) =>
            handleNestedChange("location", "region", e.target.value)
          }
        />
      </Section>

      {/* ORGANIZATION */}
      <Section title="Organization & Fund">
        <Input
          label="Organization Type"
          name="organizationType"
          value={form.organizationType}
          onChange={handleChange}
        />
        <Input
          label="Investment Type"
          name="investmentType"
          value={form.investmentType}
          onChange={handleChange}
        />
        <Input
          label="Total AUM"
          name="totalAUM"
          value={form.totalAUM}
          onChange={handleChange}
        />
        <Textarea
          label="Return Goals"
          name="returnGoals"
          value={form.returnGoals}
          onChange={handleChange}
        />
        <Input
          label="Alignment with Values"
          name="alignmentWithValues"
          value={form.alignmentWithValues}
          onChange={handleChange}
        />
        <Textarea
          label="Sectors (comma separated)"
          value={form.sectors.join(", ")}
          onChange={(e) => handleArrayChange("sectors", e.target.value)}
        />
      </Section>

      {/* IMPACT */}
      <Section title="Approach to Impact">
        <Input
          label="Percent of AUM Assessed"
          value={form.approachToImpact.percentAUMAssessed}
          onChange={(e) =>
            handleNestedChange(
              "approachToImpact",
              "percentAUMAssessed",
              e.target.value
            )
          }
        />
        <Input
          label="Impact Lead"
          value={form.approachToImpact.impactLead}
          onChange={(e) =>
            handleNestedChange("approachToImpact", "impactLead", e.target.value)
          }
        />
        <Textarea
          label="SDGs (comma separated)"
          value={form.approachToImpact.sdgs.join(", ")}
          onChange={(e) =>
            handleNestedArrayChange("approachToImpact", "sdgs", e.target.value)
          }
        />
        <Textarea
          label="Attributing Impact Share"
          value={form.approachToImpact.attributingImpactShare}
          onChange={(e) =>
            handleNestedChange(
              "approachToImpact",
              "attributingImpactShare",
              e.target.value
            )
          }
        />
      </Section>

      {/* METHODOLOGIES */}
      <Section title="Impact Methodologies">
        <Input
          label="Pre-Investment Screen"
          value={form.impactMethodologies.preInvestmentScreen}
          onChange={(e) =>
            handleNestedChange(
              "impactMethodologies",
              "preInvestmentScreen",
              e.target.value
            )
          }
        />
        <Textarea
          label="GHG Methods"
          value={form.impactMethodologies.ghgMethods.join(", ")}
          onChange={(e) =>
            handleNestedArrayChange(
              "impactMethodologies",
              "ghgMethods",
              e.target.value
            )
          }
        />
        <Textarea
          label="Other Methods"
          value={form.impactMethodologies.otherMethods.join(", ")}
          onChange={(e) =>
            handleNestedArrayChange(
              "impactMethodologies",
              "otherMethods",
              e.target.value
            )
          }
        />
        <Textarea
          label="Publicly Reported"
          value={form.impactMethodologies.publiclyReported.join(", ")}
          onChange={(e) =>
            handleNestedArrayChange(
              "impactMethodologies",
              "publiclyReported",
              e.target.value
            )
          }
        />
        <Input
          label="Projection Timeframe"
          value={form.impactMethodologies.projectionTimeframe}
          onChange={(e) =>
            handleNestedChange(
              "impactMethodologies",
              "projectionTimeframe",
              e.target.value
            )
          }
        />
      </Section>

      {/* LINKS */}
      <Section title="Links">
        <Input
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
        />
        <Input
          label="Impact Report URL"
          name="impactReport"
          value={form.impactReport}
          onChange={handleChange}
        />
      </Section>

      {/* ACTION */}
      <button
        onClick={handleSaveProfile}
        className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Save Investor Profile
      </button>
    </div>
  );
};

export default InvestorProfileForm;

/* ================= SMALL UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div className="mb-10 space-y-4">
    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input {...props} className="w-full border rounded-lg p-2 mt-1" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full border rounded-lg p-2 mt-1"
    />
  </div>
);
