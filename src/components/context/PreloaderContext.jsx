"use client";
import { createContext, useContext, useState } from "react";

const PreloaderContext = createContext();
export const usePreloader = () => useContext(PreloaderContext);

export default function PreloaderProvider({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);

  const finishPreloader = () => {
    setShowPreloader(false);
  };

  return (
    <PreloaderContext.Provider value={{ showPreloader, finishPreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
}
