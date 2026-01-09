import { User, MapPin } from "lucide-react";

const FounderProfile = ({ user }) => {
  return (
    <div className="w-full max-w-md bg-white border rounded-xl p-6 space-y-6">
      {/* Profile Photo */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="w-10 h-10 text-indigo-600" />
        </div>
      </div>

      {/* Name & Email */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">{user.name || "Founder Name"}</h2>
        <p className="text-sm text-gray-500">
          {user.email || "founder@email.com"}
        </p>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 text-center">
        {user.bio || "Founder bio / vision about the startup"}
      </p>

      {/* Location */}
      <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
        <MapPin size={16} />
        {user.location || "Location"}
      </div>

      {/* Edit Button */}
      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        Edit Profile
      </button>
    </div>
  );
};

export default FounderProfile;
