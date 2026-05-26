import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | BOTMATE - Kickstart Your Brand's Growth",
  description: "Ready to accelerate your brand? Fill out the form or reach out to us directly to start your digital transformation with BotMate. Join the elite brands scaling with AI.",
  keywords: ["Get Started BotMate", "Business Transformation", "AI Growth Strategy", "Marketing Onboarding"],
  alternates: {
    canonical: "https://www.botmate.co.in/get-started",
  },
  openGraph: {
    title: "Get Started | BOTMATE",
    description: "Start your digital transformation journey with Bhubaneswar's leading AI agency.",
    url: "https://www.botmate.co.in/get-started",
  },
};

import { redirect } from "next/navigation";

export default function GetStartedPage() {
  redirect("/?get-started=true");
}