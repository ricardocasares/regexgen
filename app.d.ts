declare module "react-string-replace-recursively" {
  import { ReactElement } from "react";

  export type TMatcherFn = (
    rawText: string,
    processed: ReactElement,
    key: string
  ) => ReactElement;

  export type TTextFn = (s: string) => string;

  type Config<T> = {
    [K in keyof T]: {
      ignore?: (keyof T)[];
      textFn?: TTextFn;
      pattern: RegExp;
      matcherFn: TMatcherFn;
    };
  };

  export function parser<T>(c: Config<T>): (input: string) => ReactElement;

  export default parser;
}
