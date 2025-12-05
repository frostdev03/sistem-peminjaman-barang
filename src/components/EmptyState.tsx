// "use client";

// import { SearchX } from "lucide-react";

// interface EmptyStateProps {
//   message?: string;
//   description?: string;
// }

// export default function EmptyState({
//   message = "Tidak ada data",
//   description,
// }: EmptyStateProps) {
//   return (
//     <div className="flex flex-col items-center justify-center py-16">
//       <SearchX className="w-16 h-16 text-gray-300 mb-4" />
//       <p className="text-gray-600 text-lg font-semibold mb-2">{message}</p>
//       {description && <p className="text-gray-500 text-sm">{description}</p>}
//     </div>
//   );
// }

"use client";

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
}

export default function EmptyState({
  message = "Tidak ada data",
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <SearchX className="w-16 h-16 text-gray-400" />
      </div>
      <p className="text-gray-700 text-xl font-semibold mb-2 text-center">
        {message}
      </p>
      {description && (
        <p className="text-gray-500 text-base text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
}
