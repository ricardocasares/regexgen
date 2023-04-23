import {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { Action, State } from "./models";
import { reducer, makeRegex } from "./reducer";
import { splitByLine } from "../lib/util";
import { example } from "../lib/help";
import { reset } from "./actions";

const initial: State = {
  input: example,
  regexes: {},
};

export type CoreContext = {
  state: State;
  regex: string;
  lines: string[];
  dispatch: Dispatch<Action>;
};

const CoreContext = createContext<CoreContext>({
  state: initial,
  regex: "",
  lines: splitByLine(initial.input),
  dispatch: () => null,
});

export type CoreProvider = {
  children?: ReactNode;
};

export const CoreProvider = ({ children }: CoreProvider) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const lines = useMemo(() => splitByLine(state.input), [state.input]);
  const regex = useMemo(() => makeRegex(state.regexes), [state.regexes]);

  const value = useMemo(
    () => ({
      state,
      lines,
      regex,
      dispatch,
    }),
    [state, lines, regex]
  );

  useEffect(() => {
    const handler = (ev: ClipboardEvent) => {
      const text = ev.clipboardData?.getData("text") ?? "";
      dispatch(reset({ input: text, regexes: {} }));
    };

    document.addEventListener("paste", handler);
    return () => document.removeEventListener("paste", handler);
  }, []);

  return <CoreContext.Provider value={value}>{children}</CoreContext.Provider>;
};

export function useCore() {
  return useContext(CoreContext);
}
