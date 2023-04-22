import { useEffect, useState } from "react";
import { useCore, State, reset } from "../../core";

type History<T> = {
  prev: T[];
  current: T;
  next: T[];
};

export function useTimeTravel() {
  const { state, dispatch } = useCore();
  const [states, setStates] = useState<History<State>>({
    prev: [],
    next: [],
    current: state,
  });
  const canUndo = states.prev.length < 1;
  const canRedo = states.next.length < 1;
  const present = JSON.stringify(state);
  const current = JSON.stringify(states.current);

  useEffect(() => {
    if (present === current) return;
    setStates((h) => ({ ...h, prev: [...h.prev, h.current], current: state }));
  }, [present]);

  function undo() {
    const last = states.prev.pop() ?? states.current;
    setStates({
      current: last,
      prev: [...states.prev],
      next: [...states.next, states.current],
    });

    dispatch(reset(last));
  }

  function redo() {
    const next = states.next.pop() ?? states.current;
    setStates({
      current: next,
      prev: [...states.prev, states.current],
      next: [...states.next],
    });

    dispatch(reset(next));
  }

  return { states, undo, redo, canUndo, canRedo };
}
