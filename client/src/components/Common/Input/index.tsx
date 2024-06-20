import { UseFormRegisterReturn } from "react-hook-form";

interface Input {
  label?: string | undefined;
  name?: string | undefined;
  type: string | undefined;
  className: string | undefined;
  inputClassName?: string | undefined;
  isRequired?: boolean;
  placeholder: string | undefined;
  // register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  inputRef: UseFormRegisterReturn;
  value?: string | undefined;
  onChange?: () => void;
}

function Input({
  label = "",
  name = "",
  type = "text",
  className = "",
  inputClassName = "",
  isRequired = true,
  placeholder = "",
  inputRef,
  value = "",
  onChange = () => {},
}: Input) {
  return (
    <div className={`${className}`}>
      <label
        htmlFor={name}
        className="block text-clamp-xs font-medium text-gray-800 md:text-clamp-xs"
      >
        {label}
      </label>

      {inputRef ? (
        <input
          type={type}
          id={name}
          className={`bg-gray-50 border px-3 py-0.5 border-gray-300 text-gray-900 text-clamp-xs rounded-full block w-full focus:ring-blue-500 focus:border-blue-500 lg:w-clamp-form-input md:px-3 ${inputClassName}`}
          placeholder={placeholder}
          required={isRequired}
          {...inputRef}
        />
      ) : (
        <input
          type={type}
          id={name}
          value={value}
          className={`bg-gray-50 border px-3 py-0.5 border-gray-300 text-gray-900 text-clamp-xs rounded-full block w-full focus:ring-blue-500 focus:border-blue-500 lg:w-clamp-form-input md:px-3 ${inputClassName}`}
          placeholder={placeholder}
          required={isRequired}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Input;
