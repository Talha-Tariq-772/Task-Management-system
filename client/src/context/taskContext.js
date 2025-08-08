"use client"
import axios from 'axios';
import React, {createContext, useEffect} from 'react';
import { useUserContext } from './userContext';
import toast from 'react-hot-toast';
const TasksContext = React.createContext();
const serverUrl= process.env.REACT_APP_SERVER_URL || 'http://localhost:8000/api/v1';

export const TasksProvider = ({children}) => {

     const userId = useUserContext().user?._id;

     // states 
    const [tasks, setTasks] = React.useState([]);
    
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
   // const [task , setTask] = React.useState({});
const [task, setTask] = React.useState({
  title: "",
  description: "",
  priority: "low",
  dueDate: "",
  completed: false,  // Changed from true to false
});
    const [priority, setPriority] = React.useState("All");
     const [isEditing, setIsEditing] = React.useState(false);
     const [activeTask, setActiveTask] = React.useState(null);
     const [modalMode, setModalMode] = React.useState(""); // "add" or "edit"
     const[profileModal, setProfileModal] = React.useState(false); // For profile modal



// function for model to open and add task
const openModeltoAddTask = () => {

    setModalMode("add"); // Set modal mode to "add"
  ; // Reset task state
  setIsEditing(true); // Set editing mode to true
    setTask({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false
  }); // Set editing mode to false
};

// first --> function for model to open and edit task
// const openModeltoEditTask = (task) => {
//     setModalMode("edit"); // Set modal mode to "edit"
//   setIsEditing(true);
//   setActiveTask(task);  // Set the task to be edited  
//    // setTask({}); 
// };

// second
// In TasksContext, update:
const openModeltoEditTask = (task) => {
  setModalMode("edit");
  setIsEditing(true);
  setActiveTask(task);
  setTask(task); // Initialize form with task data
};

// function to close modal
const closeModal = () => {
  setModalMode("");
  setIsEditing(false);
  setActiveTask(null);
  setProfileModal(false); // Close profile modal
  setTask({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false
  });
};

// function to open profile modal
const openProfileModal = () => {
  setProfileModal(true); // Open profile modal
};

    // get all tasks first
  const getTasks = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.get(`${serverUrl}/tasks`, config);
    
    console.log("Tasks response:", response.data);
    
    if (response.data && Array.isArray(response.data.tasks)) {
      setTasks(response.data.tasks);
    } else {
      console.warn("Unexpected tasks format:", response.data);
      setTasks([]);
    }
  } catch (err) {
    console.error("Get tasks error:", err);
    setError("Error in getting tasks");
  } finally {
    setLoading(false);
  }
};
   
   
   
    const getTaskById = async (taskId) => {
        setLoading(true);
        try {
            const response = await axios(`${serverUrl}/task/${taskId}`);
            setTask(response.data);
            console.log("Task by ID:", response.data);
            console.log("Task by ID is herer :", response.data);
        } catch (err) {
            setError("Error in getting task by ID", err);
        } finally {
            setLoading(false);
        }
    };

    //create task new one over right previous  , first   
//     const createTask = async (task) => {
//   setLoading(true);
//   try {
//     const { data: newTask } = await axios.post(`${serverUrl}/tasks/create`, task);
//     console.log("Task created:", newTask);
// setTasks(prev => (Array.isArray(prev) ? [...prev, newTask] : [newTask]));

//     return true;
//   } catch (err) {
//     console.error("Error in creating task:", err.response?.data || err.message);
//     setError("Error in creating task");
//     return false;
//   } finally {
//     setLoading(false);
//   }
// };

// 2nd  

const createTask = async (taskData) => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const { data } = await axios.post(
      `${serverUrl}/tasks/create`,
      taskData,
      config
    );
    
    // FIXED: Use data.task instead of data.task.task
    setTasks(prevTasks => [...prevTasks, data.task]);
    
    return true;
  } catch (err) {
    console.error("Create task error:", {
      message: err.message,
      response: err.response?.data,
      config: err.config
    });
    setError("Error in creating task");
    return false;
  } finally {
    setLoading(false);
  }
};

//    const createTask = async (taskData) => {
//   setLoading(true);
//   try {
//     const response = await axios.post(`${serverUrl}/tasks/create`, taskData);
//     console.log("Task created:", response.data);
    
