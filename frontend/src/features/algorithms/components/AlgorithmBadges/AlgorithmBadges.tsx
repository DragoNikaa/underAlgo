import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import type { Category } from "../../types/category.ts";
import type { Difficulty } from "../../types/difficulty.ts";
import styles from "./AlgorithmBadges.module.css";

interface AlgorithmBadgesProps extends ComponentPropsWithoutRef<"ul"> {
  difficulty: Difficulty;
  categories: Category[];
}

export function AlgorithmBadges({
  difficulty,
  categories,
  className,
}: AlgorithmBadgesProps) {
  const difficultyToColor: Record<string, "green" | "yellow" | "red"> = {
    easy: "green",
    medium: "yellow",
    hard: "red",
  };

  return (
    <ul className={clsx(styles.algorithmBadges, className)}>
      <li>
        <ButtonLink
          to={{
            pathname: PATHS.algorithm.list,
            search: `?difficulty=${difficulty.slug}`,
          }}
          oval
          color={difficultyToColor[difficulty.slug]}
        >
          {difficulty.name}
        </ButtonLink>
      </li>

      {categories.map((category) => (
        <li key={category.slug}>
          <ButtonLink
            to={{
              pathname: PATHS.algorithm.list,
              search: `?category=${category.slug}`,
            }}
            oval
          >
            {category.name}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
