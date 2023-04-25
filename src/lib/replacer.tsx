import { ReactNode } from "react";

type Props = {
  t: string;
  x: number;
  y: number;
};

type Acc = {
  t: string;
  x: number;
  y: number;
  node: ReactNode;
};

type Matcher = {
  r: RegExp;
  c: (c: Props) => ReactNode;
};

type Fn = (s: string, m: Matcher[], acc?: Acc[]) => ReactNode;

export const fn: Fn = (s, m, a = []) => {
  // when no more matchers left we have finished processing
  if (!m.length) {
    // if nothing was replaced just return original string
    if (!a.length) return s;
    return a.reduce((a, { node }) => [...a, node], []);
  }
  // extract first matcher
  const [{ r, c }, ...next] = m;
  const match = r.exec(s);
  // if there's no matches recurse with next matchers
  if (!match) {
    return fn(s, next, a);
  }
  // extract text from match
  const [t] = match;
  // extract index from match
  const { index } = match;
  const x = index;
  const y = index + t.length;
  const node = c({ t, x, y });
  /// recurse with accumulator and same matches
  return fn(s, m, [...a, { t, x, y, node }]);
};

// cool, viteest does in-source testing ala Rust
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("returns original string when no matches", () => {
    const r = fn("nothing", [
      {
        r: /foo/g,
        c: ({ t, x, y }) => (
          <span>
            {t} {x} {y}
          </span>
        ),
      },
    ]);

    expect(r).toMatchInlineSnapshot('"nothing"');
  });

  it("replaces a match with given jsx", () => {
    const r = fn("foo", [
      {
        r: /foo/g,
        c: ({ t, x, y }) => (
          <span>
            {t} {x} {y}
          </span>
        ),
      },
    ]);

    expect(r).toMatchInlineSnapshot(`
    [
      <span>
        foo
         
        0
         
        3
      </span>,
    ]
  `);
  });

  it("replaces multiple matches with given jsx", () => {
    const r = fn("foo bar", [
      {
        r: /foo/g,
        c: ({ t, x, y }) => (
          <span id="foo">
            {t} {x} {y}
          </span>
        ),
      },
      {
        r: /bar/g,
        c: ({ t, x, y }) => (
          <span id="bar">
            {t} {x} {y}
          </span>
        ),
      },
    ]);

    expect(r).toMatchInlineSnapshot(`
    [
      <span
        id="foo"
      >
        foo
         
        0
         
        3
      </span>,
      <span
        id="bar"
      >
        bar
         
        4
         
        7
      </span>,
    ]
  `);
  });

  it.todo("replaces nested matches jsx", () => {
    const r = fn("bar", [
      {
        r: /bar/g,
        c: ({ t, x, y }) => (
          <span>
            {t} {x} {y}
          </span>
        ),
      },
      {
        r: /a/g,
        c: ({ t, x, y }) => (
          <span>
            {t} {x} {y}
          </span>
        ),
      },
    ]);

    expect(r).toMatchInlineSnapshot(`
    [
      <span>
        b
        <span>
          a
           
          1
           
          2
        </span>
        r
         
        0
         
        3
      </span>,
    ]
  `);
  });
}
