"use client";

import React from "react";

function Navbar() {
  return (
    <div className="bg-main sticky top-0 z-50 py-5 border-b-1 border-greenMatrix px-8 flex justify-between text-lg">
      <p>
        <span>Actual Paymaster:</span>{" "}
        <span className="text-greenMatrix font-semibold ml-2">Pepito</span>
      </p>
      <p className="font-semibold">0xns...3fra</p>
    </div>
  );
}

export default Navbar;
