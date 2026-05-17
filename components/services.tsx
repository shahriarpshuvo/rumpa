"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Stethoscope, Activity, Baby, ClipboardList, ShieldCheck, Quote } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";
import { CalTrigger } from "@/components/cal-trigger";

const ICONS = [Heart, Stethoscope, Activity, Baby, ClipboardList, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl rounded-[28px] bg-adelaide-950 text-adelaide-100 px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 overflow-hidden grain">
        {/* huge ghost number */}
        <span
          aria-hidden="true"
          className="absolute -top-10 -right-6 sm:-top-16 sm:-right-10 font-display italic font-bold text-[280px] leading-none text-adelaide-100/[0.04] select-none pointer-events-none"
        >
          Rumpa
        </span>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight">
              How I can
              <br />
              <Em className="text-blossom-300">help you.</Em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-adelaide-300 leading-relaxed max-w-lg">
              Comprehensive fertility care tailored to your unique journey — diagnosis through delivery.
            </p>
          </div>
          <CalTrigger className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-blossom-300 text-adelaide-950 text-sm font-bold hover:bg-blossom-400 transition-colors self-start lg:self-auto">
            Ask anything →
          </CalTrigger>
        </div>

        <div className="relative mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.services.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0.6, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl bg-adelaide-900 ring-1 ring-adelaide-800 p-6 hover:ring-blossom-400 hover:bg-adelaide-800 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-12 rounded-xl bg-blossom-300/15 ring-1 ring-blossom-300/30 flex items-center justify-center">
                    <Icon className="size-5 text-blossom-300" />
                  </div>
                  <span className="font-display italic font-bold text-2xl text-adelaide-700 group-hover:text-blossom-400 transition-colors">
                    0{i + 1}.
                  </span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-adelaide-100">{service.name}</h3>
                <p className="mt-2 text-sm text-adelaide-300 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* quote cell */}
        <div className="relative mt-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-4">
          <div className="group relative aspect-3/4 lg:aspect-auto lg:min-h-[480px] rounded-2xl overflow-hidden ring-1 ring-adelaide-800">
            <Image
              src="/img/prescribing.png"
              alt="Dr. Rumpa at her desk reviewing patient records"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-adelaide-500 mix-blend-color opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-adelaide-900/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="rounded-2xl bg-adelaide-900 ring-1 ring-adelaide-800 p-8 sm:p-10 flex flex-col justify-center">
            <span className="text-blossom-300 text-4xl font-display italic leading-none">
              <Quote className="size-10" />
            </span>
            <p className="mt-2 text-xl sm:text-5xl font-display italic font-medium text-adelaide-100 leading-tight">
              Every patient is unique. The plan should be too.
            </p>
            <p className="mt-5 text-xl text-blossom-300">— Dr. Rezwana Rumpa, Fertility Specialist</p>
          </div>
        </div>
      </div>
    </section>
  );
}
