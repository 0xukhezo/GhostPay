import ETH from "../public/ETH.svg";
import LINK from "../public/LINK.jpeg";

export const factoryPaymasterContract =
  "0x4F994c4e18f1cb3088255E784E909d9b834d2CaD";

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
