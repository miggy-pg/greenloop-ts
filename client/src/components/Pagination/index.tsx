import { TbCaretRightFilled, TbCaretLeftFilled } from "react-icons/tb";
import { WasteProps } from "../../types/waste.types";
import { SetURLSearchParams } from "react-router-dom";

const PAGE_SIZE = 6;
const POST_PER_PAGE = 6;

interface Pagination {
  currentPage: number;
  origWaste: WasteProps[];
  paginatePage: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

interface IconButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

function IconButton({ onClick, disabled, children }: IconButton) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`hover:bg-primary-800 focus:ring-primary-300 h-12 w-12 cursor-pointer items-center justify-center text-center text-lg font-normal text-[#698c4e] ${
        disabled && "cursor-no-drop"
      }`}
    >
      {children}
    </button>
  );
}

function Pagination({
  origWaste,
  paginatePage,
  setSearchParams,
  currentPage,
}: Pagination) {
  // Calculate actual number of pages
  const pageCount = Math.ceil(origWaste?.length / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    paginatePage.set("page", String(next));
    setSearchParams(paginatePage);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    paginatePage.set("page", String(prev));
    setSearchParams(paginatePage);
  }

  const paginate = (pageNumber: number) => {
    paginatePage.set("page", String(pageNumber));
    setSearchParams(paginatePage);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(origWaste.length / POST_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex row-span-1">
      <IconButton onClick={prevPage} disabled={currentPage == 1}>
        <TbCaretLeftFilled />
      </IconButton>
      <ul className="pagination flex justify-center items-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item cursor-pointer">
            <span
              onClick={() => paginate(number)}
              className="page-link px-4 py-3 mx-1 bg-[#698c4e] rounded-lg text-white hover:bg-[#31572C]"
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
      <IconButton onClick={nextPage} disabled={currentPage === pageCount}>
        <TbCaretRightFilled />
      </IconButton>
    </nav>
  );
}

export default Pagination;
