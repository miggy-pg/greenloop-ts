import { useEffect, useMemo } from "react";

import Body from "../../components/Common/Body";
import NoWasteCard from "../../components/Common/Cards/NoWasteCard";
import GreetingCard from "../../components/Common/Cards/GreetingCard";
import WasteCard from "../../components/Common/Cards/WasteCard";
import SKWasteCard from "../../components/Common/Skeleton/SKWasteCard";
import SKNoWasteCard from "../../components/Common/Skeleton/SKNoWasteCard";
import defaultImage from "../../assets/images/default-image.jpg";
import wasteDefaultImage from "../../assets/images/waste-default-image.webp";
import { useWastes } from "../../hooks/useWaste";

const Home = () => {
  document.title = "Green Loop | Home";

  const storageWasteLength = Number(localStorage.getItem("wasteLength"));
  const user = JSON.parse(localStorage.getItem("user:detail"));
  const isLoggedIn = user !== null || false;

  const wasteQuery = useWastes();
  const {
    wasteQuery: { data: wastes },
    isLoading,
    error,
  } = useMemo(() => wasteQuery, [wasteQuery]);

  const wasteLength = wastes?.length || 0;

  useEffect(
    () => localStorage.setItem("wasteLength", wasteLength || 0),
    [wasteLength]
  );
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <Body bodyClass={"bg-[#F8F8F8] mt-12 py-14"} pageId="homepage">
      {isLoggedIn && (
        <div className="max-w-screen-md px-6 mx-auto flex flex-col text-center justify-center w-4/10 2xl:w-45/10 xl:w-7/12 lg:w-10/12 lg:px-16 sm:px-8 xsm:px-0 2xsm:px-0">
          <GreetingCard user={user} />
          {isLoading
            ? !wasteLength && !storageWasteLength && <SKNoWasteCard />
            : !wasteLength && <NoWasteCard />}

          {isLoading
            ? Array.from({ length: storageWasteLength }, (_, index) => (
                <SKWasteCard key={index} index={index} />
              ))
            : wastes?.map((waste, index) => (
                <WasteCard
                  key={index}
                  props={waste}
                  defaultImage={defaultImage}
                  wasteDefaultImage={wasteDefaultImage}
                  loggedInUser={user}
                />
              ))}
        </div>
      )}
    </Body>
  );
};

export default Home;
