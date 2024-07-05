import { UseFormRegisterReturn } from "react-hook-form";

interface InputRow {
  label: string;
  inputId?: string;
  inputRef: UseFormRegisterReturn;
  type?: string;
}

function InputRow({ label, inputId, inputRef, type }: InputRow) {
  const inputRow = {
    id: inputId,
    type,
    className:
      "w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24",
  };

  return (
    <tr className="bg-white">
      <th
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {label}:
      </th>
      <td className="px-6 py-2">
        {type ? (
          <input {...inputRow} {...inputRef} />
        ) : (
          <select
            className="bg-gray-50 border w-44 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
            {...register("organization", {
              required: "Please select organization type",
            })}
          >
            {organizations?.map((item, index) => (
              <option id={String(index)} key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        )}
      </td>
    </tr>
  );
}

export default InputRow;
