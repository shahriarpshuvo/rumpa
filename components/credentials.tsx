"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function Credentials() {
  return (
    <section id="credentials" className="px-4 sm:px-6 py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground">
            Trained at the <Em>best.</Em>
            <br />
            Practicing where it <Em>matters.</Em>
          </h2>
        </div>

        {/* Hero image */}
        <motion.figure
          initial={{ opacity: 0.6, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mt-12 overflow-hidden rounded-2xl border border-adelaide-200"
        >
          <div className="relative aspect-[16/9]">
            <Image
              src="/img/operation.png"
              alt="Dr. Rumpa in surgical scrubs at the operating theater"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-adelaide-950/70 via-adelaide-950/0 to-transparent" />
            <figcaption className="absolute left-5 right-5 bottom-5 flex items-baseline justify-between gap-3 flex-wrap text-adelaide-50">
              <span className="font-display italic text-xl sm:text-2xl">Surgical practice</span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-blossom-200">
                Obs &amp; Gynae · Operating theater
              </span>
            </figcaption>
          </div>
        </motion.figure>

        {/* Education */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="size-5 text-blossom-600" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Education</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-adelaide-200 border border-adelaide-200 rounded-2xl overflow-hidden">
            {DATA.education.map((e, i) => (
              <motion.article
                key={e.degree}
                initial={{ opacity: 0.6, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-card p-7 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blossom-600">Fellowship</span>
                  <span className="font-display italic font-bold text-xl text-adelaide-300 leading-none">
                    0{i + 1}.
                  </span>
                </div>
                <h4 className="font-extrabold text-foreground text-3xl tracking-tight leading-none">{e.degree}</h4>
                <div className="mt-2 text-xs font-semibold text-blossom-700 uppercase tracking-[0.15em]">{e.stage}</div>
                <p className="mt-4 text-sm text-foreground/80 leading-snug flex-1">{e.institution}</p>
                <p className="mt-2 text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-semibold">
                  {e.location}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Experience + Honorary Training */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="size-5 text-blossom-600" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Professional Experience</h3>
            </div>
            <ul className="divide-y divide-adelaide-200 border border-adelaide-200 rounded-2xl overflow-hidden bg-card">
              {DATA.professionalExperience.map((p, i) => (
                <motion.li
                  key={`${p.position}-${p.hospital}`}
                  initial={{ opacity: 0.6, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="p-5 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground leading-snug">{p.position}</h4>
                    <div className="mt-1 text-sm text-muted-foreground">{p.hospital}</div>
                  </div>
                  <span className="font-display italic font-semibold text-blossom-600 whitespace-nowrap text-sm">
                    {p.duration}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award className="size-5 text-blossom-600" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Honorary Training</h3>
            </div>
            <ul className="divide-y divide-adelaide-200 border border-adelaide-200 rounded-2xl overflow-hidden bg-card">
              {DATA.honoraryTraining.map((t, i) => (
                <motion.li
                  key={t.institution}
                  initial={{ opacity: 0.6, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="p-5 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground leading-snug">{t.institution}</h4>
                    {"focus" in t && t.focus && <div className="mt-1 text-sm text-muted-foreground">{t.focus}</div>}
                  </div>
                  <span className="font-display italic font-semibold text-blossom-600 whitespace-nowrap text-sm">
                    {t.duration}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
