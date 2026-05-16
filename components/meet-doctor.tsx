"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function MeetDoctor() {
  return (
    <section id="about" className="relative px-4 sm:px-6 py-24 sm:py-32">
      {/* decorative dingbat */}
      <div aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 text-2xl text-blossom-500 tracking-[0.5em]">
        ✦ ✦ ✦
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <motion.span
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600"
          >
            § 01 — Meet Dr. Rumpa
          </motion.span>

          <motion.h2
            initial={{ opacity: 0.6, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground"
          >
            Your <Em>guide</Em>
            <br />
            to parenthood,
            <br />
            <Em>and back to</Em> yourself.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            <p className="first-letter:font-display first-letter:italic first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-adelaide-700">
              {DATA.about}
            </p>
          </motion.div>

          {/* signature line */}
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display italic text-2xl text-adelaide-700">— Dr. Rumpa</span>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Dhaka · Est. 2017</span>
          </div>
        </div>

        {/* photo + stat tile cluster */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 relative aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-adelaide-200 grain">
            <Image
              src="/img/assuring.png"
              alt="Dr. Rumpa with a patient couple"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-foreground">
              In consultation
            </div>
          </div>
          {DATA.stats.map((stat, i) => {
            const variants = [
              "bg-blossom-200 text-adelaide-950",
              "bg-adelaide-200 text-adelaide-950",
              "bg-adelaide-900 text-adelaide-100",
              "bg-card text-foreground ring-1 ring-adelaide-200",
            ];
            return (
              <div key={stat.label} className={`rounded-2xl p-5 ${variants[i % 4]}`}>
                <div className="font-display italic font-semibold text-3xl sm:text-4xl leading-none">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em] opacity-80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
