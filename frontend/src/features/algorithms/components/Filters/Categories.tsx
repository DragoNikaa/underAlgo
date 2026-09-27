import clsx from "clsx";
import { Eraser } from "lucide-react";

import buttonStyles from "../../../../shared/components/Button/Button.module.css";
import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Checkbox from "../../../../shared/components/Form/Checkbox.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { useSearchParamsActions } from "../../../../shared/hooks/search-params.ts";
import { useCategories } from "../../hooks.ts";
import styles from "./Filters.module.css";

export default function Categories() {
  const { data: categories } = useCategories();
  const { params, toggleArrayParam, removeParam } = useSearchParamsActions();

  return (
    <fieldset>
      <Card>
        <legend>
          <Heading as="h3" variant="secondary">
            categories
          </Heading>
        </legend>

        <div className={styles.categories}>
          {categories.map((category) => (
            <Checkbox
              key={category.slug}
              name="category"
              onChange={() => toggleArrayParam("category", category.slug)}
              checked={params.has("category", category.slug)}
            >
              <span className={clsx(buttonStyles.button, buttonStyles.oval)}>
                {category.name}
              </span>

              <span className={styles.algorithmCount}>
                {category.algorithm_count}
              </span>
            </Checkbox>
          ))}
        </div>

        <Button
          onClick={() => removeParam("category")}
          size="small"
          className={styles.clearButton}
        >
          <Eraser /> clear
        </Button>
      </Card>
    </fieldset>
  );
}
