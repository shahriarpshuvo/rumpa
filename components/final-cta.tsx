"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, MessageCircle } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-adelaide-900 text-adelaide-100 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-300">
              Take the next step
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Ready to <Em className="text-adelaide-200">start your journey?</Em>
            </h2>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-adelaide-300/90 leading-relaxed">
              First consultations book within a week. Whether you&apos;re early in
              the journey or have been trying for years, the next step is a
              conversation.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={DATA.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-adelaide-100 text-adelaide-900 text-sm font-semibold hover:bg-white transition-colors"
            >
              <CalendarHeart className="size-4" />
              Book Consultation
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-adelaide-300/40 text-adelaide-100 text-sm font-medium hover:bg-adelaide-800 transition-colors"
            >
              <MessageCircle className="size-4" />
              Ask a question
            </Link>
            <Link
              href={`tel:${DATA.contact.phone.replace(/[^+\d]/g, "")}`}
              className="text-center text-sm text-adelaide-300 hover:text-adelaide-100 transition-colors mt-2"
            >
              or call {DATA.contact.phone}
            </Link>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-12 -top-8 w-[340px] h-[120%] opacity-25 pointer-events-none">
          <Image
            src="/img/assuring.png"
            alt=""
            fill
            className="object-cover object-left"
            sizes="340px"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-adelaide-900" />
        </div>
      </motion.div>
    </section>
  );
}
