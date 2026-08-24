import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

import { sleep } from "../utils.ts";
import styles from "./List.module.css";

interface ListProps {
  list: unknown[];
  pointers: Record<string, number>;
  changingPointers: string[];
  colors: Record<string, string>;
  onAnimationStateChange: (isAnimating: boolean) => void;
}

export default function List({
  list,
  pointers,
  changingPointers,
  colors,
  onAnimationStateChange,
}: ListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const pointerRefs = useRef<Record<string, HTMLDivElement>>({});

  const prevPointers = useRef(pointers);
  const prevChangingPointers = useRef(changingPointers);

  const [displayedPointers, setDisplayedPointers] = useState(pointers);

  useLayoutEffect(() => {
    async function updatePointers() {
      for (const [name, index] of Object.entries(pointers)) {
        const prevIndex = prevPointers.current[name];

        if (shouldAnimatePointer(name, prevIndex)) {
          await animatePointer(name, prevIndex, index);
        } else {
          updateDisplayedPointer(name, index);
        }
      }

      removeMissingPointers();
      updatePrevPointers();
    }

    function shouldAnimatePointer(name: string, prevIndex: number | undefined) {
      return (
        prevIndex !== undefined && prevChangingPointers.current.includes(name)
      );
    }

    async function animatePointer(
      name: string,
      fromIndex: number,
      toIndex: number,
    ) {
      onAnimationStateChange(true);

      const step = fromIndex < toIndex ? 1 : -1;

      for (let i = fromIndex + step; i !== toIndex + step; i += step) {
        updateDisplayedPointer(name, i);
        await sleep(800);
      }

      onAnimationStateChange(false);
    }

    function updateDisplayedPointer(name: string, index: number) {
      movePointer(name, index);
      updatePointerValue(name, index);
    }

    function movePointer(name: string, index: number) {
      const pointer = pointerRefs.current[name];
      const listItem = listRef.current?.children[index + 1];
      const parent = pointer?.parentElement;

      if (!pointer || !listItem || !parent) return;

      const listItemRect = listItem.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      const left =
        listItemRect.left +
        listItemRect.width / 2 -
        pointer.offsetWidth / 2 -
        parentRect.left;

      pointer.style.left = `${left}px`;
    }

    function updatePointerValue(name: string, index: number) {
      setDisplayedPointers((prev) => ({
        ...prev,
        [name]: index,
      }));
    }

    function removeMissingPointers() {
      setDisplayedPointers((prev) => {
        const next = { ...prev };

        for (const name of Object.keys(next)) {
          if (!(name in pointers)) {
            delete next[name];
          }
        }

        return next;
      });
    }

    function updatePrevPointers() {
      prevPointers.current = pointers;
      prevChangingPointers.current = changingPointers;
    }

    updatePointers();
  }, [pointers, changingPointers, onAnimationStateChange]);

  const indexToColors = Object.entries(displayedPointers).reduce<
    Record<number, string[]>
  >((result, [name, index]) => {
    (result[index] ??= []).push(colors[name]);
    return result;
  }, {});

  return (
    <div className={styles.container}>
      <div ref={listRef} className={styles.list}>
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
        {Object.entries(colors).map(([name, color]) => (
          <div
            key={name}
            ref={(element) => {
              if (element) pointerRefs.current[name] = element;
            }}
            className={clsx(
              styles.pointer,
              !(name in displayedPointers) && "invisible",
              color,
              changingPointers.includes(name) && styles.blink,
            )}
          >
            {name} = {displayedPointers[name] ?? 0}
          </div>
        ))}
      </div>
    </div>
  );
}
