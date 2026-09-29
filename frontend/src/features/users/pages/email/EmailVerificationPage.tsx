import { useParams } from "react-router-dom";

import Heading from "../../../../shared/components/Heading/Heading.tsx";
import AuthLayout from "../../components/AuthLayout/AuthLayout.tsx";
import { useEmailVerification, useSession } from "../../hooks.ts";

export default function EmailVerificationPage() {
  const { key } = useParams();
  useEmailVerification(key!);
  const { data: session } = useSession();

  return (
    <AuthLayout>
      <Heading variant="secondary">email verified</Heading>

      <p>
        No bugs found. Your email address is verified.{" "}
        {session
          ? "Time to explore some algorithms!"
          : "Log in and start exploring some algorithms!"}
      </p>
    </AuthLayout>
  );
}
