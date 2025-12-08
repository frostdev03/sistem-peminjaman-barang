"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

export function Toast({ messages, onRemove }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {messages.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg min-w-80 max-w-sm ${
            toast.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : toast.type === "error"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
            {toast.type === "info" && <Info className="w-5 h-5" />}
          </div>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="flex-shrink-0 text-inherit hover:opacity-70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      onRemove(id);
    }, 3000);

    return id;
  };

  const removeToast = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const onRemove = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return { messages, addToast, removeToast };
}
