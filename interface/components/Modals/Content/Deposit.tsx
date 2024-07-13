import React, { useState } from "react";
import { PaymasterInfo, TokenInfo } from "../../../config/types";
import { useNotification } from "../../Context/NotificationContextProvider";
import { useLogin } from "../../Context/LoginContextProvider";
import { useModal } from "../../Context/ModalContextProvider";
import { BigNumber, ethers } from "ethers";
import { entrypointBaseContract } from "../../../constants/constants";
import { abiEntryPoint } from "../../../abis";
import GeneralButton from "../../Buttons/GeneralButton";

type DepositProps = {
  paymaster: PaymasterInfo;
};
function Deposit({ paymaster }: DepositProps) {
  const [amountToFunds, setAmountToFunds] = useState<number | undefined>(
    undefined
  );
  const { safePack } = useLogin();
  const { showNotification } = useNotification();
  const { setIsModalOpen } = useModal();

  const createDepositTx = async () => {
    const entrypointInterface = new ethers.utils.Interface(abiEntryPoint);

    showNotification({
      message: "Sending Transaction",
      type: "info",
    });

    try {
      const transaction1 = {
        to: entrypointBaseContract,
        data: entrypointInterface.encodeFunctionData("depositTo", [
          paymaster.id,
        ]),
        value: amountToFunds
          ? ethers.utils.parseEther(amountToFunds.toString()).toString()
          : "0",
      };

      const transactions = [transaction1];
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

        if (userOperationReceipt) {
          showNotification({
            message: "Transaction success",
            type: "success",
          });
          setIsModalOpen(false);
        }
      }
    } catch (error: any) {
      showNotification({
        message: "Transaction error",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-start">
        <span className="mb-2">ETH amount</span>
        <input
          type="number"
          value={amountToFunds}
          min={0}
          max={20}
          step={1 / 10 ** 18}
          onChange={(e) => {
            if (Number(e.target.value) >= 0) {
              setAmountToFunds(Number(e.target.value));
            } else {
              setAmountToFunds(0);
            }
          }}
          placeholder="0"
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          className={`rounded-xl px-4 w-full bg-gray-300 text-main pr-8 py-1 font-light h-[46px] ring-0 focus:ring-0 outline-0 w-[20rem] `}
        />
      </div>
      <GeneralButton
        onClick={() => {
          createDepositTx();
        }}
        className="mt-10 w-fit mx-auto px-8 py-4 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
      >
        Deposit ETH
      </GeneralButton>
    </div>
  );
}

export default Deposit;
