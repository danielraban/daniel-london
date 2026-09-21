import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "./components/site-shell";
import { pressStart, vt323 } from "@/lib/fonts";
import { profile } from "@/lib/content/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} · ${profile.headline}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  openGraph: {
    title: `${profile.name} · ${profile.headline}`,
    description: profile.summary,
    url: profile.site,
    siteName: profile.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.headline}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07040f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${pressStart.variable} ${vt323.variable} h-full`}
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
