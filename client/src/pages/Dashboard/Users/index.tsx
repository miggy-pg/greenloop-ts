import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Table from "../../../components/Common/Table";
import CompanyList from "../../../components/Management/CompanyList";
import { createCompany, deleteCompany, updateCompany } from "../../api/company";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { useFetchCompanies } from "../../hooks/useCompany";
import { userHeader } from "../../constants/userHeader";

import defaultImage from "../../assets/images/default-image.jpg";
import mindanaoPlaces from "../../constants/mindanaoPlaces";
import { organizationType } from "../../constants/organizationType";

export default function Users() {
  document.title = "Green Loop | Dashboard";
  const queryClient = useQueryClient();

  const [companyData, setCompanyData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [places, setPlaces] = useState([]);

  const {
    companiesData: { data: allCompanies },
  } = useFetchCompanies();

  const { image, fetchImage, imagePreview, setImage, setImagePreview } =
    useUploadImage();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      isAdmin: companyData?.isAdmin,
      cityMunicipality: companyData?.cityMunicipality,
    },
  });

  const handleOnChangeProvince = (e) => {
    if (e.target.id == "provinces" && e.target.value == "Select a Province") {
      setPlaces([]);
    } else {
      const filteredMunicipalities = mindanaoPlaces.filter((province) =>
        province.name.includes(e.target.value)
      );
      setPlaces(filteredMunicipalities[0].places);
    }
  };

  const getCompanyData = (companyId) => {
    const companyInfo = allCompanies.filter(
      (company) => company.id == companyId
    );
    setCompanyData(companyInfo[0]);
    const filteredMunicipalities = mindanaoPlaces.filter((province) =>
      province.name.includes(companyInfo[0].province)
    )[0];
    setPlaces(filteredMunicipalities.places);
    setShowModal(true);
  };

  const { mutate: handleCreateCompany } = useMutation({
    mutationFn: (data) => createCompany(data),
    onSuccess: () => {
      alert("Company created successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      reset();
      setShowModal(false);
      setCompanyData({});
      setImagePreview("");
      setImage("");
    },
  });

  const { mutate: handleUpdateCompany } = useMutation({
    mutationFn: (data) => updateCompany(data.companyId, data.formData),
    onSuccess: () => {
      alert("Company updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      reset();
      setCompanyData({});
      setImagePreview("");
      setImage([]);
      setShowModal(false);
    },
    onError: (error) => {
      alert(error.response?.data);
      console.log("error: ", error);
    },
  });

  const { mutate: handleDeleteCompany } = useMutation({
    mutationFn: (companyId) => deleteCompany(companyId),
    onSuccess: () => {
      alert("Company has been deleted");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const onSubmit = (data) => {
    const formData = { ...data, image };
    companyData?.id
      ? handleUpdateCompany({ companyId: companyData.id, formData: formData })
      : handleCreateCompany({ ...formData, onAdminCreated: true });
  };

  const onClose = () => {
    setShowModal(false);
    setCompanyData({});
    setImagePreview("");
    setImage("");
  };

  useMemo(() => {
    reset(companyData);
  }, [companyData, reset]);

  console.log("companyData: ", companyData);
  return (
    <div className="overflow-x-scroll">
      <div className="px-4 justify-start mb-5">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#31572C] text-white text-clamp-base p-2 px-4 rounded-full hover:bg-[#3c6137] ease-linear transition-all duration-150 "
        >
          Create Company
        </button>
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="shadow rounded-lg">
          <Table>
            <Table.Header
              data={userHeader}
              render={(header, index) => (
                <Table.Column key={index} header={header} />
              )}
            />
            <Table.Body>
              {allCompanies?.map((company, i) => (
                <CompanyList
                  key={i}
                  company={company}
                  getCompanyData={getCompanyData}
                  handleDeleteCompany={handleDeleteCompany}
                />
              ))}
            </Table.Body>
          </Table>
          {showModal && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-2xl">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                  >
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-108 bg-white outline-none focus:outline-none xsm:h-3/4 xsm:w-80">
                      <div className="flex items-center justify-center p-4 border-solid mx-auto border-blueGray-200 rounded-t md:p-2">
                        <h3 className="text-2xl font-semibold md:text-clamp">
                          {companyData.id ? "Edit Company" : "Create Company"}
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
                                  : null
                              }
                              alt={imagePreview ? imagePreview.name : null}
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
                                {image.length
                                  ? "Replace"
                                  : "Update Profile Picture"}
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
                            <tr className="bg-white">
                              <th
                                scope="row"
                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                              >
                                Name:
                              </th>
                              <td className="px-6 py-2">
                                <input
                                  type="text"
                                  name="companyName"
                                  id="companyName"
                                  className=" w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                  {...register("companyName")}
                                />
                              </td>
                            </tr>
                            <tr className="bg-white">
                              <th
                                scope="row"
                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                              >
                                Username:
                              </th>
                              <td className="px-6 py-2">
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                  {...register("username")}
                                />
                              </td>
                            </tr>
                            <tr className="bg-white ">
                              <th
                                scope="row"
                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                              >
                                Password:
                              </th>
                              <td className="px-6 py-2">
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                  {...register("password")}
                                />
                              </td>
                            </tr>
                            <tr className="bg-white ">
                              <th
                                scope="row"
                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                              >
                                Email:
                              </th>
                              <td className="px-6 py-2">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                  {...register("email")}
                                />
                              </td>
                            </tr>
                            <tr className="bg-white ">
                              <th
                                scope="row"
                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                              >
                                Org Type:
                              </th>
                              <td className="px-6 py-2">
                                <select
                                  id="organization-type"
                                  name="organizationType"
                                  className="bg-gray-50 border w-44 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                  {...register("organizationType", {
                                    required: "Please select organization type",
                                  })}
                                >
                                  {organizationType?.map((item, index) => (
                                    <option
                                      id={index}
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
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
                                  {mindanaoPlaces.map((province, index) => (
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
                                  {...register("cityMunicipality", {
                                    required:
                                      "Please select a city or municipality",
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
                                  <input
                                    type="checkbox"
                                    {...register("isAdmin")}
                                  />
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
                          {companyData?.id ? "Update" : "Create Company"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
