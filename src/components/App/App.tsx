import { useState } from "react";
import css from "./app.module.css";
import { Preview } from "../Preview";
import { Workbench } from "../Workbench/Workbench";
import { ReExp } from "../ReExp";
import { Stack } from "../Stack";
import { Debug } from "../Debug/Debug";
import { Toggle } from "../Toggle";
import { CoreProvider } from "../../core";

export default function App() {
  const [debuggerOn, setDebugger] = useState(false);

  return (
    <CoreProvider>
      <Stack vh ps sm>
        <Stack h sm start className={css.sticky}>
          <ReExp />
          <Stack>
            <Toggle on={debuggerOn} onClick={() => setDebugger(!debuggerOn)} />
          </Stack>
        </Stack>
        <Stack f h sm stretch>
          <Workbench />
          <Preview />
          {debuggerOn && <Debug />}
        </Stack>
      </Stack>
    </CoreProvider>
  );
}
