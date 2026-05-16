"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { DATA } from "@/data/resume";

export function Academics() {
  return (
    <section id="academics" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
            Research
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
            Publications & <span className="text-primary">Research</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5">
          {DATA.academics.map((academic, i) => (
            <motion.div
              key={academic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex items-start gap-4 bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <FileText className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {academic.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-3 py-1 rounded-full">
                    {academic.year}
                  </span>
                </div>
                <p className="text-sm text-primary font-medium mt-1">{academic.role}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {academic.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
