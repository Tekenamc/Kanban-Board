import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useTaskStore = create(persist((set) =>({
    id: 0,
    tasks: [],

    setTasks: (newTasks) => set((state) => ({
        tasks: typeof newTasks === "function"?
            newTasks(state.tasks)
            :newTasks

    })),

    addTask: (newTask) => set((state) => ({
        tasks: [...state.tasks, {...newTask, id: state.id}],
        id: state.id + 1
    })),
    
    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
    })),

    updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task => 
            task.id === id ?
            {...task, ...updates}
            :task
        )
    })),

    moveTasks: (id, newStatus) => set((state) => ({
        tasks: state.tasks.map(task => 
            task.id === id ?
            {...task, status: newStatus}
            :task
        )
    }))


    
}),{
    name: "task store"
}
));