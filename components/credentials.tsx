"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function Credentials() {
  return (
    <section id="credentials" className="px-4 sm:px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl rounded-[28px] bg-secondary px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 grain">
        <div className="max-w-3xl">
          <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600">
            § 06 — Credentials
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground">
            Trained at the <Em>best.</Em>
            <br />
            Practicing where it <Em>matters.</Em>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12">
          <div>
            <h3 className="font-display italic text-2xl font-semibold text-adelaide-700 mb-6">
              Education &amp; Fellowship
            </h3>
            <ol className="space-y-6 border-l-2 border-blossom-400 pl-7">
              {DATA.qualifications.map((q, i) => (
                <motion.li
                  key={q.degree}
                  initial={{ opacity: 0.6, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative"
                >
                  <span className="absolute -left-[35px] top-1.5 size-4 rounded-full bg-blossom-400 ring-4 ring-secondary" />
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display italic font-bold text-2xl text-blossom-600">
                      {q.year}
                    </span>
                    <span className="font-bold text-foreground text-lg">{q.degree}</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground/80">
                    {q.institution}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {q.description}
                  </div>
                </motion.li>
              ))}
            </ol>

            <h3 className="font-display italic text-2xl font-semibold text-adelaide-700 mt-12 mb-6">
              Speaking &amp; Research
            </h3>
            <ul className="space-y-4">
              {DATA.academics.map((a, i) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0.6, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl bg-card p-5 ring-1 ring-adelaide-200"
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h4 className="font-bold text-foreground">{a.title}</h4>
                    <span className="font-display italic font-semibold text-blossom-600">
                      {a.year}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-blossom-700 font-semibold">
                    {a.role}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* photo collage — polaroid style */}
          <div className="flex flex-col gap-5">
            <figure className="bg-card p-3 pb-5 shadow-mauve-lg ring-1 ring-adelaide-200" style={{ transform: 'rotate(1.5deg)' }}>
              <div className="relative aspect-[4/5] overflow-hidden grain">
                <Image
                  src="/img/watching.png"
                  alt="Dr. Rumpa reviewing diagnostic imaging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <figcaption className="px-3 pt-3 font-display italic text-sm text-foreground">
                Diagnostic review · National Fertility Center
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <figure className="bg-card p-2.5 pb-4 shadow-mauve ring-1 ring-adelaide-200" style={{ transform: 'rotate(-2deg)' }}>
                <div className="relative aspect-square overflow-hidden grain">
                  <Image
                    src="/img/operation.png"
                    alt="Dr. Rumpa in surgical scrubs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <figcaption className="px-2 pt-2 font-display italic text-xs text-foreground">
                  Surgical practice
                </figcaption>
              </figure>
              <figure className="bg-card p-2.5 pb-4 shadow-mauve ring-1 ring-adelaide-200" style={{ transform: 'rotate(1.5deg)' }}>
                <div className="relative aspect-square overflow-hidden grain">
                  <Image
                    src="/img/prescribing.png"
                    alt="Dr. Rumpa during a patient consultation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <figcaption className="px-2 pt-2 font-display italic text-xs text-foreground">
                  Consultation
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
