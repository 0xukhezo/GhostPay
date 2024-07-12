"use client";

// React
import React from "react";
// Components
import Profile from "../../../components/Sections/Profile";
import SideBar from "../../../components/Layout/SideBar/SideBar";

function ProfilePage() {
  return (
    <div className="text-white bg-main w-screen h-screen ">
      <SideBar page={<Profile />} />
    </div>
  );
}

export default ProfilePage;
