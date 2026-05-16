"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Notebook, Mail, Phone } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

interface DockItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  active?: boolean;
}

function DockItem({ href, label, icon, external, active }: DockItemProps) {
  const sharedClassName = cn(
    "inline-flex items-center justify-center rounded-full size-9 transition-all hover:bg-primary/10 hover:text-primary active:scale-90",
    active && "bg-primary/10 text-primary"
  );

  const renderElement = external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  ) : (
    <Link href={href} className={sharedClassName}>
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  );

  return (
    <Tooltip>
      <TooltipTrigger render={renderElement} />
      <TooltipContent sideOffset={8}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function Dock() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-xl">
          <DockItem href="/" label="Home" icon={<Home className="size-4" />} active={pathname === "/"} />
          <DockItem
            href="/blog"
            label="Blog"
            icon={<Notebook className="size-4" />}
            active={pathname.startsWith("/blog")}
          />

          <Separator orientation="vertical" className="mx-0.5 h-6" />

          <DockItem
            href={DATA.contact.facebook}
            label="Facebook"
            icon={<FacebookIcon className="size-4" />}
            external
          />
          <DockItem
            href={DATA.contact.linkedin}
            label="LinkedIn"
            icon={<LinkedinIcon className="size-4" />}
            external
          />
          <DockItem
            href={`mailto:${DATA.contact.email}`}
            label="Email"
            icon={<Mail className="size-4" />}
            external
          />
          <DockItem
            href={`tel:${DATA.contact.phone}`}
            label="Phone"
            icon={<Phone className="size-4" />}
            external
          />

          <Separator orientation="vertical" className="mx-0.5 h-6" />

          <ThemeToggle />
        </div>
      </div>
    </TooltipProvider>
  );
}
