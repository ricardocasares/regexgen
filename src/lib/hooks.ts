import { useState } from "react";
import { escape } from "./util";

export type Regex = [string, string];

export type LineRegexes = {
  text: string;
  regexes: Regex[];
};

export function useRegexGen() {
  const [lines, setLines] = useState<Record<string, LineRegexes>>({});

  function reset() {
    setLines({});
  }

  function hasLine(n: number) {
    return !!lines[n];
  }

  function selectLine(n: number, text: string) {
    setLines({ ...lines, [n]: { text, regexes: [] } });
  }

  function deselectLine(n: number) {
    const { [n]: _, ...rest } = lines;
    setLines({ ...rest });
  }

  function toggleLine(n: number, text: string) {
    return hasLine(n) ? deselectLine(n) : selectLine(n, text);
  }

  function lineHasRegex(n: number, [text]: Regex) {
    const { regexes = [] } = lines[n];
    return !!regexes.find(([txt]) => txt === text);
  }

  function addRegex(n: number, regex: Regex) {
    if (hasLine(n) && !lineHasRegex(n, regex)) {
      const { text, regexes = [] } = lines[n];
      setLines({ ...lines, [n]: { text, regexes: [...regexes, regex] } });
    }
  }

  function removeRegex(n: number, regex: Regex) {
    if (lineHasRegex(n, regex)) {
      const { regexes: old, ...rest } = lines[n];
      const [text] = regex;
      const regexes = old.filter(([txt]) => txt !== text);
      setLines({ ...lines, [n]: { ...rest, regexes } });
    }
  }

  function toggleRegex(n: number, regex: Regex) {
    return lineHasRegex(n, regex) ? removeRegex(n, regex) : addRegex(n, regex);
  }

  function generate() {
    return Object.entries(lines)
      .map(([_, { text, regexes }]) =>
        // apply all the patterns to the line
        regexes.reduce((acc, [a, b]) => acc.replace(escape(a), b), escape(text))
      )
      .join(`[\\s\\S]*?`);
  }

  return {
    lines,
    reset,
    hasLine,
    selectLine,
    deselectLine,
    toggleLine,
    lineHasRegex,
    addRegex,
    removeRegex,
    toggleRegex,
    generate,
  };
}

