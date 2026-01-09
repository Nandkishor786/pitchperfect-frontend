const EditModal = ({ title, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <input
          className="w-full border rounded-lg px-4 py-2 mb-6"
          placeholder="Enter value"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-sm text-gray-500">
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
