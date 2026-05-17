import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-adelaide-950 text-adelaide-100 mt-12">
      {/* giant decorative logo */}

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-40 relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -right-20 sm:right-3 w-[280px] sm:w-[600px] aspect-square opacity-[0.12] sm:opacity-[0.25]"
        >
          <Image src="/icon.svg" alt="" fill className="object-contain" sizes="600px" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
          <div className="max-w-md">
            <div className="font-display italic font-semibold text-3xl sm:text-4xl text-adelaide-100">{DATA.name}</div>
            <p className="mt-4 text-base text-adelaide-300 leading-relaxed">
              Fertility & PCOS specialist. In-person clinic in Bangladesh, online consultations for UK patients and
              anywhere else. This is my space to share what I learn in clinic: evidence-led, honest, and useful.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href={DATA.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-10 bg-white/80 text-adelaide-500 hover:text-adelaide-50 rounded-full border border-adelaide-700 flex items-center justify-center hover:bg-adelaide-800 hover:border-adelaide-500 transition-colors"
            >
              <FacebookIcon className="size-4" />
            </Link>
            <Link
              href={DATA.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="size-10 bg-white/80 text-adelaide-500 hover:text-adelaide-50 rounded-full border border-adelaide-700 flex items-center justify-center hover:bg-adelaide-800 hover:border-adelaide-500 transition-colors"
            >
              <InstagramIcon className="size-4" />
            </Link>
            <Link
              href={DATA.contact.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="size-10 bg-white/80 text-adelaide-500 hover:text-adelaide-50 rounded-full border border-adelaide-700 flex items-center justify-center hover:bg-adelaide-800 hover:border-adelaide-500 transition-colors"
            >
              <TikTokIcon className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-adelaide-800/60 flex flex-col gap-2 text-xs text-adelaide-500">
          <span>
            © {year} {DATA.name}. All rights reserved.
          </span>
          <span>Built with care.</span>
        </div>
      </div>
    </footer>
  );
}
