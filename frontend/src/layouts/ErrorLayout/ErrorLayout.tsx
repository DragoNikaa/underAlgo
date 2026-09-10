import Header from "../../app/components/Header/Header.tsx";
import Card from "../../shared/components/Card/Card.tsx";
import Heading from "../../shared/components/Heading/Heading.tsx";
import styles from "./ErrorLayout.module.css";
import { useErrorInfo } from "./hooks.ts";

export default function ErrorLayout() {
  const { title, message } = useErrorInfo();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Card>
          <Heading variant="secondary">{title}</Heading>
          <p>{message}</p>
        </Card>
      </main>
    </>
  );
}
