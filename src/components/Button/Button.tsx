import clx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import css from "./button.module.css";

export type Button = {
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  primary,
  secondary,
  success,
  ...props
}: Button) {
  return (
    <button
      {...props}
      className={clx(className, css.button, {
        [css.primary]: primary,
        [css.secondary]: secondary,
        [css.success]: success,
      })}
    >
      {props.children}
    </button>
  );
}
