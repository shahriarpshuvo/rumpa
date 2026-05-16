import Link from "next/link";
import { DATA } from "@/data/resume";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
            Contact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
            Get in <span className="text-primary">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-md hover:border-primary/20 transition-all">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Email</h3>
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              {DATA.contact.email}
            </Link>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-md hover:border-primary/20 transition-all">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Phone</h3>
            <Link
              href={`tel:${DATA.contact.phone}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              {DATA.contact.phone}
            </Link>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-md hover:border-primary/20 transition-all">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Location</h3>
            <p className="text-sm text-muted-foreground">{DATA.location}</p>
          </div>
        </div>

        <div className="text-center mt-8 space-x-4">
          <Link
            href={DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            LinkedIn
          </Link>
          <Link
            href={DATA.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            Facebook
          </Link>
        </div>
      </div>
    </section>
  );
}
