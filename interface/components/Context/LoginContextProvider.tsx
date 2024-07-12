"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import { Safe4337Pack } from "@safe-global/relay-kit";
import { LoginContextType } from "./types";

export const LoginContext = createContext<LoginContextType | null>(null);

const clientId =
  "BMVazFg_ceOby4lNUYXQL72HhNGbtqrrpgSUm_PbnEAGwwQFbfBLifL-gvS3I1G7mmYuSBOtOs2VsXPKn6gDjZ0"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId, // Web3Auth Client ID
  web3AuthNetwork: "sapphire_devnet",
  privateKeyProvider,
  useCoreKitKey: false,
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: "redirect", // redirect or popup
    loginConfig: {
      jwt: {
        verifier: "bruselas-test", // name of the verifier created on Web3Auth Dashboard
        typeOfLogin: "jwt",
        clientId: clientId, // Web3Auth Client ID
      },
    },
  },
  privateKeyProvider,
});

web3auth.configureAdapter(openloginAdapter);

export function LoginContextProvider({ children }: any) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [web3AuthAddress, setWeb3AuthAddress] = useState<string | undefined>();
  const [safePack, setSafePack] = useState<Safe4337Pack | undefined>();
  const [smartAccount, setSmartAccount] = useState<string | undefined>();

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          console.log("is connected!!!");
          setLoggedIn(true);
          await createSafe4337Pack();
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const getAccounts = async (): Promise<any> => {
    if (!web3auth.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const web3 = new Web3(web3auth.provider as any);
    const addresses = await web3.eth.getAccounts();

    if (addresses && addresses.length > 0) {
      return addresses[0];
    }
  };

  const getPrivateKey = async (): Promise<any> => {
    if (!web3auth.provider) {
      console.log("provider not initialized yet");
      return;
    }
    return `0x${await web3auth.provider.request({
      method: "eth_private_key",
    })}`;
  };

  const createSafe4337Pack = async () => {
    const safe4337Pack = await Safe4337Pack.init({
      provider: "https://rpc.ankr.com/eth",
      signer: await getPrivateKey(),
      bundlerUrl: `https://api.pimlico.io/v1/sepolia/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`,
      options: {
        owners: [await getAccounts()],
        threshold: 1,
      },
    });
    setSmartAccount(await safe4337Pack.protocolKit.getAddress());
    setSafePack(safe4337Pack);
  };

  const changePaymaster = async () => {};

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const login = async (jwt: string) => {
    if (!web3auth.connected) {
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: jwt,
          verifierIdField: "sub",
        },
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
      getAccounts();
    }
  };

  const contextValue = {
    login,
    logout,
    loggedIn,
    smartAccount,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("loginContext null");
  }

  return loginContext;
};