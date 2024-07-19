import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  IoFilter,
  IoSwapVerticalSharp,
  IoTrashBinSharp,
} from "react-icons/io5";
import { TbArrowBarLeft } from "react-icons/tb";

import Body from "../../components/Common/Body";
import Pagination from "../../components/Common/Pagination";
import ListingCard from "../../components/Common/Cards/ListingCard";
import SortByCard from "../../components/Common/Cards/SortByCard";
import { wasteCategories } from "../../constants/waste";

import { useGetWastes } from "../../hooks/useWaste";
import { usePaginate } from "../../hooks/usePaginate";
import provinceAndMunicipality from "../../constants/provinceAndMunicipality";
import { WasteCardProps } from "../../types/waste.type";

interface Image<T = { public_id: string; url: string }> {
  image: T;
}

const filterWastes = (
  unfilteredWastes: WasteCardProps<Image["image"]>[],
  province: string,
  city: string,
  categories: string[] | never
) => {
  let filteredWaste = unfilteredWastes;
  let provinceItem = province?.toLowerCase();
  let cityMunicipalityItem = city?.toLowerCase();

  if (!provinceItem && !cityMunicipalityItem && !categories) return [];

  if (provinceItem && cityMunicipalityItem && categories) {
    return filteredWaste
      .filter((waste) =>
        waste.user.province.toLowerCase().includes(provinceItem)
      )
      .filter((waste) =>
        waste.user.city.toLowerCase().includes(cityMunicipalityItem)
      )
      .filter((waste) =>
        categories.some((category) =>
          waste.category.toLowerCase().includes(category.toLowerCase())
        )
      );
  } else if (provinceItem && !cityMunicipalityItem && categories) {
    return filteredWaste
      .filter((waste) =>
        waste.user.province.toLowerCase().includes(provinceItem)
      )
      .filter((waste) =>
        categories.some((category) =>
          waste.category.toLowerCase().includes(category.toLowerCase())
        )
      );
  } else if (provinceItem && cityMunicipalityItem && !categories) {
    return filteredWaste
      .filter((waste) =>
        waste.user.province.toLowerCase().includes(provinceItem)
      )
      .filter((waste) =>
        waste.user.city.toLowerCase().includes(cityMunicipalityItem)
      );
  } else if (provinceItem && !cityMunicipalityItem && !categories) {
    return filteredWaste.filter((waste) =>
      waste.user.province.toLowerCase().includes(provinceItem)
    );
  } else if (!provinceItem && !cityMunicipalityItem && categories) {
    return filteredWaste.filter((waste) =>
      categories.some((category) =>
        waste.category.toLowerCase().includes(category.toLowerCase())
      )
    );
  } else if (!provinceItem && cityMunicipalityItem && !categories) {
    return filteredWaste.filter((waste) =>
      waste.user.city.toLowerCase().includes(cityMunicipalityItem)
    );
  }
};

