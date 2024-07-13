import React, { useState, useEffect } from "react";

import ethLogo from "../../../public/ETH.svg";
import GeneralButton from "../../Buttons/GeneralButton";
import { INonfungiblePositionManager } from "../../../types/INonfungiblePositionManager";
import { ethers } from "ethers";
import {
  TickMath,
  encodeSqrtRatioX96,
  nearestUsableTick,
} from "@uniswap/v3-sdk";

import Image from "next/image";
import { useLogin } from "../../Context/LoginContextProvider";
import { abiERC20, abiINonfungiblePositionManager } from "../../../abis";
import { ERC20 } from "../../../types/ERC20";
import { createProposalOpenPositionUniswap } from "../../../utils/utils";
import TokenSelector from "../../Inputs/TokenSelector";
import FeeSelector from "../../Inputs/FeeSelector";
import { generalTokens } from "../../../constants/constants";
import { TokenInfo } from "../../../config/types";

const fees = [10000, 3000, 1000, 500];

interface OpenUniswapPositionInterface {
  displayPositions: string;
}

export default function OpenUniswapPosition({
  displayPositions,
}: OpenUniswapPositionInterface) {
  const { provider } = useLogin();
  const [token1, setToken1] = useState<TokenInfo>(generalTokens[0]);
  const [token2, setToken2] = useState<TokenInfo | undefined>(undefined);
  const [selectedFee, setSelectedFee] = useState<number>(10000);
  const [lowerTick, setLowerTick] = useState<number>();
  const [upperTick, setUpperTick] = useState<number>();
  const [minToken1Amount, setMinToken1Amount] = useState<number>();
  const [minToken2Amount, setMinToken2Amount] = useState<number>();
  const [token1Amount, setToken1Amount] = useState<number>();
  const [token2Amount, setToken2Amount] = useState<number>();
  const [payload, setPayload] = useState<boolean>(false);

  const nonFungiblePositionManagerAddr =
    "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

  const getToken1Selected = (token1: any) => {
    setToken1(token1);
  };

  const getToken2Selected = (token2: any) => {
    setToken2(token2);
  };

  const getFeeSelected = (fee: number) => {
    setSelectedFee(fee);
  };

  const handleLowerTickChange = (val: string) => {
    setLowerTick(Number(val));
  };

  const handleUpperTickChange = (val: string) => {
    setUpperTick(Number(val));
  };

  const handleToken1AmountChange = (val: string) => {
    setToken1Amount(Number(val));
  };

  const handleToken2AmountChange = (val: string) => {
    setToken2Amount(Number(val));
  };

  const handleMinToken1AmountChange = (val: string) => {
    setMinToken1Amount(Number(val));
  };

  const handleMinToken2AmountChange = (val: string) => {
    setMinToken2Amount(Number(val));
  };

  const onGeretarePayloadClick = async () => {
    if (
      token1 !== undefined &&
      token2 !== undefined &&
      minToken1Amount !== undefined &&
      minToken2Amount !== undefined &&
      minToken1Amount > 0 &&
      minToken2Amount > 0 &&
      lowerTick !== undefined &&
      upperTick !== undefined &&
      selectedFee !== undefined &&
      token1Amount !== undefined &&
      token2Amount !== undefined &&
      token1Amount > 0 &&
      token2Amount > 0
    ) {
      const token1Address = token1.contract as string;
      const token2Address = token2.contract as string;
      const compareTokens =
        token1Address
          .toLowerCase()
          .localeCompare(token2Address.toLocaleLowerCase()) == 1;

      loadData(
        selectedFee,
        minToken1Amount,
        minToken2Amount,
        token1Address,
        token2Address,
        lowerTick,
        token1Amount,
        upperTick,
        token2Amount,
        compareTokens
      ).then(() => setPayload(true));
    }
  };

  async function loadData(
    selectedFee: number,
    minToken1Amount: number,
    minToken2Amount: number,
    token1: string,
    token2: string,
    lowerTick: number,
    token1Amount: number,
    upperTick: number,
    token2Amount: number,
    compareTokens: boolean
  ) {
    const nonFungiblePositionManager = new ethers.Contract(
      nonFungiblePositionManagerAddr,
      abiINonfungiblePositionManager,
      provider
    ) as INonfungiblePositionManager;

    const token1ERC20 = new ethers.Contract(
      compareTokens ? token2 : token1,
      abiERC20,
      provider
    ) as ERC20;
    const token2ERC20 = new ethers.Contract(
      compareTokens ? token1 : token2,
      abiERC20,
      provider
    ) as ERC20;

    const tickLower = nearestUsableTick(
      TickMath.getTickAtSqrtRatio(
        encodeSqrtRatioX96(
          ethers.utils.parseUnits(lowerTick.toString(), "6").toString(),
          ethers.utils.parseEther("1").toString()
        )
      ),
      10
    );
    const tickUpper = nearestUsableTick(
      TickMath.getTickAtSqrtRatio(
        encodeSqrtRatioX96(
          ethers.utils.parseUnits(upperTick.toString(), "6").toString(),
          ethers.utils.parseEther("1").toString()
        )
      ),
      10
    );

    const decimalToken1 = await token1ERC20.decimals();
    const decimalToken2 = await token2ERC20.decimals();

    const finalToken1Amount = ethers.utils.parseUnits(
      token1Amount.toString(),
      compareTokens ? decimalToken2.toString() : decimalToken1.toString()
    );
    const finalToken2Amount = ethers.utils.parseUnits(
      token2Amount.toString(),
      compareTokens ? decimalToken1.toString() : decimalToken2.toString()
    );

    const minimalToken1Amount = ethers.utils.parseUnits(
      minToken1Amount.toString(),
      compareTokens ? decimalToken1.toString() : decimalToken2.toString()
    );
    const minimalToken2Amount = ethers.utils.parseUnits(
      minToken2Amount.toString(),
      compareTokens ? decimalToken2.toString() : decimalToken1.toString()
    );

    const finalUpperTick = compareTokens ? tickUpper : tickLower;

    const finalLowerTick = compareTokens ? tickLower : tickUpper;

    const result = await createProposalOpenPositionUniswap(
      minimalToken1Amount.toString(),
      minimalToken2Amount.toString(),
      selectedFee.toString(),
      token1ERC20,
      finalToken1Amount,
      token2ERC20,
      finalToken2Amount,
      nonFungiblePositionManager,
      finalLowerTick,
      finalUpperTick
    );
  }

  useEffect(() => {
    if (token2 !== undefined && token1.contract === token2.contract) {
      setToken2(undefined);
    }
  }, [token1]);

  return (
    <div>
      <div className="mx-10 flex items-center flex-col">
        <h2 className="flex justify-between w-full pt-8">
          <p className="flex flex-row items-center z-10 justify-between w-full">
            <span className="text-base text-start text-base md:text-2xl">
              Open LP Position
            </span>
          </p>
        </h2>
        <div className="flex my-10 w-full">
          <div className="flex justify-between w-full mt-4 flex-col">
            <div className="flex flex-row justify-between mb-10">
              <TokenSelector
                getToken={getToken1Selected}
                token0={token1}
                token1={token2}
              />
              <TokenSelector
                getToken={getToken2Selected}
                token0={token2}
                token1={token1}
              />
            </div>

            <div className="flex flex-col mb-2">
              <h1 className="font-semibold text-xl mb-2">Supply</h1>
              <label
                htmlFor="token1Amount"
                className="block text-sm font-medium leading-6 text-greenMatrix"
              >
                Amount
              </label>
              <div className="mt-2 flex flex-row bg-white rounded-lg border-2 border-white items-center">
                <input
                  value={token1Amount}
                  onChange={(e) => handleToken1AmountChange(e.target.value)}
                  onFocus={(e) =>
                    e.target.addEventListener(
                      "wheel",
                      function (e) {
                        e.preventDefault();
                      },
                      { passive: false }
                    )
                  }
                  step="any"
                  type="number"
                  name="token1Amount"
                  id="token1Amount"
                  autoComplete="family-name"
                  className="h-20 px-4 block w-full text-xl border-0 py-1.5 text-greenMatrix  placeholder:text-gray-400 sm:leading-6"
                />
                <Image
                  width={48}
                  height={48}
                  alt="Chain Image"
                  src={token1.image}
                  className="p-2 h-fit w-fit"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="token2Amount"
                className="block text-sm font-medium leading-6 text-greenMatrix"
              >
                Amount
              </label>
              <div className="mt-2 flex flex-row bg-white rounded-lg border-2 border-white items-center">
                <input
                  value={token2Amount}
                  onChange={(e) => handleToken2AmountChange(e.target.value)}
                  onFocus={(e) =>
                    e.target.addEventListener(
                      "wheel",
                      function (e) {
                        e.preventDefault();
                      },
                      { passive: false }
                    )
                  }
                  step="any"
                  type="number"
                  name="token2Amount"
                  id="token2Amount"
                  autoComplete="family-name"
                  className="h-20 px-4 block w-full text-xl border-0 py-1.5 text-greenMatrix  placeholder:text-gray-400 sm:leading-6"
                />
                {token2 && (
                  <Image
                    width={48}
                    height={48}
                    alt="Chain Image"
                    src={token2.image}
                    className="p-2 h-fit w-fit"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-4 flex-col">
            <div className="bg-beige p-8 rounded-lg">
              <h1 className="font-semibold text-xl mb-2">Threshold</h1>
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-4 row-span-2 ">
                <div className="sm:col-span-2 mt-4">
                  <label
                    htmlFor="lowerTick"
                    className="block text-sm font-medium leading-6 text-greenMatrix"
                  >
                    Upper price per {token1.symbol}
                  </label>
                  <div className="mt-2 flex flex-row bg-white rounded-lg border-2 border-white">
                    {token2 && (
                      <Image
                        width={50}
                        height={50}
                        alt="Chain Image"
                        src={token2.image}
                        className="p-2"
                      />
                    )}
                    <input
                      value={lowerTick}
                      onChange={(e) => handleLowerTickChange(e.target.value)}
                      onFocus={(e) =>
                        e.target.addEventListener(
                          "wheel",
                          function (e) {
                            e.preventDefault();
                          },
                          { passive: false }
                        )
                      }
                      step="any"
                      type="number"
                      name="lowerTick"
                      id="lowerTick"
                      autoComplete="family-name"
                      className=" px-4 block w-full  border-0 py-1.5 text-greenMatrix  placeholder:text-gray-400 text-xl sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 mt-4">
                  <label
                    htmlFor="upperTick"
                    className="block text-sm font-medium leading-6 text-greenMatrix"
                  >
                    Lower price per {token1.symbol}
                  </label>
                  <div className="mt-2 flex flex-row bg-white rounded-lg border-2 border-white">
                    {token2 && (
                      <Image
                        width={50}
                        height={50}
                        alt="Chain Image"
                        src={token2.image}
                        className="p-2"
                      />
                    )}
                    <input
                      value={upperTick}
                      onChange={(e) => handleUpperTickChange(e.target.value)}
                      onFocus={(e) =>
                        e.target.addEventListener(
                          "wheel",
                          function (e) {
                            e.preventDefault();
                          },
                          { passive: false }
                        )
                      }
                      step="any"
                      type="number"
                      name="upperTick"
                      id="upperTick"
                      autoComplete="family-name"
                      className=" px-4 block w-full  border-0 py-1.5 text-greenMatrix  placeholder:text-gray-400 text-xl sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 mt-4">
                  <label
                    htmlFor="minToken1Amount"
                    className="block text-sm font-medium leading-6 text-greenMatrix"
                  >
                    Minimal amount
                  </label>
                  <div className="mt-2 flex flex-row bg-white rounded-lg border-2 border-white">
                    {token2 && (
                      <Image
                        width={token2.symbol !== "USDC" ? 50 : 40}
                        height={token2.symbol !== "USDC" ? 50 : 40}
                        alt="Chain Image"
                        src={token1.image}
                        className="p-2"
                      />
                    )}

                    <input
                      value={minToken1Amount}
                      onChange={(e) =>
                        handleMinToken1AmountChange(e.target.value)
                      }
                      onFocus={(e) =>
                        e.target.addEventListener(
                          "wheel",
                          function (e) {
                            e.preventDefault();
                          },
                          { passive: false }
                        )
                      }
                      step="any"
                      type="number"
                      name="minToken1Amount"
                      id="minToken1Amount"
                      autoComplete="family-name"
                      className=" px-4 block w-full  border-0 py-1.5 text-greenMatrix  placeholder:text-gray-400 text-xl sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 mt-4">
                  <label
                    htmlFor="minToken2Amount"
                    className="block text-sm font-medium leading-6 text-greenMatrix"
                  >
                    Minimal amount
                  </label>
                  <div className="mt-2 flex flex-row bg-white rounded-lg border-2 border-white">
                    {token2 && (
                      <Image
                        width={50}
                        height={50}
                        alt="Chain Image"
                        src={token2.image}
                        className="p-2"
                      />
                    )}
                    <input
                      value={minToken2Amount}
                      onChange={(e) =>
                        handleMinToken2AmountChange(e.target.value)
                      }
                      onFocus={(e) =>
                        e.target.addEventListener(
                          "wheel",
                          function (e) {
                            e.preventDefault();
                          },
                          { passive: false }
                        )
                      }
                      step="any"
                      type="number"
                      name="minToken2Amount"
                      id="minToken2Amount"
                      autoComplete="family-name"
                      className=" px-4 block w-full  border-0 py-1.5 text-greenMatrix  placeholder:text-gray-400 text-xl sm:leading-6"
                    />
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="flex flex-row bg-beige p-8 rounded-lg">
              {fees.map((fee, index: number) => {
                return (
                  <div key={index}>
                    <FeeSelector
                      getFeeSelected={getFeeSelected}
                      fee={fee}
                      selectedFee={selectedFee}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-12">
          <GeneralButton
            className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
            disabled={
              token1 !== undefined &&
              token2 !== undefined &&
              minToken1Amount !== undefined &&
              minToken2Amount !== undefined &&
              lowerTick !== undefined &&
              token1Amount !== undefined &&
              upperTick !== undefined &&
              selectedFee !== undefined &&
              token2Amount !== undefined
                ? true
                : false
            }
            onClick={() => console.log("tx")}
          >
            Create Position
          </GeneralButton>
        </div>
      </div>
    </div>
  );
}
