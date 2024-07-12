"use client";

import React from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import CreatePaymasters from "../../../components/Sections/CreatePaymasters";

function CreatePaymaster() {
  return (
    <div className="text-white bg-main w-screen h-screen ">
      <SideBar page={<CreatePaymasters />} />
    </div>
  );
}

export default CreatePaymaster;
