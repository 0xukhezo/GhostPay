"use client";
import React from "react";

import Link from "next/link";
import GeneralButton from "../../Buttons/GeneralButton";
import PaymastersFeed from "../../Feeds/PaymastersFeed";

function Paymasters() {
  return (
    <main className="fade-in">
      <h2 className="flex justify-between w-full pt-8">
        <p className="flex flex-row items-center z-10 justify-between w-full">
          <span className="text-base text-start text-base md:text-2xl">
            Paymasters
          </span>
          <Link href="/paymasters/create">
            <GeneralButton
              className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
              disabled={false}
            >
              Create +
            </GeneralButton>
          </Link>
        </p>
      </h2>
      <PaymastersFeed />
    </main>
  );
}

export default Paymasters;
