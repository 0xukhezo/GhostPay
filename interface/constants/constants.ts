import ETH from "../public/ETH.svg";
import APE from "../public/apeCoin.png";
import LINK from "../public/LINK.jpeg";

export const factoryPaymasterContract =
  "0xa499c1F63Ec1D6f72D3DE87c5D020bfF473ca97D";

export const entrypointBaseContract =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

export const initialSteps = [
  {
    name: "Select Token",
    description:
      "Your paymaster will receive this token for pay the rest of users gas fees.",
    status: "current",
  },
  {
    name: "Select Fee",
    description:
      "This is the fee of the selected token you are going to receive extra the current price of the native token.",
    status: "upcoming",
  },
];

export const integrations = [
  {
    name: "Transfer",
    image: "/cara.svg",
  },
  {
    name: "Uniswap",
    image: "/uniswap.png",
  },
  {
    name: "PancakeSwap",
    image: "/panckswap.jpeg",
  },
];

export const generalTokens = [
  {
    image: ETH.src,
    name: "Wrapped Ether",
    symbol: "WETH",
    contract: "0x25466530DE4e382EcBc0834ADFA3CaF158A451dA",
    oracle: "0x8E947Ea7D5881Cd600Ace95F1201825F8C708844",
    decimals: 18,
  },
  {
    image: APE.src,
    name: "Ape Coin",
    symbol: "APE",
    contract: "0xd150aa5F4a71d72208276779f6cDD90F77E46dB4",
    oracle: "0x8E947Ea7D5881Cd600Ace95F1201825F8C708844",
    decimals: 18,
  },
  {
    image: LINK.src,
    name: "Link Token",
    symbol: "LINK",
    contract: "0xd150aa5F4a71d72208276779f6cDD90F77E46dB4",
    oracle: "0x8E947Ea7D5881Cd600Ace95F1201825F8C708844",
    decimals: 18,
  },
];

export const BaseTokens = [
  {
    image: ETH.src,
    name: "Wrapped Ether",
    symbol: "WETH",
    contract: "0x25466530DE4e382EcBc0834ADFA3CaF158A451dA",
    oracle: "0x8E947Ea7D5881Cd600Ace95F1201825F8C708844",
    decimals: 18,
  },
  {
    image: APE.src,
    name: "Ape Coin",
    symbol: "APE",
    contract: "",
    oracle: "",
    decimals: 18,
  },
  {
    image: LINK.src,
    name: "Link Token",
    symbol: "LINK",
    contract: "",
    oracle: "",
    decimals: 18,
  },
];

export const ArbitrumTokens = [
  {
    image: ETH.src,
    name: "Wrapped Ether",
    symbol: "WETH",
    contract: "",
    oracle: "",
    decimals: 18,
  },
  {
    image: APE.src,
    name: "Ape Coin",
    symbol: "APE",
    contract: "",
    oracle: "",
    decimals: 18,
  },
  {
    image: LINK.src,
    name: "Link Token",
    symbol: "LINK",
    contract: "",
    oracle: "",
    decimals: 18,
  },
];

export const generalConstants = [
  {
    base: [
      {
        factoryPaymasterContract: "0xa499c1F63Ec1D6f72D3DE87c5D020bfF473ca97D",
        entrypointContract: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        generalTokens: BaseTokens,
        chainId: "0x14a34",
        rpcTarget: "https://rpc.ankr.com/base_sepolia",
        displayName: "Base Sepolia",
        blockExplorerUrl: "https://sepolia.basescan.org/",
      },
    ],
    arbitrum: [
      {
        factoryPaymasterContract: "",
        entrypointContract: "",
        generalTokens: ArbitrumTokens,
        chainId: "",
        rpcTarget: "",
        displayName: "",
        blockExplorerUrl: "",
      },
    ],
  },
];
