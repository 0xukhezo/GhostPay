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

type PaymasterCardProps = {
  paymaster: any;
  index: number;
  allowFavorites?: boolean;
};
function PaymasterCard({
  paymaster,
  index,
  allowFavorites,
}: PaymasterCardProps) {
  const { favoritesPaymasters, setFavoritesPaymasters } = useGeneral();

  const token = generalTokens.filter(
    (token: TokenInfo) => token.contract === paymaster.token
  );
  const isFavorite = favoritesPaymasters.some(
    (fav) => fav.title === paymaster.title
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = favoritesPaymasters.filter(
        (fav) => fav.title !== paymaster.title
      );
      setFavoritesPaymasters(updatedFavorites);
    } else {
      setFavoritesPaymasters([...favoritesPaymasters, paymaster]);
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
      <span className="flex justify-center col-span-2">{paymaster.title}</span>
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
        {paymaster.price} {token[0].symbol} / gwei
      </span>
      <Link
        href={`/profile/${paymaster.owner}`}
        className="flex justify-center hover:text-greenMatrix col-span-2"
      >
        {abbreviateEthereumAddress(paymaster.owner)}
      </Link>
      <GeneralButton
        onClick={() => {
          console.log("paymaster tx");
        }}
        className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
      >
        Select
      </GeneralButton>
    </main>
  );
}

export default PaymasterCard;
