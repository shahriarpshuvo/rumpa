"use client";

import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

const CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: DATA.contact.email,
    href: `mailto:${DATA.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: DATA.contact.phone,
    href: `tel:${DATA.contact.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: DATA.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(DATA.location)}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            Get in touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Reach out — I&apos;m <Em>here to listen.</Em>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map(({ icon: Icon, label, value, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-2xl bg-card p-6 shadow-mauve hover:-translate-y-1 hover:shadow-mauve-lg transition-all"
            >
              <div className="size-11 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className="size-5 text-adelaide-700" />
              </div>
              <div className="mt-4 text-xs uppercase tracking-wider text-adelaide-500 font-semibold">
                {label}
              </div>
              <div className="mt-1 text-sm sm:text-base font-medium text-foreground break-words">
                {value}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href={DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="size-11 rounded-full border border-adelaide-300 flex items-center justify-center text-adelaide-700 hover:bg-secondary transition-colors"
          >
            <Linkedin className="size-4" />
          </Link>
          <Link
            href={DATA.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="size-11 rounded-full border border-adelaide-300 flex items-center justify-center text-adelaide-700 hover:bg-secondary transition-colors"
          >
            <Facebook className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
