"use client";

import React from "react";
import { useLogin } from "../../Context/LoginContextProvider";
import { abbreviateEthereumAddress } from "../../../utils/utils";
import Spinner from "../../Spinner";

function Navbar() {
  const { smartAccount } = useLogin();

  return (
    <div className="bg-main sticky top-0 z-50 py-5 border-b-1 border-greenMatrix px-8 flex justify-between text-lg items-center h-fit">
      <p>
        <span>Actual Paymaster:</span>
        <span className="text-greenMatrix font-semibold ml-2">Pepito</span>
      </p>
      {smartAccount ? (
        <p className="font-semibold">
          {abbreviateEthereumAddress(smartAccount)}
        </p>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Navbar;
