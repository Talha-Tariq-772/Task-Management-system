import { useTasks } from '@/context/taskContext'
import React, { use } from 'react'


function Filters() {
    const{priority , setPriority}=useTasks();
   const priorities=["All", "Medium" , "Low" , "High"]
   const [activeIndex , setactiveIndex] = React.useState(0);
  return ( 
<div className=' px-2 py-2  relative grid grid-cols-4  items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md '>
<span
  className="absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300"
  style={{
    width: "calc(100%/4 - 10px)",
    height: "calc(100% - 10px)",
    top: "50%",
  transform: `translate(calc(${activeIndex * 100}% + ${activeIndex * 12}px), -50%)`,


    transition: "transform 300ms cubic-bezier(0.95, 0.3, 1, 1)",
  }}
></span>

  {priorities.map((p, index) => (
  <button
    key={index}
    className={`relative z-10 px-1 rounded-md text-sm font-medium ${activeIndex===index?"text-[#3aafae] ":"text-gray-500"}`}
    onClick={() => {
      setactiveIndex(index);
      setPriority(p.toLowerCase());
    }}
  >
    {p}
  </button>
))}

</div>
  )
}
   

export default Filters 
