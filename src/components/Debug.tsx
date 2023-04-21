export type Debug = {
  object: any;
};

export const Debug = ({ object }: Debug) => (
  <div className="preview">{JSON.stringify(object, null, 2)}</div>
);
