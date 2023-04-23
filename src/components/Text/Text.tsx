import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import css from "./text.module.css";

export type Text<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
};

export function Text<T extends ElementType = "p">({
  as,
  ...props
}: Text<T> & Omit<ComponentPropsWithoutRef<T>, keyof Text<T>>) {
  const Component = as || "p";
  return <Component {...props} className={css.text} />;
}
