import cls from "clsx";
import { MouseEvent, HTMLAttributes, useMemo, useCallback } from "react";
import css from "./line.module.css";
import { parser } from "../../lib/parser";
import { toggleLine, toggleRegex, useCore } from "../../core";

export type TLine = {
  text: string;
  number: number;
} & HTMLAttributes<HTMLDivElement>;

export const Line = ({ number, text }: TLine) => {
  const {
    dispatch,
    state: { regexes },
  } = useCore();
  const replacer = useCallback(parser, [text]);
  const selected = useMemo(() => !!regexes[number], [number, regexes]);
  const element = useMemo(
    () => (selected ? replacer(text) : text),
    [text, selected]
  );
  const handler = useCallback(
    (n: number, text: string) => (ev: MouseEvent) => {
      switch (ev.detail) {
        case 1:
          // @ts-expect-error
          if (!ev.target?.dataset?.matcher) return;
          // @ts-expect-error
          const { text: txt, pattern } = ev?.target?.dataset;
          return dispatch(toggleRegex([n, [txt, pattern]]));
        case 2:
          return dispatch(toggleLine([n, { text, patterns: [] }]));
      }
    },
    [number, text]
  );

  return (
    <div
      className={cls(css.line, { [css.selected]: selected })}
      onClick={handler(number, text)}
    >
      {element}
    </div>
  );
};
