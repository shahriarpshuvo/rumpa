import { ShieldCheck } from "lucide-react";

export function ReviewedBy({ date }: { date?: string }) {
  const formatted = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  return (
    <div className="not-prose mt-10 flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
      <ShieldCheck className="size-4 text-primary" />
      <span>
        Medically reviewed by <strong className="text-foreground">Dr. Rezwana Rumpa</strong>
        {formatted && <> · {formatted}</>}
      </span>
    </div>
  );
}
