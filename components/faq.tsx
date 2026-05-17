"use client";

import { ChevronDown } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function FAQ() {
  return (
    <section id="faq" className="px-4 sm:px-6 py-24 sm:py-32 bg-adelaide-100/40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground">
            Questions <Em>worth asking.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            The things patients usually want to know before booking.
          </p>
        </div>

        <div className="columns-1 md:columns-2 gap-3 [&>*]:break-inside-avoid [&>*]:mb-3">
          {DATA.faqs.map((f, i) => (
            <details
              key={i}
              open
              className="group rounded-lg bg-card border border-adelaide-200 hover:border-adelaide-400 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-start gap-4 p-5 sm:p-6">
                <span className="font-display italic font-bold text-blossom-600 text-sm shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base sm:text-lg font-bold text-foreground leading-snug">
                  {f.question}
                </span>
                <ChevronDown className="size-5 text-muted-foreground shrink-0 mt-0.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.25rem] sm:pl-[3.75rem] text-sm sm:text-base text-muted-foreground leading-relaxed">
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
