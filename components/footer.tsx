import Link from "next/link";
import { DATA } from "@/data/resume";

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

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-adelaide-950 text-adelaide-100 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display italic font-semibold text-2xl text-adelaide-100">
            {DATA.name}
          </div>
          <p className="mt-3 text-sm text-adelaide-300/80 leading-relaxed">
            {DATA.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-adelaide-300">
            <li><Link href="#hero" className="hover:text-adelaide-100 transition-colors">Home</Link></li>
            <li><Link href="#about" className="hover:text-adelaide-100 transition-colors">About</Link></li>
            <li><Link href="#services" className="hover:text-adelaide-100 transition-colors">Services</Link></li>
            <li><Link href="/blog" className="hover:text-adelaide-100 transition-colors">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-adelaide-100 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-400">
            Care
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-adelaide-300">
            <li><Link href="#how-it-works" className="hover:text-adelaide-100 transition-colors">How it works</Link></li>
            <li><Link href="#credentials" className="hover:text-adelaide-100 transition-colors">Credentials</Link></li>
            <li><Link href="#faq" className="hover:text-adelaide-100 transition-colors">FAQ</Link></li>
            <li><Link href="#testimonials" className="hover:text-adelaide-100 transition-colors">Patient stories</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-adelaide-300" itemScope itemType="https://schema.org/Physician">
            <li itemProp="email">
              <Link href={`mailto:${DATA.contact.email}`} className="hover:text-adelaide-100 transition-colors">
                {DATA.contact.email}
              </Link>
            </li>
            <li itemProp="telephone">
              <Link href={`tel:${DATA.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-adelaide-100 transition-colors">
                {DATA.contact.phone}
              </Link>
            </li>
            <li itemProp="address">{DATA.location}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            <Link
              href={DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="size-9 rounded-full border border-adelaide-800 flex items-center justify-center hover:bg-adelaide-800 transition-colors"
            >
              <LinkedinIcon className="size-4" />
            </Link>
            <Link
              href={DATA.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-9 rounded-full border border-adelaide-800 flex items-center justify-center hover:bg-adelaide-800 transition-colors"
            >
              <FacebookIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-adelaide-800/50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-adelaide-400">
          <span>© {year} {DATA.name}. All rights reserved.</span>
          <span>Built with care.</span>
        </div>
      </div>
    </footer>
  );
}
