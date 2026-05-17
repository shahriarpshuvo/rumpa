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

        {/* TOP — rounded landscape photo */}
        <motion.figure
          initial={{ opacity: 0.6, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mt-12 mx-auto max-w-5xl overflow-hidden rounded-3xl ring-1 ring-adelaide-200 shadow-mauve-lg"
        >
          <div className="relative aspect-[16/9] grain">
            <Image
              src="/img/operation.png"
              alt="Dr. Rumpa in surgical scrubs at the operating theater"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-adelaide-950/70 via-adelaide-950/0 to-transparent" />
            <figcaption className="absolute left-5 right-5 bottom-5 flex items-baseline justify-between gap-3 flex-wrap text-adelaide-50">
              <span className="font-display italic text-xl sm:text-2xl">
                Surgical practice
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-blossom-200">
                Obs &amp; Gynae · Operating theater
              </span>
            </figcaption>
          </div>
        </motion.figure>

        {/* HIGHLIGHT — 3 hero education cards */}
        <div className="mt-14">
          <h3 className="font-display italic text-2xl font-semibold text-adelaide-700 mb-7">
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DATA.education.map((e, i) => (
              <motion.article
                key={e.degree}
                initial={{ opacity: 0.6, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative rounded-3xl bg-card ring-1 ring-adelaide-200 p-7 shadow-mauve hover:shadow-mauve-lg hover:ring-blossom-400 transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blossom-200 text-adelaide-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    ★ Fellowship
                  </span>
                  <span className="font-display italic font-bold text-3xl text-adelaide-200 leading-none">
                    .0{i + 1}
                  </span>
                </div>
                <h4 className="mt-5 font-extrabold text-foreground text-3xl sm:text-4xl tracking-tight leading-none">
                  {e.degree}
                </h4>
                <div className="mt-2 text-sm font-semibold text-blossom-700 uppercase tracking-[0.15em]">
                  {e.stage}
                </div>
                <p className="mt-4 text-sm text-foreground/80 font-semibold leading-snug">
                  {e.institution}
                </p>
                <p className="mt-1 text-xs text-muted-foreground uppercase tracking-[0.15em] font-semibold">
                  {e.location}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* BOTTOM — Professional Experience + Honorary Training */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display italic text-2xl font-semibold text-adelaide-700 mb-5">
              Professional Experience
            </h3>
            <ul className="space-y-4">
              {DATA.professionalExperience.map((p, i) => (
                <motion.li
                  key={p.position}
                  initial={{ opacity: 0.6, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-3xl bg-card p-6 ring-1 ring-adelaide-200 shadow-mauve"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h4 className="font-bold text-foreground leading-snug text-lg">
                      {p.position}
                    </h4>
                    <span className="font-display italic font-semibold text-blossom-600 whitespace-nowrap">
                      {p.duration}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-foreground/80 font-semibold">
                    {p.hospital}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display italic text-2xl font-semibold text-adelaide-700 mb-5">
              Honorary Training{" "}
              <span className="text-base text-muted-foreground font-sans not-italic font-normal">
                (Obs &amp; Gynae)
              </span>
            </h3>
            <ul className="space-y-4">
              {DATA.honoraryTraining.map((t, i) => (
                <motion.li
                  key={t.institution}
                  initial={{ opacity: 0.6, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-3xl bg-card p-6 ring-1 ring-adelaide-200 shadow-mauve"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h4 className="font-bold text-foreground leading-snug text-lg">
                      {t.institution}
                    </h4>
                    <span className="font-display italic font-semibold text-blossom-600 whitespace-nowrap">
                      {t.duration}
                    </span>
                  </div>
                  {"location" in t && t.location && (
                    <div className="mt-0.5 text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                      {t.location}
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
