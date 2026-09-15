import { Link } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import Pagination from "../../../../shared/components/Pagination/Pagination.tsx";
import dayjs from "../../../../shared/lib/dayjs.ts";
import type { PaginationInfo } from "../../../../shared/types/pagination.ts";
import type { Comment } from "../../types/comment.ts";
import styles from "./List.module.css";

interface ListProps {
  comments: Comment[];
  pageInfo: PaginationInfo;
}

export default function List({ comments, pageInfo }: ListProps) {
  return (
    <section>
      <ul className={styles.list}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <article>
              <Card>
                <div>
                  <Link to={`/users/${comment.user.username}/`}>
                    <b>{comment.user.username}</b>
                  </Link>

                  <span className={styles.time}>
                    {dayjs(comment.created_at).fromNow()}
                  </span>
                </div>

                <p>{comment.body}</p>

                <div className={styles.actions}>
                  <span className="noWrap">
                    {comment.like_count}{" "}
                    {comment.like_count === 1 ? "like" : "likes"}
                  </span>

                  <Button oval color="blue">
                    like
                  </Button>

                  <Button oval>
                    {comment.reply_count}{" "}
                    {comment.reply_count === 1 ? "reply" : "replies"}
                  </Button>
                </div>
              </Card>
            </article>
          </li>
        ))}
      </ul>

      <Pagination pageInfo={pageInfo} className={styles.pagination} />
    </section>
  );
}
