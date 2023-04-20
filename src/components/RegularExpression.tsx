import { useState } from "react";
import { wait } from "../lib/util";

export type TRegularExpression = {
  regex: string;
};
export const RegularExpression = ({ regex }: TRegularExpression) => {
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
    <div className="regex" onClick={onClick}>
      {displayText}
    </div>
  );
};
