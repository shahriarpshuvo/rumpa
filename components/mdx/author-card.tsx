import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { CalTrigger } from "@/components/cal-trigger";

const CREDENTIALS = ["MRCOG", "MRCPI", "MBBS"];

export function AuthorCard() {
  return (
    <aside
      className="not-prose my-8 overflow-hidden rounded-lg border border-adelaide-200 bg-gradient-to-br from-adelaide-500/10 via-card to-blossom-200/15"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full aspect-[5/3] sm:aspect-auto sm:w-44 sm:flex-shrink-0 bg-muted">
          <Image
            src="/rumpa-square.png"
            alt={DATA.name}
            fill
            className="object-cover sm:object-[center_30%]"
            sizes="(max-width: 640px) 100vw, 128px"
            itemProp="image"
          />
        </div>
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-blossom-600 mb-2">
            <ShieldCheck className="size-3" />
            Written & medically reviewed
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-extrabold text-foreground text-xl leading-tight" itemProp="name">
              {DATA.name}
            </h3>
          </div>
          <div className="mt-1 text-sm text-muted-foreground" itemProp="jobTitle">
            {DATA.title}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {CREDENTIALS.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-md bg-adelaide-100 text-adelaide-900 px-2 py-0.5 text-[10px] font-bold tracking-wider"
              >
                {c}
              </span>
            ))}
            <span className="inline-flex items-center rounded-md bg-blossom-100 text-blossom-900 px-2 py-0.5 text-[10px] font-bold tracking-wider">
              12+ YEARS
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs  font-semibold">
            <CalTrigger className="rounded-[6px] text-adelaide-100 bg-adelaide-500 hover:bg-adelaide-600 px-4 py-3">
              Book consultation
            </CalTrigger>
            <Link
              href="/#credentials"
              className="inline-flex items-center gap-1 text-blossom-600 hover:text-blossom-700 hover:underline underline-offset-2"
            >
              View credentials
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
