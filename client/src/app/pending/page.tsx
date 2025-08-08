"use client";
import { useRouter } from "next/navigation"; // Import useRouter

import {  use, useEffect } from "react";
import useUserRedirect from "../../../hooks/useUserRedirect";
import { useTasks } from "@/context/taskContext";
import { filteredTask } from "../../../utilis/utilities";
import { Filter } from "lucide-react";
import { Task } from "../../../utilis/types";
import TaskItem from "../TaskItem/TaskItem";
import Filters from "../components/Filters/Filters";



export default function Home() {


 
const router =useRouter();



 useUserRedirect("/login");


// second 
console.log("useTasks output:", useTasks());
    const { tasks , openModeltoAddTask, priority , completed , setPriority , pending} = useTasks(); // FIXED: Directly get tasks from context
  console.log("Tasks:", tasks);
   const filtered=filteredTask(pending, priority);

   useEffect(() => {
   {
    setPriority("all");
  }
}, []); 


    return (
        <main className="m-0 h-full"> 
            <div className="mb-4 flex flex-row justify-between max-w-[1200px]">
                <h1 className="text-2xl font-bold">Pending Tasks</h1>
            <Filters />
            </div>

          <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 pr-[320px]">
        {tasks && tasks.length > 0 ? (
        filtered.map((task: Task, i: number) => (
            <TaskItem key={i} task={task} />
          ))
        ) : (
          <p>No tasks available</p>
        )}
        <button className="w-full h-[16rem] py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400 hover:bg-gray-300 hover:border-none transition duration-300 ease-in-out "
        onClick={openModeltoAddTask}>
          Add New Task
        </button>
      </div>
        </main>
    );
} 
 