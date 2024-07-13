import React from "react";

import Tokens from "../Modals/Content/Tokens";

import GeneralButton from "../Buttons/GeneralButton";
import { TokenInfo } from "../../config/types";
import { useModal } from "../Context/ModalContextProvider";
import { generalTokens } from "../../constants/constants";

interface TokenSelectorInterface {
  getToken: (token: TokenInfo) => void;
  token0?: any;
  token1?: any;
}

export default function TokenSelector({
  getToken,
  token0,
  token1,
}: TokenSelectorInterface) {
  const { setIsModalOpen, setContent, setTitle } = useModal();

  const tokensFiltered = generalTokens.filter(
    (t) => t.contract !== token0?.contract && t.contract !== token1?.contract
  );

  return (
    <GeneralButton
      onClick={() => {
        setIsModalOpen(true);
        setContent(
          <Tokens getToken={getToken} generalTokens={tokensFiltered} />
        );
        setTitle("Select Token");
      }}
      disabled={false}
      className={`px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold`}
    >
      {token0 ? (
        <div className="flex items-center justify-between py-2 px-5 w-full">
          {token0.image && (
            <img
              src={token0.image}
              alt={`${token0.symbol} image`}
              width={32}
              height={32}
              className="mr-[24px]"
            />
          )}
          <span className="w-full text-start">{token0.symbol}</span>
        </div>
      ) : (
        <span className="mx-auto py-4 px-6">Select Token</span>
      )}
    </GeneralButton>
  );
}
