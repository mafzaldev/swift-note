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

const useNotesStore = create<NotesState>()((set) => ({
    allNotes: [],
    setNotes: (notes: Note[]) => {
        set({
            allNotes: notes
        });
    }
}))

export { useNotesStore };
export type { Note };

