"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

const NetworkStatusContext = createContext({ online: true });

export function useNetworkStatus() {
  return useContext(NetworkStatusContext);
}

export function NetworkStatusProvider({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    updateOnline();
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ online }}>
      {!online && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "#fee2e2",
          color: "#991b1b",
          textAlign: "center",
          padding: "0.75rem 0",
          zIndex: 10000,
          fontWeight: 500,
          letterSpacing: 0.5,
        }}>
          No internet connection. Please check your network.
        </div>
      )}
      {children}
    </NetworkStatusContext.Provider>
  );
}
