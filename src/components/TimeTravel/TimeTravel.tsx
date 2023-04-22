import { Stack } from "../Stack";
import { Button } from "../Button";
import { useTimeTravel } from "./hook";
import css from "./timetravel.module.css";

export function TimeTravel() {
  const { undo, redo, canUndo, canRedo } = useTimeTravel();

  return (
    <Stack stretch h className={css.timetravel}>
      <Button className={css.undo} disabled={canUndo} onClick={undo}>
        Undo
      </Button>
      <Button className={css.redo} disabled={canRedo} onClick={redo}>
        Redo
      </Button>
    </Stack>
  );
}