//     // Use safe functional update
//     setTasks(prevTasks => {
//       // Ensure we always have an array to spread
//       const currentTasks = Array.isArray(prevTasks) ? prevTasks : [];
//       return [...currentTasks, response.data];
//     });
    
//     // Reset form
//     setTask({
//       title: "",
//       description: "",
//       priority: "low",
//       dueDate: "",
//       completed: false
//     });
    
//     return true; // Indicate success
//   } catch (err) {
//     console.error("Create task error:", err);
//     setError("Error in creating task", err);
//     return false; // Indicate failure
//   } finally {
//     setLoading(false);
//   }
// };

    //Update task
   
   // first 
    // const updateTask = async (task) => {
    //     setLoading(true);
    //     try {
    //         //------>>>>   look into below line of code in case of any problem    <<<<<<-------------
    //         const response = await axios.patch(`${serverUrl}/updatetask/${task._id}`, task);
    //         const newTask = tasks.map(tsk => tsk._id === task._id ? response.data : tsk);
    //         setTasks(newTask);
    //         console.log("Task updated:", response.data);
    //     } catch (err) { 
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // second 
    const updateTask = async (taskToUpdate) => {
  setLoading(true);
  try {
    // 1. grab real token from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // 2. call the correct endpoint
    const response = await axios.patch(
      `${serverUrl}/updatetask/${taskToUpdate._id}`,
      taskToUpdate,
      config
    );

    // 3. extract the updated task object
    const updated = response.data.task;

    // 4. merge into your local list
    setTasks(old =>
      old.map(t => (t._id === updated._id ? updated : t))
    );

    console.log("Task updated on client:", updated);
    toast.success("Task updated successfully!")
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    
    setError("Error updating task");
  } finally {
    setLoading(false);
  }
};

    
//updated delete funtion 
    // const deleteTask = async (taskId) => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.delete(`${serverUrl}/task/${taskId}`);
    //         setTasks(tasks.filter(task => task._id !== taskId));
    //         setTasks(newTask)
    //         console.log("Task deleted:", response.data);
    //     } catch (err) {
    //         setError("Error in deleting task", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
//     const deleteTask = async (taskId) => {
//     setLoading(true);
//     try {
//         await axios.delete(`${serverUrl}/task/${taskId}`);
        
//         // FIX: Use functional update
//         setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        
//         console.log("Task deleted");
//     } catch (err) {
//         setError("Error in deleting task", err);
//     } finally {
//         setLoading(false);
//     }
// };

const deleteTask = async (taskId) => {
  setLoading(true);
  try {
    await axios.delete(`${serverUrl}/deletetask/${taskId}`);
    toast.success("Task deleted successfully!");
    setTasks(current => current.filter(t => t._id !== taskId));
  } catch (err) {
    setError("Error in deleting task", err);
  } finally {
    setLoading(false);
  }
};


// first
// const handleInput = (name) => (e) => {




//   if (name === "setTask") {
//     setTask(e); 
//   } else {
//     setTask({ ...task, [name]: e.target.value }); // use processed value here
//   }
// };

// second
const handleInput = (name, value) => {
    if (name === "setTask") {
    setTask(value);
}
    else{

  setTask(prev => ({ ...prev, [name]: value }));
    }
};

// completed Task
const completed = tasks.filter((task)=>{
  
  console.log("from task context , completed tasks are :" ,task.completed  )
 return task.completed
});


// pending Tasks
const pending = tasks.filter((task)=>{
  
  console.log("from task context , pending tasks are :" ,!task.completed  )
 return !task.completed
});
// first
     useEffect(() => {
  if (userId) {
    getTasks();
  }
}, [userId]); 




    return (
        <TasksContext.Provider value={{
            
            task,
            loading,
            priority,
            tasks,
            isEditing,
            setIsEditing,
            setTasks,
            setTask,
            setPriority,
            deleteTask,      
            getTasks,
            updateTask,
            handleInput,
            createTask,
            openModeltoAddTask,
            openModeltoEditTask,
            tasks,
            openProfileModal,
            profileModal,
            setProfileModal,
            activeTask,
            setActiveTask,
            closeModal,
            isEditing,
            setIsEditing,
            modalMode,
            updateTask,
            deleteTask,
            getTaskById,
            completed,
            pending,
            openProfileModal,
            


             }}>
            {children}
        </TasksContext.Provider>
    );
};
export const useTasks = () => {
    return React.useContext(TasksContext);
};
