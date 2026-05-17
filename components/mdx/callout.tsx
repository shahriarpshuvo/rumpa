import type { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, MapPin } from "lucide-react";

type CalloutType = "note" | "tip" | "warning" | "uk" | "us";

const STYLES: Record<
  CalloutType,
  { wrap: string; icon: ReactNode; label: string }
> = {
  note: {
    wrap: "border-blue-300/40 bg-blue-50/60 dark:bg-blue-950/30 dark:border-blue-800/40",
    icon: <Info className="size-4 text-blue-600 dark:text-blue-400" />,
    label: "Note",
  },
  tip: {
    wrap: "border-amber-300/40 bg-amber-50/60 dark:bg-amber-950/30 dark:border-amber-800/40",
    icon: <Lightbulb className="size-4 text-amber-600 dark:text-amber-400" />,
    label: "Tip",
  },
  warning: {
    wrap: "border-red-300/40 bg-red-50/60 dark:bg-red-950/30 dark:border-red-800/40",
    icon: <AlertTriangle className="size-4 text-red-600 dark:text-red-400" />,
    label: "Warning",
  },
  uk: {
    wrap: "border-primary/30 bg-primary/5",
    icon: <MapPin className="size-4 text-primary" />,
    label: "UK",
  },
  us: {
    wrap: "border-primary/30 bg-primary/5",
    icon: <MapPin className="size-4 text-primary" />,
    label: "US",
  },
};

export function Callout({
  type = "note",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const style = STYLES[type] ?? STYLES.note;
  return (
    <div
      className={`not-prose my-6 rounded-xl border p-4 ${style.wrap}`}
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
        {style.icon}
        {style.label}
      </div>
      <div className="text-sm leading-relaxed text-foreground/90 [&_a]:underline [&_a]:text-primary">
        {children}
      </div>
    </div>
  );
}
