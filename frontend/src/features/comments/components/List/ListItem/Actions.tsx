import type { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";

import Button from "../../../../../shared/components/Button/Button.tsx";
import { useSession } from "../../../../users/hooks.ts";
import { useCommentLike, useCommentUnlike } from "../../../hooks.ts";
import type { Comment } from "../../../types/comment.ts";
import styles from "./ListItem.module.css";
import OwnerActions from "./OwnerActions.tsx";

interface ActionsProps {
  comment: Comment;
  nestingLevel: number;
  showEditForm: boolean;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  showReplyForm: boolean;
  setShowReplyForm: Dispatch<SetStateAction<boolean>>;
  showReplies: boolean;
  setShowReplies: Dispatch<SetStateAction<boolean>>;
}

export default function Actions({
  comment,
  nestingLevel,
  showEditForm,
  setShowEditForm,
  showReplyForm,
  setShowReplyForm,
  showReplies,
  setShowReplies,
}: ActionsProps) {
  const { slug } = useParams();
  const { data: session } = useSession();
  const {
    mutate: like,
    isPending: isLikePending,
    error: likeError,
  } = useCommentLike(slug!, comment.id);
  const {
    mutate: unlike,
    isPending: isUnlikePending,
    error: unlikeError,
  } = useCommentUnlike(slug!, comment.id);

  const error = likeError ?? unlikeError;
  if (error) throw error;

  return (
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
        <OwnerActions
          commentId={comment.id}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );
}
