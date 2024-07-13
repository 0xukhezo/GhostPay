import ETH from "../public/ETH.svg";
import LINK from "../public/LINK.jpeg";

export const factoryPaymasterContract =
  "0x72c62d1FE2BB2E35D7A9743957Db3174bc54Ad49";

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
    image: LINK.src,
    name: "Link Token",
    symbol: "LINK",
    contract: "0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB", // delete
    oracle: "",
    decimals: 18,
  },
];

export const integrations = [
  {
    name: "Uniswap",
    image: "/uniswap.png",
  },
  {
    name: "1inch",
    image: "/1inch.jpeg",
  },
  {
    name: "PancakeSwap",
    image: "/panckswap.jpeg",
  },
];
