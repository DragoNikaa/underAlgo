import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSearchParamsActions } from "../../hooks/search-params.ts";
import type { PaginationInfo } from "../../types/pagination.ts";
import Button from "../Button/Button.tsx";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageInfo: PaginationInfo;
}

export default function Pagination({ pageInfo }: PaginationProps) {
  const { setParam, removeParam } = useSearchParamsActions();

  const updatePageParam = (page: number) => {
    if (page <= 1) {
      removeParam("page");
    } else if (page <= pageInfo.total) {
      setParam("page", page.toString());
    }
  };

  return (
    <nav aria-label="pagination" className={styles.pagination}>
      <div
        className={clsx(styles.buttons, pageInfo.current <= 1 && "invisible")}
      >
        <Button
          onClick={() => updatePageParam(1)}
          aria-label="first page"
          oval
          iconButton
        >
          <ChevronLeft />
          <span className={styles.secondChevron}>
            <ChevronLeft />
          </span>
        </Button>

        <Button
          onClick={() => updatePageParam(pageInfo.current - 1)}
          aria-label="previous page"
          oval
          iconButton
        >
          <ChevronLeft />
        </Button>
      </div>

      <span className="noWrap">
        page {pageInfo.current} / {pageInfo.total}
      </span>

      <div
        className={clsx(
          styles.buttons,
          pageInfo.current >= pageInfo.total && "invisible",
        )}
      >
        <Button
          onClick={() => updatePageParam(pageInfo.current + 1)}
          aria-label="next page"
          oval
          iconButton
        >
          <ChevronRight />
        </Button>

        <Button
          onClick={() => updatePageParam(pageInfo.total)}
          aria-label="last page"
          oval
          iconButton
        >
          <ChevronRight />
          <span className={styles.secondChevron}>
            <ChevronRight />
          </span>
        </Button>
      </div>
    </nav>
  );
}
