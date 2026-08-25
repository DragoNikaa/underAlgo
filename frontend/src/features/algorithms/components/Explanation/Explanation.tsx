import { useParams } from "react-router-dom";

import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { styleVariables } from "./utils.tsx";

interface AlgorithmExplanationProps {
  explanation: string;
}

export default function Explanation({
  explanation,
}: AlgorithmExplanationProps) {
  const { slug } = useParams();

  return (
    <section>
      <Card>
        <Heading as="h2" variant="secondary">
          explanation
        </Heading>

        <p>{styleVariables(explanation, slug!)}</p>
      </Card>
    </section>
  );
}
