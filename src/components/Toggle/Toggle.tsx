import clx from "clsx";
import { HTMLAttributes } from "react";
import css from "./toggle.module.css";
import { Button } from "../Button";

export type Toggle = {
  on: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export function Toggle({ on, ...props }: Toggle) {
  return (
    <Button {...props} success className={clx({ [css.on]: on })}>
      Editor
    </Button>
  );
}
