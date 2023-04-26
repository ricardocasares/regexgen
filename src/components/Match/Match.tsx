import uniqolor from "uniqolor";
import css from "./match.module.css";
import {
  ReactNode,
  HTMLAttributes,
  useMemo,
  MouseEvent,
  KeyboardEvent,
} from "react";

export type TMatch = {
  id: string;
  title: string;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;
export const Match = (props: TMatch) => {
  const { color: borderColor } = useMemo(
    () => uniqolor(props.title),
    [props.title]
  );

  const eventHandler = (
    ev: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>
  ) => {
    if ("key" in ev) {
      if (ev.key !== "Enter") return;
    }
    // @ts-expect-error
    const id = ev.target.getAttribute("id");
    if (id === props.id) {
      // @ts-expect-error
      ev.target.classList.toggle(css.selected);
    }
  };

  return (
    <span
      tabIndex={0}
      className={css.match}
      data-matcher={true}
      // @ts-expect-error
      style={{ borderColor, "--bg-color": borderColor }}
      onClick={eventHandler}
      onKeyDown={eventHandler}
      {...props}
    >
      {props.children}
    </span>
  );
};
