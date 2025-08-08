"use client";

import React from 'react'
import { useUserContext } from '@/context/userContext';
import Link from 'next/link';
import { github, moon } from '../../../../utilis/Icons';
import { profile } from '../../../../utilis/Icons';
import { useTasks } from '@/context/taskContext';
import { useRouter } from 'next/navigation';



function Header() {
  const { user   } = useUserContext();
  const {name} = user || {};
  const userId = user ? user._id : null;
  const {  tasks, activeTask , openModeltoAddTask  }= useTasks();
  const router = useRouter();

  

 console.log(userId);
  return (
   
    <header className='px-6  mt-4 mb-1 w-full flex items-center justify-between dark:bg-2'> 
    <div>
      <h1>
        <span role='img' aria-label='Wave'>👋</span>
        {userId ? `Welcome, ${name} !` : 'Welcome to Task Manager !'}
      </h1>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        {userId ? (<> You have &nbsp;<span className='font-bold text-[#3aafae]'>{ tasks.length}</span> &nbsp;Total Tasks</>) : ('Please logIn or register to view your tasks')}
      </p>
      </div>
      <div className='flex items-center justify-end gap-40'>
      <div className=' h-[50px] flex items-center gap-[10.4rem]'>
<button className='bg-[#3aafae] text-white py-3 px-8 rounded-[50px] hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out'
onClick={()=>{
  if(userId){
    openModeltoAddTask();
  }else{
    router.push("/login")
  }

}}>{userId?"Add a new Task": "Login/Register"}</button>
      </div>
      <div className='flex items-center gap-4'>
        <Link href="https://github.com/Talha-Tariq-772" passHref target='_blank' rel='noopener noreferrer' className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center border-2 border-[#E6E6E6]'>
        {github}
        </Link>
        <Link href="https://github.com/Talha-Tariq-772" passHref target='_blank' rel='noopener noreferrer' className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center border-2 border-[#E6E6E6]'>
        {moon}
        </Link>
        <Link href="https://github.com/Talha-Tariq-772" passHref target='_blank' rel='noopener noreferrer' className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center border-2 border-[#E6E6E6]'>
        {profile}
        </Link>
      </div>
      </div>

      </header>
  )
}

export default Header