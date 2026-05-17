import Image from "next/image";
import { DATA } from "@/data/resume";

export function AuthorCard() {
  return (
    <div className="not-prose my-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="relative size-14 flex-shrink-0 rounded-full overflow-hidden bg-muted">
        <Image
          src="/img/assuring.png"
          alt={DATA.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="text-sm">
        <div className="font-semibold text-foreground">
          Written by {DATA.name}
        </div>
        <div className="text-muted-foreground">Fertility Specialist</div>
      </div>
    </div>
  );
}
