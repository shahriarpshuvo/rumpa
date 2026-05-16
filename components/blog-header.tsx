import Link from "next/link";
import { CalendarHeart } from "lucide-react";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-heading text-lg font-bold text-primary">
          Dr. Rumpa
        </Link>
        <Link
          href="/#booking"
          className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          <CalendarHeart className="size-3" />
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
