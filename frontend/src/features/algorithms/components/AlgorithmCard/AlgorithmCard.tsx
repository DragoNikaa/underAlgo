import { Link } from "react-router-dom";

import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import type { AlgorithmListItem } from "../../types/algorithm.ts";
import { AlgorithmBadges } from "../AlgorithmBadges/AlgorithmBadges.tsx";

interface AlgorithmCardProps {
  algorithm: AlgorithmListItem;
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
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
  );
}
