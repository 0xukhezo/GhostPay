"use client";

import React from "react";
import SideBar from "../../components/Layout/SideBar/SideBar";
import Paymasters from "../../components/Sections/Paymasters/Paymasters";

function PaymasterPage() {
  return (
    <div className="text-white bg-main w-screen h-screen ">
      <SideBar page={<Paymasters />} />
    </div>
  );
}

export default PaymasterPage;
