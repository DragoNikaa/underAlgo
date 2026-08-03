import { Link } from "react-router-dom";

import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import type { AlgorithmListItem } from "../../types/algorithm.ts";
import { AlgorithmBadges } from "../AlgorithmBadges/AlgorithmBadges.tsx";
import styles from "./AlgorithmList.module.css";

interface AlgorithmListProps {
  algorithms: AlgorithmListItem[];
}

export default function AlgorithmList({ algorithms }: AlgorithmListProps) {
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

                <p>{algorithm.general_description}</p>

                <AlgorithmBadges
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
