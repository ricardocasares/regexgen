import { MouseEventHandler, useEffect, useState } from "react";
import { Preview } from "../Preview";
import { Workbench } from "../Workbench/Workbench";
import { ReExp } from "../ReExp";
import { help, example } from "../../lib/help";
import { Stack } from "../Stack";
import { useRegexGen } from "../../lib/hooks";
import { Debug } from "../Debug/Debug";
import { Toggle } from "../Toggle";
import css from "./app.module.css";

export default function App() {
  const core = useRegexGen();
  const [debuggerOn, setDebugger] = useState(false);
  const [lines, setLines] = useState<string[]>(example);
  const regex = core.generate();

  const handleSelections: (
    idx: number,
    line: string
  ) => MouseEventHandler<HTMLDivElement> = (idx, line) => (event) => {
    switch (event.detail) {
      // Single click
      case 1:
        // Toggle add/remove predetermined patterns
        // extract the color block dataset
        // @ts-expect-error
        // event is not coming from the color block
        if (!event.target?.dataset?.matcher) return;
        // @ts-expect-error
        const { text, pattern } = event?.target?.dataset;
        return core.toggleRegex(idx, [text, pattern]);
      // Double click
      case 2:
        return core.toggleLine(idx, line);
      default:
        return;
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      core.reset();
      setLines(event.clipboardData?.getData("text").split("\n") ?? []);
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <Stack ps sm>
      <Stack h sm className={css.sticky}>
        <ReExp regex={regex} />
        <Stack>
          <Toggle on={debuggerOn} onClick={() => setDebugger(!debuggerOn)} />
        </Stack>
      </Stack>
      <Stack h sm s>
        <Workbench
          lines={lines}
          onClick={handleSelections}
          isSelected={(id) => core.hasLine(id)}
        />
        <Preview text={lines.join("\n")} regex={regex} />
        {debuggerOn && (
          <Debug onChange={(x) => core.reset(x)} object={core.lines} />
        )}
      </Stack>
    </Stack>
  );
}
