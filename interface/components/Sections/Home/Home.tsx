"use client";

import React from "react";
import HomeFeed from "../../Feeds/HomeFeed";

function Home() {
  return (
    <main className="fade-in">
      <h2 className="flex justify-between w-full pt-8 text-base text-start text-base md:text-2xl">
        GhostPay
      </h2>
      <HomeFeed />
    </main>
  );
}

export default Home;
