import Card from "../../../../shared/components/Card/Card.tsx";
import Input from "../../../../shared/components/Form/Input.tsx";
import Heading from "../../../../shared/components/Heading/Heading.tsx";
import { useSearchParamsActions } from "../../../../shared/hooks/search-params.ts";

export default function Search() {
  const { params, setParam } = useSearchParamsActions();

  return (
    <Card>
      <Input
        type="search"
        column
        placeholder="amazing algorithm…"
        onChange={(event) => setParam("search", event.target.value)}
        value={params.get("search") ?? ""}
      >
        <Heading as="h3" variant="secondary">
          search
        </Heading>
      </Input>
    </Card>
  );
}
