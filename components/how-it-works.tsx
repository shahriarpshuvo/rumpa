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
    rotate: "-1deg",
  },
  {
    n: "02",
    title: "Diagnosis & Plan",
    body: "Targeted blood work, ultrasound, and partner assessment. From the results we build a personalized treatment roadmap together.",
    img: "/img/watching.png",
    alt: "Dr. Rumpa reviewing imaging on a lightbox",
    rotate: "1.5deg",
  },
  {
    n: "03",
    title: "Ongoing Care",
    body: "Cycle monitoring, medication adjustments, lifestyle coaching, and emotional support. Iteration, not guesswork.",
    img: "/img/prescribing.png",
    alt: "Dr. Rumpa writing a treatment plan at her desk",
    rotate: "-0.5deg",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 sm:px-6 py-24 sm:py-32 bg-adelaide-100/40">
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

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0.6, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ transform: `rotate(${step.rotate})` }}
              className="group relative"
            >
              {/* polaroid frame */}
              <div className="bg-card p-3 pb-5 shadow-mauve-lg ring-1 ring-adelaide-200 hover:rotate-0 transition-transform duration-500" style={{ transform: 'rotate(0deg)' }}>
                <div className="relative aspect-[4/5] overflow-hidden bg-adelaide-200 grain">
                  <Image
                    src={step.img}
                    alt={step.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* corner number sticker */}
                  <div className="absolute top-3 left-3 size-10 rounded-full bg-blossom-300 text-adelaide-950 font-display italic font-bold text-lg flex items-center justify-center ring-2 ring-adelaide-950">
                    {step.n}
                  </div>
                </div>
                <div className="px-3 pt-4">
                  <h3 className="font-display italic text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
