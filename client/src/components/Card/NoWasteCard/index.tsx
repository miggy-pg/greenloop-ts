import { IoTrashBin } from "react-icons/io5";

const WasteCard = () => {
  return (
    <div className="flex py-5 px-4 h-18 bg-white border border-gray-200 text-left text-gray-800 shadow-sm rounded-3xl mt-2 lg:h-14 lg:mb-0 lg:px-2 md:px- sm:py-1 sm:pl-3 2xsm:h-10">
      <span className="inline-flex w-full justify-center items-center px-8 font-semibold">
        <IoTrashBin className="w-8 h-8 sm:w-6 sm:h-6" />
        <h3 className="ml-4 text-2xl font-normal lg:text-2xl md:text-xl sm:text-lg/none 2xsm:ml-2 2xsm:text-base/none">
          No Wastes Found
        </h3>
      </span>
    </div>
  );
};

export default WasteCard;
