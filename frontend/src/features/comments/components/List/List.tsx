import Card from "../../../../shared/components/Card/Card.tsx";
import type { Comment } from "../../types/comment.ts";
import styles from "./List.module.css";
import ListItem from "./ListItem/ListItem.tsx";

interface ListProps {
  comments: Comment[];
  nestingLevel?: number;
}

export default function List({ comments, nestingLevel = 1 }: ListProps) {
  return (
    <section>
      {comments.length === 0 ? (
        <Card>
          <p>This discussion is empty. Be the first to push a thought!</p>
        </Card>
      ) : (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              comment={comment}
              nestingLevel={nestingLevel}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
