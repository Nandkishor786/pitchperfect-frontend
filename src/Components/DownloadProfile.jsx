import { Download, FileText } from "lucide-react";

const DownloadProfile = ({ fileUrl, fileName }) => {
  if (!fileUrl) return null; // file nahi hai → kuch nahi dikhega

  return (
    <a
      href={fileUrl}
      target="_blank"
      download
      className="
        mt-6 flex items-center gap-4 
        bg-teal-50 hover:bg-teal-100 
        border border-teal-200 
        px-5 py-4 rounded-xl 
        transition
      "
    >
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
        <FileText className="w-5 h-5 text-teal-700" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-teal-900">
          Download Full Profile
        </p>
        <p className="text-sm text-teal-700">
          {fileName || "Investor_Profile.pdf"}
        </p>
      </div>

      <Download className="w-5 h-5 text-teal-700" />
    </a>
  );
};

export default DownloadProfile;
