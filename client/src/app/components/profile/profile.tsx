"use client";
import React, { use } from 'react'
import { useUserContext } from '@/context/userContext';
import { useTasks } from '@/context/taskContext';

function Profile() {
  const { user } = useUserContext();
  const {tasks , completed , pending , activeTask , openProfileModal } =useTasks();
  // Ensure user is defined before rendering
  return (<div className='m-2'>  
   <div  className='px-2 py-3 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem] hover:bg-[#EDEDED] transition-all duration-500 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white dark:border-[F9F9F9]/10'
   
   onClick={openProfileModal}>
   <div >
    <img
      src={user?.photo}
        alt="Profile"  
       
        className='rounded-full w-[50px] h-[50px] object-cover'
        />
       </div>
        <div >
            <h1 className='flex flex-col text-xl text-[#333] dark:text-[#F9F9F9]'>
                <span className='font-medium'>Hello, </span> 
                <span className='font-bold'>{user?.name}</span>
            </h1>
        </div>
    </div>  
    <div className="mt-3 flex flex-col gap-8 ">
      <div className='grid grid-cols-2 gap-4'>
        <div className="text-gray-400">
        <p>Total Tasks:</p>
        <p className='pl-4 relative flex gap-2'>
            <span className=' absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]
            '></span>
        <span className='font-medium text-2xl text-[#333]'>{tasks.length}</span>
        </p>
     </div>  <div className="text-gray-400">
        <p>Completed Tasks:</p>
        <p className='pl-4 relative flex gap-2'>
            <span className=' absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-500 rounded-[5px]
            '></span>
        <span className='font-medium text-2xl text-[#333]'>{completed.length}</span>
        </p>
     </div>  <div className="text-gray-400">
        <p>Pending Tasks:</p>
        <p className='pl-4 relative flex gap-2'>
            <span className=' absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-cyan-500 rounded-[5px]
            '></span>
        <span className='font-medium text-2xl text-[#333]'>{pending.length}</span>
        </p>
     </div>  <div className="text-gray-400">
        <p>Follow Up Tasks:</p>
        <p className='pl-4 relative flex gap-2'>
            <span className=' absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-yellow-500 rounded-[5px]
            '></span>
        <span className='font-medium text-2xl text-[#333]'>0</span>
        </p>
     </div>  
      </div>
  </div>   
  <h3 className='mt-2 font-medium'>Activity</h3>
</div>
  )
}

export default Profile