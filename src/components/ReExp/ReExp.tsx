import { useState } from "react";
import { Stack } from "../Stack";
import css from "./reexp.module.css";
import { wait } from "../../lib/util";

export type TReExp = {
  regex: string;
};
export const ReExp = ({ regex }: TReExp) => {
  const [copied, setCopied] = useState(false);
  const help = "Your regex will appear here, then click to copy";
  const ready = Boolean(regex.length);
  const displayText = copied ? "Copied!" : ready ? regex : help;

  const onClick = () =>
    Promise.resolve(setCopied(true))
      .then(() => navigator.clipboard.writeText(regex).catch(console.log))
      .then(() => wait(500))
      .then(() => setCopied(false));

  return (
    <Stack f rs ps className={css.regex}>
      <div onClick={onClick}>
        {displayText}
      </div>
    </Stack>
  );
};
