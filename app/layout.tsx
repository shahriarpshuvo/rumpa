import type { Metadata, Viewport } from "next";
import { Lora, Google_Sans_Flex, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DATA } from "@/data/resume";

// note: light theme only — dark mode disabled

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rumpa.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Rezwana Rumpa | Fertility & PCOS Specialist",
    template: "%s | Dr. Rezwana Rumpa",
  },
  description:
    "Board-certified fertility specialist helping couples conceive. Expert in PCOS management, ovulation induction, and personalized fertility care. Book a consultation today.",
  keywords: [
    "Fertility Specialist",
    "PCOS Doctor",
    "Trying to Conceive",
    "TTC",
    "Ovulation Induction",
    "Fertility Treatment",
    "PCOS Management",
    "Reproductive Medicine",
    "Dr. Rezwana Rumpa",
    "Infertility Treatment",
    "Preconception Care",
    "UK Fertility Doctor",
    "Bangladesh Fertility Doctor",
    "Telemedicine Fertility Consultation",
  ],
  authors: [{ name: "Dr. Rezwana Rumpa" }],
  creator: "Dr. Rezwana Rumpa",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Dr. Rezwana Rumpa",
    title: "Dr. Rezwana Rumpa | Fertility & PCOS Specialist",
    description:
      "Board-certified fertility specialist helping couples conceive. Expert in PCOS management, ovulation induction, and personalized fertility care.",
    images: [
      {
        url: `${SITE_URL}/social.png`,
        width: 1200,
        height: 630,
        alt: "Dr. Rezwana Rumpa - Fertility & PCOS Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Rezwana Rumpa | Fertility & PCOS Specialist",
    description:
      "Board-certified fertility specialist helping couples conceive. Expert in PCOS management and personalized fertility care.",
    images: [`${SITE_URL}/social.png`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "oklch(0.959 0.007 312.56)",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={cn("h-full antialiased font-sans light", googleSans.variable, lora.variable, jetbrainsMono.variable)}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "MedicalBusiness",
                  "@id": `${SITE_URL}/#organization`,
                  name: DATA.name,
                  url: SITE_URL,
                  logo: `${SITE_URL}/icon.png`,
                  image: `${SITE_URL}/rumpa-square.png`,
                  email: DATA.contact.email,
                  description: DATA.summary,
                  areaServed: [
                    { "@type": "Country", name: "United Kingdom" },
                    { "@type": "Country", name: "Bangladesh" },
                  ],
                  medicalSpecialty: [
                    "https://schema.org/ReproductiveEndocrinology",
                    "https://schema.org/Obstetric",
                  ],
                  founder: { "@id": `${SITE_URL}/#physician` },
                  sameAs: [
                    DATA.contact.facebook,
                    DATA.contact.instagram,
                    DATA.contact.tiktok,
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: DATA.name,
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: "en-GB",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
