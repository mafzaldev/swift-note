import { useState } from "react";
import InputField from "./InputField";

function SignUp() {
  const [isError, setIsError] = useState(false);
  return (
    <div className="flexCenter h-screen">
      <div className="flexCenter flex-col w-[28%] h-3/5 bg-[#323a49] my-20 rounded-lg">
        <p className="text-4xl font-bold text-white mb-10 mt-5">Swift Note</p>
        <form className="flexCenter flex-col" action="">
          <InputField
            label={"Email"}
            placeholder={"john@doe.com"}
            errorText={"Enter correct email address"}
            isError={isError}
          />
          <InputField
            label={"Password"}
            placeholder={"•••••••••"}
            errorText={"Enter correct password"}
            isError={isError}
          />
          <button
            type="button"
            className="text-black bg-[#52ffa8] hover:bg-[#52ffa8] focus:ring-2 focus:ring-white font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2"
          >
            Login
          </button>
          <p className="text-sm text-gray-900 dark:text-white mt-2">
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

export default SignUp;
