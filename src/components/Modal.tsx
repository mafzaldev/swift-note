import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

import { db } from "../services/FirebaseConfig";
import userStore from "../stores/UserStore";

import Backdrop from "./Backdrop";
import ModalCloseButton from "./ModalCloseButton";
import InputField from "./InputField";
import Button from "./Button";

function ModalOverlay({
  id = "",
  title = "",
  description = "",
  mode,
  nodeRef,
  handleModal,
}: ModalOverlay) {
  const { uid } = userStore();

  const [formState, setFormState] = useState({
    title: title,
    description: description,
    isError: false,
    isLoading: false,
  });

  const handleChange = (e: any) => {
    setFormState((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    const docId = uuidv4();
    await setDoc(doc(db, uid, docId), {
      uid: docId,
      title: formState.title,
      description: formState.description,
    }).then(() => {
      handleModal();
      toast.success("Note created successfully!", {
        className: "toast-font-size",
      });
    });
  };

  const handleEdit = async () => {
    await updateDoc(doc(db, uid, id), {
      title: formState.title,
      description: formState.description,
    }).then(() => {
      handleModal();
      toast.success("Note edited successfully!", {
        className: "toast-font-size",
      });
    });
  };

  const handleSubmit = async () => {
    if (formState.title.length < 5 || formState.description.length < 15) {
      setFormState((values) => ({
        ...values,
        isError: true,
      }));
    } else {
      setFormState((values) => ({
        ...values,
        isLoading: true,
        isError: false,
      }));
      mode === "Create note" ? handleCreate() : handleEdit();
      setFormState((values) => ({
        ...values,
        id: "",
        title: "",
        description: "",
        isLoading: false,
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
            <form className="flexCenter flex-col space-y-6" autoComplete="off">
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
                value={formState.description}
                type="textarea"
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

function Modal({
  id = "",
  title = "",
  description = "",
  mode,
  show,
  handleModal,
}: Modal) {
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
        <ModalOverlay
          id={id}
          title={title}
          description={description}
          mode={mode}
          nodeRef={nodeRef}
          handleModal={handleModal}
        />
      </CSSTransition>
    </>
  );
}

export default Modal;

interface Modal {
  id?: string;
  title?: string;
  description?: string;
  show: boolean;
  mode: string;
  handleModal: () => void;
}

interface ModalOverlay {
  id?: string;
  title?: string;
  description?: string;
  mode: string;
  handleModal: () => void;
  nodeRef: React.RefObject<HTMLDivElement>;
}
