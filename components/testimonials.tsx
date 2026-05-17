"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

function pickEmphasis(text: string): { lead: string; rest: string } {
  const match = text.match(/^([^,.]{8,60}[,.])/);
  if (!match) return { lead: "", rest: text };
  return { lead: match[1], rest: text.slice(match[1].length).trimStart() };
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
  return (
    <div className="size-11 shrink-0 rounded-full bg-gradient-to-br from-blossom-300 to-adelaide-500 text-adelaide-50 font-display italic font-bold text-base flex items-center justify-center ring-2 ring-card">
      {letters}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="px-4 sm:px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* giant pull quote */}
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <p className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-foreground tracking-tight">
            &ldquo;She didn&apos;t just treat me — <br className="hidden sm:block" /> she <span className="text-blossom-600">walked beside us.</span>&rdquo;
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            Trusted by 200+ TTC families across the UK
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DATA.testimonials.map((t, i) => {
            const { lead, rest } = pickEmphasis(t.text);
            return (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0.6, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative flex flex-col rounded-2xl bg-card border border-adelaide-200 hover:border-adelaide-400 p-6 sm:p-7 transition-colors"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="size-4 fill-blossom-500 text-blossom-500"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-base text-foreground leading-relaxed flex-1">
                  {lead && <Em>{lead.replace(/[,.]$/, "")}</Em>}
                  {lead && rest && <span>{lead.endsWith(",") ? "," : "."} </span>}
                  {rest}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-adelaide-200/60">
                  <Initials name={t.name} />
                  <div className="min-w-0">
                    <div className="font-bold text-foreground text-sm truncate">
                      {t.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold truncate">
                      {t.role}
                    </div>
                    {"location" in t && t.location && (
                      <div className="text-[11px] text-muted-foreground/80 mt-0.5 truncate">
                        {t.location}
                      </div>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
