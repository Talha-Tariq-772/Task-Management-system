"use client";
import React, { use, useEffect } from "react";
import { useTasks } from "@/context/taskContext";
import useUserRedirect from "../../../../hooks/useUserRedirect";
import useDetectOutside from "../../../../hooks/useDetectOutside";

// import { useUser } from "@/context/userContext"; // Uncomment if you need user context
function Modals() {
    const { setTask ,task , handleInput , createTask ,isEditing,closeModal, modalMode,activeTask , updateTask}=useTasks();

    //useUserRedirect("/login");
    const ref = React.useRef(null);

// hook to close the modal form for adding or editing the task 
useDetectOutside({
  ref,
  callback: () => {
    if(isEditing) {
    closeModal(); // close the modal if setEditing is true 
    }
  },
});



useEffect(() => {
  if(modalMode==='edit'&& activeTask){
    handleInput("setTask" , activeTask);
  }
},[modalMode, activeTask]);

 




//  first
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const newTask = {
    _id :activeTask?._id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    completed: task.completed
    // Remove status completely
  };
  
  if(modalMode==='edit'){
      console.log("About to update task with ID:", activeTask?._id);
      console.log("About to update task with completed :", task.completed);
    await updateTask(newTask);

  }
  else if(modalMode==='add'){
    await createTask(newTask);
  }
  closeModal()
  
  // Reset form
  setTask({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false
  });
};


  return (
   


<div className="fixed left-0 top-0 w-full z-50 h-full bg-[#333]/30 overflow-hidden">
  <form
    className="py-8 px-8 max-w-[520px] w-full flex flex-col gap-6 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl border border-gray-100"
    onSubmit={handleSubmit}
    ref={ref}
  >
    <h2 className="text-2xl font-semibold text-center text-gray-800">
  {modalMode === 'edit' ? 'Edit Task' : 'Create New Task'}
</h2>

    {/* Title */}
    <div className="flex flex-col gap-2">
      <label htmlFor="title" className="text-sm font-medium text-gray-700">
        Title
      </label>
      <input
        className="bg-gray-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        type="text"
        name="title"
        id="title"
        placeholder="Task Title"
        value={task.title || ""} 
        onChange={(e) => handleInput("title", e.target.value)}
      />
    </div>

    {/* Description */}
    <div className="flex flex-col gap-2">
      <label htmlFor="description" className="text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        className="bg-gray-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        name="description"
        id="description"
        placeholder="Task Description"
        rows={4}
        value={task.description || ""}
        onChange={(e) => handleInput("description", e.target.value)}
      />
    </div>

    {/* Priority */}
    <div className="flex flex-col gap-2">
      <label htmlFor="priority" className="text-sm font-medium text-gray-700">
        Select Priority
      </label>
      <select
        className="bg-gray-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition cursor-pointer"
        name="priority"
        id="priority"
        value={task.priority|| "low"}
        onChange={(e) => handleInput("priority", e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    {/* Due Date */}
    <div className="flex flex-col gap-2">
      <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
        Due Date
      </label>
      <input
        className="bg-gray-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        type="date"
        name="dueDate"
        id="dueDate"
        placeholder="Task Due Date"
        value={task.dueDate || ""}
        onChange={(e) => handleInput("dueDate", e.target.value)}
      />
    </div>

    {/* Completed */}
    <div className="flex flex-col gap-2">
      <label htmlFor="completed" className="text-sm font-medium text-gray-700">
        Task Completed
      </label>
      <div className="bg-gray-50 px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition">
        <span className="text-gray-700">Completed</span>
        <select
          className="bg-transparent outline-none"
          name="completed"
          id="completed"
          value={task.completed ? "true" : "false"}
          onChange={(e) => handleInput("completed", e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
    </div>

    <div className="mt-8">
    <button
  type="submit"
  className={`w-full text-white font-semibold py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:border-blue-400
    ${modalMode === 'edit' 
      ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:border-green-400'
      : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:border-blue-400'}
  `}
>
  {modalMode === 'edit' ? 'Update Task' : 'Create Task'}
</button>

    </div>
  </form>
</div>

  );
}

export default Modals;

