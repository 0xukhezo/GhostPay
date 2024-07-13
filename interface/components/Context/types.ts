// React
import { ReactNode } from "react";

// General types

export type ProviderProps = {
  children: ReactNode;
};

// Modal types

export type ModalContextType = {
  isModalOpen: boolean;
  content: ReactNode | null;
  title: string;
  isClosing: boolean;
  setTitle: (title: string) => void;
  setIsModalOpen: (open: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  setContent: (content: ReactNode) => void;
};

export type ModalType = {
  content: ReactNode;
  title: string;
};

export type GeneralContextType = {
  favoritesPaymasters: any[];
  setFavoritesPaymasters: (paymaster: any) => void;
};

export type LoginContextType = {
  login: (jwt: string) => Promise<void>;
  logout: () => Promise<void>;
  loggedIn: boolean;
  smartAccount: any;
  safePack: any;
  web3AuthAddress: any;
  provider: any;
  changePaymaster: any;
  paymasterSelected: string | null;
};

// NotificationContextProvider types

export type NotificationType = {
  message: string;
  type: "success" | "error" | "warning" | "info";
};

export type NotificationContextType = {
  showNotification: (notification: NotificationType) => void;
};
