"use client";
import Link from 'next/link';
import React from 'react';
import IconFileCheck from '../../../../public/icons/IconFileCheck';
import IconCheck from '../../../../public/icons/IconCheck';
import IconStopwatch from '../../../../public/icons/IconStopwatch';
import IconGrid from '../../../../public/icons/IconGrid';
import { usePathname } from 'next/navigation';
import IconDeleteAll from '../../../../public/icons/IconDeleteAll';

function MiniSideBar() {
  const pathname = usePathname();
  
  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className='w-[5rem] h-screen flex flex-col bg-white border-r border-gray-200'>

      <div className="flex justify-center items-center h-[5rem]">
        <img src="/logo.png" width={28} height={28} alt="Logo" />
      </div>
      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link} className="flex justify-center">
                {item.icon}
              </Link>
              
              {/* Hover Tooltip with triangle */}
              <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 text-xs text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {item.title}
                {/* Triangle */}
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-[#3aafae]"></div>
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-6">
          <button className='w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#EB4E31] hover:bg-gray-100 transition-colors duration-300'>
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSideBar;