export type TokenInfo = {
  symbol: string;
  name: string;
  image: string;
  contract: string;
  oracle: string;
  decimals: number;
};

export type IntegrationType = {
  name: string;
  image: string;
};

export type PaymasterInfo = {
  id: string;
  name: string;
  token: string;
  price: string;
  owner: string;
  executedUo: string;
};
