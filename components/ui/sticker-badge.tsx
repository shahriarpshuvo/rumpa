import { cn } from "@/lib/utils";

interface StickerBadgeProps {
  children: React.ReactNode;
  rotate?: number;
  variant?: "light" | "dark";
  className?: string;
}

export function StickerBadge({
  children,
  rotate = 5,
  variant = "light",
  className,
}: StickerBadgeProps) {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold shadow-mauve",
        variant === "light"
          ? "bg-secondary text-primary"
          : "bg-primary text-primary-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
