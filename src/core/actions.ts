import * as M from "./models";
import { ActionTypes as T } from "./models";

export const reset: (p: M.State) => M.ResetState = (payload) => ({
  type: T.RESET,
  payload,
});

export const setInput: (p: string) => M.SetInput = (payload) => ({
  type: T.INPUT,
  payload,
});

export const addLine: (p: [number, M.LineRegexes]) => M.AddLine = (
  payload
) => ({
  type: T.ADD_LINE,
  payload,
});

export const removeLine: (p: number) => M.RemoveLine = (payload) => ({
  type: T.REMOVE_LINE,
  payload,
});

export const toggleLine: (p: [number, M.LineRegexes]) => M.ToggleLine = (
  payload
) => ({
  type: T.TOGGLE_LINE,
  payload,
});

export const addRegex: (p: [number, M.Regex]) => M.AddRegEx = (payload) => ({
  type: T.ADD_REGEX,
  payload,
});

export const removeRegex: (p: [number, M.Regex]) => M.RemoveRegEx = (
  payload
) => ({ type: T.REMOVE_REGEX, payload });

export const toggleRegex: (p: [number, M.Regex]) => M.ToggleRegEx = (
  payload
) => ({ type: T.TOGGLE_REGEX, payload });
