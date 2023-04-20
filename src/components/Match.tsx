import uniqolor from "uniqolor";
import type { ReactElement, HTMLAttributes } from "react";

export type TMatch = {
  title: string;
  children: ReactElement;
} & HTMLAttributes<HTMLSpanElement>;
export const Match = (props: TMatch) => {
  const { color: borderColor } = uniqolor(props.title);

  return (
    <span
      className="match"
      data-matcher={true}
      style={{ borderColor }}
      {...props}
    >
      {props.children}
    </span>
  );
};
