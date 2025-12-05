"use client";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Memuat data...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-gray-700">{message}</p>
    </div>
  );
}
