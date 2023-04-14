import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import NoteCard from "../components/NoteCard";
import SearchField from "../components/SearchField";
import Modal from "../components/Modal";

function NotesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(true);

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Modal show={modalOpen} handleModal={() => setModalOpen(!modalOpen)} />
      <div
        onClick={() => setModalOpen(!modalOpen)}
        className="flexCenter absolute bottom-10 right-10 bg-blue-500 w-16 h-16 p-4 rounded-[50%] hover:translate-y-1 transition-all cursor-pointer"
      >
        <AiOutlineFileAdd size={45} />
      </div>
      <div className="flexCenter flex-col mx-10 mt-10 gap-3 lg:mx-32 sm:mx-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Swift Note
        </h1>
        <form className="flex items-center mb-4 w-80 sm:w-96">
          <SearchField value={searchTerm} handleChange={handleChange} />
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <NoteCard
            title="LoremskhahkfslfasdkjfdasfgadsflLoremskhahkfslfasdkjfdasfgadsfl"
            description="Loremskhahkfslfasdkjfdasfgadsfl"
            id="2"
          />
          <NoteCard
            title="LoremskhahkfslfasdkjfdasfgadsflLoremskhahkfslfasdkjfdasfgadsfl"
            description="Loremskhahkfslfasdkjfdasfgadsfl"
            id="2"
          />
          <NoteCard
            title="LoremskhahkfslfasdkjfdasfgadsflLoremskhahkfslfasdkjfdasfgadsfl"
            description="Loremskhahkfslfasdkjfdasfgadsfl"
            id="2"
          />
          <NoteCard
            title="LoremskhahkfslfasdkjfdasfgadsflLoremskhahkfslfasdkjfdasfgadsfl"
            description="Loremskhahkfslfasdkjfdasfgadsfl"
            id="2"
          />
          <NoteCard
            title="LoremskhahkfslfasdkjfdasfgadsflLoremskhahkfslfasdkjfdasfgadsfl"
            description="Loremskhahkfslfasdkjfdasfgadsfl"
            id="2"
          />
          <NoteCard
            title="LoremskhahkfslfasdkjfdasfgadsflLoremskhahkfslfasdkjfdasfgadsfl"
            description="Loremskhahkfslfasdkjfdasfgadsfl"
            id="2"
          />
        </div>
      </div>
    </>
  );
}

export default NotesScreen;
