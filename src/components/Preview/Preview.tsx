import clx from "clsx";
import css from "./preview.module.css";
import { Text } from "../Text";
import { Stack } from "../Stack";
import { useCore } from "../../core";

export function Preview() {
  const {
    regex,
    state: { input },
  } = useCore();

  try {
    const matches = input.match(new RegExp(regex));

    if (matches) {
      const [first, ...captures] = matches;
      const inner = captures.reduce(
        (a, b) => a.replace(b, `<span class="${css.matched}">${b}</span>`),
        first
      );
      const outer = input.replace(
        first,
        `<span class="${css.matched}">${inner}</span>`
      );

      return (
        <Stack f rs ps className={css.preview}>
          <div dangerouslySetInnerHTML={{ __html: outer }} />
        </Stack>
      );
    }

    return (
      <Stack f rs ps className={css.preview}>
        No matches
      </Stack>
    );
  } catch (err: any) {
    return (
      <Stack f rs gap="sm" ps className={clx([css.preview, css.error])}>
        <Text as="h3">That's not gonna fly!</Text>
        <Text>{(err && err?.message) || "Something went wrong"}</Text>
      </Stack>
    );
  }
}
