import clsx from "clsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Drawer from "../../../../shared/components/Drawer/Drawer.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import Pagination from "../../../../shared/components/Pagination/Pagination.tsx";
import Filters from "../../components/Filters/Filters.tsx";
import List from "../../components/List/List.tsx";
import { useAlgorithms } from "../../hooks.ts";
import styles from "./AlgorithmListPage.module.css";

export default function AlgorithmListPage() {
  const [searchParams] = useSearchParams();
  const { data } = useAlgorithms(searchParams.toString());

  const [openDrawer, setOpenDrawer] = useState<"filters" | "column3" | null>(
    null,
  );

  return (
    <div className={styles.algorithmListPage}>
      <main className={styles.main}>
        <Heading>algorithms</Heading>

        <div className={clsx(styles.drawerButtons, "showMobile")}>
          <Button onClick={() => setOpenDrawer("filters")}>filters</Button>
          <Button onClick={() => setOpenDrawer("column3")}>column 3</Button>
        </div>

        <List algorithms={data.results} />

        <Pagination pageInfo={data.page} className={styles.pagination} />
      </main>

      <aside className={clsx(styles.filters, "showDesktop")}>
        <Filters />
      </aside>

      <aside className={clsx(styles.column3, "showDesktop")}>column 3</aside>

      <div className="showMobile">
        <Drawer
          side="left"
          isOpen={openDrawer === "filters"}
          onClose={() => setOpenDrawer(null)}
        >
          <Filters />
        </Drawer>

        <Drawer
          side="right"
          isOpen={openDrawer === "column3"}
          onClose={() => setOpenDrawer(null)}
        >
          column 3
        </Drawer>
      </div>
    </div>
  );
}
