import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import dayjs from "../../../../shared/lib/dayjs.ts";
import { useReplies } from "../../hooks.ts";
import type { Comment } from "../../types/comment.ts";
import styles from "./List.module.css";
import List from "./List.tsx";

interface ListItemProps {
  comment: Comment;
  nestingLevel: number;
}

export default function ListItem({ comment, nestingLevel }: ListItemProps) {
  const { slug } = useParams();
  const [showReplies, setShowReplies] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useReplies(
    slug!,
    comment.id,
    showReplies,
  );

  const replies = data?.pages.flatMap((page) => page.results);

  return (
    <li>
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
              {comment.like_count} {comment.like_count === 1 ? "like" : "likes"}
            </span>

            <Button oval color="blue">
              like
            </Button>

            {nestingLevel < 3 && (
              <>
                {comment.reply_count > 0 && (
                  <Button onClick={() => setShowReplies((show) => !show)} oval>
                    {showReplies
                      ? "hide replies"
                      : `show ${comment.reply_count} ${comment.reply_count === 1 ? "reply" : "replies"}`}
                  </Button>
                )}

                <Button oval>reply</Button>
              </>
            )}
          </div>
        </Card>
      </article>

      {replies && showReplies && (
        <div className={styles.nested}>
          <List comments={replies} nestingLevel={nestingLevel + 1} />

          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={styles.showMoreButton}
            >
              show more replies
            </Button>
          )}
        </div>
      )}
    </li>
  );
}
