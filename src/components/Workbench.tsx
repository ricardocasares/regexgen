import { MouseEventHandler } from "react";
import { Line } from "./Line";

export type Workbench = {
  lines: string[];
  isSelected: (num: number) => boolean;
  onClick: (n: number, s: string) => MouseEventHandler<HTMLDivElement>;
};

export function Workbench({ lines, isSelected, onClick }: Workbench) {
  return (
    <div className="output">
      {lines.map((text, idx) => (
        <Line
          key={idx}
          text={text}
          selected={isSelected(idx)}
          onClick={onClick(idx, text)}
        />
      ))}
    </div>
  );
}
