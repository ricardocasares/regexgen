import clx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import css from "./toggle.module.css";
import { Button } from "../Button";

export type Toggle = {
  on: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement> &
  Button;

export function Toggle({ on, children, ...props }: Toggle) {
  return (
    <Button {...props} className={clx({ [css.on]: on })}>
      {children}
    </Button>
  );
}
