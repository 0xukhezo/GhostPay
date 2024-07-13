"use client";

import React from "react";

import Spinner from "../Spinner";

import { integrations } from "../../constants/constants";

import { useFetchPaymaster } from "../../hooks/usePaymasters";

function HomeFeed() {
  const { paymasters, loading } = useFetchPaymaster();

  return (
    <main className="mt-10">
      <p className="text-xl mb-10">Welcome to GhostPay!</p>
      <div className="grid grid-cols-3 gap-y-8 gap-x-20">
        <div className="text-center bg-secondary rounded-2xl rounded-lg px-10 py-6 font-light text-2xl text-greenMatrix">
          <h2>Total Paymasters</h2>
          <p className="mt-4">
            {loading ? <Spinner /> : <span>{paymasters.length}</span>}
          </p>
        </div>
        <div className="text-center bg-secondary rounded-2xl rounded-lg px-10 py-6 font-light text-2xl text-greenMatrix">
          <h2>Total Integrations</h2>
          <p className="mt-4">{integrations.length}</p>
        </div>
        <div className="text-center bg-secondary rounded-2xl rounded-lg px-10 py-6 font-light text-2xl text-greenMatrix">
          <h2>Total Users</h2>
          <p className="mt-4">+100</p>
        </div>
      </div>
    </main>
  );
}

export default HomeFeed;
