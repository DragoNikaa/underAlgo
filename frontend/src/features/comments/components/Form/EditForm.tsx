import { type ComponentPropsWithoutRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useCommentUpdate } from "../../hooks.ts";
import Form from "./Form.tsx";

interface EditFormProps extends ComponentPropsWithoutRef<"form"> {
  commentId: number;
  initialComment: string;
  onSuccess: () => void;
}

export default function EditForm({
  commentId,
  initialComment,
  onSuccess,
  className,
}: EditFormProps) {
  const { slug } = useParams();
  const [comment, setComment] = useState(initialComment);
  const {
    mutate: updateComment,
    isPending,
    error,
  } = useCommentUpdate(slug!, commentId);

  return (
    <Form
      comment={comment}
      onCommentChange={setComment}
      onSubmit={() =>
        updateComment(comment, {
          onSuccess: () => onSuccess(),
        })
      }
      isPending={isPending}
      error={error}
      errorId={`comment${commentId}Error`}
      placeholder="Edit your comment here…"
      buttonLabel="save"
      className={className}
    />
  );
}
