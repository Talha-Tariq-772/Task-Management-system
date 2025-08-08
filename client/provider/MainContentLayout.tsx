"use client";
import { useUserContext } from '@/context/userContext';
import React from 'react';

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const { user } = useUserContext();
  
  // Safely handle user context
  const hasUser = user && user._id;
  
  return (
    <main className={`  pb-[1.5rem] flex-1 flex flex-row  overflow-hidden `}>
      {children}
    </main>
  );
}

export default MainContentLayout;