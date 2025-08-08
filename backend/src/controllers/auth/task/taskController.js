import asyncHandler from 'express-async-handler';

import TaskModel from '../../../models/task/TaskModel.js';
export const CreateTask = asyncHandler(async (req, res) => {
    try {
        // 1. Object destructuring with default values
        const { 
            title, 
            description, 
            dueDate ,
            priority  ,
            status ,
        } = req.body;

        // 2. Validation
        if (!title?.trim()==="") {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!description?.trim()==="") {
            return res.status(400).json({ message: "Description is required" });
        }

        // 3. Create task
        const task = new TaskModel({
            title,
            description,
            dueDate,
            priority,
            status,
            user: req.user._id // Assuming req.user is set by the protect middleware
        });

        // 4. Save to database
        const savedTask = await task.save();

        // 5. Send response
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: savedTask
        });

    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message // Send actual error for debugging
        });
    }
});

// Get all tasks for the authenticated user
export const GetTasks = asyncHandler(async (req, res) => {
    try {
       const userId = req.user._id; // Assuming req.user is set by the protect middleware

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }
        // 1. Fetch tasks for the user
        const tasks = await TaskModel.find({ user: userId });

        // 2. Send response
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            length: tasks.length,
            tasks: tasks
        });
    } catch (err) {
        console.error("Get Tasks Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message // Send actual error for debugging
        });
    }
})

// Get a single task by ID
export const GetTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; //  req.user is set by the protect middleware
        const id = req.params.id; // task id is passed as a URL parameter


        // Validate id
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        // 1. Fetch the task by ID
        const task = await TaskModel.findById(id);


        // 2. Check if task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });

        }

        // authorize user
        if (!task.user.equals(userId)) {
            return res.status(403).json({ message: "You are not authorized to access this task" });
        }

        // 3. Send response
        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            task: task
        });
    } catch (err) {
        console.error("Get Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message // Send actual error for debugging
        });
    }
});

// update a task by ID
export const UpdateTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // req.user is set by the protect middleware
        const id = req.params.id; // task id is passed as a URL parameter

        // Validate id
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        // 1. Fetch the task by ID
        const task = await TaskModel.findById(id);

        // 2. Check if task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // authorize user
        if (!task.user.equals(userId)) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        // 3. destructure  fields request body
        const { title, description, dueDate, priority, status , completed } = req.body;

 // update the task with new values or keep existing values if not provided
        task.title = title || task.title;
        task.description = description || task.description; 
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed ?? task.completed;

        

        // 4. Save updated task to database
        const updatedTask = await task.save();

        // 5. Send response
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (err) {
        console.error("Update Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message // Send actual error for debugging
        });
    }
});

// delete a task by ID
export const DeleteTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // req.user is set by the protect middleware
        const id = req.params.id; // task id is passed as a URL parameter

        // Validate id
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        // 1. Fetch the task by ID
        const task = await TaskModel.findById(id);

        // 2. Check if task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // authorize user
        if (!task.user.equals(userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this task" });
        }

        // 3. Delete the task
        await TaskModel.findByIdAndDelete(id);

        // 4. Send response
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (err) {
        console.error("Delete Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message // Send actual error for debugging
        });
    }
});
