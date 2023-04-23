import { useState } from "react";
import css from "./app.module.css";
import { Preview } from "../Preview";
import { Workbench } from "../Workbench/Workbench";
import { ReExp } from "../ReExp";
import { Stack } from "../Stack";
import { Debug } from "../Debug/Debug";
import { Toggle } from "../Toggle";
import { CoreProvider } from "../../core";
import { TimeTravel } from "../TimeTravel";
import { Settings } from "../Settings";

export default function App() {
  const [previewOn, showPreview] = useState(true);
  const [debuggerOn, showDebugger] = useState(false);
  const [settingsOn, showSettings] = useState(false);

  return (
    <CoreProvider>
      <Stack vh ps sm>
        <Stack h sm className={css.sticky}>
          <ReExp />
          <Stack h sm start>
            <TimeTravel />
            <Toggle
              on={previewOn}
              secondary
              onClick={() => showPreview(!previewOn)}
            >
              Preview
            </Toggle>
            <Toggle
              on={debuggerOn}
              success
              onClick={() => showDebugger(!debuggerOn)}
            >
              Editor
            </Toggle>
            <Toggle on={settingsOn} onClick={() => showSettings(!settingsOn)}>
              Settings
            </Toggle>
          </Stack>
        </Stack>
        {settingsOn && <Settings />}
        <Stack f h sm>
          <Workbench />
          {previewOn && <Preview />}
          {debuggerOn && <Debug />}
        </Stack>
      </Stack>
    </CoreProvider>
  );
}
