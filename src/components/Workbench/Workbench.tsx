import { MouseEvent } from "react";
import css from "./workbench.module.css";
import { Stack } from "../Stack";
import { Line } from "../Line";
import { useCore, toggleRegex, toggleLine } from "../../core";

export function Workbench() {
  const {
    lines,
    dispatch,
    state: { regexes },
  } = useCore();

  const handler = (n: number, text: string) => (ev: MouseEvent) => {
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
  };

  return (
    <Stack f rs ps className={css.workbench}>
      {lines.map((text, idx) => (
        <Line
          key={idx}
          text={text}
          selected={!!regexes[idx]}
          onClick={handler(idx, text)}
        />
      ))}
    </Stack>
  );
}
