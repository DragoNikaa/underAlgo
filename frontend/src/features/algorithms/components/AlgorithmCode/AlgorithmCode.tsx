import clsx from "clsx";
import hljs from "highlight.js";

import Card from "../../../../shared/components/Card/Card.tsx";
import styles from "./AlgorithmCode.module.css";

interface AlgorithmCodeProps {
  code: string[];
  currentLine?: number;
}

export default function AlgorithmCode({
  code,
  currentLine,
}: AlgorithmCodeProps) {
  return (
    <section>
      <Card className={styles.algorithmCode}>
        {code.map((line, index) => (
          <div
            key={index}
            className={clsx(
              styles.line,
              currentLine === index + 1 && styles.currentLine,
            )}
          >
            <span className={styles.lineNumber}>{index + 1}</span>

            <pre className={styles.lineContent}>
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(line, { language: "python" }).value,
                }}
              />
            </pre>
          </div>
        ))}
      </Card>
    </section>
  );
}
