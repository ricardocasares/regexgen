import { ReactElement } from "react";
import replacer from "react-string-replace-recursively";

export type Preview = {
  text: string;
  regex: string;
};

export function Preview({ text, regex }: Preview) {
  if (!regex.length) return null;

  const matches = text.match(new RegExp(regex, "s"));

  if (!matches) return null;

  const config = matches
    .map((s) => s.trim())
    .reduce(
      (acc, match, idx) => ({
        ...acc,
        [idx]: {
          ignore: Array(matches.length).fill(idx),
          pattern: new RegExp(`(${match})`, "s"),
          matcherFn: (raw: string, processed: ReactElement, key: string) => (
            <span key={key} className="matched">
              {processed}
            </span>
          ),
        },
      }),
      {}
    );

  const renderer = replacer(config);

  return <div className="preview">{renderer(text)}</div>;

  // const result = text.replace(
  //   new RegExp(`(${regex})`, ""),
  //   (match, ...rest) => {
  //     console.log("match", rest);
  //     return `<span style="background: red;">${match}</span>`;
  //   }
  // );

  // return (
  //   <div className="preview" dangerouslySetInnerHTML={{ __html: result }} />
  // );
}
