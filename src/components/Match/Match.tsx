import uniqolor from "uniqolor";
import css from "./match.module.css";
import { ReactNode, HTMLAttributes, useMemo } from "react";

export type TMatch = {
  title: string;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;
export const Match = (props: TMatch) => {
  const { color: borderColor } = useMemo(
    () => uniqolor(props.title),
    [props.title]
  );

  return (
    <span
      tabIndex={0}
      className={css.match}
      data-matcher={true}
      style={{ borderColor }}
      {...props}
    >
      {props.children}
    </span>
  );
};
