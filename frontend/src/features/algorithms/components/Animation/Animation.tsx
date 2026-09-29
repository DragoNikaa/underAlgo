import { ArrowLeft, ArrowRight, Undo2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { stringify } from "../../../../shared/utils/stringify.ts";
import { algorithmComponents } from "../../config/algorithm-components.tsx";
import styles from "./Animation.module.css";

interface AnimationProps {
  step: number;
  lastStep: number;
  input: Record<string, unknown>;
  changedVariables: string[];
  variables: Record<string, unknown>;
  output: unknown;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Animation({
  step,
  lastStep,
  input,
  changedVariables,
  variables,
  output,
  onPrevious,
  onNext,
}: AnimationProps) {
  const { slug } = useParams();
  const [isAnimating, setIsAnimating] = useState(false);
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
          onAnimationStateChange={setIsAnimating}
        />

        {step >= lastStep && (
          <div className="noWrap">
            output = <output>{stringify(output)}</output>
          </div>
        )}

        <div className={styles.buttons}>
          <Button onClick={onPrevious} disabled={step <= 0 || isAnimating}>
            <ArrowLeft /> prev
          </Button>

          <Button onClick={onNext} disabled={step >= lastStep || isAnimating}>
            next <ArrowRight />
          </Button>

          <Button
            onClick={() => window.location.reload()}
            className={styles.backButton}
          >
            <Undo2 /> back
          </Button>
        </div>
      </Card>
    </section>
  );
}
