"use client";

import React from "react";
import PaymasterCard from "../Cards/PaymasterCard";

import { useFetchPaymaster } from "../../hooks/usePaymasters";
import Spinner from "../Spinner";

function PaymastersFeed() {
  const { paymasters, loading } = useFetchPaymaster();

  return (
    <main className="p-10">
      <div className="grid grid-cols-10 pb-1 border-b-1 border-greenMatrix px-10">
        <span></span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Name
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Token
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Fee
        </span>
        <span className="text-base md:text-xl flex justify-center col-span-2">
          Owner
        </span>
      </div>
      <div className="mt-4">
        {!loading ? (
          paymasters.length !== 0 ? (
            paymasters.map((paymaster: any, index: number) => {
              return (
                <PaymasterCard
                  key={`${paymaster.title}-${index}`}
                  index={index}
                  paymaster={paymaster}
                  allowFavorites
                />
              );
            })
          ) : (
            <div>pepe</div>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
}

export default PaymastersFeed;
