import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onClick }: Backdrop) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen bg-[#0000006a] z-10"
      onClick={onClick}
    ></div>,
    document.getElementById("backdrop")!
  );
};

export default Backdrop;

interface Backdrop {
  onClick: () => void;
}
