import { useEffect, useMemo } from "react";

import Body from "../../components/common/Body";
import NoWasteCard from "../../components/common/Cards/NoWasteCard";
import GreetingCard from "../../components/common/Cards/GreetingCard";
import WasteCard from "../../components/common/Cards/WasteCard";
import SKWasteCard from "../../components/common/Skeleton/SKWasteCard";
import SKNoWasteCard from "../../components/common/Skeleton/SKNoWasteCard";
import { useGetWastes } from "../../core/hooks/useWaste";
import { WasteCardProps } from "../../types/waste.type";

function Home() {
  document.title = "Green Loop | Home";

  const storageWasteLength = Number(localStorage.getItem("wasteLength"));
  const storedUser = localStorage.getItem("user:detail");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isLoggedIn = user !== null || false;

  const wasteQuery = useGetWastes();
  const { wastes, isLoading, error } = useMemo(() => wasteQuery, [wasteQuery]);

  const wasteLength = String(wastes?.length) || 0;

  useEffect(
    () => localStorage.setItem("wasteLength", wasteLength || ""),
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
                <SKWasteCard key={index} />
              ))
            : wastes?.map((waste: WasteCardProps, index: number) => (
                <WasteCard key={index} waste={waste} loggedInUser={user} />
              ))}
        </div>
      )}
    </Body>
  );
}

export default Home;
