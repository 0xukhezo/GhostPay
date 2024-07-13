"use client";

import React, { useEffect, useState } from "react";
// Constants
import {
  factoryPaymasterContract,
  generalTokens,
  initialSteps,
} from "../../../constants/constants";
import { TokenInfo } from "../../../config/types";
import { useModal } from "../../Context/ModalContextProvider";
import GeneralButton from "../../Buttons/GeneralButton";
import Tokens from "../../Modals/Content/Tokens";
import Steps from "../../Steps/Steps";
import { useLogin } from "../../Context/LoginContextProvider";
import { BigNumber, ethers } from "ethers";
import { ghostPayFactoryAbi } from "../../../abis";

function CreatePaymasters() {
  const [steps, setSteps] = useState(initialSteps);
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const { setIsModalOpen, setContent, setTitle } = useModal();
  const { safePack, smartAccount } = useLogin();

  const getToken = (token: any) => {
    setToken(token);
  };

  const createTx = async (token: TokenInfo | null) => {
    const provider1 = new ethers.providers.JsonRpcProvider(
      "https://docs.safe.global/home/4337-supported-networks"
    );

    const ghostPayFactoryContract = new ethers.Contract(
      factoryPaymasterContract,
      ghostPayFactoryAbi,
      provider1
    );

    const tokenERC = token?.contract; // token que seleciona
    const oracle = token?.oracle; // variable
    const ethOracle = "0xea347Db6ef446e03745c441c17018eF3d641Bc8f";

    const transaction1 = {
      to: factoryPaymasterContract, //factory
      data: ghostPayFactoryContract.interface.encodeFunctionData("deploy", [
        tokenERC,
        oracle,
        ethOracle,
        smartAccount,
        1200000,
        1000000,
      ]),
      value: BigNumber.from(0).toString(),
    };

    const transactions = [transaction1];

    const safeOperation = await safePack.createTransaction({ transactions });
    const signedSafeOperation = await safePack.signSafeOperation(safeOperation);
    const userOperationHash = await safePack.executeTransaction({
      executable: signedSafeOperation,
    });
    let userOperationReceipt = null;

    while (!userOperationReceipt) {
      // Wait 2 seconds before checking the status again
      await new Promise((resolve) => setTimeout(resolve, 2000));
      userOperationReceipt = await safePack.getUserOperationReceipt(
        userOperationHash
      );
    }
  };

  useEffect(() => {
    if (token && price === undefined)
      setSteps([
        {
          name: "Select Token",
          description:
            "Your paymaster will receive this token for pay gas fees.",
          status: "complete",
        },
        {
          name: "Select Fee",
          description:
            "This is the price of the selected token you are going to receive per gwei.",
          status: "current",
        },
      ]);
  }, [token]);

  useEffect(() => {
    if (price !== undefined)
      setSteps([
        {
          name: "Select Token",
          description:
            "Your paymaster will receive this token for pay gas fees.",
          status: "complete",
        },
        {
          name: "Select Fee",
          description:
            "This is the price of the selected token you are going to receive per gwei.",
          status: "complete",
        },
      ]);
  }, [price]);

  return (
    <div className="fade-in flex flex-col items-center">
      <h2 className="pb-1 flex justify-between w-full pt-8 ">
        <p className="flex flex-row items-center z-10 justify-between w-full">
          <span className="text-base text-start text-base md:text-2xl">
            Create Paymaster
          </span>
        </p>
      </h2>
      <div className="pt-8 pb-20 grid grid-cols-4 gap-x-6 px-40">
        <div className="col-span-2">
          <Steps steps={steps} />
        </div>

        <div className="flex flex-col justify-between col-span-2">
          <GeneralButton
            onClick={() => {
              setIsModalOpen(true);
              setContent(
                <Tokens getToken={getToken} generalTokens={generalTokens} />
              );
              setTitle("Select Token");
            }}
            disabled={false}
            className={`py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold w-[15rem]`}
          >
            {token ? (
              <span className="flex items-center justify-between py-2 px-5">
                {token.image && (
                  <img
                    src={token.image}
                    alt={`${token.symbol} image`}
                    width={32}
                    height={32}
                  />
                )}
                <span className="text-start">{token.symbol}</span>
              </span>
            ) : (
              <span className="flex items-center justify-center text-center mx-auto py-2 px-5">
                Select Token
              </span>
            )}
          </GeneralButton>
          <input
            type="number"
            value={price}
            min={0}
            step={1 / 10 ** 18}
            onChange={(e) => {
              if (Number(e.target.value) >= 0) {
                setPrice(Number(e.target.value));
              } else {
                setPrice(0);
              }
            }}
            placeholder="0"
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            className={`rounded-xl px-4 w-full bg-gray-300 text-main pr-8 py-1 font-light h-[46px] ring-0 focus:ring-0 outline-0 w-[20rem] ${
              token === null && "opacity-50"
            }`}
            disabled={token === null}
          />{" "}
        </div>
      </div>
      <GeneralButton
        onClick={() => {
          createTx(token);
        }}
        disabled={token === null || price === undefined}
        className={`px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold ${
          price === undefined && "opacity-50"
        }`}
      >
        Create Paymaster
      </GeneralButton>
    </div>
  );
}

export default CreatePaymasters;
