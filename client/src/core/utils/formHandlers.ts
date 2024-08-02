import { SetStateAction } from "react";

interface Province {
  name: string;
  places: string[];
}

interface ProvinceAndMunicipality extends Array<Province> {}

const handleOnChangeProvince = (
  event: React.FormEvent<HTMLInputElement>,
  provinceAndMunicipality: ProvinceAndMunicipality,
  setPlaces: React.Dispatch<SetStateAction<string[]>>
) => {
  const inputEl = event.target as HTMLInputElement;
  if (inputEl.id == "provinces" && inputEl.value == "Select a Province") {
    setPlaces([]);
  } else {
    const filteredMunicipalities = provinceAndMunicipality.filter((province) =>
      province.name.includes(inputEl.value)
    )[0];
    const municipalities = document.getElementById(
      "municipalities"
    ) as HTMLInputElement;

    municipalities.value = filteredMunicipalities.places[0];
    setPlaces(filteredMunicipalities.places);
  }
};

export { handleOnChangeProvince };
