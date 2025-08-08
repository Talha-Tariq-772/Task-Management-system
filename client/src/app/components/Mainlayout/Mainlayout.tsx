// src/components/mainlayout/Mainlayout.tsx
"use client";
import React from "react";

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-auto p-4 bg-red-600 rounded-[1.5rem] border-2 border-white">
      {children}
    </div>
  );
}
