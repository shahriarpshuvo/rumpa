"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarHeart } from "lucide-react";
import { Em } from "@/components/ui/em";
import { CalTrigger } from "@/components/cal-trigger";

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
    <section id="journey" className="px-4 sm:px-6 py-24 sm:py-32 bg-adelaide-100/40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground">
            Your fertility
            <br />
            journey, <Em>step by step.</Em>
          </h2>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Clear, predictable, paced to your needs. Here&apos;s what working
            together looks like — from first hello to first heartbeat.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0.6, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-3xl bg-card border border-adelaide-200 overflow-hidden hover:border-adelaide-400 transition-colors"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-adelaide-200">
                <Image
                  src={step.img}
                  alt={step.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-adelaide-500 mix-blend-color opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-adelaide-900/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-adelaide-950/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-baseline gap-2">
                  <span className="font-display italic font-bold text-6xl sm:text-7xl leading-none text-card drop-shadow-sm">
                    {step.n}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-card/90">
                    Step
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold leading-snug text-foreground group-hover:text-adelaide-700 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CalTrigger className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <CalendarHeart className="size-4" />
            Book a consultation
          </CalTrigger>
          <span className="text-sm text-muted-foreground">
            First call is a conversation — no procedures, no pressure.
          </span>
        </div>
      </div>
    </section>
  );
}
