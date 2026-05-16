"use client";

import { motion } from "framer-motion";
import { Heart, Stethoscope, Activity, Baby, ClipboardList, ShieldCheck } from "lucide-react";
import { DATA } from "@/data/resume";

const ICONS = [Heart, Stethoscope, Activity, Baby, ClipboardList, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
            Services
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
            How I Can <span className="text-primary">Help You</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Comprehensive fertility care tailored to your unique journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.services.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
