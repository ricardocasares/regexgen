import { MouseEventHandler, useEffect, useState } from "react";
import { Preview } from "./Preview";
import { Workbench } from "./Workbench";
import { RegularExpression } from "./RegularExpression";
import { help, example } from "../lib/help";
import { Layout } from "./Layout";
import { useRegexGen } from "../lib/hooks";
import { Debug } from "./Debug";

export default function App() {
  const core = useRegexGen();
  const [lines, setLines] = useState<string[]>(example);
  const regex = core.generate();
  const debug = new URL(window.location.href).searchParams.has("debug");

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
    <Layout>
      <Workbench
        lines={lines}
        onClick={handleSelections}
        isSelected={(id) => core.hasLine(id)}
      />
      <Preview text={lines.join("\n")} regex={regex} />
      {debug && <Debug object={core.lines} />}
      <RegularExpression regex={regex} />
    </Layout>
  );
}
