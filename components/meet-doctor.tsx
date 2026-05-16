"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function MeetDoctor() {
  return (
    <section id="about" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="block text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500"
        >
          About Me
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground"
        >
          Meet Dr. Rumpa{" "}
          <span className="inline-block align-middle">
            <Image
              src="/img/assuring.png"
              alt=""
              width={56}
              height={56}
              className="size-12 sm:size-14 rounded-full object-cover ring-2 ring-adelaide-200"
            />
          </span>{" "}
          — Your <Em>Guide</Em> to Parenthood
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {DATA.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {DATA.stats.map((stat, i) => {
            const variants = [
              "bg-card text-foreground",
              "bg-adelaide-100 text-foreground",
              "bg-adelaide-200 text-adelaide-900",
              "bg-primary text-primary-foreground",
            ] as const;
            return (
              <div
                key={stat.label}
                className={`rounded-2xl p-5 sm:p-6 ${variants[i % 4]}`}
              >
                <div className="font-display italic font-semibold text-3xl sm:text-4xl leading-none">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium opacity-80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
