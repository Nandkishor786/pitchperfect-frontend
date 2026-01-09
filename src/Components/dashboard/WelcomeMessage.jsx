import { Rocket, Handshake } from "lucide-react";

const WelcomeMessage = ({ name, role }) => {
  const messages = {
    founder: {
      title: "Welcome back",
      subtitle: "Track investor interest and grow your startup faster.",
      icon: Rocket,
      iconColor: "text-indigo-600",
    },
    investor: {
      title: "Welcome back",
      subtitle: "Discover startups that match your investment goals.",
      icon: Handshake,
      iconColor: "text-green-600",
    },
  };

  const Icon = messages[role]?.icon;

  return (
    <div className="mb-6 flex items-center gap-3">
      {/* Icon */}
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <Icon className={`w-5 h-5  ${messages[role].iconColor}`} />
        </div>
      )}

      {/* Text */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          {messages[role].title},{" "}
          <span className="text-indigo-600">{name}</span>
        </h1>
        <p className="text-gray-500 mt-1">{messages[role].subtitle}</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
