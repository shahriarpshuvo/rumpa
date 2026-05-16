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
    <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-adelaide-300 to-adelaide-500 text-adelaide-50 font-bold text-sm flex items-center justify-center">
      {letters}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            Real stories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Trusted by <Em>500+ families.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            A few voices from couples I&apos;ve had the privilege to support.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {DATA.testimonials.map((t, i) => {
            const { lead, rest } = pickEmphasis(t.text);
            return (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-3xl bg-card p-7 shadow-mauve"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="size-4 fill-adelaide-500 text-adelaide-500"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-base text-foreground leading-relaxed">
                  {lead && <Em>{`"${lead.replace(/[,.]$/, "")}"`}</Em>}
                  {lead && " "}
                  {rest}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Initials name={t.name} />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
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
