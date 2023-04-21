import clx from "clsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import css from "./debug.module.css";
import { Stack } from "../Stack";

export type Debug = {
  object: any;
  onChange: (x: object) => void;
};

export const Debug = ({ object, onChange }: Debug) => {
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleEdits = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      onChange(JSON.parse(value));
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setInput(value);
    }
  };

  useEffect(() => {
    setInput(JSON.stringify(object, null, 2));
  }, [JSON.stringify(object)]);

  useEffect(() => {
    ref.current?.addEventListener("paste", e => e.stopPropagation());
  }, [])

  return (
    <Stack f rs ps className={clx(css.debug, { [css.error]: error })}>
      <textarea
        ref={ref}
        onChange={handleEdits}
        value={input}
      ></textarea>
    </Stack>
  );
};
