export type Debug = {
  object: any;
  onChange: (x: object) => void
};

export const Debug = ({ object, onChange }: Debug) => (
  <textarea onChange={({ target: { value }}) => onChange(JSON.parse(value))} className="debugger" value={JSON.stringify(object, null, 2)}></textarea>
);
