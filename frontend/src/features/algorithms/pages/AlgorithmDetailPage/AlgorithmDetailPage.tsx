import { useParams } from "react-router-dom";

import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { useAlgorithm } from "../../hooks.ts";
import styles from "./AlgorithmDetailPage.module.css";

export default function AlgorithmDetailPage() {
  const { slug } = useParams();
  const { data: algorithm } = useAlgorithm(slug!);

  return <Heading>{algorithm.name}</Heading>;
}
