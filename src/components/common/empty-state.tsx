import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 rounded-full bg-secondary-gray-100 p-5">
        <FolderOpen size={40} className="text-secondary-gray-500" />
      </div>

      <h2 className="text-xl font-semibold text-secondary-gray-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-secondary-gray-500">
        {description}
      </p>
    </div>
  );
}