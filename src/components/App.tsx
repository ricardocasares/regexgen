import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { Line } from "./Line";
import { RegularExpression } from "./RegularExpression";
import { help } from "../lib/help";

export type TLine = {
  line: string;
  patterns: [string, string][];
};

export type TLines = Record<string, TLine>;

export type TMatcherData = {
  text: string;
  pattern: string;
};

export default function App() {
  const [lines, setLines] = useState<TLines>({});
  const [input, setInput] = useState<string[]>(help);

  const regex = Object.entries(lines)
    .map(([_, { line, patterns }]) =>
      // apply all the patterns to the line
      patterns.reduce((acc, [a, b]) => acc.replace(a, b), line)
    )
    .join(`(\n(?:\s.*\n)*\s*)`)
    .trim();

  const toggleSelectedLine = (idx: number, line: string) => {
    if (!lines.hasOwnProperty(idx)) {
      setLines({ ...lines, [idx]: { line, patterns: [] } });
    } else {
      const { [idx]: _, ...rest } = lines;
      setLines({ ...rest });
    }
  };

  const toggleSelectedPattern = (
    idx: number,
    event: MouseEvent<HTMLDivElement>
  ) => {
    // event is not coming from the color block
    // @ts-ignore
    if (!event.target?.dataset?.matcher) return;
    // otherwise, get the patterns for this line
    const { patterns } = lines[idx];
    // extract the color block dataset
    // @ts-ignore
    const { text, pattern }: TMatcherData = event.target.dataset;
    // check if the pattern is already selected
    const exists = patterns.find(([x]) => x === text);
    // either add or remove the pattern
    const updated = exists
      ? patterns.filter(([x]) => x !== text)
      : [...patterns, [text, pattern]];

    // update the state
    setLines({ ...lines, [idx]: { ...lines[idx], patterns: updated } });
  };

  const handleSelections: (
    idx: number,
    line: string
  ) => MouseEventHandler<HTMLDivElement> = (idx, line) => (event) => {
    switch (event.detail) {
      // Single click
      case 1:
        // Toggle add/remove predetermined patterns
        return toggleSelectedPattern(idx, event);
      // Double click
      case 2:
        return toggleSelectedLine(idx, line);
      default:
        return;
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      setLines({});
      setInput(event.clipboardData?.getData("text").split("\n") ?? []);
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <>
      <div className="output">
        {input.map((text, idx) => (
          <Line
            key={idx}
            text={text}
            selected={lines.hasOwnProperty(idx)}
            onClick={handleSelections(idx, text)}
          />
        ))}
      </div>
      <RegularExpression regex={regex} />
    </>
  );
}
