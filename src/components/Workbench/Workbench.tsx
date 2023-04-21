import { MouseEventHandler } from "react";
import css from "./workbench.module.css";
import { Stack } from "../Stack";
import { Line } from "../Line";

export type Workbench = {
  lines: string[];
  isSelected: (num: number) => boolean;
  onClick: (n: number, s: string) => MouseEventHandler<HTMLDivElement>;
};

export function Workbench({ lines, isSelected, onClick }: Workbench) {
  return (
    <Stack f rs ps className={css.workbench}>
      {lines.map((text, idx) => (
        <Line
          key={idx}
          text={text}
          selected={isSelected(idx)}
          onClick={onClick(idx, text)}
        />
      ))}
    </Stack>
  );
}
