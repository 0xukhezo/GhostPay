import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

import PositionCardInfo from "./PositionCardInfo";
import { abiINonfungiblePositionManager } from "../../../abis";

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
          <div className="rounded-lg bg-beige px-4 py-8 mt-4 ">pepe</div>
        )}
      </>
    </div>
  );
}
