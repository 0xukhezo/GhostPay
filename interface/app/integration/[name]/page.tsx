"use client";

import React from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import SpecificIntegration from "../../../components/Sections/Integrations/SpecificIntegration";
import { usePathname } from "next/navigation";

function IntegrationPage() {
  const pathname = usePathname();
  const name = pathname.split("/")[2];

  return (
    <div className="text-white bg-main w-screen h-screen ">
      <SideBar page={<SpecificIntegration name={name} />} />
    </div>
  );
}

export default IntegrationPage;
