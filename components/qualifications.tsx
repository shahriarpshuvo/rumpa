"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { DATA } from "@/data/resume";

export function Qualifications() {
  return (
    <section id="qualifications" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
            Qualifications
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
            Education & <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="size-5 text-primary" />
              Education
            </h3>
            <div className="space-y-4">
              {DATA.qualifications.map((qual, i) => (
                <motion.div
                  key={qual.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative pl-8 before:absolute before:left-0 before:top-2 before:size-3 before:rounded-full before:bg-primary before:ring-4 before:ring-primary/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-base">{qual.degree}</h4>
                      <p className="text-sm text-primary font-medium">{qual.institution}</p>
                      <p className="text-sm text-muted-foreground mt-1">{qual.description}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap bg-muted px-3 py-1 rounded-full">
                      {qual.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Award className="size-5 text-primary" />
              Experience
            </h3>
            <div className="space-y-6">
              {DATA.experience.map((exp, i) => (
                <motion.div
                  key={exp.hospital}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative pl-8 before:absolute before:left-0 before:top-2 before:size-3 before:rounded-full before:bg-accent-foreground/60 before:ring-4 before:ring-accent"
                >
                  <div className="bg-card rounded-2xl p-5 border border-border/50">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-base">{exp.position}</h4>
                        <p className="text-sm text-primary font-medium">{exp.hospital}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-3 py-1 rounded-full">
                        {exp.start} – {exp.end}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {exp.description.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&bull;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
