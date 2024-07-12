"use client";
// React
import React from "react";
// Types
import { ProviderProps } from "./types";
// Components
import { LoginContextProvider } from "./LoginContextProvider";
import { ModalContextProvider } from "./ModalContextProvider";

export default function Providers({ children }: ProviderProps) {
  return (
    <LoginContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </LoginContextProvider>
  );
}
