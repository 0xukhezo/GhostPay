"use client";

import React from "react";

import Link from "next/link";
// Constants
import { integrations } from "../../constants/constants";
// Types
import { IntegrationType } from "../../config/types";
// Components
import IntegrationCard from "../Cards/IntegrationCard";

function IntegrationsFeed() {
  return (
    <main>
      <div className="grid grid-cols-3 p-10 gap-y-8 gap-x-40">
        {integrations.map((integration: IntegrationType) => (
          <Link href={`/integration/${integration.name.toLocaleLowerCase()}`}>
            <IntegrationCard integration={integration} />
          </Link>
        ))}
      </div>
      <p className="flex flex-col items-center text-lg">
        <span className="mb-4"> Do you want to integrate with us?</span>
        <span className="underline underline-offset-4 text-greenMatrix font-semibold">
          Contact us
        </span>
      </p>
    </main>
  );
}

export default IntegrationsFeed;
