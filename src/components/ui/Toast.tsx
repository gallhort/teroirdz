"use client";

import { useToastStore } from "@/hooks/useToast";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in ${
            toast.type === "success"
              ? "bg-green-700 text-white"
              : toast.type === "error"
              ? "bg-red-700 text-white"
              : "bg-brown text-cream"
          }`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
