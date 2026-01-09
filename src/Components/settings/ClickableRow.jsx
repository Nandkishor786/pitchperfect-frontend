import { ChevronRight } from "lucide-react";

const ClickableRow = ({ label, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-50 text-left"
    >
      <span className="text-sm text-gray-500">{label}</span>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-900">{value}</span>
        <ChevronRight size={18} className="text-indigo-500" />
      </div>
    </button>
  );
};

export default ClickableRow;
