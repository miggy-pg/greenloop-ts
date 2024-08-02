function SKWasteCard() {
  return (
    <div className="h-84 bg-white border border-gray-200 shadow-sm rounded-3xl mt-2 sm:h-84 xsm:44 2xsm:h-72">
      <span className="grid grid-cols-8 gap-3 py-6 px-8 sm:px-4 sm:gap-3">
        {/* image */}
        <div className="h-11 w-11 mr-5 rounded-full bg-gray-200 animate-pulse sm:h-8 sm:w-8" />

        {/* text */}
        <div className="grid grid-rows-1 gap-1">
          <div className="h-6 w-52 rounded-sm bg-gray-200 animate-pulse sm:h-4 sm:w-44 2xsm:w-36" />
          <div className="h-4 w-36 rounded-sm bg-gray-200 animate-pulse sm:h-3 sm:w-28 2xsm:w-20" />
        </div>

        {/* status */}
        <div className="col-start-8 h-5 rounded-md bg-gray-200 animate-pulse sm:h-4" />
        <div className="col-span-8 h-8 rounded-md bg-gray-200 animate-pulse sm:h-4" />

        {/* category */}
        <div className="col-start-1 h-4 rounded-full bg-gray-200 animate-pulse sm:h-4 2xsm:h-3" />
      </span>

      <div className="bg-gray-200 h-72 rounded-b-3xl animate-pulse sm:h-60 xsm:h-40 2xsm:h-48 2xsm:mt-2"></div>
    </div>
  );
}

export default SKWasteCard;
