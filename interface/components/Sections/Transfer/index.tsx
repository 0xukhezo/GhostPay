import React, { useState } from "react";
import { TokenInfo } from "../../../config/types";

function TransferSection() {
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [receiver, setReceiver] = useState<string | null>(null);

  return (
    <main className="w-fit text-lg text-center bg-secondary cardStakingIntegration lg:mb-[37px] md:mb-[20px] mb-[10px] rounded-2xl min-w-[297px] pb-[23px] mx-auto rounded-lg py-10">
      <div className="mb-2">Transfer</div>
    </main>
  );
}

export default TransferSection;
