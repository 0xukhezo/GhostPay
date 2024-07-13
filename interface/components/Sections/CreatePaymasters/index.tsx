"use client";

import React, { useEffect, useState } from "react";
// Constants
import {
  entrypointBaseContract,
  factoryPaymasterContract,
  generalTokens,
  initialSteps,
} from "../../../constants/constants";
import { redirect } from "next/navigation";
import { TokenInfo } from "../../../config/types";
import { useModal } from "../../Context/ModalContextProvider";
import GeneralButton from "../../Buttons/GeneralButton";
import Tokens from "../../Modals/Content/Tokens";
import Steps from "../../Steps/Steps";
import { useLogin } from "../../Context/LoginContextProvider";
import { BigNumber, ethers } from "ethers";
import { abiGhostPayFactory, abiPaymaster } from "../../../abis";
import { useNotification } from "../../Context/NotificationContextProvider";

function CreatePaymasters() {
  const [steps, setSteps] = useState(initialSteps);
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [loadingTx, setLoadingTx] = useState<boolean>(false);

  const { setIsModalOpen, setContent, setTitle } = useModal();
  const { safePack, smartAccount } = useLogin();
  const { showNotification } = useNotification();

  const getToken = (token: any) => {
    setToken(token);
  };

  const createPaymasterTx = async (
    token: TokenInfo | null,
    price: number | undefined
  ) => {
    const provider1 = new ethers.providers.JsonRpcProvider(
      "https://docs.safe.global/home/4337-supported-networks"
    );
    setLoadingTx(true);
    showNotification({
      message: "Sending Transaction",
      type: "info",
    });
    const ghostPayFactoryContract = new ethers.Contract(
      factoryPaymasterContract,
      abiGhostPayFactory,
      provider1
    );

    const tokenERC = token?.contract;
    const oracle = token?.oracle;
    const ethOracle = "0xea347Db6ef446e03745c441c17018eF3d641Bc8f";
    const fee = price ? price : 1;

    const transaction1 = {
      to: factoryPaymasterContract, //factory
      data: ghostPayFactoryContract.interface.encodeFunctionData("deploy", [
        tokenERC,
        oracle,
        ethOracle,
        smartAccount,
        900000,
        1000000 + fee * 10000,
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
      if (userOperationReceipt) {
        showNotification({
          message: "Success! Your custom paymaster has been created",
          type: "success",
        });
      }
    }
  };

  const approveTx = async () => {
    const provider1 = new ethers.providers.JsonRpcProvider(
      "https://docs.safe.global/home/4337-supported-networks"
    );

    const erc20Abi = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "allowance", type: "uint256" },
          { internalType: "uint256", name: "needed", type: "uint256" },
        ],
        name: "ERC20InsufficientAllowance",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "balance", type: "uint256" },
          { internalType: "uint256", name: "needed", type: "uint256" },
        ],
        name: "ERC20InsufficientBalance",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "approver", type: "address" },
        ],
        name: "ERC20InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "receiver", type: "address" },
        ],
        name: "ERC20InvalidReceiver",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "sender", type: "address" }],
        name: "ERC20InvalidSender",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "spender", type: "address" }],
        name: "ERC20InvalidSpender",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const erc20Test = new ethers.Contract(
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      erc20Abi,
      provider1
    );

    const transaction1 = {
      to: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      data: erc20Test.interface.encodeFunctionData("approve", [
        "0xCa6b636dFEd85Db72123DCFfeC5B1BDbE5022368",
        10000000,
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
      showNotification({
        message: "Approve transaction success",
        type: "success",
      });
    }
  };

  const createApproveTx = async () => {
    const provider1 = new ethers.providers.JsonRpcProvider(
      "https://docs.safe.global/home/4337-supported-networks"
    );

    const erc20Abi = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "allowance", type: "uint256" },
          { internalType: "uint256", name: "needed", type: "uint256" },
        ],
        name: "ERC20InsufficientAllowance",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "balance", type: "uint256" },
          { internalType: "uint256", name: "needed", type: "uint256" },
        ],
        name: "ERC20InsufficientBalance",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "approver", type: "address" },
        ],
        name: "ERC20InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "receiver", type: "address" },
        ],
        name: "ERC20InvalidReceiver",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "sender", type: "address" }],
        name: "ERC20InvalidSender",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "spender", type: "address" }],
        name: "ERC20InvalidSpender",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const erc20Test = new ethers.Contract(
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      erc20Abi,
      provider1
    );

    const transaction1 = {
      to: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      data: erc20Test.interface.encodeFunctionData("approve", [
        "0xCa6b636dFEd85Db72123DCFfeC5B1BDbE5022368",
        10000000,
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
      <h2 className="pb-1 flex flex-col justify-between w-full pt-8">
        <p className="flex flex-row items-center z-10 justify-between w-full">
          <span className="text-base text-start text-base md:text-2xl">
            Create Paymaster
          </span>
        </p>
        <div className="text-gray-400 mt-4">
          In order to create a paymaster you need to enter the ERC-20 token you
          would like users to pay gas with. You can also set the a custom fee
          inventivizing the use of the token.
        </div>
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
            max={20}
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
          approveTx();
        }}
        disabled={false}
        className={`px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold`}
      >
        approve
      </GeneralButton>
      <GeneralButton
        onClick={() => {
          createPaymasterTx(token, price);
        }}
        disabled={token === null || price === undefined || loadingTx}
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
