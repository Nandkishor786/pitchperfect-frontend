const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2 sm:px-0">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-white w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl px-4 py-4 sm:px-6 sm:py-6">
        {/* header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl p-2 -mr-2"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
