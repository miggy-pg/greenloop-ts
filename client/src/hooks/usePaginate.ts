import { useSearchParams } from "react-router-dom";
import { WasteCardProps } from "../types/waste.type";

interface Image<T = string | ArrayBuffer | null> {
  image: T;
}

export const usePaginate = (
  origWaste: WasteCardProps<Image["image"]>[],
  POST_PER_PAGE: number = 6
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const indexOfLastPost = currentPage * POST_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POST_PER_PAGE;

  const currentPosts =
    origWaste?.length && origWaste?.slice(indexOfFirstPost, indexOfLastPost);

  return {
    searchParams,
    setSearchParams,
    currentPage,
    currentPosts,
  };
};
