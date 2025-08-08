import express from 'express';
import { CreateTask, DeleteTask, GetTask, GetTasks, UpdateTask } from '../controllers/auth/task/taskController.js';
import { protect } from '../midware/AuthMiddleWare.js';

const router=express.Router();

//   Create a new task
router.post('/tasks/create',protect, CreateTask);

//   Get tasks for the authenticated user
 router.get('/tasks', protect, GetTasks);

 // get a task by id
 router.get('/task/:id', protect, GetTask);

 // update a task by id
 router.patch('/updatetask/:id', protect, UpdateTask);

 // delete a task by id
 router.delete('/deletetask/:id', protect, DeleteTask);

 export default router;