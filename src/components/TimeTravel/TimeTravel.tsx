import { Stack } from "../Stack";
import { useTimeTravel } from "./hook";
import css from "./timetravel.module.css";

export function TimeTravel() {
  const { undo, redo, canUndo, canRedo } = useTimeTravel();

  return (
    <Stack stretch h className={css.timetravel}>
      <button className={css.undo} disabled={canUndo} onClick={undo}>
        Undo
      </button>
      <button className={css.redo} disabled={canRedo} onClick={redo}>
        Redo
      </button>
    </Stack>
  );
}
