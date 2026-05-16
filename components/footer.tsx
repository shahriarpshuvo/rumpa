import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";
import { DATA } from "@/data/resume";

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
              <Linkedin className="size-4" />
            </Link>
            <Link
              href={DATA.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-9 rounded-full border border-adelaide-800 flex items-center justify-center hover:bg-adelaide-800 transition-colors"
            >
              <Facebook className="size-4" />
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
