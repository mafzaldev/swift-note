import { useId } from "react";

export default function InputField({
  label,
  errorText,
  placeholder,
  isError,
}: InputField) {
  const fieldId = useId();
  return (
    <div className="mb-6 w-80">
      <label
        htmlFor={fieldId}
        className={`block mb-2 text-sm font-medium ${
          isError ? `text-red-500` : `text-white`
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        id={fieldId}
        className={`border text-sm rounded-lg bg-gray-700 block w-full p-2.5 text-white-500 outline-none focus:ring-4 focus:ring-[#52ffa8]
        ${
          isError
            ? `placeholder-red-500 border-red-500`
            : `placeholder-white-500`
        }
        placeholder-white-500
        border-[#52ffa8]`}
        placeholder={placeholder}
      />

      {isError && (
        <p className={`mt-2 text-sm text-red-500`}>
          <span className="font-medium">{errorText}</span>
        </p>
      )}
    </div>
  );
}

interface InputField {
  label: string;
  errorText: string;
  placeholder: string;
  isError: boolean;
}
