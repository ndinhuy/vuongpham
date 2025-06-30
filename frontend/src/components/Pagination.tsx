import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, memo } from "react";

import { cn } from "@app/utils";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage = 1, pageCount = 1, onChangePage }: PaginationProps) => {
  const getDisplayPages = (): number[] => {
    if (pageCount <= 5) {
      return Array(pageCount)
        .fill(null)
        .map((_, index) => {
          return index + 1;
        });
    }

    let from: number;
    let to: number;

    if (currentPage <= 3) {
      from = 1;
      to = 5;
    } else if (currentPage > pageCount - 3) {
      from = pageCount - 4;
      to = pageCount;
    } else {
      from = currentPage - 2;
      to = currentPage + 2;
    }

    return Array(to - from + 1)
      .fill(null)
      .map((_, index) => {
        return index + from;
      });
  };

  const displayPages: number[] = getDisplayPages();

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}
            className="flex items-center justify-center h-8 w-8 rounded-tl-lg rounded-br-lg bg-white border hover:bg-black hover:text-white text-xs transition-all"
          >
            <ChevronLeft size={16} />
          </button>
        </li>

        {displayPages.map((page) => {
          return (
            <li key={`pgn:${page}`}>
              <button
                onClick={() => onChangePage(page)}
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-tl-lg rounded-br-lg bg-white border hover:border-black text-xs transition-all",
                  page === currentPage ? "bg-black text-white" : "",
                )}
              >
                {page}
              </button>
            </li>
          );
        })}
        {pageCount > 5 && (
          <li>
            <button
              onClick={() => onChangePage(pageCount)}
              className="flex items-center justify-center h-8 px-3 rounded-tl-lg rounded-br-lg bg-black text-white border hover:bg-white hover:text-black text-xs transition-all"
            >
              Trang cuối
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => currentPage < pageCount && onChangePage(currentPage + 1)}
            className="flex items-center justify-center h-8 w-8 rounded-tl-lg rounded-br-lg bg-white border hover:bg-black hover:text-white text-xs transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Pagination);
