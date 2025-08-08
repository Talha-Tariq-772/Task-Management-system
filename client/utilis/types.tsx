interface Task{
    _id: string;
    title: string;
    description: string;
    status: string; // "todo" | "in-progress" | "done"
    completed: boolean; // true if the task is completed, false otherwise
    dueDate: string | null; // ISO date string or null if no due date
    priority: string;
    createdAt: string;
    updatedAt: string;
}
export type { Task };