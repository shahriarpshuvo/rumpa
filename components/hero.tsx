"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";
import { MegaBackdrop } from "@/components/ui/mega-backdrop";
import { StickerBadge } from "@/components/ui/sticker-badge";

export function Hero() {
  return (
    <section id="hero" className="px-4 sm:px-6 pt-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-b from-adelaide-100 via-adelaide-200 to-adelaide-300 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
      >
        {/* mega backdrop name */}
        <MegaBackdrop className="-top-6">Rumpa</MegaBackdrop>

        {/* 3-col header */}
        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="text-sm sm:text-base font-medium leading-relaxed text-adelaide-900">
            Fertility Specialist
            <br />
            PCOS Expert
            <br />
            <Em>Reproductive Endocrinology</Em>
          </div>
          <div className="hidden sm:block" />
          <div className="text-xs sm:text-sm leading-relaxed text-adelaide-800 sm:text-right">
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
        <div className="relative z-10 mt-6 flex justify-center">
          <div className="relative">
            <Image
              src="/img/hero.png"
              alt={`${DATA.name}, ${DATA.title}`}
              width={420}
              height={520}
              priority
              className="h-[360px] w-auto object-contain object-bottom drop-shadow-[0_18px_28px_rgba(35,26,34,0.25)] sm:h-[440px] lg:h-[520px]"
            />
            <StickerBadge className="absolute -top-2 -right-2 sm:-right-6">
              <Sparkles className="size-3" />
              Now accepting ✓
            </StickerBadge>
          </div>
        </div>
      </motion.div>

      {/* headline block under hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="mx-auto mt-5 max-w-7xl rounded-3xl bg-card p-7 sm:p-10 shadow-mauve"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
          Fertility · PCOS · Reproductive Care
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
          Build the family <Em>you dream of.</Em>
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {DATA.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
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
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-adelaide-300 text-sm font-medium text-foreground hover:bg-secondary transition-all"
          >
            Explore Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
