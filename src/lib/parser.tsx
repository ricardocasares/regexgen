import reactStringReplace from "react-string-replace-recursively";
import { Match } from "../components/Match";

export const parser = reactStringReplace({
  interface: {
    pattern:
      /((?:\S*Ethernet|\S*GigE|Loopback|Tunnel|Serial|Port-channel)\d+(?:\/\d+)*(?:\.\d+)*)/g,
    ignore: ["float", "word", "ratio"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        key={key}
        title="Interface"
        data-text={raw}
        data-pattern="((?:\S*Ethernet|\S*GigE|Loopback|Tunnel|Serial|Port-channel)\d+(?:\/\d+)*(?:\.\d+)*)"
      >
        {processed}
      </Match>
    ),
  },
  ratio: {
    pattern: /((?:\d+\/)+\d+)/g,
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="Ratio"
        key={key}
        data-text={raw}
        data-pattern="((\d+\/)+\d+)"
      >
        {processed}
      </Match>
    ),
  },
  macAddress1: {
    pattern: /((?:[a-fA-F\d]{4}\.){2}[a-fA-F\d]{4})/g,
    ignore: ["float", "integer", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        key={key}
        title="MAC address (1)"
        data-text={raw}
        data-pattern="(([a-fA-F\d]{4}\.){2}[a-fA-F\d]{4})"
      >
        {processed}
      </Match>
    ),
  },
  macAddress2: {
    pattern: /((?:[a-fA-F\d]{2}:){5}[a-fA-F\d]{2})/g,
    ignore: ["float", "integer", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        key={key}
        title="MAC address (2)"
        data-text={raw}
        data-pattern="(([a-fA-F\d]{2}:){5}[a-fA-F\d]{2})"
      >
        {processed}
      </Match>
    ),
  },
  ipAddress: {
    pattern: /(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/,
    ignore: ["float", "integer", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="IPv4 Address"
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
    ignore: ["integer", "word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="Time"
        key={key}
        data-text={raw}
        data-pattern="(\d{1,2}:\d{2}:\d{2})"
      >
        {processed}
      </Match>
    ),
  },
  hexadecimal: {
    pattern: /(0[xX][0-9a-fA-F]+)/g,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="Hexadecimal"
        key={key}
        data-text={raw}
        data-pattern="(0[xX][0-9a-fA-F]+)"
      >
        {processed}
      </Match>
    ),
  },
  float: {
    pattern: /(\d{1,4}\.\d{1,4})/g,
    ignore: ["integer"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="Float"
        key={key}
        data-text={raw}
        data-pattern="(\d{1,4}\.\d{1,4})"
      >
        {processed}
      </Match>
    ),
  },
  integer: {
    pattern: /(\d+)/g,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="Integer"
        key={key}
        data-text={raw}
        data-pattern="(\d+)"
      >
        {processed}
      </Match>
    ),
  },

  hashtag: {
    pattern: /(#[a-z\d][\w-]*)/i,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
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
    pattern: /(\p{Extended_Pictographic})/u,
    ignore: ["word"],
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
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
    pattern: /(INFO|TRACE|WARNING|WARN|DEBUG|FATAL|ERROR)/,
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
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
    pattern: /(\b[^\s]+\b)/,
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title="Word"
        key={key}
        data-text={raw}
        data-pattern="(\b[^\s]+\b)"
      >
        {processed}
      </Match>
    ),
  },
  exact_word: {
    pattern: /([a-zA-Z0-9\\_\-\.]+)/,
    matcherFn: (raw, processed, key) => (
      <Match
        id={key}
        title={"Exact Match (" + raw + ")"}
        key={key}
        data-text={raw}
        data-pattern={"(" + raw + ")"}
      >
        {processed}
      </Match>
    ),
  },
});
