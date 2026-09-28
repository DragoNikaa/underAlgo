import Heading from "../../../../shared/components/Heading/Heading.tsx";
import AuthLayout from "../../components/AuthLayout/AuthLayout.tsx";

export default function EmailVerificationSentPage() {
  return (
    <AuthLayout>
      <Heading variant="secondary">verify your email</Heading>

      <p>
        Almost there! Check your inbox to verify your email address – then let
        the algorithm do the rest.
      </p>
    </AuthLayout>
  );
}
