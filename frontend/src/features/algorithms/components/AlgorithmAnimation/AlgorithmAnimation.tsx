import { useParams } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { algorithmComponents } from "../../config/algorithm-components.tsx";
import type { AlgorithmProps } from "../../types/algorithm-component.ts";
import styles from "./AlgorithmAnimation.module.css";

interface AlgorithmAnimationProps extends AlgorithmProps {
  step: number;
  lastStep: number;
  output: unknown;
  onPrevious: () => void;
  onNext: () => void;
}

export default function AlgorithmAnimation({
  step,
  lastStep,
  input,
  changedVariables,
  variables,
  output,
  onPrevious,
  onNext,
}: AlgorithmAnimationProps) {
  const { slug } = useParams();
  const AlgorithmComponent = algorithmComponents[slug!];

  return (
    <section>
      <Card className={styles.algorithmAnimation}>
        <Heading as="h2" variant="secondary">
          animation
        </Heading>

        <AlgorithmComponent
          input={input}
          changedVariables={changedVariables}
          variables={variables}
        />

        {step >= lastStep && (
          <div>
            output&nbsp;=&nbsp;
            <output>{JSON.stringify(output).replaceAll(",", ", ")}</output>
          </div>
        )}

        <div className={styles.buttons}>
          <Button onClick={onPrevious} disabled={step <= 0}>
            previous
          </Button>

          <Button onClick={onNext} disabled={step >= lastStep}>
            next
          </Button>

          <Button
            onClick={() => window.location.reload()}
            className={styles.backButton}
          >
            &lt;&nbsp;back
          </Button>
        </div>
      </Card>
    </section>
  );
}
