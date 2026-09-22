import { type ComponentPropsWithoutRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useCommentCreation } from "../../hooks.ts";
import Form from "./Form.tsx";

interface CreationFormProps extends ComponentPropsWithoutRef<"form"> {
  parentCommentId?: number;
}

export default function CreationForm({
  parentCommentId,
  className,
}: CreationFormProps) {
  const { slug } = useParams();
  const [comment, setComment] = useState("");
  const {
    mutate: createComment,
    isPending,
    error,
  } = useCommentCreation(slug!, parentCommentId);

  return (
    <Form
      comment={comment}
      onCommentChange={setComment}
      onSubmit={() =>
        createComment(comment, {
          onSuccess: () => setComment(""),
        })
      }
      isPending={isPending}
      error={error}
      errorId={
        (parentCommentId ? `replyTo${parentCommentId}` : "comment") + "Error"
      }
      placeholder={`Write your ${parentCommentId ? "reply" : "comment"} here…`}
      buttonLabel={parentCommentId ? "reply" : "comment"}
      className={className}
    />
  );
}
