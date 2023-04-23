import cls from "clsx";
import {
  MouseEvent,
  KeyboardEvent,
  HTMLAttributes,
  useMemo,
  useCallback,
} from "react";
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
    (ev: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      if ("key" in ev) {
        if (ev.key !== "Enter") return;
      }
      // @ts-expect-error: event delegation
      switch (ev.target.tagName) {
        case "SPAN":
          // @ts-expect-error
          if (!ev.target?.dataset?.matcher) return;
          // @ts-expect-error
          const { text: txt, pattern } = ev?.target?.dataset;
          return dispatch(toggleRegex([number, [txt, pattern]]));
        case "DIV":
          return dispatch(toggleLine([number, { text, patterns: [] }]));
      }
    },
    [number, text]
  );

  return (
    <div
      tabIndex={0}
      className={cls(css.line, { [css.selected]: selected })}
      onClick={handler}
      onKeyDown={handler}
    >
      {element}
    </div>
  );
};
