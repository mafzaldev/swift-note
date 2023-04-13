import React from "react";
import { MdOutlineEdit } from "react-icons/md";

interface NoteCard {
  id: string;
  title: string;
  description: string;
}

function NoteCard({ id, title, description }: NoteCard) {
  return (
    <div className="relative block max-w-lg p-4 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700 group">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white h-8 text-ellipsis overflow-clip">
        {title}
      </h5>
      <div className="absolute top-4 right-4 flexCenter opacity-0 bg-blue-500 rounded-full p-2 cursor-pointer group-hover:opacity-100 transition-all">
        <MdOutlineEdit size={20} />
      </div>
      <p className="font-normal text-gray-400">{description}</p>
    </div>
  );
}

export default NoteCard;
