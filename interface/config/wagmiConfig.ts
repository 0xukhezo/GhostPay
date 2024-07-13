// Wagmi
import { arbitrumSepolia, baseSepolia, scrollSepolia } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient } = configureChains(
  [arbitrumSepolia, scrollSepolia, baseSepolia],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
});
