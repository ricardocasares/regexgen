import clx from "clsx";
import css from "./stack.module.css";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Gap = "sm" | "md" | "lg";

export type Stack<T extends ElementType> = {
  as?: T;
  gap?: Gap;
  f?: boolean;
  p?: boolean;
  v?: boolean;
  h?: boolean;
  ps?: boolean;
  pm?: boolean;
  pl?: boolean;
  rs?: boolean;
  vh?: boolean;
  end?: boolean;
  start?: boolean;
  center?: boolean;
  stretch?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Stack<T extends ElementType = "div">({
  as,
  className,
  ...props
}: Stack<T> & Omit<ComponentPropsWithoutRef<T>, keyof Stack<T>>) {
  const Component = as || "div";
  return (
    <Component
      {...props}
      className={clx([css.stack, className], {
        [css.f]: props.f,
        [css.v]: props.v,
        [css.h]: props.h,
        [css[props.gap]]: props.gap,
        [css.ps]: props.ps,
        [css.pm]: props.pm,
        [css.pl]: props.pl,
        [css.rs]: props.rs,
        [css.vh]: props.vh,
        [css.end]: props.end,
        [css.start]: props.start,
        [css.center]: props.center,
        [css.stretch]: props.stretch,
      })}
    />
  );
}
