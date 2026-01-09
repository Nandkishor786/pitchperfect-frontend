const ActivityItem = ({
  icon: Icon,
  iconColor,
  iconBg = "bg-gray-100",
  title,
  time,
}) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}
      >
        {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
      </div>

      <div className="flex-1">
        <p className="text-gray-800 text-sm font-medium">{title}</p>
        <p className="text-gray-500 text-xs mt-1">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
