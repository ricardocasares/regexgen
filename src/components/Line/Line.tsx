import cls from "clsx";
import { HTMLAttributes } from "react";
import css from "./line.module.css";
import { parser } from "../../lib/parser";

export type TLine = {
  text: string;
  selected: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Line = ({ text, selected, ...props }: TLine) => (
  <div className={cls(css.line, { [css.selected]: selected })} {...props}>
    {selected ? parser(text) : text}
  </div>
);
