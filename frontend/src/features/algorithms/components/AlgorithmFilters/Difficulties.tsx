import clsx from "clsx";

import buttonStyles from "../../../../shared/components/Button/Button.module.css";
import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Radio from "../../../../shared/components/Form/Radio.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { useSearchParamsActions } from "../../../../shared/hooks/search-params.ts";
import { useDifficulties } from "../../hooks.ts";
import styles from "./AlgorithmFilters.module.css";

export default function Difficulties() {
  const { data: difficulties } = useDifficulties();
  const { params, setParam, removeParam } = useSearchParamsActions();

  const difficultyToColor: Record<string, "green" | "yellow" | "red"> = {
    easy: "green",
    medium: "yellow",
    hard: "red",
  };

  return (
    <fieldset>
      <Card>
        <legend>
          <Heading as="h3" variant="secondary">
            difficulty
          </Heading>
        </legend>

        {difficulties.map((difficulty) => (
          <Radio
            key={difficulty.slug}
            name="difficulty"
            onChange={() => setParam("difficulty", difficulty.slug)}
            checked={params.has("difficulty", difficulty.slug)}
          >
            <span
              className={clsx(
                buttonStyles.button,
                buttonStyles.oval,
                buttonStyles[difficultyToColor[difficulty.slug]],
              )}
            >
              {difficulty.name}
            </span>

            <span className={styles.algorithmCount}>
              {difficulty.algorithm_count}
            </span>
          </Radio>
        ))}

        <Button
          onClick={() => removeParam("difficulty")}
          className={styles.clearButton}
        >
          clear
        </Button>
      </Card>
    </fieldset>
  );
}
