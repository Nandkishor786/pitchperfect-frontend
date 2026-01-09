const DashboardCTA = ({
  title,
  description,
  primaryBtnText,
  primaryBtnAction,
  secondaryBtnText,
  secondaryBtnAction,
}) => {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 flex flex-col gap-6">
      {/* text */}
      <div>
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
        <p className="text-indigo-100 mt-2 max-w-2xl">{description}</p>
      </div>

      {/* buttons */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={primaryBtnAction}
          className="bg-white text-indigo-700 font-medium px-6 py-3 rounded-xl hover:bg-indigo-100 transition "
        >
          {primaryBtnText}
        </button>

        {secondaryBtnText && (
          <button
            onClick={secondaryBtnAction}
            className=" border-white text-white px-6 py-3 rounded-xl hover:bg-white  transition font-medium hover:text-indigo-700 border-2"
          >
            {secondaryBtnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardCTA;
