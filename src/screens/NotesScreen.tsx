import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineNoteAdd } from "react-icons/md";

import Modal from "../components/Modal";
import NoteCard from "../components/NoteCard";
import NoteDetails from "../components/NoteDetails";
import SearchField from "../components/SearchField";

import { auth, db } from "../services/FirebaseConfig";
import { removeLocalStorage } from "../services/Utils";
import { Note, useNotesStore } from "../stores/NotesStore";
import useUserStore from "../stores/UserStore";

function NotesScreen() {
  const { setNotes, allNotes } = useNotesStore();
  const { uid, setCredentials } = useUserStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [detailsModal, setDetailsModal] = useState(false);

  const [toBeEdited, setToBeEdited] = useState({
    id: "",
    title: "",
    description: "",
  });

  const [modal, setModal] = useState({
    modalState: false,
    mode: "Create note",
  });

  const handleChange = (value: string) => {
    setSearchTerm(value);
    const filteredNotes = allNotes.filter((note) => {
      return note.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredNotes(filteredNotes);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setCredentials(false, "", "");
      removeLocalStorage("userState");
    });
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
        mode={modal.mode}
        show={modal.modalState}
        handleModal={() =>
          setModal({
            modalState: !modal.modalState,
            mode: modal.mode,
          })
        }
      />
      <NoteDetails
        id={toBeEdited.id}
        title={toBeEdited.title}
        description={toBeEdited.description}
        show={detailsModal}
        handleModal={() => {
          setDetailsModal(!detailsModal);
        }}
      />
      <div
        onClick={handleLogout}
        className="flexCenter fixed top-2 right-2 z-10 bg-blue-500 w-12 h-12 p-3 rounded-[50%] hover:translate-y-1 transition-all cursor-pointer sm:h-12 sm:w-12 sm:top-10 sm:right-10"
      >
        <HiOutlineLogout size={60} />
      </div>
      <div
        onClick={() => {
          setToBeEdited({ id: "", title: "", description: "" });
          setModal({ modalState: true, mode: "Create note" });
        }}
        className="flexCenter fixed z-10 bottom-5 right-2 bg-blue-500 w-16 h-16 p-4 rounded-[50%] hover:translate-y-1 transition-all cursor-pointer sm:bottom-10 sm:right-10"
      >
        <MdOutlineNoteAdd size={45} />
      </div>
      <div className="flexCenter flex-col mx-10 my-10 gap-3 lg:mx-32 sm:mx-16">
        <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
          Swift Note
        </h1>
        <form className="flex items-center mb-4 w-80 sm:w-96">
          <SearchField value={searchTerm} handleChange={handleChange} />
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {searchTerm === ""
            ? allNotes.map((note) => (
                <NoteCard
                  key={note.uid}
                  id={note.uid}
                  title={note.title}
                  description={note.description}
                  handleView={(id, title, description) => {
                    console.log("handleView");
                    setToBeEdited({ id, title, description });
                    setDetailsModal(!detailsModal);
                  }}
                  handleEdit={(id, title, description) => {
                    console.log("handleEdit");
                    setToBeEdited({ id, title, description });
                    setModal({ modalState: true, mode: "Edit note" });
                  }}
                />
              ))
            : filteredNotes.map((note) => (
                <NoteCard
                  key={note.uid}
                  id={note.uid}
                  title={note.title}
                  description={note.description}
                  handleView={(id, title, description) => {
                    console.log("handleView");
                    setToBeEdited({ id, title, description });
                    setDetailsModal(!detailsModal);
                  }}
                  handleEdit={(id, title, description) => {
                    console.log("handleEdit");
                    setToBeEdited({ id, title, description });
                    setModal({ modalState: true, mode: "Edit note" });
                  }}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default NotesScreen;
