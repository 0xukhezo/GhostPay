"use cleint";
// React
import React, { useEffect, useState } from "react";
// Wagmi
import { useContractRead } from "wagmi";
// Abis
import { abiINonfungiblePositionManager } from "../../../abis";
// Components
import PositionCardInfo from "./PositionCardInfo";

interface UniswapPositionCardInterface {
  id: string;
}

export default function UniswapPositionCard({
  id,
}: UniswapPositionCardInterface) {
  const [dataPosition, setDataPosition] = useState<any>();
  const { data, isSuccess } = useContractRead({
    address: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    abi: abiINonfungiblePositionManager,
    functionName: "positions",
    args: [id],
  });

  useEffect(() => {
    const positionData = data as any;
    setDataPosition(positionData);
  }, [isSuccess]);

  return (
    <div>
      <>
        {dataPosition !== undefined && dataPosition[7].toString() !== "0" && (
          <div className="rounded-lg bg-beige px-4 py-8 mt-4 ">
            <PositionCardInfo
              id={id}
              token0={dataPosition[2]}
              token1={dataPosition[3]}
              fee={dataPosition[4]}
              tickUpper={dataPosition[5]}
              tickLower={dataPosition[6]}
              liquidity={dataPosition[7]}
            />
          </div>
        )}
      </>
    </div>
  );
}
