"use client"
import { create } from "domain";
import moment from "moment";
import { Task } from "./types";



 export const formatTime=(createdAt: string) => {
    const now = moment();
    const created = moment(createdAt);
    //if the task was created today
    if(created.isSame(now, 'day')) {
        return "Today"; 

    }

    //if the task was created yesterday
    if(created.isSame(now.subtract(1, 'days'), 'day')) {
        return "Yesterday";
    }

    //if the task was created this week
    if(created.isSame(6, 'days')) {
        return created.fromNow();

    }
    //if the task was created with in last three weeks
    if(created.isAfter(moment().subtract(3, 'weeks'), 'week')) {
        return created.fromNow();
        
    }
//after  three weeks
    return created.format("MMM D, YYYY");
 }


 export const filteredTask=(tasks:Task[], priority: string)=>{
const filteredTasks=()=>{
    switch(priority){
 case "low":
    return tasks.filter((task)=>task.priority==="low");
     case "medium":
    return tasks.filter((task)=>task.priority==="medium");
     case "high":
    return tasks.filter((task)=>task.priority==="high");
    default:
        return tasks;
    }
};


return filteredTasks();




 };

export const overdueTasks = (tasks: Task[]): Task[] => {
  const today = moment().startOf("day"); // set time to 00:00

  return tasks.filter((task) => {
    const dueDate = moment(task.dueDate);

    return (
      !task.completed &&         // only incomplete tasks
      dueDate.isValid() &&       // make sure dueDate is a valid date
      dueDate.isBefore(today)    // due date is before today
    );
  });
};