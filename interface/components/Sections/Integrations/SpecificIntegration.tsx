"use client";
import React, { useState } from "react";
import UniswapPanel from "../../Protocols/Uniswap/UniswapPanel";

type SpecificIntegrationProps = {
  name: string;
};

function SpecificIntegration({ name }: SpecificIntegrationProps) {
  const [display, setDisplay] = useState<string>("uniswapPositions");

  const getDisplay = (display: string) => {
    setDisplay(display);
  };
  return <UniswapPanel display="uniswapPositions" getDisplay={getDisplay} />;
}

export default SpecificIntegration;
