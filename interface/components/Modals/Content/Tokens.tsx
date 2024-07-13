"use client";
// React
import React, { useEffect, useState } from "react";
// Types
import { TokenInfo } from "../../../config/types";
// Components
import TokenCard from "../../Cards/TokenCard";
import SearchBar from "../../Inputs/SearchBar";
// Constants
import {} from "../../../constants/constants";
// Context
import { useModal } from "../../Context/ModalContextProvider";

type TokensProps = {
  getToken: (token: TokenInfo) => void;
  generalTokens: TokenInfo[];
};

export default function Tokens({ getToken, generalTokens }: TokensProps) {
  const { setIsModalOpen } = useModal();
  const [tokens, setTokens] = useState<TokenInfo[]>([...generalTokens]);
  const [search, setSearch] = useState<string>("");

  const getInfo = (query: string) => {
    setSearch(query);
  };

  useEffect(() => {
    let copy = [...generalTokens];
    if (search.length !== 0) {
      copy = copy.filter(
        (token: TokenInfo) =>
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.contract.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTokens(copy);
  }, [search]);

  const selectToken = (token: TokenInfo) => {
    setIsModalOpen(false);
    getToken(token);
  };

  return (
    <div className="sm:flex flex-col sm:items-start mt-[2vh]">
      <SearchBar
        getInfo={getInfo}
        query={search}
        classMain="rounded-xl text-black px-[22px] items-center w-full  outline-none placeholder:text-black bg-white flex border-1 border-main my-[16px] "
        placeholder="Search token or paste address"
      />
      <div className="w-full overflow-y-auto h-[50vh] text-main">
        {tokens.map((token: TokenInfo, index: number) => (
          <TokenCard token={token} onClick={selectToken} key={index} />
        ))}
      </div>
    </div>
  );
}
