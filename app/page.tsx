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
  "@id": `${SITE_URL}/#physician`,
  name: DATA.name,
  honorificPrefix: "Dr.",
  honorificSuffix: "MRCOG, MRCPI, MBBS",
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "BMDC",
      name: "Bangladesh Medical & Dental Council Registration",
      value: "A68043",
    },
  ],
  jobTitle: DATA.title,
  description: DATA.summary,
  url: SITE_URL,
  image: `${SITE_URL}/rumpa-square.png`,
  email: DATA.contact.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "patient enquiries",
    email: DATA.contact.email,
    availableLanguage: ["en", "bn"],
    areaServed: ["GB", "BD"],
  },
  worksFor: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Bangladesh" },
  ],
  availableService: {
    "@type": "MedicalTherapy",
    name: "Telemedicine fertility consultation",
  },
  medicalSpecialty: [
    "https://schema.org/ReproductiveEndocrinology",
    "https://schema.org/Obstetric",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Royal College of Obstetricians & Gynaecologists",
      url: "https://www.rcog.org.uk/",
    },
    {
      "@type": "EducationalOrganization",
      name: "Royal College of Physicians of Ireland",
      url: "https://www.rcpi.ie/",
    },
    {
      "@type": "EducationalOrganization",
      name: "Shaheed Monsur Ali Medical College, Dhaka University",
    },
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "Royal College of Obstetricians & Gynaecologists",
      url: "https://www.rcog.org.uk/",
    },
    {
      "@type": "Organization",
      name: "Royal College of Physicians of Ireland",
      url: "https://www.rcpi.ie/",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Medical License",
      name: "BMDC Registration",
      identifier: "A68043",
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "Bangladesh Medical & Dental Council",
        url: "https://bmdc.org.bd/",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "MBBS",
      educationalLevel: "Bachelor",
      recognizedBy: {
        "@type": "Organization",
        name: "Shaheed Monsur Ali Medical College, Dhaka University",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Postgraduate Membership",
      name: "MRCOG (Final Part)",
      recognizedBy: {
        "@type": "Organization",
        name: "Royal College of Obstetricians & Gynaecologists",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Postgraduate Membership",
      name: "MRCPI (Part II, Obs & Gynae)",
      recognizedBy: {
        "@type": "Organization",
        name: "Royal College of Physicians of Ireland",
      },
    },
  ],
  knowsAbout: [
    "Polycystic Ovary Syndrome",
    "Ovulation Induction",
    "IVF preparation",
    "Preconception Care",
    "Fertility Assessment",
    "Reproductive Endocrinology",
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
