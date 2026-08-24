import { Link } from "react-router-dom";

import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import { truncateText } from "../../../../shared/utils/truncate-text.ts";
import type { AlgorithmListItem } from "../../types/algorithm.ts";
import Badges from "../Badges/Badges.tsx";
import styles from "./List.module.css";

interface AlgorithmListProps {
  algorithms: AlgorithmListItem[];
}

export default function List({ algorithms }: AlgorithmListProps) {
  return (
    <section>
      <ul className={styles.algorithmList}>
        {algorithms.map((algorithm) => (
          <li key={algorithm.slug}>
            <article>
              <Card>
                <Heading as="h2" variant="secondary">
                  <Link to={PATHS.algorithm.detail(algorithm.slug)}>
                    {algorithm.name}
                  </Link>
                </Heading>

                <p>{truncateText(algorithm.general_description)}</p>

                <Badges
                  difficulty={algorithm.difficulty}
                  categories={algorithm.categories}
                />

                <ButtonLink to={PATHS.algorithm.detail(algorithm.slug)}>
                  explore
                </ButtonLink>
              </Card>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
