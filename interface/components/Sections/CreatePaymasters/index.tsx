"use client";

import React, { useEffect, useState } from "react";
// Constants
import { initialSteps } from "../../../constants/constants";
import { TokenInfo } from "../../../config/types";
import { useModal } from "../../Context/ModalContextProvider";
import GeneralButton from "../../Buttons/GeneralButton";
import Tokens from "../../Modals/Content/Tokens";
import Steps from "../../Steps/Steps";
import { useLogin } from "../../Context/LoginContextProvider";
import { BigNumber, ethers } from "ethers";

function CreatePaymasters() {
  const [steps, setSteps] = useState(initialSteps);
  const [paymasterTitle, setPaymasterTitle] = useState<undefined | string>(
    undefined
  );
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const { setIsModalOpen, setContent, setTitle } = useModal();
  const { safePack, smartAccount, web3AuthAddress } = useLogin();

  const getToken = (token: any) => {
    setToken(token);
  };

  const createTx = async () => {
    const provider1 = new ethers.providers.JsonRpcProvider(
      "https://arb-sepolia.g.alchemy.com/v2/NzY910Zxytaw0YxgmwYG6CzhYWM6YkyZ"
    );

    const ghostPayFactoryAbi = [
      {
        type: "constructor",
        inputs: [
          {
            name: "_entryPoint",
            type: "address",
            internalType: "contract IEntryPoint",
          },
          {
            name: "_refundPostOpCost",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "_selfKisser",
            type: "address",
            internalType: "contract ISelfKisser",
          },
          {
            name: "_stalenessThreshold",
            type: "uint32",
            internalType: "uint32",
          },
        ],
        stateMutability: "nonpayable",
      },
      {
        type: "function",
        name: "deploy",
        inputs: [
          {
            name: "_token",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "_tokenOracle",
            type: "address",
            internalType: "contract IChronicle",
          },
          {
            name: "_nativeAssetOracle",
            type: "address",
            internalType: "contract IChronicle",
          },
          { name: "_owner", type: "address", internalType: "address" },
          { name: "_priceMarkupLimit", type: "uint32", internalType: "uint32" },
          { name: "_priceMarkup", type: "uint32", internalType: "uint32" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
      },
      {
        type: "function",
        name: "entryPoint",
        inputs: [],
        outputs: [
          { name: "", type: "address", internalType: "contract IEntryPoint" },
        ],
        stateMutability: "view",
      },
      {
        type: "function",
        name: "refundPostOpCost",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
      },
      {
        type: "function",
        name: "selfKisser",
        inputs: [],
        outputs: [
          { name: "", type: "address", internalType: "contract ISelfKisser" },
        ],
        stateMutability: "view",
      },
      {
        type: "function",
        name: "stalenessThreshold",
        inputs: [],
        outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
        stateMutability: "view",
      },
      {
        type: "event",
        name: "NewPaymaster",
        inputs: [
          {
            name: "paymaster",
            type: "address",
            indexed: true,
            internalType: "address",
          },
          {
            name: "owner",
            type: "address",
            indexed: true,
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            indexed: true,
            internalType: "address",
          },
          {
            name: "priceMarkup",
            type: "uint32",
            indexed: false,
            internalType: "uint32",
          },
        ],
        anonymous: false,
      },
    ];

    const ghostPayFactoryContract = new ethers.Contract(
      "0xA2CE42652BA16Bf812f4e46BBA93ec3605DcceD2",
      ghostPayFactoryAbi,
      provider1
    );

    const tokenERC = "0x25466530DE4e382EcBc0834ADFA3CaF158A451dA";
    const oracle = "0x3F982a82B4B6bd09b1DAF832140F166b595FEF7F";
    const ethOracle = "0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603";

    const transaction1 = {
      to: "0xA2CE42652BA16Bf812f4e46BBA93ec3605DcceD2", //factory
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
    if (paymasterTitle && token === null)
      setSteps([
        {
          name: "Name your Paymaster",
          description: "Name your paymaster to find it easily",
          status: "complete",
        },
        {
          name: "Select Token",
          description:
            "Your paymaster will receive this token for pay gas fees.",
          status: "current",
        },
        {
          name: "Select price",
          description:
            "This is the price of the selected token you are going to receive per gwei.",
          status: "upcoming",
        },
      ]);
  }, [paymasterTitle]);

  useEffect(() => {
    if (token && price === undefined)
      setSteps([
        {
          name: "Name your Paymaster",
          description: "Name your paymaster to find it easily",
          status: "complete",
        },
        {
          name: "Select Token",
          description:
            "Your paymaster will receive this token for pay gas fees.",
          status: "complete",
        },
        {
          name: "Select price",
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
          name: "Name your Paymaster",
          description: "Name your paymaster to find it easily",
          status: "complete",
        },
        {
          name: "Select Token",
          description:
            "Your paymaster will receive this token for pay gas fees.",
          status: "complete",
        },
        {
          name: "Select price",
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
      <div className="px-10 pt-8 pb-20 grid grid-cols-2 gap-x-6">
        <Steps steps={steps} />
        <div className="flex flex-col justify-between items-start">
          <input
            type="text"
            value={paymasterTitle}
            onChange={(e) => setPaymasterTitle(e.target.value)}
            placeholder="GhostPay Paymaster"
            className="rounded-xl px-4 w-full bg-gray-300 text-main pr-8 py-1 font-light h-[46px] ring-0 focus:ring-0 outline-0 w-[20rem]"
          />
          <GeneralButton
            onClick={() => {
              setIsModalOpen(true);
              setContent(<Tokens getToken={getToken} />);
              setTitle("Select Token");
            }}
            disabled={paymasterTitle === undefined || paymasterTitle === ""}
            className={`px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold ${
              paymasterTitle === undefined && "opacity-50"
            }`}
          >
            {token ? (
              <div className="flex items-center justify-between py-2 px-5 w-full">
                {token.image && (
                  <img
                    src={token.image}
                    alt={`${token.symbol} image`}
                    width={32}
                    height={32}
                    className="mr-[24px]"
                  />
                )}
                <span className="w-full text-start">{token.symbol}</span>
              </div>
            ) : (
              <span className="mx-auto py-4 px-6">Select Token</span>
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
          createTx();
        }}
        disabled={paymasterTitle === undefined || paymasterTitle === ""}
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
