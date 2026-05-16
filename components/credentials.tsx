"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function Credentials() {
  return (
    <section id="credentials" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-secondary px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            Credentials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Trained at the <Em>best.</Em>
            <br />
            Practicing where it <Em>matters.</Em>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-adelaide-600">
              Education & Fellowship
            </h3>
            <ol className="mt-6 space-y-6 border-l-2 border-adelaide-300 pl-6">
              {DATA.qualifications.map((q, i) => (
                <motion.li
                  key={q.degree}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative"
                >
                  <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-adelaide-500 ring-4 ring-secondary" />
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display italic font-semibold text-lg text-adelaide-600">
                      {q.year}
                    </span>
                    <span className="font-bold text-foreground">{q.degree}</span>
                  </div>
                  <div className="mt-1 text-sm text-foreground/80">
                    {q.institution}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {q.description}
                  </div>
                </motion.li>
              ))}
            </ol>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-adelaide-600">
              Speaking &amp; Research
            </h3>
            <ul className="mt-5 space-y-4">
              {DATA.academics.map((a, i) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl bg-card p-5"
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h4 className="font-semibold text-foreground">{a.title}</h4>
                    <span className="font-display italic text-sm text-adelaide-600">
                      {a.year}
                    </span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-adelaide-500">
                    {a.role}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <figure className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-mauve">
              <Image
                src="/img/watching.png"
                alt="Dr. Rumpa reviewing diagnostic imaging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-adelaide-950/70 backdrop-blur px-3 py-1.5 text-xs font-semibold text-adelaide-100">
                Diagnostic review
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <figure className="relative aspect-square rounded-2xl overflow-hidden shadow-mauve">
                <Image
                  src="/img/operation.png"
                  alt="Dr. Rumpa in surgical scrubs at the operating theater"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-adelaide-950/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-adelaide-100">
                  Surgical practice
                </figcaption>
              </figure>
              <figure className="relative aspect-square rounded-2xl overflow-hidden shadow-mauve">
                <Image
                  src="/img/prescribing.png"
                  alt="Dr. Rumpa during a patient consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-adelaide-950/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-adelaide-100">
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
