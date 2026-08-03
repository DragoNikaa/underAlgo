import styles from "./AlgorithmFilters.module.css";
import Categories from "./Categories.tsx";
import Difficulties from "./Difficulties.tsx";
import Search from "./Search.tsx";

export default function AlgorithmFilters() {
  return (
    <form className={styles.algorithmFilters}>
      <Search />
      <Difficulties />
      <Categories />
    </form>
  );
}
