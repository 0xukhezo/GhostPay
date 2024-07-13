import React, { useEffect, useState } from "react";

import { useContractRead } from "wagmi";
import { abiPool } from "../../../abis";

interface PoolDataInterfece {
  dataPool: any;
  liquidity: any;
}

export default function PoolData({ dataPool, liquidity }: PoolDataInterfece) {
  const [dataFormat, setDataFormat] = useState<any>();
  const { data, isSuccess } = useContractRead({
    address: dataPool,
    abi: abiPool,
    functionName: "slot0",
  });

  useEffect(() => {
    const dataFormat = data as any;
    setDataFormat(dataFormat);
  }, [isSuccess]);

  return (
    <div>
      {dataFormat !== undefined && dataFormat !== null && (
        <div className="mx-10">
          {(
            (liquidity / Number(dataFormat.sqrtPriceX96.toString())) *
            10 ** 13
          ).toFixed(2)}
          $
        </div>
      )}
    </div>
  );
}
