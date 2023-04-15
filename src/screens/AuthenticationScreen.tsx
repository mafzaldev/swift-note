import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

import InputField from "../components/InputField";
import Button from "../components/Button";
import { auth } from "../services/FirebaseConfig";
import {
  validateEmail,
  validatePassword,
  setLocalStorage,
  getLocalStorage,
} from "../services/Utils";
import userStore from "../stores/UserStore";

function AuthenticationScreen() {
  const { setCredentials } = userStore();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    isError: false,
    isLoading: false,
    isLoginMode: true,
  });

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
        setFormState((values) => ({ ...values, isLoading: false }));
        toast.success("LoggedIn successfully!", {
          className: "toast-font-size",
        });
        setCredentials(
          true,
          userCredential.user.email!,
          userCredential.user.uid
        );
        setLocalStorage("userState", {
          isAuthenticated: true,
          email: userCredential.user.email!,
          uid: userCredential.user.uid,
        });
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

  useEffect(() => {
    const user = getLocalStorage("userState");
    if (!user) return;

    const { isAuthenticated, email, uid } = JSON.parse(user);
    if (isAuthenticated) return setCredentials(isAuthenticated, email, uid);
  }, []);

  return (
    <>
      <div className="flexCenter h-screen">
        <div className="flexCenter flex-col w-[95%] h-[75%] bg-[#323a49] my-20 rounded-lg lg:w-[28%] md:w-[65%]">
          <p className="text-4xl font-bold text-white mb-10 mt-5">Swift Note</p>
          <form className="flexCenter flex-col" autoComplete="off">
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
            <Button handleButtonClick={handleButtonClick}>
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
            </Button>
            <p className="text-sm text-white mt-2 mb-5">
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
        <p className="absolute bottom-2">
          Made with
          <span className="text-blue-500"> ❤️ </span> by
          <a href="https://github.com/mafzaldev/" className="hover:underline">
            {" "}
            @mafzaldev
          </a>
        </p>
      </div>
    </>
  );
}

export default AuthenticationScreen;
