// src/hooks/useToast.tsx
import { useState, useCallback } from "react";

export interface ToastOptions {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), options.duration || 3000);
  }, []);

  const ToastComponent = () =>
    toast ? (
      <div
        className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white text-sm z-50 transition-all
        ${
          toast.type === "error"
            ? "bg-red-600"
            : toast.type === "success"
            ? "bg-green-600"
            : "bg-blue-600"
        }`}
      >
        {toast.message}
      </div>
    ) : null;

  return { showToast, ToastComponent };
};
