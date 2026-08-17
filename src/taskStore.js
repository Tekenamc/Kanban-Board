import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useTaskStore = create(persist((set) =>({
    id: 0,
    tasks: [],
    
    //Used to set the tasks array when moving within a column. Used in App.jsx
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
    
    //Move the tasks when dragging and dropping between columns. Used in App.jsx
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