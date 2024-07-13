import { BigNumber } from "ethers";
import { ERC20 } from "../types/ERC20";
import { INonfungiblePositionManager } from "../types/INonfungiblePositionManager";
import { NotificationType } from "../components/Context/types";
// Config
import {
  NOTIFICATION_ERROR_COLOR,
  NOTIFICATION_INFO_COLOR,
  NOTIFICATION_SUCCESS_COLOR,
  NOTIFICATION_WARNING_COLOR,
} from "../config/uiConfig";

const capitalizeFirstLetter = (content: string): string => {
  if (content.length === 0) {
    return content;
  }

  return content.charAt(0).toUpperCase() + content.slice(1);
};

const abbreviateEthereumAddress = (address: string): string => {
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);

  return `${prefix}...${suffix}`;
};

async function createProposalOpenPositionUniswap(
  amount0Min: string,
  amount1Min: string,
  fee: string,
  token0: ERC20,
  amount0: BigNumber,
  token1: ERC20,
  amount1: BigNumber,
  nonFungiblePositionManager: INonfungiblePositionManager,
  tickLower: number,
  tickUpper: number
) {
  console.log("Open Uniswap tx");
}

async function createProposalClosePositionUniswap(
  tokenId: string,
  liquidity: string,
  nonFungiblePositionManager: INonfungiblePositionManager
) {
  console.log("Closes Uniswap tx");
}

function getColorForType(type: NotificationType["type"]): string {
  switch (type) {
    case "success":
      return NOTIFICATION_SUCCESS_COLOR;
    case "error":
      return NOTIFICATION_ERROR_COLOR;
    case "warning":
      return NOTIFICATION_WARNING_COLOR;
    case "info":
      return NOTIFICATION_INFO_COLOR;
    default:
      return NOTIFICATION_INFO_COLOR;
  }
}

export {
  getColorForType,
  capitalizeFirstLetter,
  abbreviateEthereumAddress,
  createProposalClosePositionUniswap,
  createProposalOpenPositionUniswap,
};
