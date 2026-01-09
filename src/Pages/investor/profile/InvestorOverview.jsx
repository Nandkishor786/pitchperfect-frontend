import { NavLink } from "react-router-dom";
import { User2, CreditCard } from "lucide-react";

const InvestorProfileHome = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Generate Your Investor Public Card
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-xl">
          Create your investor profile and generate a public investor card so
          founders can discover you and reach out with relevant opportunities.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investor Profile */}
        <div className="bg-white border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <User2 className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Investor Profile</h3>
            <p className="text-sm text-gray-500 mt-1">
              Share your investment thesis, preferred stages, ticket size,
              sectors, and regions. This helps founders quickly understand
              whether they are a good fit before contacting you.
            </p>

            <ul className="text-sm text-gray-500 mt-3 list-disc list-inside space-y-1">
              <li>Investment focus & thesis</li>
              <li>Stages and ticket size</li>
              <li>Sectors and geography</li>
            </ul>
          </div>

          <NavLink
            to="profile"
            className="inline-block mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm text-center"
          >
            Create Investor Profile
          </NavLink>
        </div>

        {/* Investor Public Card */}
        <div className="bg-white border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <CreditCard className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Public Investor Card</h3>
            <p className="text-sm text-gray-500 mt-1">
              Generate a concise public card that founders will see in
              discovery. Your card highlights who you invest in and what you
              look for.
            </p>

            <ul className="text-sm text-gray-500 mt-3 list-disc list-inside space-y-1">
              <li>Public-facing investor summary</li>
              <li>Visible to founders</li>
              <li>Editable anytime</li>
            </ul>
          </div>

          <NavLink
            to="investor-card"
            className="inline-block mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm text-center"
          >
            Generate Public Card
          </NavLink>
        </div>
      </div>

      {/* Helper Note */}
      <p className="text-sm text-gray-400">
        💡 Tip: Completing your investor profile first helps you create a
        stronger, more relevant public card for founders.
      </p>
    </div>
  );
};

export default InvestorProfileHome;
