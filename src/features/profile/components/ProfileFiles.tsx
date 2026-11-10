import { Download } from "lucide-react";
import { toast } from "sonner";
import { profileMockData, type FileItem } from "../data/profile.mock";
import pdfIcon from "@/assets/images/pdf-icon.png";

interface ProfileFilesProps {
  files?: FileItem[];
}

const ProfileFiles = ({ files = profileMockData.files }: ProfileFilesProps) => {
  const handleDownload = (file: FileItem) => {
    // Prepare the download link (either from the backend or a mock Blob for the actual download)
    const downloadUrl =
      file.fileUrl ||
      URL.createObjectURL(
        new Blob([`CollabSpace - Mock content for ${file.title}`], {
          type: "application/pdf",
        })
      );

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${file.title}.pdf`;
    link.click();

    toast.success("File downloaded successfully!");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-sm transition-all"
        >
          {/* File Icon & Info */}
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            {/* Adobe Acrobat Document Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center">
              <img
                src={pdfIcon}
                alt="Adobe Acrobat PDF"
                className="size-8 object-contain"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {file.title}
              </h3>
              <p className="text-xs text-text-secondary truncate mt-0.5">
                {file.author}
              </p>
              <span className="text-[11px] text-gray-400 mt-0.5 font-normal">
                {file.size} • {file.time}
              </span>
            </div>
          </div>

          {/* Download Action Button */}
          <button
            type="button"
            onClick={() => handleDownload(file)}
            className="flex size-8.5 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:text-primary-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
            title={`Download ${file.title}`}
          >
            <Download className="size-4.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileFiles;
