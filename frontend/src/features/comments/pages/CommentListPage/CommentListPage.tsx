import { useParams, useSearchParams } from "react-router-dom";

import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import Pagination from "../../../../shared/components/Pagination/Pagination.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import { useAlgorithm } from "../../../algorithms/hooks.ts";
import CreationForm from "../../components/Form/CreationForm.tsx";
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
      <div className={styles.header}>
        <Heading>{algorithm.name} – comments</Heading>

        <ButtonLink to={PATHS.algorithm.detail(slug!)} color="red">
          X
        </ButtonLink>
      </div>

      <div className={styles.content}>
        <CreationForm className={styles.form} />
        <List comments={data.results} />
        <Pagination pageInfo={data.page} />
      </div>
    </main>
  );
}
