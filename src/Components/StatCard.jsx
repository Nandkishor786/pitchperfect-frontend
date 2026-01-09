// notes  Eye, Send, Heart, TrendingUp, User:all these are react Components so we used name as Capital
// icon: Icon =>beacuse we send Icon of lucide-react which all are react coponents so use Capital 
const StatCard = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
        <p className="text-green-500 text-sm mt-1">{change}</p>
      </div>

      {Icon && (
        <div className="bg-indigo-100 p-4 rounded-xl">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
