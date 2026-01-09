import { ChevronDown, Search } from "lucide-react";

const DiscoverHeader = ({ role, search, setSearch }) => {
  return (
    <div className="space-y-4">
      {/* SEARCH BAR */}
      <div className="flex justify-center pb-10">
        <div
          className="
          flex items-center gap-2
          w-full max-w-2xl
          bg-white  
          border border-gray-200
          rounded-xl      
          px-4 py-3
          shadow-lg
          focus-within:ring-2 focus-within:ring-indigo-500
          transition
        "
        >
          <Search className="w-5 h-5 text-gray-400 " />

          <input
            type="text"
            placeholder={`Search ${
              role === "founder" ? "investors" : "startups"
            }...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              text-sm
              text-gray-800
              placeholder-gray-400
              outline-none
              bg-transparent
            "
          />
        </div>
      </div>

      {/* TITLE + SORT */}
      <div className="flex items-start justify-between ">
        {/* LEFT: Title */}
        <div className="ml-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            {role === "founder" ? "Discover Investors" : "Discover Startups"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {role === "founder"
              ? "Find investors that match your startup"
              : "Find startups aligned with your investment thesis"}
          </p>
        </div>

        {/* RIGHT: Sort */}
        <div
          className="
          flex items-center gap-2
          border border-gray-200
          rounded-lg
          px-4 py-2
          bg-white
          cursor-pointer
          hover:bg-gray-50
          transition
          mr-2
        "
        >
          <span className="text-sm text-gray-700">
            Sort by:
            <span className="font-medium">Relevance</span>
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default DiscoverHeader;
