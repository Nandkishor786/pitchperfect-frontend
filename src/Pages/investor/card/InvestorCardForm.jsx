import { useEffect, useState } from "react";
import api from "../../../services/api";
import { showToast } from "../../../utils/showToast";

const testData = [
  {
    "name": "Amit Verma",
    "firm": "Peak Capital",
    "investorType": "angel",
    "industries": "ai, saas, fintech",
    "stages": "pre-seed, seed",
    "ticketMin": "50000",
    "ticketMax": "250000",
    "city": "Bangalore",
    "country": "india",
    "region": "asia"
  },
  {
    "name": "Rohit Mehta",
    "firm": "Alpha Ventures",
    "investorType": "vc",
    "industries": "healthtech, biotech",
    "stages": "seed, series-a",
    "ticketMin": "250000",
    "ticketMax": "1000000",
    "city": "Mumbai",
    "country": "india",
    "region": "asia"
  },
  {
    "name": "Neha Kapoor",
    "firm": "GrowthX",
    "investorType": "angel",
    "industries": "edtech, saas",
    "stages": "pre-seed",
    "ticketMin": "25000",
    "ticketMax": "100000",
    "city": "Delhi",
    "country": "india",
    "region": "asia"
  },
  {
    "name": "Sahil Jain",
    "firm": "Future Fund",
    "investorType": "vc",
    "industries": "climate, energy",
    "stages": "seed",
    "ticketMin": "100000",
    "ticketMax": "500000",
    "city": "Pune",
    "country": "india",
    "region": "asia"
  },
  {
    "name": "Pooja Sharma",
    "firm": "Women Capital",
    "investorType": "angel",
    "industries": "healthtech, femtech",
    "stages": "pre-seed, seed",
    "ticketMin": "50000",
    "ticketMax": "200000",
    "city": "Jaipur",
    "country": "india",
    "region": "asia"
  }
]

 

const emptyForm = {
  name: "",
  firm: "",
  investorType: "",
  industries: "",
  stages: "",
  ticketMin: "",
  ticketMax: "",
  city: "",
  country: "",
  region: "",
};
const InvestorCardForm = ({ onSaved, existingData }) => {
  const [form, setForm] = useState(testData[0]);

  /* ====== PREFILL (EDIT MODE) ========== */
  useEffect(() => {
    if (!existingData) return;

    setForm({
      name: existingData.name || "",
      firm: existingData.firm || "",
      investorType: existingData.investorType || "",
      industries: existingData.industries?.join(", ") || "",
      stages: existingData.stages?.join(", ") || "",
      ticketMin: existingData.ticketSize?.min || "",
      ticketMax: existingData.ticketSize?.max || "",
      city: existingData.location?.city || "",
      country: existingData.location?.country || "",
      region: existingData.location?.region || "",
    });
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SAVE CARD ================= */
  // const handleGenerateInvestorCard = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) return;

  //   /* ---------- REQUIRED FIELD CHECK ---------- */
  //   if (
  //     !form.name.trim() ||
  //     !form.industries.trim() ||
  //     !form.stages.trim() ||
  //     !form.country.trim()
  //   ) {
  //     alert("Please fill all required card fields");
  //     return;
  //   }

  //   const investors = JSON.parse(localStorage.getItem("investors")) || [];

  //   const investorId = existingData?.id || `investor_${Date.now()}`;

  //   const ticketMin = Number(form.ticketMin) || 0;
  //   const ticketMax = Number(form.ticketMax) || 0;

  //   const ticketLabel =
  //     ticketMax >= 5_000_000
  //       ? "$5M+"
  //       : ticketMax >= 1_000_000
  //       ? "$1M – $5M"
  //       : ticketMax >= 250_000
  //       ? "$250K – $1M"
  //       : "$50K – $250K";

  //   const newInvestor = {
  //     id: investorId,
  //     ownerEmail: user.email,
  //     name: form.name.trim(),
  //     firm: form.firm.trim(),
  //     investorType: form.investorType || "angel",
  //     industries: form.industries
  //       .split(",")
  //       .map((i) => i.trim().toLowerCase())
  //       .filter(Boolean),
  //     stages: form.stages
  //       .split(",")
  //       .map((s) => s.trim().toLowerCase())
  //       .filter(Boolean),
  //     ticketSize: {
  //       min: ticketMin,
  //       max: ticketMax,
  //       label: ticketLabel,
  //     },
  //     location: {
  //       city: form.city.trim(),
  //       country: form.country.toLowerCase(),
  //       region: form.region.toLowerCase(),
  //     },
  //     verified: false,
  //     visibility: "draft",
  //     profileUserId: null,
  //     profileLinked: false,
  //   }; //initially investorSide card draft rahega

  //   const updatedInvestors = investors.some((i) => i.id === investorId)
  //     ? investors.map((i) => (i.id === investorId ? newInvestor : i))
  //     : [...investors, newInvestor];

  //   localStorage.setItem("investors", JSON.stringify(updatedInvestors));

  //   onSaved?.();
  // };

  /* ================= BACKEND ================= */
  const handleGenerateInvestorCard = async () => {
    /* ---------- REQUIRED FIELD CHECK ---------- */
    if (
      !form.name.trim() ||
      !form.industries.trim() ||
      !form.stages.trim() ||
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
        firm: form.firm.trim(),

        investorType: form.investorType || "angel",

        industries: form.industries
          .split(",")
          .map((i) => i.trim().toLowerCase())
          .filter(Boolean),

        stages: form.stages
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean),

        ticketMin: Number(form.ticketMin || 0),
        ticketMax: Number(form.ticketMax || 0),

        location: {
          city: form.city.trim(),
          country: form.country.trim().toLowerCase(),
          region: form.region.trim().toLowerCase(),
        },
      };

      await api.post("/investor-cards", payload);

      showToast({
        message: "Investor card saved successfully",
        type: "success",
      });

      onSaved?.(); // dashboard / list refresh
    } catch (err) {
      showToast({
        message: err.response?.data?.message || "Failed to save investor card",
        type: "danger",
      });
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white border rounded-xl p-6 max-w-4xl">
      <h2 className="text-lg font-semibold mb-6">Investor Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          placeholder="Investor Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="firm"
          value={form.firm}
          placeholder="Firm Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="investorType"
          value={form.investorType}
          placeholder="Investor Type (angel / vc / micro-vc)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="industries"
          value={form.industries}
          placeholder="Industries (saas, ai, fintech)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="stages"
          value={form.stages}
          placeholder="Stages (pre-seed, seed, series-a)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="ticketMin"
          value={form.ticketMin}
          placeholder="Ticket Size Min"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="ticketMax"
          value={form.ticketMax}
          placeholder="Ticket Size Max"
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
          className="border p-2 rounded col-span-2"
        />
      </div>

      <button
        onClick={handleGenerateInvestorCard}
        className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition"
      >
        Generate Investor Card
      </button>
    </div>
  );
};

export default InvestorCardForm;
