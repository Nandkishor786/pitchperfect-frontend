import { X, BadgeCheck, Building2 } from "lucide-react";

/* ================= HELPERS ================= */

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-sm text-center font-normal text-gray-600 uppercase tracking-wide border-b border-gray-300 pb-1">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm font-semibold text-gray-800">{label}</p>
    <p className="text-base text-gray-700 leading-relaxed">
      {value || "Not disclosed"}
    </p>
  </div>
);

const ChipGroup = ({ title, chips = [] }) => {
  if (!chips.length) return null;

  return (
    <div>
      <p className="text-sm font-semibold text-gray-800 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 border"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN ================= */

const StartupProfile = ({ profileData = {}, onClose, embedded = false }) => {
  const data = profileData;

  // ================= HANDLERS =================

  // 1️ Request to Connect
  const handleRequestConnect = () => {
    alert("Request to Connect (Startup): feature coming soon");
    // future:
    // open modal
    // send request with doc
  };

  // 2️ Visit Website
  const handleVisitWebsite = () => {
    alert(" Visit Website (Startup): feature coming soon");
    // future:
    // window.open(data.website, "_blank", "noopener,noreferrer");
  };

  // 3️ Share Profile
  const handleShareProfile = () => {
    alert(" Share Startup Profile: feature coming soon");
    // future:
    // copy link / share api
  };

  //main content layout
  const content = (
    <div className="flex-1 overflow-y-auto">
      {/* ================= HEADER ================= */}
      <div className="relative border-b px-12 py-12 bg-gradient-to-b from-indigo-50/60 to-white">
        {/* CLOSE */}
        {!embedded && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="flex items-start justify-between gap-10">
          {/* LEFT */}
          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {data.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-semibold text-gray-900">
                {data.name}
              </h1>
              <p className="text-base text-gray-600 mt-2">{data.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="bg-indigo-100 text-indigo-700 text-sm px-4 py-1.5 rounded-full">
                  {data.productStage}
                </span>
                <span className="bg-gray-100 text-gray-700 text-sm px-4 py-1.5 rounded-full">
                  Founded {data.foundingYear}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT – REQUEST CTA */}
          <div className="mt-6">
            <button
              onClick={handleRequestConnect}
              className="px-10 py-3 rounded-full
                   text-sm font-semibold
                   bg-teal-600 text-white
                   hover:bg-teal-700
                   shadow-lg transition"
            >
              Request to Connect
            </button>
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="px-10 py-12 space-y-8">
        <Section title="Startup Overview">
          <Field label="Summary" value={data.summary} />
        </Section>

        <Section title="Business Details">
          <Field label="Problem Statement" value={data.problemStatement} />
          <Field label="Solution" value={data.solution} />
          <Field label="Business Model" value={data.businessModel} />
        </Section>

        <Section title="Market & Focus">
          <ChipGroup title="Sectors" chips={data.sector || []} />
          <ChipGroup title="Industries" chips={data.industry || []} />
        </Section>

        <Section title="Location">
          <Field
            label="City / Region"
            value={`${data.location?.city}, ${data.location?.region}`}
          />
          <Field label="Country" value={data.location?.country} />
        </Section>

        <Section title="Founders">
          {data.founders?.map((f, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-gray-50 space-y-1"
            >
              <p className="font-medium text-gray-900">{f.name}</p>
              <p className="text-sm text-gray-600">{f.role}</p>
              <p className="text-sm text-gray-500">{f.background}</p>
            </div>
          ))}
        </Section>

        <Section title="Traction">
          <Field label="Revenue" value={data.traction?.revenue} />
          <Field label="Users / Clients" value={data.traction?.users} />
          <Field label="Growth" value={data.traction?.growth} />
        </Section>

        <Section title="Funding">
          <Field label="Raised Till Now" value={data.funding?.raisedTillNow} />
          <Field label="Current Round" value={data.funding?.currentRound} />
          <Field
            label="Funding Ask"
            value={`${data.funding?.ask?.min} – ${data.funding?.ask?.max}`}
          />
          <Field label="Use of Funds" value={data.funding?.ask?.useOfFunds} />
        </Section>
        <div className="border-t px-10 py-6 bg-gray-50">
          <div className="flex justify-end items-center gap-4">
            {data.website && (
              <button
                onClick={handleVisitWebsite}
                className="px-6 py-2.5 rounded-full
                   border border-teal-500
                   text-teal-700
                   hover:bg-teal-50
                   font-medium transition"
              >
                Visit Website
              </button>
            )}

            <button
              onClick={handleShareProfile}
              className="px-6 py-2.5 rounded-full
                 bg-teal-600 text-white
                 hover:bg-teal-700
                 font-medium shadow-sm transition"
            >
              Share Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ================= WRAPPERS - for founder side================= */
  if (embedded) {
    return <div className="bg-white rounded-2xl">{content}</div>;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl flex flex-col"
      >
        {content}
      </div>
    </div>
  );
};

export default StartupProfile;
