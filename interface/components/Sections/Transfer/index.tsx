import React, { useState } from "react";
import { TokenInfo } from "../../../config/types";
import GeneralButton from "../../Buttons/GeneralButton";
import Tokens from "../../Modals/Content/Tokens";
import { generalTokens } from "../../../constants/constants";
import { useModal } from "../../Context/ModalContextProvider";
import { BigNumber, ethers } from "ethers";
import { useNotification } from "../../Context/NotificationContextProvider";
import { abiERC20 } from "../../../abis";
import { useLogin } from "../../Context/LoginContextProvider";

function TransferSection() {
  const { setIsModalOpen, setContent, setTitle } = useModal();
  const { paymasterSelected, safePack } = useLogin();

  const [token, setToken] = useState<TokenInfo | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [receiver, setReceiver] = useState<string | undefined>(undefined);
  const { showNotification } = useNotification();

  const getToken = (token: any) => {
    setToken(token);
  };

  const createTransferTx = async (
    token: TokenInfo | null,
    amount: number | undefined,
    receiver: string | undefined
  ) => {
    if (amount === undefined || receiver === undefined || token === null) {
      throw new Error("Error");
    }

    try {
      const provider1 = new ethers.providers.JsonRpcProvider(
        "https://docs.safe.global/home/4337-supported-networks"
      );
      showNotification({
        message: "Sending Transaction",
        type: "info",
      });

      const erc20Test = new ethers.Contract(
        token?.contract as string,
        abiERC20,
        provider1
      );

      const transaction1 = {
        to: token?.contract,
        data: erc20Test.interface.encodeFunctionData("approve", [
          paymasterSelected,
          ethers.utils.parseUnits(amount.toString(), token?.decimals),
        ]),
        value: BigNumber.from(0).toString(),
      };

      const transaction2 = {
        to: token?.contract,
        data: erc20Test.interface.encodeFunctionData("transfer", [
          receiver,
          ethers.utils.parseUnits(amount.toString(), token?.decimals),
        ]),
        value: BigNumber.from(0).toString(),
      };

      const transactions = [transaction1, transaction2];

      const safeOperation = await safePack.createTransaction({
        transactions,
      });
      const signedSafeOperation = await safePack.signSafeOperation(
        safeOperation
      );
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
        setAmount(0);
        setReceiver("");
      }
    } catch (err: any) {
      console.log(err);
      showNotification({
        message: "Approve transaction error",
        type: "error",
      });
    }
  };

  return (
    <main className="w-fit text-lg text-center bg-secondary cardStakingIntegration lg:mb-[37px] md:mb-[20px] mb-[10px] rounded-2xl min-w-[297px] pb-[23px] mx-auto rounded-lg p-10">
      <h2 className="mb-4 md:text-2xl">Transfer</h2>
      <div className="flex gap-x-10 items-center min-h-[5rem] pb-4 mt-8">
        <GeneralButton
          onClick={() => {
            setIsModalOpen(true);
            setContent(
              <Tokens getToken={getToken} generalTokens={generalTokens} />
            );
            setTitle("Select Token");
          }}
          disabled={false}
          className={`py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold w-[15rem] -mb-2`}
        >
          {token ? (
            <span className="flex items-center justify-between py-2 px-5">
              {token.image && (
                <img
                  src={token.image}
                  alt={`${token.symbol} image`}
                  width={32}
                  height={32}
                  className="rounded-full"
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
        <div className="flex flex-col text-greenMatrix text-start">
          <span>Amount</span>
          <input
            type="number"
            value={amount}
            min={0}
            max={20}
            step={1 / 10 ** 18}
            onChange={(e) => {
              if (Number(e.target.value) >= 0) {
                setAmount(Number(e.target.value));
              } else {
                setAmount(0);
              }
            }}
            placeholder="0"
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            className={`rounded-xl px-4 w-full bg-gray-300 text-main pr-8 py-1 font-light h-[46px] ring-0 focus:ring-0 outline-0 w-[20rem] ${
              token === null && "opacity-50"
            }`}
            disabled={token === null}
          />
        </div>
      </div>
      <div className="flex flex-col text-greenMatrix text-start mt-8">
        <span className="mb-2">Receiver</span>
        <input
          type="text"
          value={receiver}
          onChange={(e) => {
            setReceiver(e.target.value);
          }}
          placeholder="0x3954...1hb5"
          className={`rounded-xl px-4 w-full bg-gray-300 text-main pr-8 py-1 font-light h-[46px] ring-0 focus:ring-0 outline-0 w-[20rem] ${
            token === null && "opacity-50"
          }`}
          disabled={token === null}
        />
      </div>
      <GeneralButton
        onClick={async () => {
          createTransferTx(token, amount, receiver);
        }}
        disabled={
          token === null ||
          amount === undefined ||
          receiver === undefined ||
          paymasterSelected === null ||
          receiver === ""
        }
        className={`mt-12 px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold ${
          (token === null ||
            amount === undefined ||
            receiver === undefined ||
            paymasterSelected === null ||
            receiver === "") &&
          "opacity-50"
        }`}
      >
        Transfer
      </GeneralButton>
    </main>
  );
}

export default TransferSection;
