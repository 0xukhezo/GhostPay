"use client";
// React
import React from "react";
// Types
import { TokenInfo } from "../../config/types";
// Utils
import { capitalizeFirstLetter } from "../../utils/utils";

type TokenCardProps = {
  token: TokenInfo;
  onClick: (token: TokenInfo) => void;
};

export default function TokenCard({ token, onClick }: TokenCardProps) {
  return (
    <button
      className="px-4 py-2 rounded-xl w-full flex justify-between items-center my-0.5 text-start hover:bg-gray-200"
      onClick={() => onClick(token)}
    >
      <div className="flex items-center ">
        <img
          src={token.image}
          alt={token.symbol}
          className="h-[3vh] w-[3vh] rounded-full"
        />
        <div className="flex flex-col ml-6">
          <span className="text-lg" data-testid="token-name">
            {capitalizeFirstLetter(token.name)}
          </span>
          <div>
            <span className="text-xs">{token.symbol}</span>
          </div>
        </div>
      </div>{" "}
    </button>
  );
}
