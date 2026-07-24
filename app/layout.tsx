import type { Metadata } from "next";
import { magion, sinter } from "./fonts";
import { CONTACT_EMAIL, STUDIO_PHONE } from "./lib/contact";
import "./globals.css";

const SITE_URL = "https://labbstudio.pl";
const SITE_NAME = "LABB Studio";
const SITE_DESCRIPTION =
  "Studio fotograficzno-filmowe do wynajęcia w centrum Bielska-Białej — sala ~125 m², blackout, oświetlenie studyjne i sprzęt w cenie wynajmu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — wynajem studia fotograficznego i filmowego w Bielsku-Białej`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "wynajem studia fotograficznego",
    "studio filmowe Bielsko-Biała",
    "wynajem studia Bielsko-Biała",
    "studio fotograficzne na godziny",
  ],
  icons: {
    icon: "/images/LABB_Alpha_Small.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — wynajem studia fotograficznego i filmowego w Bielsku-Białej`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — wynajem studia fotograficznego i filmowego w Bielsku-Białej`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: STUDIO_PHONE,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Maja 24",
    postalCode: "43-300",
    addressLocality: "Bielsko-Biała",
    addressCountry: "PL",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "06:00",
    closes: "23:59",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${magion.variable} ${sinter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />
      </body>
    </html>
  );
}
