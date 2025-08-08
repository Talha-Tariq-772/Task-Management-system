// provider/UserProvider.tsx
"use client";

import React from "react";
import { UserContextProvider } from "@/context/userContext";
import { TasksProvider } from "@/context/taskContext";

interface Props {
  children: React.ReactNode;
}

export default function UserProvider({ children }: Props) {

  return <UserContextProvider>
    <TasksProvider>
      {children}
    </TasksProvider>
  </UserContextProvider>;
}