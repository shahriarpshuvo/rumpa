"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";
import { StickerBadge } from "@/components/ui/sticker-badge";

export function Hero() {
  return (
    <section id="hero" className="px-4 sm:px-6 pt-6 pb-12">
      <motion.div
        initial={{ opacity: 0.7, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-br from-adelaide-100 via-adelaide-200 to-adelaide-400 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20 grain"
      >
        {/* mega backdrop name */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="font-display italic font-bold leading-none tracking-tighter text-adelaide-50/55 text-[180px] sm:text-[260px] lg:text-[340px]">
            Rumpa
          </span>
        </div>

        {/* decorative asterisk top-left */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="absolute top-6 left-6 size-7 text-adelaide-900/40 z-10"
          fill="currentColor"
        >
          <path d="M12 2v8.5l6-4.25 1.5 2.6L13 12l6.5 3.15-1.5 2.6L12 13.5V22h-2v-8.5l-6 4.25-1.5-2.6L11 12 4.5 8.85l1.5-2.6L10 10.5V2z"/>
        </svg>

        {/* 3-col header */}
        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="text-sm sm:text-base font-medium leading-relaxed text-adelaide-900">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-adelaide-700/80 mb-1.5">§ Bio</span>
            Fertility Specialist
            <br />
            PCOS Expert
            <br />
            <Em>Reproductive Endocrinology</Em>
          </div>
          <div className="hidden sm:block" />
          <div className="text-xs sm:text-sm leading-relaxed text-adelaide-800 sm:text-right">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-adelaide-700/80 mb-1.5 sm:text-right">§ A note</span>
            This is Dr. Rezwana Rumpa.
            <br />
            My goal: <Em>compassionate,</Em>
            <br />
            evidence-based fertility care
            <br />
            for every couple&apos;s journey.
          </div>
        </div>

        {/* portrait */}
        <div className="relative z-10 mt-4 flex justify-center">
          <div className="relative">
            <Image
              src="/img/hero.png"
              alt={`${DATA.name}, ${DATA.title}`}
              width={420}
              height={520}
              priority
              className="h-[380px] w-auto object-contain object-bottom drop-shadow-[0_20px_30px_rgba(35,26,34,0.35)] sm:h-[480px] lg:h-[560px]"
            />
            <StickerBadge className="absolute -top-3 -right-2 sm:-right-8 bg-blossom-300 text-adelaide-950 border-adelaide-950 -rotate-6">
              <Sparkles className="size-3" />
              Now accepting ✓
            </StickerBadge>
            <StickerBadge className="absolute bottom-4 -left-6 sm:-left-12 bg-adelaide-950 text-blossom-200 border-blossom-300 rotate-3">
              ★ Trusted by 500+
            </StickerBadge>
          </div>
        </div>

        {/* bottom strip — editorial kicker */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-adelaide-900/70 font-semibold border-t border-adelaide-900/15 pt-4">
          <span>Dhaka, Bangladesh</span>
          <span className="hidden sm:inline">Est. 2017 · 12+ years</span>
          <span>Vol. I — Edition 2026</span>
        </div>
      </motion.div>

      {/* headline block — slides slightly under hero, asymmetric overhang */}
      <motion.div
        initial={{ opacity: 0.7, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="relative mx-auto -mt-8 max-w-6xl rounded-3xl bg-card p-7 sm:p-10 shadow-mauve-lg z-20 ring-1 ring-adelaide-200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600">
              ✦ Fertility · PCOS · Reproductive Care
            </span>
            <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight text-foreground">
              Build the family
              <br />
              <Em className="text-[1.05em]">you dream of.</Em>
            </h1>
            <p className="mt-5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {DATA.summary}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 lg:items-end">
            <Link
              href={DATA.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-mauve hover:-translate-y-0.5"
            >
              <CalendarHeart className="size-4" />
              Book Consultation
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-blossom-300 text-adelaide-950 text-sm font-semibold hover:bg-blossom-400 transition-colors"
            >
              Explore Services →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
