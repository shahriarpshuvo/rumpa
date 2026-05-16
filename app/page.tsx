import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Booking } from "@/components/booking";
import { Qualifications } from "@/components/qualifications";
import { Academics } from "@/components/academics";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";
import { DATA } from "@/data/resume";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drrezwanarumpa.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: DATA.name,
  description: DATA.summary,
  url: SITE_URL,
  email: DATA.contact.email,
  telephone: DATA.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  medicalSpecialty: [
    "Reproductive Endocrinology",
    "Fertility Medicine",
    "PCOS Treatment",
  ],
  sameAs: [DATA.contact.linkedin, DATA.contact.facebook],
};

export default function Home() {
  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Booking />
      <Qualifications />
      <Academics />
      <BlogPreview />
      <Contact />

      <footer className="border-t border-border/50 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dr. Rezwana Rumpa. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
