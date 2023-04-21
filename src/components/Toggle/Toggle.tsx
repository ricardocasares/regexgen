import clx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import css from "./toggle.module.css";
import { Bug } from "../Icons/Bug";

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
