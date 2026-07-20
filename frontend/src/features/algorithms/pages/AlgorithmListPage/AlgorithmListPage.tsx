import clsx from "clsx";
import { useState } from "react";

import Button from "../../../../shared/components/Button/Button.tsx";
import Drawer from "../../../../shared/components/Drawer/Drawer.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import AlgorithmList from "../../components/AlgorithmList/AlgorithmList.tsx";
import { useAlgorithms } from "../../hooks.ts";
import styles from "./AlgorithmListPage.module.css";

export default function AlgorithmListPage() {
  const { data } = useAlgorithms();
  const algorithms = data.results;

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

        <AlgorithmList algorithms={algorithms} />

        <nav aria-label="pagination" className={styles.pagination}>
          pagination
        </nav>
      </main>

      <aside className={clsx(styles.filters, "showDesktop")}>filters</aside>
      <aside className={clsx(styles.column3, "showDesktop")}>column 3</aside>

      <div className="showMobile">
        <Drawer
          isOpen={openDrawer === "filters"}
          side="left"
          onClose={() => setOpenDrawer(null)}
        >
          filters
        </Drawer>

        <Drawer
          isOpen={openDrawer === "column3"}
          side="right"
          onClose={() => setOpenDrawer(null)}
        >
          column 3
        </Drawer>
      </div>
    </div>
  );
}
