import { useParams, useSearchParams } from "react-router-dom";

import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { useAlgorithm } from "../../../algorithms/hooks.ts";
import List from "../../components/List/List.tsx";
import { useComments } from "../../hooks.ts";
import styles from "./CommentListPage.module.css";

export default function CommentListPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { data: algorithm } = useAlgorithm(slug!);
  const { data } = useComments(slug!, searchParams.toString());

  return (
    <main>
      <Heading>{algorithm.name} – comments</Heading>

      <div className={styles.commentListPage}>
        <List comments={data.results} pageInfo={data.page} />
      </div>
    </main>
  );
}
