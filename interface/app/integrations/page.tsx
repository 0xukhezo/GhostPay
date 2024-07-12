"use client";

import React from "react";
import SideBar from "../../components/Layout/SideBar/SideBar";
import Integrations from "../../components/Sections/Integrations/Integrations";

function IntegractionsPage() {
  return (
    <div className="text-white bg-main w-screen h-screen ">
      <SideBar page={<Integrations />} />
    </div>
  );
}

export default IntegractionsPage;
