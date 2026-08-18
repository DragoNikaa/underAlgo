import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { useSearchParamsActions } from "../../hooks/search-params.ts";
import type { PaginationInfo } from "../../types/pagination.ts";
import Button from "../Button/Button.tsx";
import styles from "./Pagination.module.css";

interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
  pageInfo: PaginationInfo;
}

export default function Pagination({ pageInfo, className }: PaginationProps) {
  const { setParam, removeParam } = useSearchParamsActions();

  const updatePageParam = (page: number) => {
    if (page <= 1) {
      removeParam("page");
    } else if (page <= pageInfo.total) {
      setParam("page", page.toString());
    }
  };

  return (
    <nav aria-label="pagination" className={clsx(styles.pagination, className)}>
      <div
        className={clsx(styles.buttons, pageInfo.current <= 1 && "invisible")}
      >
        <Button onClick={() => updatePageParam(1)} oval>
          &lt;&lt;
        </Button>

        <Button onClick={() => updatePageParam(pageInfo.current - 1)} oval>
          &lt;
        </Button>
      </div>

      <span className={styles.pageNumber}>
        page {pageInfo.current} / {pageInfo.total}
      </span>

      <div
        className={clsx(
          styles.buttons,
          pageInfo.current >= pageInfo.total && "invisible",
        )}
      >
        <Button onClick={() => updatePageParam(pageInfo.current + 1)} oval>
          &gt;
        </Button>

        <Button onClick={() => updatePageParam(pageInfo.total)} oval>
          &gt;&gt;
        </Button>
      </div>
    </nav>
  );
}
