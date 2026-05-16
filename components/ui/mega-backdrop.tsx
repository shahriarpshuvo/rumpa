import { cn } from "@/lib/utils";

export function MegaBackdrop({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center select-none",
        className,
      )}
    >
      <span className="font-display italic font-bold leading-none tracking-tighter text-adelaide-50/55 text-[140px] sm:text-[180px] lg:text-[220px]">
        {children}
      </span>
    </div>
  );
}
