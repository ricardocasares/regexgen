import uniqolor from "uniqolor";
import css from "./match.module.css";
import type { ReactNode, HTMLAttributes } from "react";

export type TMatch = {
  title: string;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;
export const Match = (props: TMatch) => {
  const { color: borderColor } = uniqolor(props.title);

  return (
    <span
      className={css.match}
      data-matcher={true}
      style={{ borderColor }}
      {...props}
    >
      {props.children}
    </span>
  );
};
