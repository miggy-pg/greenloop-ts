import { UseFormRegisterReturn } from "react-hook-form";

interface Input {
  label?: string | undefined;
  name?: string | undefined;
  type: string | undefined;
  className: string | undefined;
  inputClassName?: string | undefined;
  required?: boolean;
  placeholder: string | undefined;
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
  required = true,
  placeholder = "",
  inputRef,
  value = "",
  onChange = () => {},
}: Input) {
  const inputProps = {
    id: name,
    type,
    className: `bg-gray-50 border px-3 py-0.5 border-gray-300 text-gray-900 text-clamp-xs rounded-full block w-full focus:ring-blue-500 focus:border-blue-500 lg:w-clamp-form-input md:px-3 ${inputClassName}`,
    placeholder,
    required,
  };

  return (
    <div className={`${className}`}>
      <label
        htmlFor={name}
        className="block text-clamp-xs font-medium text-gray-800 md:text-clamp-xs"
      >
        {label}
      </label>

      <input {...inputProps} {...(inputRef ? inputRef : { value, onChange })} />
    </div>
  );
}

export default Input;
