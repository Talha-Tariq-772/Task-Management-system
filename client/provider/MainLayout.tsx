
"use client";
import Mainlayout from '@/app/components/Mainlayout/Mainlayout';
import { useTasks } from "@/context/taskContext";
import Modals from '@/app/components/Modals/Modals';
import React from 'react'
import ProfileModal from '@/app/components/profile/profileModal';


interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {

  const {isEditing ,  profileModal, } = useTasks();
  return (
    <div className="main-layout p-4 flex-1 border-2  border-white rounded-[1.5rem] overflow-auto bg-[#EDEDED]"> {/* Simple wrapper without recursion */}
      {isEditing && <Modals/>}
      { profileModal&& <ProfileModal/>}
      {children}
     </div>
  ); 
}

export default MainLayout;