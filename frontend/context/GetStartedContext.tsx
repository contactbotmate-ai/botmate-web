"use client";

import React, { createContext, useContext, useState } from "react";

interface GetStartedContextType {
  isOpen: boolean;
  openGetStarted: () => void;
  closeGetStarted: () => void;
}

const GetStartedContext = createContext<GetStartedContextType | undefined>(undefined);

export function GetStartedProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openGetStarted = () => setIsOpen(true);
  const closeGetStarted = () => setIsOpen(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("get-started") === "true") {
        setIsOpen(true);
        url.searchParams.delete("get-started");
        window.history.replaceState({}, document.title, url.pathname + url.search);
      }
    }
  }, []);

  return (
    <GetStartedContext.Provider value={{ isOpen, openGetStarted, closeGetStarted }}>
      {children}
    </GetStartedContext.Provider>
  );
}

export function useGetStarted() {
  const context = useContext(GetStartedContext);
  if (context === undefined) {
    throw new Error("useGetStarted must be used within a GetStartedProvider");
  }
  return context;
}
