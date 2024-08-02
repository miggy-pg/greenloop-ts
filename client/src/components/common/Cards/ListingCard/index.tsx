import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Dropdown from "../../Dropdown";
import { updateWasteAvailability } from "../../../../api/waste";
import { plasticColor } from "../../../../core/utils/plasticColor";
import { formatDateTime } from "../../../../core/utils/formatDateTime";
import { IoMdTime } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { UserProps } from "../../../../types/user.type";

import defaultImage from "../../../../assets/images/waste-default-image.webp";
import { WasteAvailable, WasteCardProps } from "../../../../types/waste.type";

interface Image<T = { public_id: string; url: string }> {
  image: T;
}

function ListingCard({
  waste,
  loggedInUser,
}: {
  waste: WasteCardProps<Image["image"]>;
  loggedInUser: UserProps;
}) {
  const url = window.location.href;
  const isProfile = url.split("/").includes("profile");

  const {
    id: wasteId,
    image,
    description,
    user: { _id: userId },
    category,
    createdAt,
    available,
  } = waste;

  const transformedTexts = plasticColor(category);
  const queryClient = useQueryClient();

  const { handleSubmit } = useForm();

  const { mutate: handleUpdateWasteAvailability } = useMutation({
    mutationFn: ({ wasteId, available }: WasteAvailable) => {
      return updateWasteAvailability(wasteId, {
        available: available,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userWastes"] });
      console.log("onSuccess");
    },
  });

  const onSubmit = () => {
    handleUpdateWasteAvailability({
      wasteId,
      available: !available,
    });
  };

  return !isProfile ? (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2 md:my-4">
      <Link to={`/profile/${userId}`}>
        <div className="h-80 flex items-center justify-between lg:justify-evenly sm:h-40 2xsm:h-28">
          <div className="w-screen border rounded-t-3xl">
            <img
              src={image?.url ? image?.url : defaultImage}
              className="object-cover w-full h-80 rounded-t-3xl sm:h-40 2xsm:h-32"
            />
          </div>
        </div>
      </Link>
      <article className="p-6">
        <p className="text-gray-900 text-left  xsm:text-[0.7rem]">
          {description}
        </p>
        <div className="flex flex-wrap mt-3">
          <p
            className={`text-black text-left py-1 text-[0.7rem] rounded-full ${transformedTexts} m-1 p-3`}
          >
            {category || "undefined"}
          </p>
        </div>

        <span className="flex justify-between mt-2">
          <span className="flex items-center">
            <IoMdTime className="mr-2 text-gray-400 my-auto xsm:text-xxs" />
            <p className="text-[0.7rem] font-light text-gray-500">
              {formatDateTime(createdAt)}
            </p>
          </span>

          <span className="flex items-center">
            <p
              className={`mr-3 text-xxs font-light text-white px-3 py-1 rounded-xl ${
                available ? "bg-green-700" : "bg-red-700"
              } `}
            >
              {available ? "Available" : "Not Available"}
            </p>
            <Dropdown
              classNames={"py-2 bottom-[-90px] -left-[130px] w-max"}
              icon={
                <HiOutlineDotsHorizontal className="text-gray-400 cursor-pointer" />
              }
              isDisabled={loggedInUser?.id !== userId}
            >
              <div className="flex h-max w-40 flex-col justify-start rounded-[20px] bg-zinc-50 bg-no-repeat pb-3 shadow-md">
                <div className="mt-3 ml-4">
                  <div className="flex items-center">
                    <p className="text-xxs font-light text-navy-700 ">
                      Update to
                    </p>{" "}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-3 ml-4 flex flex-col"
                >
                  <button
                    className="text-xs text-left text-gray-800 font-medium cursor-pointer hover:bg-zinc-100 rounded-md"
                    type="submit"
                  >
                    {!available ? "Available" : "Not Available"}
                  </button>
                </form>
              </div>
            </Dropdown>
          </span>
        </span>
      </article>
    </div>
  ) : (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2 md:my-4">
      <div className="h-80 flex items-center justify-between lg:justify-evenly sm:h-40 2xsm:h-28">
        <div className="w-screen border rounded-t-3xl">
          <img
            src={image?.url ? image?.url : defaultImage}
            className="object-cover w-full h-80 rounded-t-3xl sm:h-40 2xsm:h-32"
          />
        </div>
      </div>
      <article className="p-6">
        <p className="text-gray-900 text-left  xsm:text-[0.7rem]">
          {description}
        </p>
        <div className="flex flex-wrap mt-3">
          <p
            className={`text-black text-left py-1 text-[0.7rem] rounded-full ${transformedTexts} m-1 p-3`}
          >
            {category || "undefined"}
          </p>
        </div>
      </article>
    </div>
  );
}

export default ListingCard;
