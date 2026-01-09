import { NavLink } from "react-router-dom";
import { Building2, CreditCard } from "lucide-react";

const StartupOverview = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Generate Your Startup Public Card
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-xl">
          Create your startup profile and generate a public startup card so
          investors can discover your company and evaluate fit before reaching
          out.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Startup Profile */}
        <div className="bg-white border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <Building2 className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Startup Profile</h3>
            <p className="text-sm text-gray-500 mt-1">
              Share detailed information about your startup including vision,
              traction, team, market, and impact. This helps investors deeply
              understand your business.
            </p>

            <ul className="text-sm text-gray-500 mt-3 list-disc list-inside space-y-1">
              <li>Startup overview & vision</li>
              <li>Market, traction & growth</li>
              <li>Team and impact details</li>
            </ul>
          </div>

          <NavLink
            to="profile"
            className="inline-block mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm text-center"
          >
            Create Startup Profile
          </NavLink>
        </div>

        {/* Startup Public Card */}
        <div className="bg-white border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <CreditCard className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Public Startup Card</h3>
            <p className="text-sm text-gray-500 mt-1">
              Generate a concise public card that investors will see in
              discovery. Your card highlights key metrics and funding needs.
            </p>

            <ul className="text-sm text-gray-500 mt-3 list-disc list-inside space-y-1">
              <li>Investor-facing startup summary</li>
              <li>Visible to investors</li>
              <li>Editable anytime</li>
            </ul>
          </div>

          <NavLink
            to="startup-card"
            className="inline-block mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm text-center"
          >
            Generate Public Card
          </NavLink>
        </div>
      </div>

      {/* Helper Note */}
      <p className="text-sm text-gray-400">
        💡 Tip: Completing your startup profile first helps you create a
        stronger, more compelling public card for investors.
      </p>
    </div>
  );
};

export default StartupOverview;
