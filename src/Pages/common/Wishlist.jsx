import { useEffect, useState } from "react";
import InvestorCard from "../investor/card/InvestorCard";
import StartupCard from "../founder/card/StartupCard";
import api from "../../services/api";

const Wishlist = ({ role }) => {
  // Agar role = founder → Saved Investors
  // Agar role = investor → Saved Startups
  const isFounder = role === "founder";

  // localStorage se wishlist load karo → React state me rakho → UI ko state se drive karo
  // wishlist = React state (source of truth)
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // load wishlist from local storage on mount(on first time render into wishlist componentents)
  // useEffect(() => {
  //   const syncWishlist = () => {
  //     setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  //   };

  //   syncWishlist(); // initial load
  //   window.addEventListener("storage", syncWishlist);

  //   return () => window.removeEventListener("storage", syncWishlist);
  // }, []);

  //load wishlis-backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist/me");
        setWishlist(res.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // REMOVE handler (called from card)
  // const handleRemove = (id) => {
  //   const updated = wishlist.filter((item) => item.id !== id);
  //   setWishlist(updated);
  //   localStorage.setItem("wishlist", JSON.stringify(updated));
  // };

  // REMOVE handler (called from card)-backend
  // 🔹 REMOVE (UI + BACKEND SYNC)
  // 🔹 REMOVE FROM UI ONLY (backend already handled by card)
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) return <p className="p-6">Loading wishlist…</p>;

  const filteredWishlist = wishlist.filter((item) =>
    isFounder ? item.type === "investor" : item.type === "startup"
  );

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isFounder ? "Saved Investors" : "Saved Startups"}
        </h2>

        <p className="mt-4 text-base text-gray-600 px-6 py-4 w-full max-w-4xl border bg-white rounded-xl border-gray-200 shadow-sm">
          You have{" "}
          <span className="font-medium text-indigo-600">
            {filteredWishlist.length} {isFounder ? "investors" : "startups"}
          </span>{" "}
          in your wishlist
        </p>
      </div>

      {/* EMPTY STATE */}
      {filteredWishlist.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <span className="text-indigo-600 text-xl">♡</span>
          </div>
          <p className="text-gray-700 font-medium">No items saved yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredWishlist.map((item) =>
            isFounder ? (
              <InvestorCard
                key={item.id}
                data={item.payload}
                isWishlist
                onRemove={() => handleRemove(item.id)}
              />
            ) : (
              <StartupCard
                key={item.id}
                data={item.payload}
                isWishlist
                onRemove={() => handleRemove(item.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
//Wishlist.jsx (SOURCE OF TRUTH = BACKEND)
