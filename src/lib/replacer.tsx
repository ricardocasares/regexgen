import React, { ReactNode } from "react";
import replace from "string-replace-to-array";

type Props = { raw: string; args: any[]; processed: ReactNode };

type Matcher = {
  r: RegExp;
  c: (c: Props) => ReactNode;
};

type Fn = (s: string, m: Matcher[], acc?: ReactNode[]) => ReactNode;

export const fn: Fn = (s, m, a = []) => {
  // when no more matchers left
  if (!m.length) {
    // end of recursion
    // if (!a.length) {
    //   return s;
    // }
    return a; //?
  }
  // extract first matcher
  const [{ r, c }, ...next] = m; //?
  const nodes = replace(s, r, function subtree(raw, ...args) {
    return c({ raw, args, processed: fn(raw, next, []) }); //?
  });

  // if (nodes[0] === s) return fn(s, next, a); //?
  // if there's no matches recurse with next matchers
  return fn(s, next, [...a, ...nodes]); //?
};

// cool, viteest does in-source testing ala Rust
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("returns original string when no matches", () => {
    const r = fn("nothing", [
      {
        r: /foo/,
        c: ({ processed }) => <span>{processed}</span>,
      },
    ]);

    expect(r).toMatchInlineSnapshot(`
      [
        "nothing",
      ]
    `);
  });

  it.todo("replaces a match with given jsx", () => {
    const r = fn("foo", [
      {
        r: /foo/,
        c: ({ processed }) => <span>{processed}</span>,
      },
    ]);

    expect(r).toMatchInlineSnapshot(`
      [
        <span>
          foo
        </span>,
      ]
    `);
  });

  it.todo("replaces multiple matches with given jsx", () => {
    const r = fn("fooxbar", [
      {
        r: /foo/,
        c: ({ processed }) => <span>{processed}</span>,
      },
      {
        r: /bar/,
        c: ({ processed }) => <mark>{processed}</mark>,
      },
    ]);

    expect(r).toMatchInlineSnapshot(`
          [
            <span>
              foo
            </span>,
            "xbar",
            "foox",
            <mark>
              bar
            </mark>,
          ]
        `);
  });

  // it.todo("replaces nested matches jsx", () => {
  //   const r = fn("bar", [
  //     {
  //       r: /bar/g,
  //       c: ([t, x, y]) => (
  //         <span>
  //           {t} {x} {y}
  //         </span>
  //       ),
  //     },
  //     {
  //       r: /a/g,
  //       c: ([t, x, y]) => (
  //         <span>
  //           {t} {x} {y}
  //         </span>
  //       ),
  //     },
  //   ]);

  //   expect(r).toMatchInlineSnapshot(`
  //   [
  //     <span>
  //       b
  //       <span>
  //         a

  //         1

  //         2
  //       </span>
  //       r

  //       0

  //       3
  //     </span>,
  //   ]
  // `);
  // });
}
