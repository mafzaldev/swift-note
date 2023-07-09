import React, { FormEvent, SyntheticEvent } from "react";

function Button({ children, handleButtonClick, type }: Button) {
  return (
    <button
      type={type}
      onClick={() => handleButtonClick}
      className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-white font-medium rounded-lg text-sm px-14 py-2.5 mr-2 mb-2"
    >
      {children}
    </button>
  );
}

export default Button;

interface Button {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  handleButtonClick: (e: FormEvent<HTMLFormElement>) => void;
}
