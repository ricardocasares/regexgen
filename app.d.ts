declare module "*.css" {
  export default any;
}
declare module "react-string-replace-recursively" {
  import { ReactNode } from "react";

  export type TMatcherFn = (
    rawText: string,
    processed: ReactNode,
    key: string
  ) => ReactNode;

  export type TTextFn = (s: string) => string;

  export type Config<T> = {
    [K in keyof T]: {
      ignore?: (keyof T)[];
      textFn?: TTextFn;
      pattern: RegExp;
      matcherFn: TMatcherFn;
    };
  };

  export function parser<T>(c: Config<T>): (input: string) => ReactNode;

  export default parser;
}
