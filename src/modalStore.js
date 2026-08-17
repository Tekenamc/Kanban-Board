import { create } from "zustand";

export const useModalStore = create((set) => ({
    adding: false,

    edit: false,

    tempId: 0,

    //Used to know if we are adding a task
    setAdding: (value) => set(() => ({
        adding: value
    })),

    //Used to know if editing
    setEdit: (value) => set(() => ({
        edit: value
    })),

    //Used to grab the id of a selected task
    getTempId: (value) => set(() => ({
        tempId: value
    }))
}))