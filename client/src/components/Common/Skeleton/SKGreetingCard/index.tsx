function SKGreetingCard() {
  return (
    <div className="bg-white h-40 rounded-3xl shadow-xl p-4 lg:px-0 sm:h-24 sm:p-0">
      <div className="px-8 py-8 items-center sm:py-7">
        <div className="grid grid-cols-4 gap-1 mb-3 sm:mb-1">
          <div className="col-span-2 h-5 rounded-sm bg-gray-200 animate-pulse sm:h-4" />
        </div>
        <div className="h-10 rounded-sm bg-gray-200 animate-pulse mb-4 sm:h-6" />
      </div>
    </div>
  );
}

export default SKGreetingCard;
