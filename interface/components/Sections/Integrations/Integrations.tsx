"use client";

// React
import React from "react";
// Components
import GeneralButton from "../../Buttons/GeneralButton";
import IntegrationsFeed from "../../Feeds/IntegrationsFeed";

function Integrations() {
  return (
    <main className="fade-in">
      <h2 className="flex justify-between w-full pt-8">
        <p className="flex flex-row items-center z-10 justify-between w-full">
          <span className="text-base text-start text-base md:text-2xl">
            Integrations
          </span>
          <GeneralButton
            className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
            disabled={false}
          >
            Contact us
          </GeneralButton>
        </p>
      </h2>
      <IntegrationsFeed />
    </main>
  );
}

export default Integrations;
