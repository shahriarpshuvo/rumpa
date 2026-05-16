"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
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
            <LinkedinIcon className="size-4" />
          </Link>
          <Link
            href={DATA.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="size-11 rounded-full border border-adelaide-300 flex items-center justify-center text-adelaide-700 hover:bg-secondary transition-colors"
          >
            <FacebookIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
