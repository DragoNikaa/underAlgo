import { PenLine, PenOff, Trash, TrashOff } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../../../../shared/components/Button/Button.tsx";
import { useCommentDeletion } from "../../../hooks.ts";
import styles from "./ListItem.module.css";

interface OwnerActionsProps {
  commentId: number;
  showEditForm: boolean;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
}

export default function OwnerActions({
  commentId,
  showEditForm,
  setShowEditForm,
}: OwnerActionsProps) {
  const { slug } = useParams();
  const [showDeletionConfirmation, setShowDeletionConfirmation] =
    useState(false);
  const {
    mutate: deleteComment,
    isPending,
    error,
  } = useCommentDeletion(slug!, commentId);

  if (error) throw error;

  return (
    <>
      <Button
        onClick={() => setShowEditForm((show) => !show)}
        oval
        color="yellow"
      >
        {showEditForm ? (
          <>
            <PenOff /> cancel editing
          </>
        ) : (
          <>
            <PenLine /> edit
          </>
        )}
      </Button>

      {showDeletionConfirmation ? (
        <div className={styles.deletionConfirmation}>
          Are you sure?
          <Button
            onClick={() => deleteComment()}
            disabled={isPending}
            oval
            color="red"
          >
            <Trash /> yes, delete
          </Button>
          <Button onClick={() => setShowDeletionConfirmation(false)} oval>
            <TrashOff /> no, cancel
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setShowDeletionConfirmation(true)}
          oval
          color="red"
        >
          <Trash /> delete
        </Button>
      )}
    </>
  );
}
