import { useSearchParams } from "react-router-dom";
import { WasteCardProps } from "../../types/waste.type";

interface Image<T = { public_id: string; url: string }> {
  image: T;
}

export const usePaginate = (
  origWaste: WasteCardProps<Image["image"]>[] | undefined,
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
