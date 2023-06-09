import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import userStore from "../stores/UserStore";

interface NoteCard {
  id: string;
  title: string;
  description: string;
  handleEdit: (id: string, title: string, description: string) => void;
  handleView: (id: string, title: string, description: string) => void;
}

function NoteCard({
  id,
  title,
  description,
  handleEdit,
  handleView,
}: NoteCard) {
  const { uid } = userStore();
  const handleDelete = async () => {
    let text = "Are you sure you want to delete this note?";

    confirm(text)
      ? await deleteDoc(doc(db, uid, id)).then(() => {
          toast.success("Note deleted successfully!", {
            className: "toast-font-size",
          });
        })
      : null;
  };

  return (
    <div className="relative block max-w-lg p-4 h-52 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700 group overflow-hidden select-none cursor-pointer">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white h-8 text-ellipsis overflow-clip">
        {title}
      </h5>
      <div
        onClick={() => handleEdit(id, title, description)}
        className="absolute top-4 right-4 flexCenter opacity-0 bg-blue-500 rounded-full p-2 cursor-pointer group-hover:opacity-100 transition-all"
      >
        <MdOutlineEdit size={20} />
      </div>
      <div
        onClick={() => handleView(id, title, description)}
        className="absolute top-3/4 right-4 text-gray-400 opacity-0 bg-gray-800 rounded-lg text-sm px-2 py-1 items-center cursor-pointer hover:text-white group-hover:opacity-100 transition-all"
      >
        <AiOutlineEye size={30} />
      </div>
      <div
        onClick={() => handleDelete()}
        className="absolute top-14 right-4 flexCenter opacity-0 bg-red-500 rounded-full p-2 cursor-pointer group-hover:opacity-100 transition-all"
      >
        <MdDeleteOutline size={20} />
      </div>
      <p className="font-normal text-gray-400 break-words select-none">
        {description}
      </p>
    </div>
  );
}

export default NoteCard;
