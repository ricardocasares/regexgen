import { State, Action, ActionTypes as A } from "./models";

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case A.RESET: {
      return payload;
    }
    case A.INPUT: {
      return { ...state, input: payload };
    }
    case A.ADD_LINE: {
      return {
        ...state,
        regexes: { ...state.regexes, [payload[0]]: payload[1] },
      };
    }
    case A.REMOVE_LINE: {
      const {
        regexes: { [payload]: _, ...regexes },
      } = state;
      return { ...state, regexes };
    }
    case A.ADD_REGEX: {
      const [n, [txt, regex]] = payload;
      const {
        regexes: {
          [n]: { text, patterns: old },
        },
      } = state;

      const patterns = [...old.filter(([t]) => t !== txt), [txt, regex]];

      return {
        ...state,
        regexes: { ...state.regexes, [n]: { text, patterns } },
      };
    }
    case A.TOGGLE_LINE: {
      const [n, line] = payload;
      const {
        regexes: { [n]: exists, ...rest },
      } = state;
      const regexes = exists ? rest : { ...rest, [n]: line };
      return { ...state, regexes };
    }
    case A.REMOVE_REGEX: {
      const [n, [txt]] = payload;
      const {
        regexes: {
          [n]: { text, patterns: old },
        },
      } = state;
      const patterns = old.filter(([t]) => t === txt);
      return {
        ...state,
        regexes: { ...state.regexes, [n]: { text, patterns } },
      };
    }
    case A.TOGGLE_REGEX: {
      const [n, [txt, regex]] = payload;
      const {
        regexes: {
          [n]: { text, patterns: old },
        },
      } = state;
      const exists = old.find(([t]) => t === txt);
      const patterns = exists
        ? old.filter(([t]) => t !== txt)
        : [...old, [txt, regex]];

      return {
        ...state,
        regexes: { ...state.regexes, [n]: { text, patterns } },
      };
    }
  }
}
