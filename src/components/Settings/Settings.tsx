import { Stack } from "../Stack";
import { Button } from "../Button";
import css from "./settings.module.css";

export function Settings() {
  return (
    <Stack rs ps sm className={css.settings}>
      <Stack h center>
        <Stack f>
          <h3>Settings (work-in-progress)</h3>
        </Stack>
        <Stack h sm>
          <Button>Global</Button>
          <Button>Multi line</Button>
          <Button>Single line</Button>
          <Button>Insensitive</Button>
          <Button>Unicode</Button>
          <Button>Ungreedy</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
