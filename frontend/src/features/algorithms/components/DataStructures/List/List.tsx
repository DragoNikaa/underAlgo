import clsx from "clsx";

import styles from "./List.module.css";

interface ListProps {
  list: unknown[];
  pointers: Record<string, number>;
  changingPointers: string[];
  colors: Record<string, string>;
}

export default function List({
  list,
  pointers,
  changingPointers,
  colors,
}: ListProps) {
  const indexToColors = Object.entries(pointers).reduce<
    Record<number, string[]>
  >((result, [name, index]) => {
    result[index] ??= [];
    result[index].push(colors[name]);

    return result;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={clsx(styles.item, "invisible")}></div>

        {list.map((value, index) => (
          <div
            key={index}
            className={clsx(
              styles.item,
              indexToColors[index] && styles.highlightedItem,
              indexToColors[index]?.map((color) => styles[`${color}Item`]),
            )}
          >
            {JSON.stringify(value)}
          </div>
        ))}

        <div className={clsx(styles.item, "invisible")}></div>
      </div>

      <div className={styles.pointers}>
        {Object.keys(colors).map((name) => (
          <div
            key={name}
            className={clsx(
              !(name in pointers) && "invisible",
              colors[name],
              changingPointers.includes(name) && styles.blink,
            )}
          >
            {name}&nbsp;=&nbsp;{pointers[name]}
          </div>
        ))}
      </div>
    </div>
  );
}
