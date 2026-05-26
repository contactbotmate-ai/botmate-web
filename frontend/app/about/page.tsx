import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About BOTMATE | Leading AI Digital Agency in Bhubaneswar",
  description: "Learn more about BotMate, our mission, and the team behind the most innovative AI-driven digital marketing agency in Bhubaneswar. We engineer the future of digital growth.",
  keywords: ["About BotMate", "AI Agency Team", "Digital Marketing Mission", "Innovation Bhubaneswar"],
  alternates: {
    canonical: "https://www.botmate.co.in/about",
  },
  openGraph: {
    title: "About BOTMATE | Leading AI Digital Agency",
    description: "Engineering the future of digital growth with AI and human intuition.",
    url: "https://www.botmate.co.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
