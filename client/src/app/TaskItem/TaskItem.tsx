// TaskItem/TaskItem.tsx
import React from 'react'
import { Task } from '../../../utilis/types'
import { formatTime } from '../../../utilis/utilities';
import { deleteIcon, edit, star } from '../../../utilis/Icons';
import { useTasks } from '@/context/taskContext';
import{motion} from "framer-motion"
import { container ,item } from '../../../utilis/animation';

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { openModeltoEditTask, deleteTask } = useTasks();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':   return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low':    return 'text-green-500';
      default:       return 'text-gray-500';
    }
  };

  // ← Add this handler
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete “${task.title}”?`)) {
      return;
    }
    await deleteTask(task._id);
  };

  return (
    <motion.div className="h-[16rem] py-4 px-5 flex flex-col gap-4 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out hover:scale-[1.01]"
    variants={item}
    initial="hidden"
          animate="visible">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
        <p className="text-gray-600 mt-1">{task.description}</p>
      </div>

      <div className="flex mt-auto justify-between items-center">
        <p className="text-gray-400 text-sm">{formatTime(task.createdAt)}</p>

        <p className={`text-sm font-semibold px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>

        <div className="flex items-center gap-4 text-[1.2rem]">
          <button
            className={`transition duration-200 hover:scale-110 ${
              task.completed ? "text-yellow-500" : "text-gray-400"
            }`}
            title="Mark as Important"
          >
            {star}
          </button>

          <button
            className="text-[#00A1F1] hover:text-blue-600 transition duration-200 hover:scale-110"
            onClick={() => openModeltoEditTask(task)}
            title="Edit Task"
          >
            {edit}
          </button>

          {/* ← Wire up delete here */}
          <button
            className="text-[#F65314] hover:text-red-600 transition duration-200 hover:scale-110"
            onClick={handleDelete}
            title="Delete Task"
          >
            {deleteIcon}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem;
