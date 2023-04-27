import { it } from "vitest";

it("resets state", () => {});

// import * as A from "./actions";
// import { State, LineRegexes, Regex } from "./models";
// import { reducer, makeRegex } from "./reducer";

// const init: State = {
//   input: "",
//   regexes: {},
// };

// const with2lines: State = {
//   input: "hello\nworld",
//   regexes: {
//     0: {
//       text: "hello",
//       patterns: [["hello", "(hello)"]],
//     },
//     1: {
//       text: "world",
//       patterns: [["world", "(world)"]],
//     },
//   },
// };

// it("resets state", () => {
//   const a: State = {
//     input: "test",
//     regexes: { 3: { text: "hello", patterns: [["e", "(e)"]] } },
//   };

//   const b = reducer(init, A.reset(a));
//   expect(a).toEqual(b);
// });

// it("accepts input", () => {
//   const input = "hello world";
//   const state = reducer(init, A.setInput(input));
//   expect(state.input).toBe(input);
// });

// it("adds a new line", () => {
//   const input = { text: "hello world", patterns: [] };
//   const state = reducer(
//     init,
//     A.addLine([0, { text: "hello world", patterns: [] }])
//   );
//   expect(state.regexes[0]).toEqual(input);
// });

// it("removes a line", () => {
//   const state = reducer(with2lines, A.removeLine(0));
//   expect(Object.entries(state.regexes).length).toEqual(1);
// });

// it("toggles a line", () => {
//   const line: LineRegexes = {
//     text: "hello",
//     patterns: [["hello", "(hello)"]],
//   };

//   const a = reducer(with2lines, A.toggleLine([0, line]));
//   expect(Object.entries(a.regexes).length).toEqual(1);
//   const b = reducer(a, A.toggleLine([0, line]));
//   expect(Object.entries(b.regexes).length).toEqual(2);
// });

// it("adds a regex to a line", () => {
//   const state = reducer(with2lines, A.addRegex([0, ["test1", "test2"]]));
//   expect(state.regexes[0].patterns.length).toBe(2);
//   expect(
//     state.regexes[0].patterns.find(([a, b]) => a === "test1" && b === "test2")
//   ).toBeDefined();
// });

// it("replaces a regex on a line", () => {
//   const state = reducer(with2lines, A.addRegex([0, ["hello", "mundo"]]));
//   expect(state.regexes[0].patterns.length).toBe(1);
//   expect(
//     state.regexes[0].patterns.find(([a, b]) => a === "hello" && b === "mundo")
//   ).toBeDefined();
// });

// it("removes a regex from a line", () => {
//   const state = reducer(with2lines, A.removeRegex([0, ["hello", "mundo"]]));
//   expect(state.regexes[0].patterns.length).toBe(1);
//   expect(
//     !state.regexes[0].patterns.find(([a, b]) => a === "hello" && b === "mundo")
//   ).toBe(true);
// });

// it("toggles a line", () => {
//   const regex: Regex = ["hello", "(hello)"];

//   const a = reducer(with2lines, A.toggleRegex([0, regex]));
//   expect(Object.entries(a.regexes[0].patterns).length).toBe(0);
//   const b = reducer(a, A.toggleRegex([0, regex]));
//   expect(Object.entries(b.regexes[0].patterns).length).toBe(1);
// });

// it("makes a regex", () => {
//   const regex = makeRegex(with2lines.regexes);
//   expect(regex).toBe(`(hello)[\\s\\S]*?(world)`);
// });

// it("regex has proper matches", () => {
//   const regex = makeRegex(with2lines.regexes);
//   const matches = with2lines.input.match(new RegExp(regex));
//   expect(matches).containSubset(["hello", "world"]);
// });
