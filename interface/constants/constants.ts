import ETH from "../public/ETH.svg";
import LINK from "../public/LINK.jpeg";

export const initialSteps = [
  {
    name: "Name your Paymaster",
    description: "Name your paymaster to find it easily",
    status: "current",
  },
  {
    name: "Select Token",
    description: "Your paymaster will receive this token for pay gas fees.",
    status: "upcoming",
  },
  {
    name: "Select price",
    description:
      "This is the price of the selected token you are going to receive per gwei.",
    status: "upcoming",
  },
];

export const generalTokens = [
  {
    image: ETH.src,
    name: "Wrapped Ether",
    symbol: "WETH",
    contract: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
    decimals: 18,
  },
  {
    image: LINK.src,
    name: "Link Token",
    symbol: "LINK",
    contract: "0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB",
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

export const paymasters = [
  {
    title: "Paymaster 1",
    price: "0.001",
    token: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
    owner: "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
  },
  {
    title: "Paymaster 2",
    price: "0.001",
    token: "0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB",
    owner: "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
  },
  {
    title: "Paymaster 3",
    price: "0.001",
    token: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
    owner: "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
  },
  {
    title: "Paymaster 4",
    price: "0.001",
    token: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
    owner: "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
  },
  {
    title: "Paymaster 5",
    price: "0.001",
    token: "0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB",
    owner: "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
  },
  {
    title: "Paymaster 6",
    price: "0.001",
    token: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
    owner: "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
  },
];
