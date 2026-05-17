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

        {/* TOP — landscape operation polaroid */}
        <motion.figure
          initial={{ opacity: 0.6, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-12 mx-auto max-w-5xl bg-card p-3 pb-6 shadow-mauve-lg ring-1 ring-adelaide-200"
          style={{ transform: "rotate(-0.75deg)" }}
        >
          <div className="relative aspect-[16/9] overflow-hidden grain">
            <Image
              src="/img/operation.png"
              alt="Dr. Rumpa in surgical scrubs at the operating theater"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <figcaption className="px-3 pt-4 flex items-baseline justify-between gap-3 flex-wrap">
            <span className="font-display italic text-xl text-foreground">
              Surgical practice
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Obs &amp; Gynae · Operating theater
            </span>
          </figcaption>
        </motion.figure>

        {/* TWO COLUMNS — Education left, Experience+Honorary right */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
          {/* LEFT — Education */}
          <div>
            <h3 className="font-display italic text-2xl font-semibold text-adelaide-700 mb-7">
              Education
            </h3>
            <ol className="space-y-7 border-l-2 border-blossom-400 pl-7">
              {DATA.education.map((e, i) => (
                <motion.li
                  key={`${e.degree}-${i}`}
                  initial={{ opacity: 0.6, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative"
                >
                  <span className="absolute -left-[35px] top-1.5 size-4 rounded-full bg-blossom-400 ring-4 ring-secondary" />
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h4 className="font-bold text-foreground text-lg leading-snug">
                      ★ {e.degree}
                    </h4>
                    {e.year && (
                      <span className="font-display italic font-bold text-blossom-600 text-base whitespace-nowrap">
                        {e.year}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground/80">
                    {e.institution}
                  </div>
                  {e.location && (
                    <div className="mt-0.5 text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                      {e.location}
                    </div>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          {/* RIGHT — Professional Experience + Honorary Training */}
          <div className="flex flex-col gap-10">
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
                    className="rounded-2xl bg-card p-5 ring-1 ring-adelaide-200"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h4 className="font-bold text-foreground leading-snug">
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
                    className="rounded-2xl bg-card p-5 ring-1 ring-adelaide-200"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h4 className="font-bold text-foreground leading-snug">
                        ★ {t.institution}
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
      </div>
    </section>
  );
}
