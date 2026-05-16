import { cn } from "@/lib/utils";
import Link from "next/link";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  cta,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center" : "items-start",
        cta && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", alignClass)}>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-500">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground max-w-2xl">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
