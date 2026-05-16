"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Em } from "@/components/ui/em";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We meet — in person or online — to review your history, goals, and concerns. No procedures on day one, just a real conversation.",
    img: "/img/taking.png",
    alt: "Dr. Rumpa taking history from a couple",
  },
  {
    n: "02",
    title: "Diagnosis & Plan",
    body: "Targeted blood work, ultrasound, and partner assessment. From the results we build a personalized treatment roadmap together.",
    img: "/img/watching.png",
    alt: "Dr. Rumpa reviewing imaging on a lightbox",
  },
  {
    n: "03",
    title: "Ongoing Care",
    body: "Cycle monitoring, medication adjustments, lifestyle coaching, and emotional support. Iteration, not guesswork.",
    img: "/img/prescribing.png",
    alt: "Dr. Rumpa writing a treatment plan at her desk",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            How it works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Your fertility journey, <Em>step by step.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Clear, predictable, paced to your needs. Here&apos;s what working
            together looks like.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-card p-6 shadow-mauve"
            >
              <div className="flex items-start justify-between">
                <span className="font-display italic font-bold text-6xl leading-none text-adelaide-200">
                  {step.n}
                </span>
                <div className="size-2 rounded-full bg-adelaide-400 mt-3" />
              </div>
              <div className="relative mt-6 aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
