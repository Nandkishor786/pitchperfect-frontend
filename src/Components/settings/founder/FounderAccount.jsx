import { useState } from "react";
import SectionCard from "../SectionCard";
import ClickableRow from "../ClickableRow";
import EditModal from "../EditModal";
import { User, Settings, Share2, Trash2 } from "lucide-react";

const FounderAccount = () => {
  const [activeField, setActiveField] = useState(null);

  return (
    <div className="max-w-4xl space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Account Information</h1>
        <p className="text-sm text-gray-500">Profile · Account Information</p>
      </div>

      {/* PERSONAL INFORMATION */}
      <SectionCard
        title="Personal information"
        subtitle="The information provided below will reflect on your invoices"
        icon={User}
      >
        <ClickableRow
          label="Name"
          value="Nandkishor Pal"
          onClick={() => setActiveField("Name")}
        />
        <ClickableRow
          label="Address"
          value="IN"
          onClick={() => setActiveField("Address")}
        />
        <ClickableRow
          label="Phone number"
          value="+91"
          onClick={() => setActiveField("Phone number")}
        />
        <ClickableRow
          label="Company"
          value="-"
          onClick={() => setActiveField("Company")}
        />
      </SectionCard>

      {/* ACCOUNT SETTINGS */}
      <SectionCard title="Account settings" icon={Settings}>
        <ClickableRow
          label="Email"
          value="nandkishorpal0404@gmail.com"
          onClick={() => setActiveField("Email")}
        />
        <ClickableRow
          label="Add password"
          value="-"
          onClick={() => setActiveField("Password")}
        />
        <ClickableRow
          label="Manage two-factor authentication"
          value={<span className="text-red-500">Disabled</span>}
          onClick={() => setActiveField("Two-factor authentication")}
        />

        <div className="flex justify-between px-6 py-4 text-sm">
          <span className="text-gray-500">Member since</span>
          <span className="text-gray-900">2025-12-21 02:20</span>
        </div>
      </SectionCard>

      {/* SOCIAL LOGINS */}
      <SectionCard title="Social logins" icon={Share2}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-8 h-8"
              alt="google"
            />
            <span className="text-sm font-medium">Google</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-green-600 text-sm font-medium">Enabled</span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
              Unlink
            </button>
          </div>
        </div>
      </SectionCard>

      {/* DELETE ACCOUNT */}
      <SectionCard title="Account" icon={Trash2}>
        <div className="flex justify-between gap-6 px-6 py-4">
          <div>
            <p className="font-medium text-sm">Delete account</p>
            <p className="text-sm text-gray-500 mt-1">
              Upon deleting your account, all data will be permanently removed.
            </p>
          </div>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
            Delete account
          </button>
        </div>
      </SectionCard>

      {/* EDIT MODAL */}
      {activeField && (
        <EditModal
          title={`Update ${activeField}`}
          onClose={() => setActiveField(null)}
          onSave={() => {
            // API call baad me
            setActiveField(null);
          }}
        />
      )}
    </div>
  );
};

export default FounderAccount;
