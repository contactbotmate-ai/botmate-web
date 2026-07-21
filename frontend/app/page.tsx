import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "BOTMATE | Best Digital Marketing Agency in Bhubaneswar | AI-Driven Results",
  description: "Accelerate your growth with BotMate, Bhubaneswar's leading AI-powered digital marketing agency. We specialize in SEO, social media management, and performance marketing to scale your business.",
  alternates: {
    canonical: "https://www.botmate.co.in",
  },
  openGraph: {
    title: "BOTMATE | Best Digital Marketing Agency in Bhubaneswar",
    description: "Scale your business with AI-driven marketing strategies.",
    url: "https://www.botmate.co.in",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BotMate",
            "url": "https://www.botmate.co.in",
            "logo": "https://www.botmate.co.in/logo.png",
            "description": "AI-powered digital marketing agency specializing in SEO, social media, and business growth.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Plot no. 556/3676, Lane 1, Mallick Complex, Jagamara",
              "addressLocality": "Bhubaneswar",
              "addressRegion": "Odisha",
              "postalCode": "751030",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://instagram.com/botmate",
              "https://linkedin.com/company/botmate"
            ]
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
