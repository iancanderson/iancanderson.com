import { useEffect, useId, useState } from "react";

type Props = {
  title: string;
  defaultExpanded?: boolean;
  forcedExpanded?: boolean;
  children: React.ReactNode;
};

export default function Collapsible({ title, defaultExpanded = false, forcedExpanded, children }: Props) {
  const [expanded, setExpanded] = useState<boolean>(!!defaultExpanded);
  const panelId = useId();
  const isExpanded = forcedExpanded ?? expanded;

  useEffect(() => {
    if (forcedExpanded !== undefined) {
      // Sync to forced state when provided
      setExpanded(!!forcedExpanded);
    }
  }, [forcedExpanded]);

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] text-[color:var(--brutal-fg)]">
      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="text-lg font-extrabold">{title}</h2>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setExpanded((v) => !v)}
          className="brutal-border px-2 py-1 text-sm hover:underline"
        >
          <span className="mr-2" aria-hidden>{isExpanded ? "▼" : "▶"}</span>
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>
      <div id={panelId} className={isExpanded ? "block" : "hidden"}>
        <div className="px-3 pb-3">
          {children}
        </div>
      </div>
    </div>
  );
}
