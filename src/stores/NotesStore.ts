import { create } from "zustand";

interface Note {
    uid: string;
    title: string;
    description: string;
}

interface NotesState {
    allNotes: Note[]
    setNotes: (notes: Note[]) => void
}

const notesStore = create<NotesState>()((set) => ({
    allNotes: [],
    setNotes: (notes: Note[]) => {
        set({
            allNotes: notes
        });
    }
}))

export { notesStore };
export type { Note };
