import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

import InputField from "../components/InputField";
import { auth } from "../services/FirebaseConfig";
import { validateEmail, validatePassword } from "../services/Utils";
import userStore from "../stores/UserStore";

function AuthenticationScreen() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    isError: false,
    isLoading: false,
    isLoginMode: true,
  });

  const { setCredentials } = userStore();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
      .then(() => {
        toast.success("SignedUp successfully. Now login again!", {
          className: "toast-font-size",
        });
        setFormState((values) => ({ ...values, isLoading: false }));
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, { className: "toast-font-size" });
        setFormState((values) => ({ ...values, isLoading: false }));
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        toast.success("LoggedIn successfully!", {
          className: "toast-font-size",
        });
        setFormState((values) => ({ ...values, isLoading: false }));
        setCredentials(
          true,
          userCredential.user.email!,
          userCredential.user.uid
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, { className: "toast-font-size" });
        setFormState((values) => ({ ...values, isLoading: false }));
        setCredentials(false, "", "");
      });
  };

  const handleButtonClick = () => {
    if (
      !validateEmail(formState.email) &&
      !validatePassword(formState.password)
    ) {
      setFormState((values) => ({ ...values, isError: true }));
      return;
    }
    formState.isLoginMode ? handleLogin() : handleSignUp();
    setFormState((values) => ({ ...values, isError: false, isLoading: true }));
  };

  const handleChange = (event: any, value: string) => {
    setFormState((values) => ({ ...values, [event.target.name]: value }));
  };

  const handleFormState = () => {
    setFormState((values) => ({
      ...values,
      isLoginMode: !values.isLoginMode,
    }));
  };

  return (
    <div className="flexCenter h-screen">
      <div className="flexCenter flex-col w-[95%] h-[70%] bg-[#323a49] my-20 rounded-lg lg:w-[28%] md:w-[65%]">
        <p className="text-4xl font-bold text-white mb-10 mt-5">Swift Note</p>
        <form className="flexCenter flex-col" action="">
          <InputField
            label={"email"}
            placeholder={"john@doe.com"}
            errorText={"Please enter correct email address!"}
            isError={formState.isError}
            value={formState.email}
            handleChange={handleChange}
          />
          <InputField
            label={"password"}
            placeholder={"•••••••••"}
            errorText={"Please enter correct password!"}
            isError={formState.isError}
            value={formState.password}
            handleChange={handleChange}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-white font-medium rounded-lg text-sm px-14 py-2.5 mr-2 mb-2"
          >
            {formState.isLoading ? (
              <AiOutlineLoading3Quarters
                color={"white"}
                size={20}
                className="animate-spin"
              />
            ) : formState.isLoginMode ? (
              "LogIn"
            ) : (
              "SignUp"
            )}
          </button>
          <p className="text-sm text-gray-900 dark:text-white mt-2 mb-5">
            {formState.isLoginMode
              ? "Don't have account?"
              : "Already have an account?"}{" "}
            <span
              onClick={handleFormState}
              className="font-medium text-blue-500 hover:underline cursor-pointer"
            >
              {formState.isLoginMode ? "SignUp" : "LogIn"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationScreen;
