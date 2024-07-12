"use client";

import React from "react";
import Image from "next/image";
// Types
import { IntegrationType } from "../../config/types";

type IntegrationCardProps = {
  integration: IntegrationType;
};

function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <main className="cursor-pointer py-8 text-lg text-center bg-secondary cardStakingHover lg:mb-[37px] md:mb-[20px] mb-[10px] rounded-2xl min-w-[297px] pb-[23px] mx-auto rounded-lg  border border-solid hover:border-greenMatrix border-transparent hover:transition-all hover:duration-1000 ">
      <Image
        width={108}
        height={54}
        alt="Token Image"
        src={integration.image}
        className="mx-auto rounded-full mb-8"
      />
      <div className="kyvivLight mt-3 mb-2">{integration.name}</div>
      <div className="my-10 flex flex-row items-center justify-center">
        <span className="bg-greenMatrix h-2.5 w-2.5 rounded-full mr-2 animate-pulse duration-2000 delay-500"></span>
        <span>Integration is live</span>
      </div>
      <div className="text-greenMatrix">View Details</div>
    </main>
  );
}

export default IntegrationCard;
