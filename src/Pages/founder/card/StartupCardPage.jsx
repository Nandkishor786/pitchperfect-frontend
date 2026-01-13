import { useCallback, useEffect, useState } from "react";
import StartupCard from "./StartupCard";
import StartupCardForm from "./StartupCardForm";
import Modal from "../../../Components/ui/Modal";
import api from "../../../services/api";

const StartupCardPage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));

  const [existingCard, setExistingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------- COMMON LOADER ----------
  // const loadMyCard = () => {
  //   const startups = JSON.parse(localStorage.getItem("startups")) || [];
  //   const found = startups.find((s) => s.ownerEmail === user?.email);
  //   setExistingCard(found || null);
  // };

  // ---------- COMMON LOADER-BACKEND ----------

  const loadMyCard = useCallback(async () => {
    try {
      const res = await api.get("/startups/me");
      setExistingCard(res.data || null);
    } catch {
      setExistingCard(null);
    }
  }, []);

  // ---------- INITIAL + LIVE UPDATE ----------
  // useEffect(() => {
  //   if (!user?.email) return;

  //   loadMyCard(); // initial load
  //   window.addEventListener("storage", loadMyCard);

  //   return () => {
  //     window.removeEventListener("storage", loadMyCard);
  //   };
  // }, [user?.email]);

  //...............BACKEND..............
  //Ab refresh, save, public/draft sab API se controlled hoga.
  useEffect(() => {
    loadMyCard();

    window.addEventListener("startup-updated", loadMyCard);

    return () => {
      window.removeEventListener("startup-updated", loadMyCard);
    };
  }, [loadMyCard]);

  //SAME
  const refreshCard = () => {
    loadMyCard();
    setIsModalOpen(false);
  };

  // // ---------- GUARD ----------
  // if (!user) {
  //   return (
  //     <p className="text-gray-500 text-center mt-10">Please login first</p>
  //   );
  // }

  // ---------- UI ----------
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Startup Public Card
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage how your startup appears to investors.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-700 w-full sm:w-auto"
        >
          {existingCard ? "Edit Startup Card" : "Create Startup Card"}
        </button>
      </div>

      {/* CARD PREVIEW */}
      {existingCard ? (
        <div className="flex justify-center overflow-x-auto">
          <StartupCard data={existingCard} isFounderView />
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed rounded-xl p-6 sm:p-10 text-center text-gray-500">
          No startup card yet. Click “Create Startup Card” to get started.
        </div>
      )}

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={existingCard ? "Edit Startup Card" : "Create Startup Card"}
      >
        <StartupCardForm existingData={existingCard} onSaved={refreshCard} />
      </Modal>
    </div>
  );
};

export default StartupCardPage;
