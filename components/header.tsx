"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, CalendarHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalTrigger } from "@/components/cal-trigger";
import { DATA } from "@/data/resume";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-adelaide-200/60 shadow-mauve"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-18 items-center justify-between gap-6">
          {/* brand */}
          <Link href="#hero" aria-label={`${DATA.name} — home`} className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="" width={36} height={36} priority className="size-9" />
            <span className="font-extrabold tracking-tight text-lg sm:text-xl text-foreground">Dr. Rezwana Rumpa</span>
          </Link>

          {/* nav — desktop */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center">
            <CalTrigger className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-mauve">
              <CalendarHeart className="size-4" />
              Book a call
            </CalTrigger>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center size-10 rounded-full border border-adelaide-300 text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-adelaide-200">
          <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground py-1.5 border-b border-adelaide-200/40"
              >
                {item.label}
              </Link>
            ))}
            <CalTrigger
              ariaLabel="Book a call with Dr. Rumpa"
              className="mt-2 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
            >
              <CalendarHeart className="size-4" />
              Book a call
            </CalTrigger>
          </nav>
        </div>
      )}
    </header>
  );
}
