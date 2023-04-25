import { ReactNode } from "react";
import { it, expect } from "vitest";

type Match = {
  raw: string;
  x: number;
  y: number;
};

type ReplaceProps = {
  node: ReactNode;
} & Match;

type Matcher<T> = {
  ignore: (keyof T)[];
  pattern: RegExp;
  replace: (props: ReplaceProps) => ReactNode;
};

type MatcherConfig = Record<string, Matcher<any>>;

type ReplacerFn = (c: MatcherConfig) => (s: string) => ReactNode;

export const replacer: ReplacerFn = (cfg) => (s) => {
  function matcher(s: string, r: RegExp, matches: Match[] = []): Match[] {
    if (!r.global) throw new Error("RegExp must be global");

    const m = r.exec(s);
    if (!m) return matches;

    const [raw] = m;
    const x = m.index;
    const y = x + raw.length;

    return matcher(s, r, [...matches, { raw: m[0], x, y }]);
  }

  const a = Object.entries(cfg);

  return [<span>foo</span>]; // remove
};

it("returns a react node", () => {
  const replace = replacer({
    word: {
      ignore: ["poop"],
      pattern: /foo/g,
      replace: ({ raw }) => <span>{raw}</span>,
    },
  });

  expect(replace("foo")).toMatchInlineSnapshot(`
    [
      <span>
        foo
      </span>,
    ]
  `);
});

// --------------------------------

function matcher(s: string, r: RegExp, matches: any[] = []): any[] {
  const m = r.exec(s);

  if (!m) return matches;

  return matcher(s, r, [...matches, [`${m.index}-${m.index + m[0].length}`]]);
}

function multiple(s: string, r: RegExp[]) {
  return r.map((r) => [r.toString(), matcher(s, r).flat()]);
}

it("regex", () => {
  const m = multiple("foo bar foo", [/foo/g, /foo/g, /bar/g]);
  console.log(m);
});
