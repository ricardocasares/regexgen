import clx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import css from "./button.module.css";

export type Button = {
  disabled?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: Button) {
  return (
    <button {...props} className={clx(css.button, className)}>
      {props.children}
    </button>
  );
}
