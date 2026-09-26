import Categories from "./Categories.tsx";
import Difficulties from "./Difficulties.tsx";
import styles from "./Filters.module.css";
import Search from "./Search.tsx";

export default function Filters() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={styles.algorithmFilters}
    >
      <Search />
      <Difficulties />
      <Categories />
    </form>
  );
}
