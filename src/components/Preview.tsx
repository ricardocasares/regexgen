export type Preview = {
  text: string;
  regex: string;
};

export function Preview({ text, regex }: Preview) {
  const match = text.match(new RegExp(regex));
  const result = match?.reduce(
    (a, b) => a.replace(b, `<b class="matched">${b}</b>`),
    text
  );

  if (!result) return <div className="preview">No matches</div>;

  return (
    <div className="preview" dangerouslySetInnerHTML={{ __html: result }}></div>
  );
}
