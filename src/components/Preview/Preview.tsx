import clx from "clsx";
import css from "./preview.module.css";
import { Stack } from "../Stack";

export type Preview = {
  text: string;
  regex: string;
};

export function Preview({ text, regex }: Preview) {
  try {
    const match = text.match(new RegExp(regex));
    const result = match?.reduce(
      (a, b) => a.replace(b, `<b class="${css.matched}">${b}</b>`),
      text
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
        <div
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </Stack>
    );
  } catch (err: any) {
    return (
      <Stack f rs ps className={clx([css.preview, css.error])}>
        <h3>That's not gonna fly!</h3>
        <p>{err && err?.message || "Something went wrong"}</p>
      </Stack>
    );
  }
}
