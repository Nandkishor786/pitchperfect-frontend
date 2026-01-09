const DiscoverFilters = ({ role, filters, setFilters }) => {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <h3 className="font-semibold text-lg">Filters</h3>

      {/* ================= Industry ================= */}
      <div>
        <label className="text-sm font-medium">Industry</label>
        <select
          value={filters.industry}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              industry: e.target.value,
            }))
          }
          className="w-full mt-1 border rounded-lg p-2 text-sm"
        >
          <option value="">All Industries</option>
          <option value="saas">SaaS</option>
          <option value="ai">AI</option>
          <option value="fintech">FinTech</option>
          <option value="healthtech">HealthTech</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      {/* ================= Stage ================= */}
      <div>
        <p className="text-sm font-medium mb-2">
          {role === "founder" ? "Investor Stage Preference" : "Startup Stage"}
        </p>

        {[
          { label: "Pre-Seed", value: "pre-seed" },
          { label: "Seed", value: "seed" },
          { label: "Series A", value: "series-a" },
          { label: "Series B+", value: "series-b" },
        ].map(({ label, value }) => (
          <label key={value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.stages.includes(value)}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  stages: prev.stages.includes(value)
                    ? prev.stages.filter((s) => s !== value)
                    : [...prev.stages, value],
                }))
              }
              className="accent-indigo-600"
            />
            {label}
          </label>
        ))}
      </div>

      {/* ================= Ticket / Funding ================= */}
      <div>
        <label className="text-sm font-medium">
          {role === "founder" ? "Ticket Size" : "Funding Ask"}
        </label>
        <select
          value={filters.ticket}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              ticket: e.target.value,
            }))
          }
          className="w-full mt-1 border rounded-lg p-2 text-sm"
        >
          <option value="">All</option>
          <option value="$50K – $250K">$50K – $250K</option>
          <option value="$250K – $1M">$250K – $1M</option>
          <option value="$1M – $5M">$1M – $5M</option>
          <option value="$5M+">$5M+</option>
        </select>
      </div>

      {/* ================= Investor-only ================= */}
      {role === "founder" && (
        <div>
          <label className="text-sm font-medium">Investor Type</label>
          <select
            value={filters.investorType}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                investorType: e.target.value,
              }))
            }
            className="w-full mt-1 border rounded-lg p-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="angel">Angel</option>
            <option value="vc">VC</option>
            <option value="micro-vc">Micro-VC</option>
            <option value="corporate-vc">Corporate VC</option>
          </select>
        </div>
      )}

      {/* ================= Startup-only ================= */}
      {role === "investor" && (
        <div>
          <label className="text-sm font-medium">Team Size</label>
          <select
            value={filters.teamSize}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                teamSize: e.target.value,
              }))
            }
            className="w-full mt-1 border rounded-lg p-2 text-sm"
          >
            <option value="">Any</option>
            <option value="1-5">1–5</option>
            <option value="6-15">6–15</option>
            <option value="16-50">16–50</option>
            <option value="50+">50+</option>
          </select>
        </div>
      )}

      {/* ================= Location ================= */}
      <div>
        <label className="text-sm font-medium">Location</label>
        <select
          value={filters.country}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              country: e.target.value,
            }))
          }
          className="w-full mt-1 border rounded-lg p-2 text-sm"
        >
          <option value="">Anywhere</option>
          <option value="usa">USA</option>
          <option value="india">India</option>
          <option value="uk">UK</option>
        </select>
      </div>

      {/* ================= Verified ================= */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={filters.verified}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              verified: e.target.checked,
            }))
          }
          className="accent-indigo-600"
        />
        Verified only
      </label>

      {/* Actions */}
     {/* ================= apply all ================= */}
      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
        Apply Filters
      </button>
      {/* ================= Clear ================= */}
      <button
        onClick={() =>
          setFilters({
            industry: "",
            stages: [],
            ticket: "",
            investorType: "",
            country: "",
            verified: false,
            teamSize: "",
          })
        }
        className="w-full text-sm text-gray-500 hover:underline"
      >
        Clear All
      </button>
    </div>
  );
};

export default DiscoverFilters;
