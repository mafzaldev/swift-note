import ReactDOM from "react-dom";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import ModalCloseButton from "./ModalCloseButton";

interface NoteDetails {
  id?: string;
  title?: string;
  description?: string;
  show: boolean;
  handleModal: () => void;
}

interface NoteDetailsOverlay {
  id?: string;
  title?: string;
  description?: string;
  handleModal: () => void;
  nodeRef: React.RefObject<HTMLDivElement>;
}

function NoteDetailsOverlay({
  title,
  description,
  nodeRef,
  handleModal,
}: NoteDetailsOverlay) {
  const renderedDescription = () => {
    const lines = description!.split("\n");
    return lines.map((line, index) => <div key={index}>{line}</div>);
  };

  const content = (
    <div
      ref={nodeRef}
      className="flexCenter fixed top-0 left-0 right-0 z-50 w-full  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700 min-h-fit">
          <ModalCloseButton handleModal={handleModal} />
          <div className="px-6 py-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
            <p>{renderedDescription()}</p>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("details")!);
}

function NoteDetails({
  title = "",
  description = "",
  show,
  handleModal,
}: NoteDetails) {
  const nodeRef = useRef(null);

  return (
    <>
      {show && <Backdrop />}
      <CSSTransition
        in={show}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <NoteDetailsOverlay
          title={title}
          description={description}
          nodeRef={nodeRef}
          handleModal={handleModal}
        />
      </CSSTransition>
    </>
  );
}

export default NoteDetails;
