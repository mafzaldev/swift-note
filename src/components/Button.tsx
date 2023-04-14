import React from "react";

function Button({ children, handleButtonClick }: Button) {
  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-white font-medium rounded-lg text-sm px-14 py-2.5 mr-2 mb-2"
    >
      {children}
    </button>
  );
}

export default Button;

interface Button {
  children: React.ReactNode;
  handleButtonClick: () => void;
}
