import css from "./workbench.module.css";
import { Stack } from "../Stack";
import { Line } from "../Line";
import { useCore } from "../../core";

export function Workbench() {
  const { lines } = useCore();

  return (
    <Stack f rs ps className={css.workbench}>
      {lines.map((text, idx) => (
        <Line key={idx} text={text} number={idx} />
      ))}
    </Stack>
  );
}
