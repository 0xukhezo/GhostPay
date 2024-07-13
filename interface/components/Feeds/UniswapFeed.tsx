"use client";

import React from "react";
// Components
import UniswapPositionCard from "../Protocols/Uniswap/UniswapPositionCard";

type UniswapFeedProps = {
  uniswapPositionsID: string[] | undefined;
};

function UniswapFeed({ uniswapPositionsID }: UniswapFeedProps) {
  return (
    <main className="p-10">
      <div className="grid grid-cols-7 pb-1 border-b-1 border-greenMatrix px-10">
        <span></span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Fee Tier
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Price Range
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Liquidity
        </span>
      </div>
      <div className="mt-4">
        {uniswapPositionsID?.map((id: string, index: number) => {
          return <UniswapPositionCard id={id} />;
        })}
      </div>
    </main>
  );
}

export default UniswapFeed;
