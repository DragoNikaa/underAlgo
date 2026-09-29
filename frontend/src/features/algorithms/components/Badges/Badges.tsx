import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import { difficultyColors } from "../../config/difficulty-colors.ts";
import type { Category } from "../../types/category.ts";
import type { Difficulty } from "../../types/difficulty.ts";
import styles from "./Badges.module.css";

interface BadgesProps {
  difficulty: Difficulty;
  categories: Category[];
}

export default function Badges({ difficulty, categories }: BadgesProps) {
  return (
    <ul className={styles.algorithmBadges}>
      <li>
        <ButtonLink
          to={{
            pathname: PATHS.algorithm.list,
            search: `?difficulty=${difficulty.slug}`,
          }}
          oval
          color={difficultyColors[difficulty.slug]}
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
