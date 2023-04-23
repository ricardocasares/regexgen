import { it, expect } from "vitest";
import { escape, splitByLine } from "./util";

it("splits text by newline", () =>
  expect(splitByLine("hello\nworld")).containSubset(["hello", "world"]));

it("safely escapes regexes", () =>
  [
    ["(hi?d)", "\\(hi\\?d\\)"],
    ["1.1.1.1", "1\\.1\\.1\\.1"],
  ].map(([from, to]) => expect(escape(from)).toBe(to)));
