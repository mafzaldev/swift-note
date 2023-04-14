import { useRef, useState } from "react";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import ModalCloseButton from "./ModalCloseButton";
import InputField from "./InputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "./Button";

function ModalOverlay({ mode, nodeRef, handleModal }: ModalOverlay) {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    isError: false,
    isLoading: false,
  });

  const handleChange = (e: any) => {
    setFormState((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (formState.title.length < 5 || formState.description.length < 15) {
      setFormState((values) => ({
        ...values,
        isError: true,
      }));
    } else {
      setFormState((values) => ({
        ...values,
        isLoading: true,
      }));
    }
  };

  const content = (
    <div
      ref={nodeRef}
      className="flexCenter fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <ModalCloseButton handleModal={handleModal} />
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {mode}
            </h3>
            <form className="flexCenter flex-col space-y-6">
              <InputField
                label={"title"}
                placeholder={"NodeJS Course"}
                errorText={"Please enter note title"}
                isError={formState.isError}
                value={formState.title}
                width={80}
                handleChange={handleChange}
              />
              <InputField
                label={"description"}
                placeholder={"NodeJS Course on Udemy"}
                errorText={
                  "Course description should be at least 15 characters long"
                }
                width={80}
                isError={formState.isError}
                value={formState.title}
                handleChange={handleChange}
              />
              <Button handleButtonClick={handleSubmit}>
                {formState.isLoading ? (
                  <AiOutlineLoading3Quarters
                    color={"white"}
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  mode
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal")!);
}

function Modal({ mode, show, handleModal }: Modal) {
  const nodeRef = useRef(null);

  return (
    <>
      {show && <Backdrop onClick={handleModal} />}
      <CSSTransition
        in={show}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay mode={mode} nodeRef={nodeRef} handleModal={handleModal} />
      </CSSTransition>
    </>
  );
}

export default Modal;

interface Modal {
  show: boolean;
  mode: string;
  handleModal: () => void;
}

interface ModalOverlay {
  mode: string;
  handleModal: () => void;
  nodeRef: React.RefObject<HTMLDivElement>;
}
function handleButtonClick(event: any): void {
  throw new Error("Function not implemented.");
}
