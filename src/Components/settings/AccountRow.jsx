import { ChevronRight } from "lucide-react";

const AccountRow = ({ label, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50"
    >
      <span className="text-sm text-gray-500">{label}</span>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-900">{value}</span>
        <ChevronRight className="text-indigo-500" size={18} />
      </div>
    </button>
  );
};

export default AccountRow;
