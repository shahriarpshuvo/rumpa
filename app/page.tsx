import { Hero } from "@/components/hero";
import { MeetDoctor } from "@/components/meet-doctor";
import { Services } from "@/components/services";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Insights } from "@/components/insights";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Credentials } from "@/components/credentials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { DATA } from "@/data/resume";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rumpa.uk";

const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: DATA.name,
  description: DATA.summary,
  url: SITE_URL,
  email: DATA.contact.email,
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
  sameAs: [DATA.contact.facebook, DATA.contact.instagram, DATA.contact.tiktok],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <MeetDoctor />
      <Services />
      <MarqueeStrip />
      <Insights />
      <HowItWorks />
      <Testimonials />
      <Credentials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
