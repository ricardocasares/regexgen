import clx from "clsx";
import { useMemo } from "react";
import css from "./preview.module.css";
import { Stack } from "../Stack";
import { useCore } from "../../core";

export function Preview() {
  const {
    regex,
    state: { input },
  } = useCore();

  try {
    const match = input.match(new RegExp(regex));
    const result = useMemo(
      () =>
        match?.reduce(
          (a, b) => a.replace(b, `<span class="${css.matched}">${b}</span>`),
          input
        ),
      [match, input]
    );

    if (!result) {
      return (
        <Stack f rs ps className={css.preview}>
          No matches
        </Stack>
      );
    }

    return (
      <Stack f rs ps className={css.preview}>
        <div dangerouslySetInnerHTML={{ __html: result }} />
      </Stack>
    );
  } catch (err: any) {
    return (
      <Stack f rs ps className={clx([css.preview, css.error])}>
        <h3>That's not gonna fly!</h3>
        <p>{(err && err?.message) || "Something went wrong"}</p>
      </Stack>
    );
  }
}
