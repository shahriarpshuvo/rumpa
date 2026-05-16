import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Dock } from "@/components/dock";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drrezwanarumpa.com";

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
    "Bangladesh Fertility Doctor",
  ],
  authors: [{ name: "Dr. Rezwana Rumpa" }],
  creator: "Dr. Rezwana Rumpa",
  openGraph: {
    type: "website",
    locale: "en_US",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        playfair.variable,
        jetbrainsMono.variable,
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          {children}
          <Dock />
        </ThemeProvider>
      </body>
    </html>
  );
}
