import clx from "clsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import css from "./debug.module.css";
import { Stack } from "../Stack";
import { useCore, reset } from "../../core";

export const Debug = () => {
  const { state, dispatch } = useCore();
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const stringifiedRegexes = JSON.stringify(state.regexes, null, 2);

  const handleEdits = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const regexes = JSON.parse(value);
      dispatch(reset({ ...state, regexes }));
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setText(value);
    }
  };

  useEffect(() => setText(stringifiedRegexes), [stringifiedRegexes]);

  useEffect(() => {
    ref.current?.addEventListener("paste", (e) => e.stopPropagation());
  }, []);

  return (
    <Stack f rs ps className={clx(css.debug, { [css.error]: error })}>
      <textarea ref={ref} onChange={handleEdits} value={text}></textarea>
    </Stack>
  );
};
