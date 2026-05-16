"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
            About Me
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight">
            Compassionate Care,
            <br />
            <span className="text-primary">Proven Results</span>
          </h2>
          <div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert leading-relaxed text-muted-foreground">
            <p className="text-base sm:text-lg leading-relaxed">
              I am a passionate fertility specialist with extensive experience in reproductive medicine.
              My practice focuses on helping couples navigate the challenges of trying to conceive (TTC),
              with particular expertise in Polycystic Ovary Syndrome (PCOS), ovulation disorders, and
              personalized fertility treatment plans.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              I believe in a holistic, patient-centered approach that combines the latest medical advances
              with genuine compassion and emotional support.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