const Listing = ({
  myWaste,
}: {
  myWaste: WasteCardProps<Image["image"]>[];
}) => {
  document.title = "Green Loop | Listing";

  const userStorage = localStorage.getItem("user:detail");
  const user = userStorage ? JSON.parse(userStorage) : "";
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [currentCategories, setCategoryQuery] = useState<string[]>([]);
  const [open, setOpen] = useState(true);
  const [isSortBy, setIsSortBy] = useState(false);
  const [places, setPlaces] = useState<string[] | []>([]);
  const [filteredWaste, setFilteredWaste] = useState<
    WasteCardProps<Image["image"]>[] | [] | undefined
  >([]);

  const wasteQuery = useGetWastes();
  const { wastes, isLoading, error } = useMemo(() => wasteQuery, [wasteQuery]);
  let filterQuery = searchParams.get("filter") || "";
  let provinceParams = searchParams.get("province") || "";
  let cityMunicipalityParams = searchParams.get("city") || "";
  let categoryParams = [searchParams.get("category")].filter(
    (param): param is string => param !== null
  );

  let wasteItems: WasteCardProps<Image["image"]>[];
  if (filterQuery) {
    wasteItems = wastes?.filter((waste) => waste.post.includes(filterQuery));
  } else {
    wasteItems = wastes;
  }

  const displayedWaste = myWaste ? myWaste : wasteItems;
  const origWaste =
    provinceParams.length > 0 || categoryParams?.length > 0
      ? filteredWaste
      : displayedWaste;

  const {
    searchParams: paginatePage,
    setSearchParams: setPaginatePage,
    currentPage,
    currentPosts,
  } = usePaginate(origWaste);

  const handleOnChangeProvince = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    searchParams.delete("category");
    setSearchParams(searchParams);

    setCategoryQuery([]);

    const inputEl = event.target as HTMLInputElement;
    let selectedProvince = inputEl.value;

    if (
      inputEl.id == "provinces" &&
      provinceParams &&
      selectedProvince == "Select a Province"
    ) {
      searchParams.delete("province");
      searchParams.delete("city");
      setSearchParams(searchParams);
      setPlaces([]);
      setFilteredWaste([]);
    } else {
      const filteredMunicipalities = provinceAndMunicipality.filter(
        (province) => province.name.includes(selectedProvince)
      )[0];
      const wastesProvince = displayedWaste.filter((waste) =>
        waste.user.province.includes(selectedProvince)
      );
      wasteCategories.map((category) => {
        const categoryEl = document.getElementById(
          category
        ) as HTMLInputElement;
        if (categoryEl) {
          categoryEl.checked = false;
        }
      });

      setFilteredWaste(wastesProvince);
      setPlaces(filteredMunicipalities.places);
      searchParams.delete("category");
      setSearchParams(searchParams);

      const items = selectedProvince.split(" ");
      if (items.length > 3) {
        params.set("province", items.slice(0, 3).join());
        setSearchParams(searchParams);
        (document.getElementById("municipalities") as HTMLInputElement).value =
          filteredMunicipalities.places[0];
      } else {
        params.set("province", selectedProvince);
        setSearchParams(params);
        (document.getElementById("municipalities") as HTMLInputElement).value =
          filteredMunicipalities.places[0];
      }
    }
  };

  const handleOnChangeCityMunicipality = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    const inputEl = event.target as HTMLInputElement;
    let selectedCityMunicipality = inputEl.value;

    if (!inputEl.value.includes("Select a City/Municipality")) {
      // Get the current category from the URL
      categoryParams && params.set("category", categoryParams.join(","));

      params.set("province", provinceParams);
      params.set("city", selectedCityMunicipality);

      setSearchParams(params);
      const wasteMunicipality: WasteCardProps<Image["image"]>[] | undefined =
        filterWastes(
          displayedWaste,
          provinceParams,
          selectedCityMunicipality,
          categoryParams
        );

      setFilteredWaste(wasteMunicipality);
    }
  };
  const handleOnChangeCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.checked) {
      var categories = [...currentCategories, inputEl.value];

      setCategoryQuery((prev) => [...prev, inputEl.value]);
      searchParams.set("category", categories.join(","));

      if (provinceParams && cityMunicipalityParams && categories) {
        const wastesCategory = displayedWaste
          .filter((waste) => waste.user.province.includes(provinceParams))
          .filter((waste) => waste.user.city.includes(cityMunicipalityParams))
          .filter((waste) =>
            categories.some((category) => waste.category == category)
          );
        setFilteredWaste(wastesCategory);
      } else if (provinceParams && !cityMunicipalityParams && categories) {
        const wastesCategory = displayedWaste
          .filter((waste) => waste.user.province.includes(provinceParams))
          .filter((waste) =>
            categories.some((category) => waste.category == category)
          );
        setFilteredWaste(wastesCategory);
      } else if (provinceParams && cityMunicipalityParams && !categories) {
        const wastesCategory = displayedWaste
          .filter((waste) => waste.user.province.includes(provinceParams))
          .filter((waste) => waste.user.city.includes(cityMunicipalityParams));
        setFilteredWaste(wastesCategory);
      } else if (provinceParams && !cityMunicipalityParams && !categories) {
        const wastesProvince = displayedWaste.filter((waste) =>
          waste.user.province.includes(provinceParams)
        );
        setFilteredWaste(wastesProvince);
      } else {
        const wastesCategory = displayedWaste.filter((waste) =>
          categories.some((category) => waste.category == category)
        );
        setFilteredWaste(wastesCategory);
      }

      searchParams.get("province");
      searchParams.get("city");
      setSearchParams(searchParams);
    } else {
      setCategoryQuery((prev) =>
        prev.filter((category) => category !== inputEl.value)
      );

      const categoryItems = categoryParams;
      const popCategory = categoryItems.indexOf(inputEl.value);
      categoryItems.splice(popCategory, 1);
      if (categoryItems.length == 0) {
        if (provinceParams && cityMunicipalityParams) {
          console.log("Remove: -1");
          const wastesCategory = displayedWaste
            .filter((waste) => waste.user.province.includes(provinceParams))
            .filter((waste) =>
              waste.user.city.includes(cityMunicipalityParams)
            );

          setFilteredWaste(wastesCategory);
        } else {
          console.log("Remove: -2");
          const wastesCategory = displayedWaste.filter((waste) =>
            waste.user.province.includes(provinceParams)
          );
          setFilteredWaste(wastesCategory);
        }

        searchParams.delete("category");
        setSearchParams(searchParams);
      } else {
        if (provinceParams && cityMunicipalityParams && categoryItems) {
          console.log("Else Category: - 1");
          const wastesCategory = displayedWaste
            .filter((waste) => waste.user.province.includes(provinceParams))
            .filter((waste) => waste.user.city.includes(cityMunicipalityParams))
            .filter((waste) =>
              categoryItems.some((category) => waste.category == category)
            );
          setFilteredWaste(wastesCategory);
        } else if (provinceParams && !cityMunicipalityParams && categoryItems) {
          console.log("Else Category: - 2");
          const wastesCategory = displayedWaste
            .filter((waste) => waste.user.province.includes(provinceParams))
            .filter((waste) =>
              categoryItems.some((category) => waste.category == category)
            );
          setFilteredWaste(wastesCategory);
        } else if (
          provinceParams &&
          !cityMunicipalityParams &&
          !categoryItems
        ) {
          console.log("Else Category: - 3");
          const wastesCategory = displayedWaste.filter((waste) =>
            waste.user.province.includes(provinceParams)
          );
          setFilteredWaste(wastesCategory);
        } else {
          const wastesCategory = displayedWaste.filter((waste) =>
            categoryItems.some((category) => waste.category == category)
          );
          setFilteredWaste(wastesCategory);
        }

        searchParams.set("category", categoryItems.join(","));
        searchParams.get("province");
        searchParams.get("city");

        setSearchParams(searchParams);
      }
    }
  };

  const handleSortBy = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.textContent == "Latest to Oldest") {
      origWaste?.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else {
      origWaste?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    setIsSortBy(false);
  };

  const handleClearFilter = () => {
    (document.getElementById("provinces") as HTMLInputElement).value =
      provinceAndMunicipality[0].name;
    wasteCategories.map((category) => {
      (document.getElementById(category) as HTMLInputElement).checked = false;
    });

    setPlaces([]);
    setCategoryQuery([]);

    searchParams.delete("category");
    searchParams.delete("province");
    searchParams.delete("city");

    setSearchParams(searchParams);
  };

  useEffect(() => {
    searchParams.delete("category");
    searchParams.delete("province");
    searchParams.delete("city");
    setSearchParams(searchParams);
  }, []);

  if (isLoading) return;

  return (
    <Body
      bodyClass={`${
        myWaste
          ? "bg-[#F3F4F6] py-0 mt-0"
          : currentPosts && !currentPosts?.length
          ? "bg-[#F8F8F8]"
          : "bg-white py-6 mt-0"
      }`}
      pageId="listing"
    >
      <div
        className={`flex text-left justify-start items-center lg:h-[11rem] md:h-[10rem] sm:h-[9rem] xsm:h-[8rem] ${
          myWaste
            ? " pt-0 h-20 bg-[#F3F4F6] w-4/5"
            : " bg-[#4F772D] h-48 pt-12 shadow-sm"
        }`}
      >
        <p
          className={`w-screen font-normal lg:pl-20 lg:text-[2.5rem] md:pl-16 md:text-[2rem] md:justify-center sm:text-left sm:pl-14 sm:text-[2rem] xsm:text-[1.3rem] xsm:pl-11 2xsm:text-[1.2rem] ${
            myWaste ? "text-3xl pl-32 text-black" : "text-5xl pl-24 text-white"
          }`}
        >
          {myWaste ? "My Waste" : "WASTE LISTING"}
        </p>
      </div>
      <div className="w-screen px-32 grid md:px-0">
        <div className="flex items-center justify-between">
          <div className="flex md:ml-3" />

          <div className="flex items-center">
            {!myWaste && (
              <>
                {provinceParams || cityMunicipalityParams || categoryParams ? (
                  <span
                    className="text-clamp-base hover:underline font-semibold cursor-pointer"
                    onClick={handleClearFilter}
                  >
                    Remove Filter
                  </span>
                ) : null}
                <button
                  className="p-2 m-4 rounded-lg bg-[#31572C] cursor-pointer"
                  onClick={() => setIsSortBy((sortby) => !sortby)}
                >
                  <IoSwapVerticalSharp className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>

        {isSortBy && (
          <div className="absolute z-10 right-[26rem] top-[18rem] border border-green-500 md:top-[15rem] md:right-[21rem] sm:right-[20rem] sm:top-[14rem] xsm:top-[13rem]">
            <SortByCard handleSortBy={handleSortBy} />
          </div>
        )}
      </div>

      <div className="flex">
        {!myWaste && (
          <div
            className={`z-10  ${open ? "w-80" : "w-0"} ${
              currentPosts && currentPosts?.length ? "bg-white" : "bg-[#F8F8F8]"
            } pt-8 relative duration-300`}
          >
            <TbArrowBarLeft
              className={`absolute h-6 w-6 cursor-pointer -right-8 top-9 border-dark-purple
           border-2 ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex px-4 items-center">
              <IoFilter
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`origin-left px-4 font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Filter
              </h1>
            </div>
            <div className="absolute -right-0 px-6">
              <label
                htmlFor="province"
                className="block mb-2 text-clamp-xs font-medium text-gray-900 mt-5"
              >
                Select a Province
              </label>
              <select
                id="province"
                className="border border-gray-300 text-clamp-xs rounded-lg block w-full p-2.5 "
                onChange={(e) => handleOnChangeProvince(e)}
              >
                {provinceAndMunicipality.map(
                  (province: { name: string }, index: number) => (
                    <option key={index} value={province.name}>
                      {province.name}
                    </option>
                  )
                )}
              </select>
              <label
                htmlFor="municipalities"
                className="block mb-2 text-clamp-xs font-medium text-gray-900 mt-5"
              >
                Select a City or Municipality
              </label>
              <select
                id="municipalities"
                className="border text-clamp-xs rounded-lg w-full p-2.5 "
                onChange={(e) => handleOnChangeCityMunicipality(e)}
              >
                {places?.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
              <label
                htmlFor="category"
                className="block mb-2 text-clamp-xs rounded-lg w-full mt-5"
              >
                Category
              </label>
              {wasteCategories.map((category, index) => (
                <div
                  id="category"
                  key={index}
                  className="mb-[0.125rem] text-clamp-xs block min-h-[1.5rem] pl-[1.5rem]"
                >
                  <input
                    id={category}
                    className="relative float-left -ml-[1.5rem] mt-1.5"
                    type="checkbox"
                    value={category}
                    onChange={(e) => handleOnChangeCategory(e)}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor={category}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`w-full mt-7 grid gap-10 px-32 ${
            currentPosts && currentPosts?.length ? "grid-cols-3" : "h-108"
          } lg:grid-cols-2 lg:px-16 lg:gap-10 md:mt-4 md:gap-2 md:grid-cols-1 md:px-24 sm:px-16 xsm:px-4`}
        >
          {currentPosts && currentPosts?.length ? (
            currentPosts?.map((waste, index) => (
              <ListingCard key={index} waste={waste} loggedInUser={user} />
            ))
          ) : (
            <span className="flex grid-cols-2 w-full text-3xl font-semibold justify-center items-center">
              <p className="flex items-center mt-24">
                <IoTrashBinSharp className="mr-2" /> No Waste Found
              </p>
            </span>
          )}
        </div>
      </div>

      {origWaste && origWaste?.length > 2 && (
        <div className="flex justify-center px-6 mb-4 mt-10 lg:mb-16 sm:px-0 sm:pb-0 ">
          <Pagination
            origWaste={origWaste}
            paginatePage={paginatePage}
            setSearchParams={setPaginatePage}
            currentPage={currentPage}
          />
        </div>
      )}
    </Body>
  );
};

export default Listing;
