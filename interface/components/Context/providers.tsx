"use client";
// React
import React from "react";
// Types
import { ProviderProps } from "./types";
// Components
import { LoginContextProvider } from "./LoginContextProvider";
import { GeneralContextProvider } from "./GeneralContextProvider";
import { ModalContextProvider } from "./ModalContextProvider";

export default function Providers({ children }: ProviderProps) {
  return (
    <LoginContextProvider>
      <GeneralContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </GeneralContextProvider>
    </LoginContextProvider>
  );
}
