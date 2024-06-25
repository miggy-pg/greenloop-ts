import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { IoMdTime } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Dropdown from "../../Dropdown";
import { formatDateTime } from "../../../../utils/formatDateTime";
import { plasticColor } from "../../../../utils/plasticColor";
import { updateWasteAvailability } from "../../../../api/waste";
import { Payload } from "../../../../types/waste.type";

import defaultImage from "../../../assets/default-image.webp";
import wasteDefaultImage from "../../../assets/waste-default-image.webp";
import { UserProps } from "../../../../types/user.type";

interface WasteCardProps {
  available: boolean;
  createdAt: Date;
  user: UserProps;
  id: string;
  post: string;
  wasteCategory: string;
  image: {
    public_id: string;
    url: string;
  };
}

const WasteCard = ({
  props,
  loggedInUser,
}: {
  props: WasteCardProps;
  loggedInUser: UserProps;
}) => {
  const {
    id: wasteId,
    post,
    image,
    wasteCategory,
    user,
    createdAt,
    available,
  } = props;
  const transformedTexts = plasticColor(wasteCategory);

  const queryClient = useQueryClient();

  const { handleSubmit } = useForm();

  const { mutate: handleUpdateWasteAvailability } = useMutation({
    mutationFn: ({ wasteId, available }: Payload) => {
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

  console.log("listng: ", props);
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
      <article className="py-6 px-6 text-gray-800 xsm:px-4">
        <div className="flex items-left mb-5 text-sm font-semibold">
          <Link to={`profile/${user?._id}`}>
            <img
              className="w-11 h-11 mr-5 rounded-full cursor-pointer hover:opacity-80 xsm:w-9 xsm:h-9 xsm:mr-3"
              src={user?.image ? image?.url : defaultImage}
              alt={user?.fullName}
            />
          </Link>
          <div className="w-full text-left">
            <div className="flex justify-between items-center">
              <Link
                className="hover:underline cursor-pointer xsm:text-xxs"
                to={`profile/${user?._id}`}
              >
                {user?.fullName ? user.fullName : "User"}
              </Link>
              <span className="flex reverse">
                <p
                  className={`mr-5 text-xs font-light text-white px-3 py-1 rounded-xl xsm:text-xxs xsm:mr-2 xsm:px-2 ${
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
                  isDisabled={loggedInUser?.id !== user?._id}
                >
                  <div className="flex h-max w-40 flex-col justify-start rounded-[20px] bg-zinc-50 bg-no-repeat pb-4 shadow-md">
                    <div className="mt-3 ml-4">
                      <div className="flex items-center gap-2">
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
                        className="text-xs text-left text-gray-800 cursor-pointer hover:bg-zinc-100 rounded-md xsm:text-xxs"
                        type="submit"
                      >
                        {!available ? "Available" : "Not Available"}
                      </button>
                    </form>
                  </div>
                </Dropdown>
              </span>
            </div>
            <span className="flex">
              <IoMdTime className="mr-2 text-gray-400 my-auto xsm:text-xxs" />
              <p className="text-[0.7rem] font-light text-gray-500 xsm:text-xxs">
                {formatDateTime(createdAt)}
              </p>
            </span>
          </div>
        </div>
        <p className="text-left xsm:text-xxs">{post}</p>
        <div className="flex flex-wrap mt-3">
          <p
            className={`text-left py-1 text-xxs rounded-full border ${transformedTexts} p-3 xsm:text-xxs`}
          >
            {wasteCategory}
          </p>
        </div>
      </article>
      <div className="h-72 w-full flex items-center sm:h-60 xsm:h-40 2xsm:h-32">
        <img
          src={image?.url ? image.url : wasteDefaultImage}
          className="object-cover w-full h-72 rounded-b-3xl sm:h-60 xsm:h-40 2xsm:h-32"
        />
      </div>
    </div>
  );
};

export default WasteCard;
