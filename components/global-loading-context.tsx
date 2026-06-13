"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalLoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export function useGlobalLoading() {
  return useContext(GlobalLoadingContext);
}

export function GlobalLoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <GlobalLoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </GlobalLoadingContext.Provider>
  );
}
