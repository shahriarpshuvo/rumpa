"use client";

import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATA.faqs.map((f, i) => (
            <Accordion key={i}>
              <AccordionItem
                value={`item-${i}`}
                className="rounded-2xl bg-card border-0 px-6 ring-1 ring-adelaide-200 data-[panel-open]:bg-card data-[panel-open]:shadow-mauve-lg data-[panel-open]:ring-blossom-400 transition-all"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-bold py-5 hover:no-underline">
                  <span className="flex items-baseline gap-3">
                    <span className="font-display italic font-bold text-blossom-600 text-sm shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{f.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
