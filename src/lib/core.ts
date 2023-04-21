import { useEffect, useState } from "react";
import { escape } from "./util";

export type Regex = [string, string];

export type LineRegexes = {
  text: string;
  patterns: Regex[];
};

export function useRegexGen(text: string) {
  const [regex, setRegex] = useState("");
  const [input, setInput] = useState(text);
  const [regexes, setRegexes] = useState<Record<string, LineRegexes>>({});

  useEffect(() => {
    generate();
  }, [regexes]);

  function reset(init = {}) {
    setRegexes(init);
  }

  function lines() {
    return input.split(/\n/);
  }

  function hasLine(n: number) {
    return !!regexes[n];
  }

  function selectLine(n: number, text: string) {
    setRegexes({ ...regexes, [n]: { text, patterns: [] } });
  }

  function deselectLine(n: number) {
    const { [n]: _, ...rest } = regexes;
    setRegexes({ ...rest });
  }

  function toggleLine(n: number, text: string) {
    return hasLine(n) ? deselectLine(n) : selectLine(n, text);
  }

  function lineHasRegex(n: number, [text]: Regex) {
    const { patterns = [] } = regexes[n];
    return !!patterns.find(([txt]) => txt === text);
  }

  function addRegex(n: number, regex: Regex) {
    if (hasLine(n) && !lineHasRegex(n, regex)) {
      const { text, patterns = [] } = regexes[n];
      setRegexes({ ...regexes, [n]: { text, patterns: [...patterns, regex] } });
    }
  }

  function removeRegex(n: number, regex: Regex) {
    if (lineHasRegex(n, regex)) {
      const { patterns: old, ...rest } = regexes[n];
      const [text] = regex;
      const patterns = old.filter(([txt]) => txt !== text);
      setRegexes({ ...regexes, [n]: { ...rest, patterns } });
    }
  }

  function toggleRegex(n: number, regex: Regex) {
    return lineHasRegex(n, regex) ? removeRegex(n, regex) : addRegex(n, regex);
  }

  function generate() {
    setRegex(
      Object.entries(regexes)
        .map(([_, { text, patterns: regexes }]) =>
          // apply all the patterns to the line
          regexes.reduce(
            (acc, [a, b]) => acc.replace(escape(a), b),
            escape(text)
          )
        )
        .join(`[\\s\\S]*?`)
    );
  }

  return {
    input,
    lines,
    regex,
    regexes,
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
    setInput,
  };
}
