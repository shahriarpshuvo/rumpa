import Link from "next/link";
import { CalendarHeart } from "lucide-react";

export function ConsultCTA() {
  return (
    <div className="not-prose my-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.15em] font-bold text-primary mb-2">
            Talk to Dr. Rumpa
          </div>
          <h4 className="text-xl font-bold text-foreground leading-snug">
            Ready for a personalised fertility plan?
          </h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Book a one-to-one consultation. We'll review your history and map
            the next concrete step.
          </p>
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <CalendarHeart className="size-4" />
          Book consultation
        </Link>
      </div>
    </div>
  );
}
