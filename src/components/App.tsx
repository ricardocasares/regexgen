import { MouseEventHandler, useEffect, useState } from "react";
import { Preview } from "./Preview";
import { Workbench } from "./Workbench";
import { RegularExpression } from "./RegularExpression";
import { help } from "../lib/help";
import { escape } from "../lib/util";
import { Layout } from "./Layout";

export type TLineMatcher = {
  text: string;
  patterns: [string, string][];
};

export type TLineMatchers = Record<string, TLineMatcher>;

export type TMatcherData = {
  text: string;
  pattern: string;
};

export default function App() {
  const [lines, setLines] = useState<string[]>(help);
  const [lineMatchers, setLineMatchers] = useState<TLineMatchers>({});

  const regex = Object.entries(lineMatchers)
    .map(([_, { text, patterns }]) =>
      // apply all the patterns to the line
      patterns.reduce((acc, [a, b]) => acc.replace(escape(a), b), escape(text))
    )
    .join(`(\\n(?:\\s.*\\n)*\\s*)`);

  /**
   * Toggles a line to be selected
   * @param num line number
   * @param line line text
   */
  const toggleSelectedLine = (num: number, text: string) => {
    switch (lineMatchers.hasOwnProperty(num)) {
      case true:
        // matcher already exists for this line so we remove it
        const { [num]: _, ...rest } = lineMatchers;
        return setLineMatchers({ ...rest });
      case false:
        // in this case we add a new matcher to this line number
        return setLineMatchers({
          ...lineMatchers,
          [num]: { text, patterns: [] },
        });
    }
  };

  /**
   * Toggles a pattern inside a line
   * @param num line number
   * @param matcher text to match along with an array of patterns
   */
  const toggleSelectedPattern = (num: number, matcher: TMatcherData) => {
    const { patterns } = lineMatchers[num];
    // extract the text and pattern
    const { text, pattern } = matcher;
    // check if the pattern is already selected
    const exists = patterns.find(([x]) => x === text);
    // either add or remove the pattern
    const updated = exists
      ? patterns.filter(([x]) => x !== text)
      : [...patterns, [text, pattern]];

    // update the state
    setLineMatchers({
      ...lineMatchers,
      [num]: { ...lineMatchers[num], patterns: updated },
    });
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
        // @ts-expect-error
        // event is not coming from the color block
        if (!event.target?.dataset?.matcher) return;
        // @ts-expect-error
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
      setLineMatchers({});
      setLines(event.clipboardData?.getData("text").split("\n") ?? []);
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <Layout>
      <Workbench
        lines={lines}
        onClick={handleSelections}
        isSelected={(id) => lineMatchers.hasOwnProperty(id)}
      />
      <Preview text={lines.join("\n")} regex={regex} />
      <RegularExpression regex={regex} />
    </Layout>
  );
}
