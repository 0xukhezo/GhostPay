"use client";

import Link from "next/link";
import React from "react";
// Heroicons
import { StarIcon } from "@heroicons/react/24/solid";
// Components
import { useGeneral } from "../Context/GeneralContextProvider";
import GeneralButton from "../Buttons/GeneralButton";
// Types
import { TokenInfo } from "../../config/types";
// Constants
import { generalTokens } from "../../constants/constants";
import { abbreviateEthereumAddress } from "../../utils/utils";
import { useLogin } from "../Context/LoginContextProvider";
import { ethers } from "ethers";
import { abiEntryPoint, abiPaymaster } from "../../abis";
import { useNotification } from "../Context/NotificationContextProvider";

type PaymasterCardProps = {
  paymaster: any;
  index: number;
  allowFavorites?: boolean;
  profile: boolean;
};
function PaymasterCard({
  paymaster,
  index,
  allowFavorites,
  profile,
}: PaymasterCardProps) {
  const { favoritesPaymasters, setFavoritesPaymasters } = useGeneral();
  const { changePaymaster, safePack, smartAccount } = useLogin();
  const { showNotification } = useNotification();

  const token = generalTokens.filter(
    (token: TokenInfo) =>
      token.contract.toLowerCase() === paymaster.token.toLowerCase()
  );

  const isFavorite = favoritesPaymasters.some((fav) => fav.id === paymaster.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = favoritesPaymasters.filter(
        (fav) => fav.id !== paymaster.id
      );
      setFavoritesPaymasters(updatedFavorites);
    } else {
      setFavoritesPaymasters([...favoritesPaymasters, paymaster]);
    }
  };

  const createDepositTx = async (amountToFunds: string) => {
    const entrypointInterface = new ethers.utils.Interface(abiEntryPoint);
    const paymasterInterface = new ethers.utils.Interface(abiPaymaster);

    showNotification({
      message: "Sending Transaction",
      type: "info",
    });

    try {
      const transaction1 = {
        to: process.env.NEXT_PUBLIC_ENTRYPOINT,
        data: entrypointInterface.encodeFunctionData("depositTo", [
          paymaster.id,
        ]),
        value: amountToFunds,
      };

      // const transaction2 = {
      //   to: paymaster.id,
      //   data: paymasterInterface.encodeFunctionData("addStake", [1]),
      //   value: amountToFunds,
      // };

      const transactions = [transaction1];

      const safeOperation = await safePack.createTransaction({ transactions });
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
    <main
      className={`grid ${
        allowFavorites ? "grid-cols-10" : "grid-cols-9"
      } items-center rounded-xl py-6 my-2 px-10 ${
        index % 2 === 0 && "bg-gray-700"
      }`}
    >
      {allowFavorites && (
        <StarIcon
          className={`h-6 w-6 flex justify-center cursor-pointer ${
            isFavorite ? "text-yellow-300" : "hover:text-yellow-300"
          }`}
          aria-hidden="true"
          onClick={handleToggleFavorite}
        />
      )}
      <span className="flex justify-center col-span-2">
        Paymaster-{token[0].symbol}
      </span>
      <span className="flex justify-center col-span-2">
        {token[0].image && (
          <img
            src={token[0].image}
            alt={`${token[0].symbol} image`}
            width={32}
            height={32}
          />
        )}
      </span>
      <span className="flex justify-center col-span-2">
        {Number(paymaster.price) - 1000000 === 0 ? (
          <span>No commision</span>
        ) : (
          <span>{(Number(paymaster.price) - 1000000) / 10 ** 4} %</span>
        )}
      </span>
      <Link
        href={`/profile/${paymaster.owner}`}
        className="flex justify-center hover:text-greenMatrix col-span-2"
      >
        {abbreviateEthereumAddress(paymaster.owner)}
      </Link>
      {!profile && (
        <GeneralButton
          onClick={async () => {
            showNotification({
              message: "Selecting paymaster",
              type: "info",
            });
            await changePaymaster(paymaster.id);
            showNotification({
              message: "Paymaster selected",
              type: "success",
            });
          }}
          className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
        >
          Select
        </GeneralButton>
      )}
      {smartAccount &&
        paymaster.owner.toLowerCase() === smartAccount.toLowerCase() &&
        profile && (
          <GeneralButton
            onClick={() => {
              createDepositTx(ethers.utils.parseEther("0.0001").toString());
            }}
            className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
          >
            Deposit 0.001 ETH
          </GeneralButton>
        )}
    </main>
  );
}

export default PaymasterCard;
