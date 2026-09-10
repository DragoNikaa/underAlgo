import { useParams } from "react-router-dom";

import Card from "../../../../shared/components/Card/Card.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { useEmailVerification, useSession } from "../../hooks.ts";
import styles from "./VerifyEmailPage.module.css";

export default function VerifyEmailPage() {
  const { key } = useParams();
  useEmailVerification(key!);
  const { data: session } = useSession();

  return (
    <main className={styles.verifyEmailPage}>
      <Card>
        <Heading variant="secondary">email verified</Heading>

        <p>
          No bugs found. Your email is verified.{" "}
          {session
            ? "Time to explore some algorithms!"
            : "Log in and start exploring some algorithms!"}
        </p>
      </Card>
    </main>
  );
}
