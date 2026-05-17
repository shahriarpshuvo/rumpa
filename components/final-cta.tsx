"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, MessageCircle, Sparkles } from "lucide-react";
import { CalTrigger } from "@/components/cal-trigger";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0.7, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-adelaide-950 text-adelaide-100 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 grain"
      >
        {/* ghost asterisks */}
        <div
          aria-hidden="true"
          className="absolute top-8 left-1/2 -translate-x-1/2 text-3xl text-blossom-300/50 tracking-[0.5em]"
        >
          ✦ ✦ ✦
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 items-center mt-6">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-300">
              Take the next step
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight">
              Ready to
              <br />
              <Em className="text-blossom-300">start your journey?</Em>
            </h2>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-adelaide-300 leading-relaxed">
              First consultations book within a week. Whether you&apos;re early in the journey or have been trying for
              years, the next step is a conversation.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CalTrigger className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-blossom-300 text-adelaide-950 text-base font-bold hover:bg-blossom-200 transition-all hover:-translate-y-0.5 shadow-mauve-lg">
              <CalendarHeart className="size-5" />
              Book Consultation
            </CalTrigger>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-adelaide-300/40 text-adelaide-100 text-sm font-medium hover:bg-adelaide-800 transition-colors"
            >
              <MessageCircle className="size-4" />
              Ask a question
            </Link>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-16 -top-8 w-[420px] h-[120%] opacity-25 pointer-events-none">
          <Image src="/img/assuring.png" alt="" fill className="object-cover object-left" sizes="420px" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-adelaide-950" />
        </div>
      </motion.div>
    </section>
  );
}
