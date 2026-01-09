import { useEffect, useState } from "react";
import { Pencil, PlusCircle } from "lucide-react";
import InvestorCard from "../card/InvestorCard";
import InvestorCardForm from "../card/InvestorCardForm";
import Modal from "../../../Components/ui/Modal";
import api from "../../../services/api";
import { useCallback } from "react";

const InvestorCardPage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?.id;
  const [existingCard, setExistingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ///common loader function to new card in storage quick
  // const loadMyCard = () => {
  //   const investors = JSON.parse(localStorage.getItem("investors")) || [];
  //   const found = investors.find((i) => i.ownerEmail === user?.email);
  //   setExistingCard(found || null);
  // };

  // ---------- COMMON LOADER-BACKEND ----------
  const loadMyCard = useCallback(async () => {
    try {
      const res = await api.get("/investor-cards/me");
      setExistingCard(res.data || null);
    } catch {
      setExistingCard(null);
    }
  }, []);

  // LOAD CARD FOR LOGGED-IN USER
  // useEffect(() => {
  //   if (!user?.email) return;
  //   loadMyCard(); // initial load
  //   // LISTEN for visibility changes (Make Public)
  //   window.addEventListener("storage", loadMyCard);
  //   return () => {
  //     window.removeEventListener("storage", loadMyCard);
  //   };
  // }, [user?.email]);

  //...............BACKEND..............
  //Ab refresh, save, public/draft sab API se controlled hoga.
  // ---------- INITIAL LOAD ----------
  useEffect(() => {
    loadMyCard();

    window.addEventListener("investor-updated", loadMyCard);

    return () => {
      window.removeEventListener("investor-updated", loadMyCard);
    };
  }, [loadMyCard]);

  //...................SAME ................
  const refreshCard = () => {
    loadMyCard();
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Investor Public Card</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create or update your public-facing investor card.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          {existingCard ? (
            <>
              <Pencil className="w-4 h-4" />
              Edit Card
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              Create Card
            </>
          )}
        </button>
      </div>

      {/* CARD PREVIEW */}
      {existingCard ? (
        <div className="flex justify-center">
          <InvestorCard data={existingCard} isInvestorView />
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed rounded-xl p-10 text-center text-gray-500">
          No public card yet. Click “Create Card” to get started.
        </div>
      )}

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={existingCard ? "Edit Investor Card" : "Create Investor Card"}
      >
        <InvestorCardForm existingData={existingCard} onSaved={refreshCard} />
      </Modal>
    </div>
  );
};

export default InvestorCardPage;

//ye component card dashboard hai to
// open ,fill the cardform (InvestorCardForm)
//and to show the card by passing investorCard(InvestorCard)
