// React
import React, { ReactNode, createContext, useContext, useState } from "react";
// Types
import { GeneralContextType, ProviderProps } from "./types";

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralContextProvider = ({ children }: ProviderProps) => {
  const [favoritesPaymasters, setFavoritesPaymasters] = useState<any[]>([]);

  return (
    <GeneralContext.Provider
      value={{
        favoritesPaymasters,
        setFavoritesPaymasters,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneral must be used within a ModalProvider");
  }
  return context;
};
