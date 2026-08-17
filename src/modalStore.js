import { create } from "zustand";

export const useModalStore = create((set) => ({
    adding: false,

    edit: false,

    tempId: 0,

    setAdding: (value) => set(() => ({
        adding: value
    })),

    setEdit: (value) => set(() => ({
        edit: value
    })),

    getTempId: (value) => set(() => ({
        tempId: value
    }))
}))