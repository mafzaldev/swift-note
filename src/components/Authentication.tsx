import { useState } from "react";
import InputField from "./InputField";
import useBearStore from "../store/UserStore";
function Authentication() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    isError: false,
  });

  const handleChange = (event: any, value: string) => {
    setFormState((values) => ({ ...values, [event.target.name]: value }));
  };

  return (
    <div className="flexCenter h-screen">
      <div className="flexCenter flex-col w-[95%] h-[70%] bg-[#323a49] my-20 rounded-lg lg:w-[28%] md:w-[65%]">
        <p className="text-4xl font-bold text-white mb-10 mt-5">Swift Note</p>
        <form className="flexCenter flex-col" action="">
          <InputField
            label={"email"}
            placeholder={"john@doe.com"}
            errorText={"Enter correct email address"}
            isError={formState.isError}
            value={formState.email}
            handleChange={handleChange}
          />
          <InputField
            label={"password"}
            placeholder={"•••••••••"}
            errorText={"Enter correct password"}
            isError={formState.isError}
            value={formState.password}
            handleChange={handleChange}
          />
          <button
            type="button"
            className="text-black bg-[#52ffa8] hover:bg-[#52ffa8] focus:ring-2 focus:ring-white font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2"
          >
            Login
          </button>
          <p className="text-sm text-gray-900 dark:text-white mt-2 mb-5">
            Don't have account?{" "}
            <span className="font-medium text-[#52ffa8] hover:underline cursor-pointer">
              SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
