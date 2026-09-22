import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../../../../../shared/components/Button/Button.tsx";
import Card from "../../../../../shared/components/Card/Card.tsx";
import dayjs from "../../../../../shared/lib/dayjs.ts";
import { useReplies } from "../../../hooks.ts";
import type { Comment } from "../../../types/comment.ts";
import CreationForm from "../../Form/CreationForm.tsx";
import EditForm from "../../Form/EditForm.tsx";
import List from "../List.tsx";
import Actions from "./Actions.tsx";
import styles from "./ListItem.module.css";

interface ListItemProps {
  comment: Comment;
  nestingLevel: number;
}

export default function ListItem({ comment, nestingLevel }: ListItemProps) {
  const { slug } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
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

          {showEditForm ? (
            <EditForm
              commentId={comment.id}
              initialComment={comment.body}
              onSuccess={() => setShowEditForm(false)}
            />
          ) : (
            <p>{comment.body}</p>
          )}

          <Actions
            comment={comment}
            nestingLevel={nestingLevel}
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
            showReplies={showReplies}
            setShowReplies={setShowReplies}
          />
        </Card>
      </article>

      {showReplyForm && (
        <CreationForm parentCommentId={comment.id} className={styles.nested} />
      )}

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
