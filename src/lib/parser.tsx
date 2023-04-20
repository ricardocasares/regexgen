import reactStringReplace from "react-string-replace-recursively";
import { Match } from "../components/Match";

export const parser = reactStringReplace({
  ratio: {
    pattern: /(\d{1,3}\/\d{1,3})/g,
    ignore: ["ratio"],
    matcherFn: (raw, processed, key) => (
      <Match
        title="Ratio"
        key={key}
        data-text={raw}
        data-pattern="(\d{1,3}\/\d{1,3})"
      >
        {processed}
      </Match>
    ),
  },
  macAddress: {
    pattern: /([0-9a-f]{4}[\\.][0-9a-f]{4}[\\.][0-9a-f]{4})/g,
    ignore: ["float", "digit", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        key={key}
        title="MAC address"
        data-text={raw}
        data-pattern="([0-9a-f]{4}[\\.][0-9a-f]{4}[\\.][0-9a-f]{4})"
      >
        {processed}
      </Match>
    ),
  },
  interface: {
    pattern: /(Ethernet\d|Serial\d|TokenRing\d)/g,
    ignore: ["float", "digit", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        key={key}
        title="Interface"
        data-text={raw}
        data-pattern="(Ethernet\d|Serial\d|TokenRing\d)"
      >
        {processed}
      </Match>
    ),
  },
  ipAddress: {
    pattern: /(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/,
    ignore: ["float", "digit", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        title="IP Address"
        key={key}
        data-text={raw}
        data-pattern="(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)"
      >
        {processed}
      </Match>
    ),
  },
  time: {
    pattern: /(\d{1,2}:\d{2}:\d{2})/g,
    ignore: ["digit", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        title="Time"
        key={key}
        data-text={raw}
        data-pattern="(\d{1,2}:\d{2}:\d{2})"
      >
        {processed}
      </Match>
    ),
  },
  float: {
    pattern: /(\d{1,4}\.\d{1,4})/g,
    ignore: ["digit"],
    matcherFn: (raw, processed, key) => (
      <Match
        title="Float"
        key={key}
        data-text={raw}
        data-pattern="(\d{1,4}\.\d{1,4})"
      >
        {processed}
      </Match>
    ),
  },
  digit: {
    pattern: /(\d)/g,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match title="Integer" key={key} data-text={raw} data-pattern="(\d)">
        {processed}
      </Match>
    ),
  },
  hashtag: {
    pattern: /(#[a-z\d][\w-]*)/gi,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match
        title="Hashtag"
        key={key}
        data-text={raw}
        data-pattern="(#[a-z\d][\w-]*)"
      >
        {processed}
      </Match>
    ),
  },
  emoji: {
    pattern: /(\p{Extended_Pictographic})/gu,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match
        title="Emoji"
        key={key}
        data-text={raw}
        data-pattern="(\p{Extended_Pictographic})"
      >
        {processed}
      </Match>
    ),
  },
  level: {
    pattern: /(INFO|TRACE|WARNING|WARN|DEBUG|FATAL|ERROR)/g,
    matcherFn: (raw, processed, key) => (
      <Match
        title="Log levels"
        key={key}
        data-text={raw}
        data-pattern="(INFO|TRACE|WARNING|WARN|DEBUG|FATAL|ERROR)"
      >
        {processed}
      </Match>
    ),
  },
  word: {
    pattern: /(\b[^\s]+\b)/g,
    matcherFn: (raw, processed, key) => (
      <Match title="Word" key={key} data-text={raw} data-pattern="(\b[^\s]+\b)">
        {processed}
      </Match>
    ),
  },
});
