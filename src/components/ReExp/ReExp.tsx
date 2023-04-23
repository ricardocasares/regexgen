import { useState } from "react";
import css from "./reexp.module.css";
import { wait, randomCompliment } from "../../lib/util";
import { useCore } from "../../core";
import { Button } from "../Button";

export const ReExp = () => {
  const { regex } = useCore();
  const [copied, setCopied] = useState(false);
  const help = "Your regex will appear here, then click to copy";
  const ready = Boolean(regex.length);
  const displayText = copied ? randomCompliment() : ready ? regex : help;

  const onClick = () =>
    Promise.resolve(setCopied(true))
      .then(() => navigator.clipboard.writeText(regex).catch(console.log))
      .then(() => wait(2000))
      .then(() => setCopied(false));

  return (
    <Button
      disabled={!Boolean(regex.length) || copied}
      className={css.regex}
      secondary
      onClick={onClick}
    >
      {displayText}
    </Button>
  );
};
