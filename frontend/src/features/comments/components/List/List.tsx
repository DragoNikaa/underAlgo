import type { Comment } from "../../types/comment.ts";
import styles from "./List.module.css";
import ListItem from "./ListItem.tsx";

interface ListProps {
  comments: Comment[];
  nestingLevel?: number;
}

export default function List({ comments, nestingLevel = 1 }: ListProps) {
  return (
    <section>
      <ul className={styles.list}>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            comment={comment}
            nestingLevel={nestingLevel}
          />
        ))}
      </ul>
    </section>
  );
}
