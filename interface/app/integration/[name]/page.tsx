"use client";

import React from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import SpecificIntegration from "../../../components/Sections/Integrations/SpecificIntegration";

function IntegrationPage() {
  return (
    <div className="text-white bg-main w-screen h-screen ">
      <SideBar page={<SpecificIntegration />} />
    </div>
  );
}

export default IntegrationPage;
