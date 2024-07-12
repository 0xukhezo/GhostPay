"use client";

import React from "react";
import PaymasterCard from "../Cards/PaymasterCard";
import { paymasters } from "../../constants/constants";

function PaymastersFeed() {
  return (
    <main className="p-10">
      <div className="grid grid-cols-9 pb-1 border-b-1 border-greenMatrix px-10">
        <span></span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Name
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Token
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Price
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Owner
        </span>
      </div>
      <div className="mt-4">
        {paymasters.map((paymaster: any, index: number) => {
          return (
            <PaymasterCard
              key={`${paymaster.title}-${index}`}
              index={index}
              paymaster={paymaster}
              allowFavorites
            />
          );
        })}
      </div>
    </main>
  );
}

export default PaymastersFeed;
