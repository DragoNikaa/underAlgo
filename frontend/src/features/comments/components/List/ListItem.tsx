import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Card from "../../../../shared/components/Card/Card.tsx";
import dayjs from "../../../../shared/lib/dayjs.ts";
import { useSession } from "../../../users/hooks.ts";
import {
  useCommentDeletion,
  useCommentLike,
  useCommentUnlike,
  useReplies,
} from "../../hooks.ts";
import type { Comment } from "../../types/comment.ts";
import CreationForm from "../Form/CreationForm.tsx";
import EditForm from "../Form/EditForm.tsx";
import styles from "./List.module.css";
import List from "./List.tsx";

interface ListItemProps {
  comment: Comment;
  nestingLevel: number;
}

export default function ListItem({ comment, nestingLevel }: ListItemProps) {
  const { slug } = useParams();
  const { data: session } = useSession();

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeletionConfirmation, setShowDeletionConfirmation] =
    useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { mutate: deleteComment, isPending: isDeletionPending } =
    useCommentDeletion(slug!, comment.id);
  const { mutate: like, isPending: isLikePending } = useCommentLike(
    slug!,
    comment.id,
  );
  const { mutate: unlike, isPending: isUnlikePending } = useCommentUnlike(
    slug!,
    comment.id,
  );
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

          <div className={styles.actions}>
            <span className="noWrap">
              {comment.like_count} {comment.like_count === 1 ? "like" : "likes"}
            </span>

            {comment.liked_by_user ? (
              <Button
                onClick={() => unlike()}
                disabled={isUnlikePending}
                oval
                color="blueInverse"
              >
                liked
              </Button>
            ) : (
              <Button
                onClick={() => like()}
                disabled={isLikePending}
                oval
                color="blue"
              >
                like
              </Button>
            )}

            {nestingLevel < 3 && (
              <>
                {comment.reply_count > 0 && (
                  <Button onClick={() => setShowReplies((show) => !show)} oval>
                    {showReplies
                      ? "hide replies"
                      : `show ${comment.reply_count} ${comment.reply_count === 1 ? "reply" : "replies"}`}
                  </Button>
                )}

                <Button onClick={() => setShowReplyForm((show) => !show)} oval>
                  {showReplyForm && "cancel "}reply
                </Button>
              </>
            )}

            {session?.data.user.id === comment.user.id && (
              <>
                <Button
                  onClick={() => setShowEditForm((show) => !show)}
                  oval
                  color="yellow"
                >
                  {showEditForm ? "cancel editing" : "edit"}
                </Button>

                {showDeletionConfirmation ? (
                  <div className={styles.deletionConfirmation}>
                    <span>Are you sure?</span>

                    <Button
                      onClick={() => deleteComment()}
                      disabled={isDeletionPending}
                      oval
                      color="red"
                    >
                      yes, delete
                    </Button>

                    <Button
                      onClick={() => setShowDeletionConfirmation(false)}
                      oval
                    >
                      no, cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowDeletionConfirmation(true)}
                    oval
                    color="red"
                  >
                    delete
                  </Button>
                )}
              </>
            )}
          </div>
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
