const SectionCard = ({ title, subtitle, icon: Icon, children }) => {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <Icon className="text-indigo-600" size={20} />
        <div>
          <h2 className="font-medium">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      <div className="divide-y">{children}</div>
    </div>
  );
};

export default SectionCard;
