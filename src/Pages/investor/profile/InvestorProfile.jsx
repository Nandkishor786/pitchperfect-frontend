import { X, BadgeCheck } from "lucide-react";
// import { investorProfiles } from "../../data/investorProfiles";
import DownloadProfile from "../../../Components/DownloadProfile";
import { formatLabel } from "../../../utils/formatLabel";

/* ================= HELPERS ================= */

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-sm text-center font-normal text-gray-600 uppercase tracking-wide border-b border-gray-400 pb-1">
      {title}
    </h2>

    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({ label, value, link }) => {
  const formattedValue = Array.isArray(value)
    ? value.map(formatLabel).join(", ")
    : formatLabel(value);

  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-gray-800">{label}</p>

      {link ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-base text-teal-700 underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-base text-gray-700 leading-relaxed font-medium">
          {formattedValue}
        </p>
      )}
    </div>
  );
};

const ChipGroup = ({ title, chips = [] }) => {
  if (!chips.length) return null;

  return (
    <div>
      <p className="text-sm  tracking-wide text-gray-800 mb-2 font-semibold">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const InvestorProfile = ({ profileData = {}, onClose, embedded = false }) => {
  // PROFILE ONLY — single source of truth
  const data = profileData;

  // ================= HANDLERS =================

  // 1️ Visit Website
  const handleVisitWebsite = () => {
    alert("🚧 Visit Website: feature coming soon");
    // future:
    // window.open(data.website, "_blank", "noopener,noreferrer");
    // logActivity(...)
  };

  // 2️ Share Profile
  const handleShareProfile = () => {
    alert("🚧 Share Profile: feature coming soon");
    // future:
    // copy link
    // navigator.share(...)
  };

  // 3️ Request to Connect
  const handleRequestConnect = () => {
    alert("🚧 Request to Connect: modal coming soon");
    // future:
    // open modal
    // submit request
  };

  //main content layout
  const content = (
    <div className="flex-1 overflow-y-auto">
      {/* ======== HEADER ================= */}
      <div
        className="relative border-b px-12 py-12 
                bg-gradient-to-b from-indigo-50/60 to-white"
      >
        {/* TOP ROW */}
        <div className="flex items-start justify-between gap-10">
          {/* LEFT */}
          <div className="flex gap-6">
            <div
              className="w-20 h-20 rounded-2xl
                   bg-gradient-to-br from-indigo-600 to-purple-600
                   flex items-center justify-center
                   text-white font-bold text-3xl shadow-lg"
            >
              {data.name?.charAt(0).toUpperCase()}
            </div>

            <div className="pt-1">
              <h1 className="text-4xl font-semibold text-gray-900 flex items-center gap-3">
                {data.name}
                {data.verified && (
                  <BadgeCheck className="w-6 h-6 text-blue-600" />
                )}
              </h1>

              <p className="text-base text-gray-600 mt-2">{data.firm}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span
                  className="bg-indigo-100 text-indigo-700
                           text-sm px-4 py-1.5 rounded-full font-medium"
                >
                  {data.organizationType}
                </span>

                <span
                  className="bg-gray-100 text-gray-700
                           text-sm px-4 py-1.5 rounded-full"
                >
                  {data.investorType?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          {/* CLOSE BUTTON – TOP RIGHT */}
          {!embedded && (
            <button onClick={onClose} className="absolute top-2 right-2 ...">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* REQUEST CTA */}
          <div className="mt-10 flex justify-end">
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

        {/* DOWNLOAD CARD */}
        {data.impactReport && (
          <div
            className="mt-10 bg-white border border-indigo-100
                 rounded-2xl px-8 py-5
                 flex items-center justify-between
                 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl
                        bg-indigo-100 flex items-center justify-center text-xl"
              >
                📄
              </div>
              <div>
                <p className="text-base font-medium text-gray-900">
                  Download Full Investor Profile
                </p>
                <p className="text-sm text-gray-500">
                  Investor_Profile_{data.name}.pdf
                </p>
              </div>
            </div>

            <DownloadProfile
              fileUrl={data.impactReport}
              fileName={`Investor_Profile_${data.name}.pdf`}
            />
          </div>
        )}
      </div>

      {/* ================= BODY ================= */}
      <div className="flex-1 px-10 py-12 space-y-4">
        <Section title="Investor Overview">
          <Field label="Investor Type" value={data.investorType} />
          <Field
            label="Verification Status"
            value={data.verified ? "Verified" : "Unverified"}
          />
          {embedded && (
            <Field label="Profile Visibility" value={data.visibility} />
          )}
        </Section>

        <Section title="Investment Focus">
          <Field label="Investment Type" value={data.investmentType} />
          <Field label="Stages" value={data.stages || []} />

          <Field label="Ticket Size" value={data.ticketSize} />
          <Field label="Sectors" value={data.sectors || []} />
          <Field label="Industries (Card)" value={data.industries || []} />
        </Section>

        <Section title="Geography">
          <Field label="Region" value={data.location.region} />
          <Field label="City" value={data.location.city} />
          <Field label="Country" value={data.location?.country} />
        </Section>

        <Section title="Fund Details">
          <Field label="Return Goals" value={data.returnGoals} />
          <Field
            label="Alignment with Frame's Values & Principles"
            value={data.alignmentWithValues}
          />
          <Field label="Total Assets Under Management" value={data.totalAUM} />
        </Section>

        <Section title="Approach to Impact">
          <Field
            label="Percent of AUM Assessed"
            value={data.approachToImpact?.percentAUMAssessed}
          />
          <Field
            label="Who leads impact assessment?"
            value={data.approachToImpact.impactLead}
          />
          <ChipGroup
            title="Impact Classifications: Sustainable Development Goals"
            chips={data.approachToImpact.sdgs || []}
          />
          <Field
            label="Attributing Impact Share"
            value={data.approachToImpact.attributingImpactShare}
          />
        </Section>

        <Section title="Impact Methodologies">
          <Field
            label="Pre-Investment Screen"
            value={data.impactMethodologies?.preInvestmentScreen}
          />
          <ChipGroup
            title="GHG Methods"
            chips={data.impactMethodologies?.ghgMethods || []}
          />
          <ChipGroup
            title="Other Methods"
            chips={data.impactMethodologies?.otherMethods || []}
          />
          <ChipGroup
            title="Publicly Reported"
            chips={data.impactMethodologies.publiclyReported || []}
          />
          <Field
            label="Projection Timeframe"
            value={data.impactMethodologies.projectionTimeframe}
          />
          {data.impactReport && (
            <Field label="Impact Report" value={data.impactReport} link />
          )}
        </Section>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t px-10 py-6 flex justify-end gap-4 bg-gray-50">
        {data.website && (
          <button
            onClick={handleVisitWebsite}
            className="px-6 py-2.5 rounded-full
                 border border-teal-500
                 text-teal-700
                 hover:bg-teal-50
                 font-medium"
          >
            Visit Website
          </button>
        )}

        <button
          onClick={handleShareProfile}
          className="px-6 py-2.5 rounded-full
               bg-teal-600 text-white
               hover:bg-teal-700
               font-medium shadow-sm"
        >
          Share Profile
        </button>
      </div>
    </div>
  );
  // INVESTOR SIDE → NORMAL PAGE
  if (embedded) {
    return <div className="bg-white rounded-2xl shadow-sm">{content}</div>;
  }

  // FOUNDER SIDE → POPUP (NO CHANGE)
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col"
      >
        {content}
      </div>
    </div>
  );
};

export default InvestorProfile;
