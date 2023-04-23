import clx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { Stack } from "../Stack";
import css from "./button.module.css";

export type Button = {
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  children: ReactNode;
} & Stack<"button"> &
  HTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  primary,
  secondary,
  success,
  danger,
  ...props
}: Button) {
  return (
    <Stack
      as="button"
      {...props}
      className={clx(className, css.button, {
        [css.primary]: primary,
        [css.secondary]: secondary,
        [css.success]: success,
        [css.danger]: danger,
      })}
    >
      {props.children}
    </Stack>
  );
}
