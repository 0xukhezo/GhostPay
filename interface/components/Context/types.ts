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
};
