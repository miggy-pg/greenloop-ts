import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Form } from "react-router-dom";
import InputRow from "../../InputRow";
import { UserProps } from "../../../../types/user.type";
import organizations from "../../../../constants/organizations";

interface CreateUser {
  handleSubmit: UseFormHandleSubmit<UserProps>;
  register: UseFormRegister<FieldValues>;
  image: string[];
}

function CreateUser({ handleSubmit, register, image }: CreateUser) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-2xl">
          <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-108 bg-white outline-none focus:outline-none xsm:h-3/4 xsm:w-80">
              <div className="flex items-center justify-center p-4 border-solid mx-auto border-blueGray-200 rounded-t md:p-2">
                <h3 className="text-2xl font-semibold md:text-clamp">
                  {user?.id ? "Edit Company" : "Create Company"}
                </h3>
              </div>
              <hr />

              <div className="relative p-6 pb-1">
                <span className="flex justify-center items-center text-center mb-3">
                  {imagePreview ? (
                    <img
                      src={
                        imagePreview
                          ? URL.createObjectURL(imagePreview)
                          : undefined
                      }
                      alt={imagePreview ? imagePreview.name : undefined}
                      className="relative w-24 h-24 bg-white rounded-full flex justify-center items-center sm:w-28 sm:h-28 xsm:h-16 xsm:w-16"
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      className="relative w-24 h-24 bg-white rounded-full flex justify-center items-center sm:w-28 sm:h-28 xsm:h-16 xsm:w-16"
                    />
                  )}
                </span>
                <div className="w-full text-center">
                  <div className="relative w-48 h-[1.7rem] text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full inline-flex justify-center items-center">
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => fetchImage(e)}
                    />
                    <label
                      htmlFor="image-upload"
                      className="absolute cursor-pointer"
                    >
                      <p className="text-slate-400 text-clamp-xs">
                        {image ? "Replace" : "Update Profile Picture"}
                      </p>
                    </label>
                  </div>
                </div>

                <p className="mt-5 mx-6 mb-0 text-[#5b5c61] text-clamp-xs leading-relaxed text-left xsm:mx-2">
                  Generate Account Settings:
                </p>
              </div>

              <div className="relative overflow-hidden py-5">
                <table className="w-full mx-6 text-clamp-xs text-left  rtl:text-right text-gray-500 sm:mx-2">
                  <tbody>
                    <InputRow
                      label="Name"
                      inputId="fullName"
                      type="text"
                      inputRef={register("fullName")}
                    />
                    <InputRow
                      label="Username"
                      inputId="username"
                      type="text"
                      inputRef={register("username")}
                    />
                    <InputRow
                      label="Password"
                      inputId="password"
                      type="text"
                      inputRef={register("password")}
                    />
                    <InputRow
                      label="Email"
                      inputId="email"
                      type="email"
                      inputRef={register("email")}
                    />
                    <InputRow
                      label="Organization"
                      inputRef={register("organization")}
                    />
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Province:
                      </th>
                      <td className="px-6 py-2">
                        <select
                          id="province"
                          className="bg-gray-50 border w-44 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                          {...register("province", {
                            onChange: (e) => handleOnChangeProvince(e),
                            required: "Please select a province",
                          })}
                        >
                          {provinceAndMunicipality.map((province, index) => (
                            <option key={index} value={province?.name}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        City/Municipality:
                      </th>
                      <td className="px-6 py-2">
                        <select
                          id="cityMunicipality"
                          className="bg-gray-50 border border-gray-300 w-44 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                          {...register("city", {
                            required: "Please select a city or municipality",
                          })}
                        >
                          {places?.map((place, index) => (
                            <option key={index} value={place}>
                              {place}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Is Admin?
                      </th>
                      <td className="px-6 py-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" {...register("isAdmin")} />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b md:p-2">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-clamp-button md:px-3 md:py-1"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className="bg-[#31572C] text-white active:bg-[#2e4d29] font-bold uppercase text-xs px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-clamp-button md:px-3 md:py-1"
                  type="submit"
                >
                  {user?.id ? "Update" : "Create Company"}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}

export default CreateUser;
