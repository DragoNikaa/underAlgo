import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import styles from "./Description.module.css";

interface AlgorithmDescriptionProps {
  generalDescription: string;
  inputDescription: Record<string, string>;
  outputDescription: string;
}

export default function Description({
  generalDescription,
  inputDescription,
  outputDescription,
}: AlgorithmDescriptionProps) {
  return (
    <section>
      <Card>
        <section className={styles.section}>
          <Heading as="h2" variant="secondary">
            description
          </Heading>

          <p>{generalDescription}</p>
        </section>

        <section className={styles.section}>
          <Heading as="h2" variant="secondary">
            input
          </Heading>

          <div className={styles.inputDescription}>
            {Object.entries(inputDescription).map(
              ([parameter, description]) => (
                <p key={parameter}>
                  <strong>{parameter}:</strong> {description}
                </p>
              ),
            )}
          </div>
        </section>

        <section className={styles.section}>
          <Heading as="h2" variant="secondary">
            output
          </Heading>

          <p>{outputDescription}</p>
        </section>
      </Card>
    </section>
  );
}
