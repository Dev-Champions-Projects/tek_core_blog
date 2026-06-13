"use client";

import { useEffect, useState } from "react";

export function GlobalLoading({ delay = 300 }: { delay?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <span className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></span>
        <span className="text-lg font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
}
