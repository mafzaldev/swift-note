import { useState } from "react";
import NoteCard from "../components/NoteCard";
import SearchField from "../components/SearchField";
function NotesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (value: string) => {
    console.log(value);
    setSearchTerm(value);
  };

  return (
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
  );
}

export default NotesScreen;
