import { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext } from "./toast-context";

// Module-level counter for stable unique ids (no Date.now / Math.random needed).
let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (message, type = "success") => {
      const id = (nextId += 1);
      setToasts((current) => [...current, { id, message, type }]);
      timers.current.set(id, setTimeout(() => dismiss(id), 3000));
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      show,
      success: (message) => show(message, "success"),
      error: (message) => show(message, "error"),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <button
            key={toast.id}
            type="button"
            onClick={() => dismiss(toast.id)}
            className={`pointer-events-auto rounded-md px-4 py-2 text-sm text-white shadow-lg ${
              toast.type === "error" ? "bg-red-600" : "bg-gray-900"
            }`}
          >
            {toast.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
