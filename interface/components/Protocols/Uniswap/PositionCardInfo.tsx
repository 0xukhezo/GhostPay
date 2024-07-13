import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

import Image from "next/image";

import { abiERC20, abiUniswapFactory } from "../../../abis";
import GeneralButton from "../../Buttons/GeneralButton";
import { generalTokens } from "../../../constants/constants";
import { TokenInfo } from "../../../config/types";
import PoolData from "./PoolData";
import { useLogin } from "../../Context/LoginContextProvider";

interface PositionCardInfoInterface {
  id: string;
  token0: `0x${string}`;
  token1: `0x${string}`;
  fee: number;
  tickUpper: number;
  tickLower: number;
  liquidity: number;
}

function PositionCardInfo({
  id,
  token0,
  token1,
  fee,
  tickUpper,
  tickLower,
  liquidity,
}: PositionCardInfoInterface) {
  const { provider } = useLogin();
  const [token0Decimal, setToken0Decimal] = useState<number>();
  const [token1Decimal, setToken1Decimal] = useState<number>();
  const [tickUp, setTickUp] = useState<number>();
  const [tickLow, setTickLow] = useState<number>();

  const { data: dataToken0, isSuccess: isSuccessToken0 } = useContractRead({
    address: token0,
    abi: abiERC20,
    functionName: "decimals",
  });

  const { data: dataToken1, isSuccess: isSuccessToken1 } = useContractRead({
    address: token1,
    abi: abiERC20,
    functionName: "decimals",
  });

  const { data: dataPool, isSuccess: isSuccessPool } = useContractRead({
    address: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    abi: abiUniswapFactory,
    functionName: "getPool",
    args: [token0, token1, fee],
  });

  useEffect(() => {
    const positionData = dataToken0 as number;
    setToken0Decimal(positionData);
  }, [isSuccessToken0]);

  useEffect(() => {
    const positionData = dataToken1 as number;
    setToken1Decimal(positionData);
  }, [isSuccessToken1]);

  useEffect(() => {
    if (token0Decimal !== undefined && token1Decimal !== undefined) {
      const price0low =
        1 /
        (1.0001 ** -Number(tickLower) / 10 ** (token0Decimal - token1Decimal));
      const price0up =
        1 /
        (1.0001 ** -Number(tickUpper) / 10 ** (token0Decimal - token1Decimal));
      setTickUp(price0up);
      setTickLow(price0low);
    }
  }, [token1Decimal]);

  const nonFungiblePositionManagerAddr =
    "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

  const onGeretarePayloadClick = async () => {
    if (
      nonFungiblePositionManagerAddr !== undefined &&
      liquidity !== undefined &&
      id !== undefined
    ) {
      loadData(
        nonFungiblePositionManagerAddr,
        liquidity.toString(),
        id.toString()
      );
    }
  };

  async function loadData(
    nonFungiblePositionManagerAddr: string,
    liquidity: string,
    tokenId: string
  ) {
    console.log(nonFungiblePositionManagerAddr, liquidity, tokenId);
  }

  const token0Info = generalTokens.filter(
    (token: TokenInfo) => token.contract === token0
  );

  const token1Info = generalTokens.filter(
    (token: TokenInfo) => token.contract === token1
  );

  return (
    <div className="flex flex-row items-center grid grid-cols-5 ">
      {tickUp !== undefined && tickLow !== undefined && token0Info[0].image && (
        <>
          <div className="flex mx-10">
            <Image
              width={20}
              height={20}
              alt="Chain Image"
              src={token0Info[0].image}
              className="z-10"
            />
            <Image
              width={20}
              height={20}
              alt="Chain Image"
              src={token1Info[0].image}
              className="z-10 -mx-2"
            />
            <div className="font-semibold mx-4">
              {token0Info[0].symbol} / {token1Info[0].symbol}
            </div>
          </div>

          <div className="mx-10">{Number(fee) / 10000}%</div>
          <div className="mx-10">
            {tickUp.toFixed(2)}/{tickLow.toFixed(2)}
          </div>
          {dataPool && <PoolData dataPool={dataPool} liquidity={liquidity} />}
          <GeneralButton
            className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
            onClick={() => onGeretarePayloadClick()}
            disabled={false}
          >
            Close Position
          </GeneralButton>
        </>
      )}
    </div>
  );
}

export default PositionCardInfo;
