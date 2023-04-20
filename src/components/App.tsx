import { MouseEventHandler, useEffect, useState } from "react";
import { Line } from "./Line";
import { RegularExpression } from "./RegularExpression";
import { help } from "../lib/help";
import { escape } from "../lib/util";

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
      patterns.reduce((acc, [a, b]) => acc.replace(escape(a), b), escape(line))
    )
    .join(`(\\n(?:\\s.*\\n)*\\s*)`)
    .trim();

  /**
   * Toggles a line to be selected
   * @param idx line number
   * @param line line text
   */
  const toggleSelectedLine = (idx: number, line: string) => {
    if (!lines.hasOwnProperty(idx)) {
      setLines({ ...lines, [idx]: { line, patterns: [] } });
    } else {
      const { [idx]: _, ...rest } = lines;
      setLines({ ...rest });
    }
  };

  /**
   * Toggles a pattern inside a line
   * @param idx line number
   * @param matcher text to match along with an array of patterns
   */
  const toggleSelectedPattern = (idx: number, matcher: TMatcherData) => {
    const { patterns } = lines[idx];
    // extract the text and pattern
    const { text, pattern } = matcher;
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
        // extract the color block dataset
        // @ts-ignore
        // event is not coming from the color block
        if (!event.target?.dataset?.matcher) return;
        // @ts-ignore
        const { text, pattern }: TMatcherData = event?.target?.dataset;
        return toggleSelectedPattern(idx, { text, pattern });
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
