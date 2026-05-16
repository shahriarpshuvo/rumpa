"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Stethoscope,
  Activity,
  Baby,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

const ICONS = [Heart, Stethoscope, Activity, Baby, ClipboardList, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-adelaide-900 text-adelaide-100 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-300">
              Services
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              How I can <Em className="text-adelaide-200">help you</Em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-adelaide-300/90 leading-relaxed">
              Comprehensive fertility care tailored to your unique journey.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-adelaide-800 text-adelaide-100 text-sm font-semibold hover:bg-adelaide-700 transition-colors self-start lg:self-auto"
          >
            See all →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.services.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl bg-adelaide-800/80 p-6 hover:bg-adelaide-800 transition-colors"
              >
                <div className="size-11 rounded-xl bg-adelaide-700/60 flex items-center justify-center mb-4">
                  <Icon className="size-5 text-adelaide-200" />
                </div>
                <h3 className="text-lg font-semibold leading-snug">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-adelaide-300/80 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 items-stretch">
          <div className="relative aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden">
            <Image
              src="/img/prescribing.png"
              alt="Dr. Rumpa at her desk reviewing patient records"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="rounded-2xl bg-adelaide-800/50 p-8 flex flex-col justify-center">
            <p className="text-lg sm:text-xl font-display italic font-medium text-adelaide-100 leading-relaxed">
              &ldquo;Every patient is unique. The plan should be too.&rdquo;
            </p>
            <p className="mt-4 text-sm text-adelaide-300">
              — Dr. Rezwana Rumpa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
