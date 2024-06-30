import { UseFormRegisterReturn } from "react-hook-form";

interface InputRow {
  label: string;
  inputId: string;
  inputRef: UseFormRegisterReturn;
  type: string;
}

function InputRow({ label, inputId, inputRef, type }: InputRow) {
  return (
    <tr className="bg-white">
      <th
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {label}:
      </th>
      <td className="px-6 py-2">
        <input
          id={inputId}
          type={type}
          className=" w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
          {...inputRef}
        />
      </td>
    </tr>
  );
}

export default InputRow;
