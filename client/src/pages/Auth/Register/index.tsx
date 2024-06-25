import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Button from "../../../components/Common/Button/PrimaryButton";
import Input from "../../../components/Common/Input";
import provinceAndMunicipality from "../../../constants/provinceAndMunicipality";
import organizations from "../../../constants/organizations";
import { register as registerUser } from "../../../api/auth";
import { UserProps } from "../../../types/user.type";

import leavesImage from "../../assets/images/signup-side-panel.webp";

interface Error {
  data: string[];
}

function Register() {
  document.title = "Green Loop | Sign Up";

  const navigate = useNavigate();

  const [places, setPlaces] = useState<string[] | undefined>([]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      organization: "Waste Generator",
      province: "",
      city: "",
    },
  });

  const { mutate: handleRegisterUser } = useMutation({
    mutationFn: (data: UserProps) => registerUser(data),
    onSuccess: () => {
      alert("Company created successfully");
      navigate("/users/sign-in");
    },
    onError: (error: Error) => {
      alert(error?.data);
      console.log("error: ", error);
    },
  });

  const onSubmit: SubmitHandler<UserProps> = (data, ev) => {
    ev?.preventDefault();
    handleRegisterUser(data);
  };

  const handleOnChangeProvince = (ev: React.FormEvent<HTMLInputElement>) => {
    const inputEl = ev.target as HTMLInputElement;
    if (inputEl.id == "provinces" && inputEl.value == "Select a Province") {
      setPlaces([]);
    } else {
      const filteredMunicipalities = provinceAndMunicipality.filter(
        (province) => province.name.includes(inputEl.value)
      )[0];
      const municipalities = document.getElementById(
        "municipalities"
      ) as HTMLInputElement;

      municipalities.value = filteredMunicipalities.places[0];
      setPlaces(filteredMunicipalities.places);
    }
  };

  return (
    <div className="h-dvh flex w-dvw items-center">
      <div className="flex flex-row shadow-lg justify-center w-2/4 h-9/10 max-w-6xl mx-auto lg:h-full lg:flex-col md:items-start md:w-2/4 sm:w-3/4 sm:h-screen xsm:w-full">
        <div className="w-2/4 h-full border border-palette-lighter bg-red-500 rounded shadow-lg lg:mb-3 md:mb-0 lg:h-[8%] lg:w-full">
          <img
            src={leavesImage}
            alt="Forrest illustration"
            className="w-full h-full object-cover xsm:h-36"
          />
        </div>
        <div className="flex flex-col justify-center h-full w-full max-w-sm mx-auto space-y-4 min-h-128 lg:w-4/6 xsm:w-3/4">
          <div className="text-clamp-form-greenloop font-extrabold text-[#31572C] text-center ">
            GreenLoop
          </div>
          <div className="text-clamp-form-header font-extrabold px-12 md:ml-0">
            Sign Up
          </div>

          <form
            className="flex flex-col justify-start items-left px-12 w-full md:px-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="mb-6"
              inputRef={register("fullName")}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="mb-6"
              inputRef={register("email")}
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              className="mb-6"
              inputRef={register("username")}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-1"
              inputRef={register("password")}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="mt-5"
              inputRef={register("confirmPassword")}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block py-0.5 mt-5"
              {...register("organization", {
                required: "Please select organization type",
              })}
            >
              {organizations.map((item, index) => (
                <option id={String(index)} key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              id="province"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block py-0.5 mt-5"
              {...register("province", {
                onChange: (e) => handleOnChangeProvince(e),
                required: "Please select a province",
              })}
            >
              {provinceAndMunicipality.map((province, index) => (
                <option id={String(index)} key={index} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <select
              id="cityMunicipality"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block py-0.5 mt-5"
              {...register("city", {
                required: "Please select a city or municipality",
              })}
            >
              {places?.map((place, index) => (
                <option id={String(index)} key={index} value={place}>
                  {place}
                </option>
              ))}
            </select>

            <div className="text-center">
              <Button
                label="Sign up"
                type="submit"
                className="bg-[#31572C] rounded-3xl mt-5"
              />
            </div>
          </form>
          <div className="mx-auto text-center">
            <span className="text-[#6C6C6C] font-light text-xs">
              Already have an account?{" "}
            </span>
            <span
              className="text-xs font-medium cursor-pointer text-[#86A16E] no-underline md:text-clamp-xs"
              onClick={() => navigate("/users/sign-in")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
