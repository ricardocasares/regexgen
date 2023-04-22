import clx from "clsx";
import { HTMLAttributes } from "react";
import css from "./toggle.module.css";

export type Toggle = {
  on: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export function Toggle({ on, ...props }: Toggle) {
  return (
    <button {...props} className={clx(css.toggle, { [css.on]: on })}>
      Debugger
    </button>
  );
}
