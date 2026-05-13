import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { SplashScreen } from "@/components/SplashScreen";
import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { PullToRefresh } from "@/components/landing/pull-to-refresh";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_META,
} from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_META.description,
  keywords: DEFAULT_META.keywords,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SmoothScroll>
          <SplashScreen />
          <PullToRefresh />
          <JsonLd />
          <Navigation />
          <main id="main-content" className="relative z-10 min-h-screen">
            {/* IntersectionObserver target: first ~20px of scroll (no scroll listener for nav background). */}
            <div
              id="nav-scroll-sentinel"
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-5 w-full"
            />
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
