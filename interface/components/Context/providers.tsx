"use client";
// React
import React from "react";
// Types
import { ProviderProps } from "./types";
// Components
import { LoginContextProvider } from "./LoginContextProvider";
import { GeneralContextProvider } from "./GeneralContextProvider";
import { ModalContextProvider } from "./ModalContextProvider";
import { NotificationContextProvider } from "./NotificationContextProvider";
// Wagmi
import { WagmiConfig } from "wagmi";
// Config
import { config } from "../../config/wagmiConfig";

export default function Providers({ children }: ProviderProps) {
  return (
    <WagmiConfig config={config}>
      <NotificationContextProvider>
        <LoginContextProvider>
          <GeneralContextProvider>
            <ModalContextProvider>{children}</ModalContextProvider>
          </GeneralContextProvider>
        </LoginContextProvider>{" "}
      </NotificationContextProvider>
    </WagmiConfig>
  );
}
