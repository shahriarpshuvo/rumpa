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
    <section id="faq" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Questions <Em>worth asking.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            The things patients usually want to know before booking.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {DATA.faqs.map((f, i) => (
            <Accordion key={i}>
              <AccordionItem
                value={`item-${i}`}
                className="rounded-2xl bg-secondary border-0 px-6 data-[panel-open]:bg-card data-[panel-open]:shadow-mauve transition-all"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold py-5 hover:no-underline">
                  {f.question}
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
