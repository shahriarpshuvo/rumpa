"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Phone, MessageCircle } from "lucide-react";
import { DATA } from "@/data/resume";
import Link from "next/link";

export function Booking() {
  return (
    <section id="booking" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-10 sm:p-14 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-6">
            <div className="size-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto backdrop-blur-sm">
              <CalendarHeart className="size-7 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg text-primary-foreground/80 max-w-lg mx-auto leading-relaxed">
              Take the first step towards building your family. Book a confidential consultation
              and let&apos;s create a personalized fertility plan together.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
              <Link
                href={DATA.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary-foreground text-primary text-sm font-semibold hover:bg-primary-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <CalendarHeart className="size-4" />
                Book Consultation
              </Link>
              <Link
                href={`tel:${DATA.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-primary-foreground/30 text-primary-foreground text-sm font-medium hover:bg-white/10 transition-all"
              >
                <Phone className="size-4" />
                Call Now
              </Link>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="size-3.5" />
              Or send a message
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
