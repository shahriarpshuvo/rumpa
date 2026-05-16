import { cn } from "@/lib/utils";

export function Em({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <em
      className={cn(
        "font-display italic font-medium text-adelaide-600 dark:text-adelaide-300",
        className,
      )}
    >
      {children}
    </em>
  );
}
