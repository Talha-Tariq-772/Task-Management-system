// src/components/sidebar/Sidebar.tsx
"use client";
import React from "react";
import Profile from "../profile/profile";
import RadialChart from "../radialChart/radialChart";
import { useUserContext } from "@/context/userContext";

export default function Sidebar() {
  const {logOutUser} =useUserContext();

  return (
    <div
      className="
        w-[20rem]
        mt-[4rem]
        h-[calc(100vh-5rem)]
        fixed right-0 top-0
        flex flex-col
        bg-white
        rounded-[1.5rem]
        
      "
    >
      <Profile />
      <div className="mt-2 mx-6 flex-1  overflow-hidden">
        <RadialChart />
      </div>
      <button className="mt-2 mb-3 mx-6 px-8 py-4 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out font-bold"
      onClick={logOutUser}
      >Sign Out</button>
    </div>
  );
}
