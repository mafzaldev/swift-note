import { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { collection, query, onSnapshot } from "firebase/firestore";

import NoteCard from "../components/NoteCard";
import SearchField from "../components/SearchField";
import Modal from "../components/Modal";
import { db } from "../services/FirebaseConfig";
import { notesStore, Note } from "../stores/NotesStore";
import userStore from "../stores/UserStore";

function NotesScreen() {
  const { setNotes, allNotes } = notesStore();
  const { uid } = userStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [toBeEdited, setToBeEdited] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [modalOpen, setModalOpen] = useState({
    modalOpen: false,
    mode: "Create note",
  });

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const q = query(collection(db, uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let notes: Note[] = [];
      querySnapshot.forEach((doc) => {
        notes.push({
          uid: doc.data().uid,
          title: doc.data().title,
          description: doc.data().description,
        });
      });
      setNotes(notes);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Modal
        id={toBeEdited.id}
        title={toBeEdited.title}
        description={toBeEdited.description}
        mode={modalOpen.mode}
        show={modalOpen.modalOpen}
        handleModal={() =>
          setModalOpen({
            modalOpen: !modalOpen.modalOpen,
            mode: modalOpen.mode,
          })
        }
      />
      <div
        onClick={() => {
          setToBeEdited({ id: "", title: "", description: "" });
          setModalOpen({ modalOpen: true, mode: "Create note" });
        }}
        className="flexCenter fixed bottom-10 right-10 z-10 bg-blue-500 w-16 h-16 p-4 rounded-[50%] hover:translate-y-1 transition-all cursor-pointer"
      >
        <MdOutlineAddCircle size={45} />
      </div>
      <div className="flexCenter flex-col mx-10 my-10 gap-3 lg:mx-32 sm:mx-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Swift Note
        </h1>
        <form className="flex items-center mb-4 w-80 sm:w-96">
          <SearchField value={searchTerm} handleChange={handleChange} />
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {allNotes.map((note) => (
            <NoteCard
              key={note.uid}
              id={note.uid}
              title={note.title}
              description={note.description}
              handleEdit={(id, title, description) => {
                setToBeEdited({ id, title, description });
                setModalOpen({ modalOpen: true, mode: "Edit note" });
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesScreen;
