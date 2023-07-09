import { useId } from "react";

export default function InputField({
  type,
  label,
  errorText,
  placeholder,
  isError,
  value,
  width = 80,
  handleChange,
}: InputField) {
  const fieldId = useId();
  return (
    <div className={`mb-6 w-${width}`}>
      <label
        htmlFor={fieldId}
        className={`block mb-1 text-sm font-medium ${
          isError ? `text-red-500` : `text-white`
        }`}
      >
        {label[0].toUpperCase() + label.slice(1)}
      </label>
      {type !== "textarea" ? (
        <input
          type={type}
          id={fieldId}
          name={label}
          value={value}
          onChange={(e) => handleChange(e, e.target.value)}
          className={`border text-sm rounded-lg bg-gray-700 block w-full p-2.5 text-white-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
        ${
          isError
            ? `placeholder-red-500 border-red-500 focus:ring-red-500`
            : `placeholder-white-500 border-blue-500`
        }
        placeholder-white-500`}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          id={fieldId}
          name={label}
          value={value}
          rows={5}
          onChange={(e) => handleChange(e, e.target.value)}
          className={`border text-sm rounded-lg bg-gray-700 block w-full p-2.5 text-white-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
        ${
          isError
            ? `placeholder-red-500 border-red-500 focus:ring-red-500`
            : `placeholder-white-500 border-blue-500`
        }
        placeholder-white-500`}
          placeholder={placeholder}
        />
      )}

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
  value: string;
  errorText: string;
  placeholder: string;
  isError: boolean;
  width?: number;
  type?: string;
  handleChange: (event: any, value: string) => void;
}
