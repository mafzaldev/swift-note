import React from "react";
import Backdrop from "./Backdrop";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loader() {
  return (
    <>
      <Backdrop />
      <div className="flexCenter flex-col fixed top-0 left-0 right-0 z-20 h-full">
        <AiOutlineLoading3Quarters
          color={"white"}
          size={70}
          className="animate-spin"
        />
      </div>
    </>
  );
}

export default Loader;
