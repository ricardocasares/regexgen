/**
 * State models
 */
export type Regex = [string, string];

export type LineRegexes = {
  text: string;
  patterns: Regex[];
};

export type FileRegexes = Record<string, LineRegexes>;

export type State = {
  input: string;
  regexes: FileRegexes;
};

/**
 * State actions
 */
export enum ActionTypes {
  INPUT = "@core/input",
  RESET = "@core/reset",
  ADD_LINE = "@core/add/line",
  REMOVE_LINE = "@core/remove/line",
  TOGGLE_LINE = "@core/toggle/line",
  ADD_REGEX = "@core/add/regex",
  REMOVE_REGEX = "@core/remove/regex",
  TOGGLE_REGEX = "@core/toggle/regex",
}

export type SetInput = {
  type: ActionTypes.INPUT;
  payload: string;
};

export type AddLine = {
  type: ActionTypes.ADD_LINE;
  payload: [number, LineRegexes];
};

export type RemoveLine = {
  type: ActionTypes.REMOVE_LINE;
  payload: number;
};

export type ToggleLine = {
  type: ActionTypes.TOGGLE_LINE;
  payload: [number, LineRegexes];
};

export type AddRegEx = {
  type: ActionTypes.ADD_REGEX;
  payload: [number, Regex];
};

export type RemoveRegEx = {
  type: ActionTypes.REMOVE_REGEX;
  payload: [number, Regex];
};

export type ToggleRegEx = {
  type: ActionTypes.TOGGLE_REGEX;
  payload: [number, Regex];
};

export type ResetState = { type: ActionTypes.RESET; payload: State };
// all possible state actions
export type Action =
  | SetInput
  | AddLine
  | RemoveLine
  | ResetState
  | ToggleLine
  | AddRegEx
  | RemoveRegEx
  | ToggleRegEx;
