import { UserProps } from "../../../types/user.types";

const GreetingCard = ({ user }: { user: UserProps }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-[#50792D] to-[#66A62E] border border-gray-200 shadow-sm rounded-3xl">
      <span className="flex h-36 py-5 px-8 text-left items-center lg:flex lg:px-3 sm:h-20">
        <span>
          <p className="text-2xl font-normal text-white sm:text-xl xsm:text-sm xsm:leading-6">
            Welcome back,
          </p>
          <p className="text-4xl/8 font-bold text-white sm:text-2xl/4 xsm:text-xl ">
            {user?.fullName}
          </p>
        </span>
      </span>
    </div>
  );
};

export default GreetingCard;
