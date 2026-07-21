export interface Project {
  slug: string;
  client: string;
  industry: string;
  category: string;
  gradient: string;
  initials: string;
  tagline: string;
  result: string;
  metrics: string[];
  challenge: string;
  solution: string;
  website: string;
  topBadge: string;
  cardBgType: "light" | "dark";
  tags: string[];
  metricBadge: string;
  metricValue: string;
  metricLabel: string;
  logoUrl?: string;
  youtubeEmbedId?: string;
  instagramEmbedId?: string;
  testimonial?: {
    author: string;
    role: string;
    avatarUrl?: string;
    text: string;
    rating: number;
    instagramUrl?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "shree-radha-groups",
    client: "Shree Radha Groups",
    industry: "Real Estate & Construction",
    category: "Social Media",
    gradient: "linear-gradient(135deg, #121212 0%, #302607 50%, #080808 100%)",
    initials: "SR",
    tagline: "Building a powerful digital brand and generating ₹3 Lac sales organically.",
    result: "+31% Sales Growth",
    metrics: ["31% Sales Growth", "₹3 Lac Sales Done", "100K+ Public Reach", "4.8★ Rated Work"],
    challenge: "Shree Radha Groups wanted to establish an online identity, build trust in their real estate developments, and drive high-intent leads without overspending on paid ads.",
    solution: "We deployed a robust organic Social Media Marketing strategy combined with targeted local SEO. We focused on high-quality real estate project tours, customer review videos, and local intent keywords to capture and convert buyers.",
    website: "https://shreeradhagroups.com",
    topBadge: "REAL ESTATE",
    cardBgType: "dark",
    tags: ["Social Media", "Local SEO", "Content Strategy"],
    metricBadge: "↑ 31% Sales Growth",
    metricValue: "31%",
    metricLabel: "SALES GROWTH",
    logoUrl: "/images/shree-radha-groups.png",
    youtubeEmbedId: "dQw4w9WgXcQ",
    testimonial: {
      author: "Mr. Satya Narayan Senapaty",
      role: "Founder & Owner, Shree Radha Groups",
      text: "BotMate has completely transformed our online marketing. Their Social Media and SEO strategies have boosted our organic sales growth by 31% and generated over ₹3 Lac in sales. We are extremely pleased with their professionalism!",
      rating: 5,
      avatarUrl: "/images/satya-narayan-senapaty.jpg"
    }
  },
  {
    slug: "firstcry-intellitots",
    client: "FirstCry Intellitots Gajapati Nagar",
    industry: "Education & Childcare",
    category: "Social Media",
    gradient: "linear-gradient(135deg, #101c30 0%, #e68a00 100%)",
    initials: "FC",
    tagline: "Showcasing vibrant childcare spaces through cinematic shoots.",
    result: "5★ Rating & Max Enrollment",
    metrics: ["5.0★ Client Rating", "100% Enrollment Goal", "50K+ Video Views", "2.4× Admission Inquiries"],
    challenge: "FirstCry Intellitots Gajapati Nagar wanted to showcase their state-of-the-art campus and nurture-first philosophy to parents. They needed top-tier creative assets to increase admissions enquiries in Bhubaneswar.",
    solution: "We directed and produced a series of high-quality cinematic tours and advertisement shoots highlighting safety protocols, interactive play areas, and classroom activities. We launched these creatives via local hyper-targeted campaigns.",
    website: "https://www.instagram.com/p/CqM0LFly-jw/",
    topBadge: "PRESCHOOL / DAYCARE",
    cardBgType: "dark",
    tags: ["Cinematic Shoot", "Commercial Ads", "Social Media"],
    metricBadge: "↑ 5.0★ Rated Review",
    metricValue: "5.0★",
    metricLabel: "CLIENT RATING",
    logoUrl: "/images/firstcry-intellitots-logo.jpg",
    instagramEmbedId: "CqM0LFly-jw",
    testimonial: {
      author: "Nikesh Patro",
      role: "Owner, Gajapati Nagar Branch",
      text: "BotMate delivered an exceptional cinematic shoot that perfectly captured our preschool's vibrant spirit. Their advertising campaign reached thousands of local parents, boosting our enrollment queries beyond expectations. Professional, creative, and highly recommended!",
      rating: 5,
      instagramUrl: "https://www.instagram.com/p/DSDQ7ydgVrJ/",
      avatarUrl: "/images/nikesh-patro.jpg"
    }
  },
  {
    slug: "sandal-verse",
    client: "Sandal Verse Pvt. Ltd.",
    industry: "Agro-Forestry & Farming",
    category: "Branding",
    gradient: "linear-gradient(135deg, #0b2210 0%, #153c1b 50%, #051007 100%)",
    initials: "SV",
    tagline: "Capturing the scale of sandalwood contract farming through cinematic videography.",
    result: "5★ Rating & High Brand Value",
    metrics: ["5.0★ Client Rating", "4K Video Quality", "250+ Acres Showcased", "100% Client Satisfaction"],
    challenge: "Sandal Verse Pvt. Ltd. needed to present the expansive scale, scientific management, and long-term value of their sandalwood contract farming plantation to global investors and buyers.",
    solution: "We directed and produced a premium cinematic brand film using professional 4K cameras and high-end drone shoots. This captured the vastness of the plantation, soil management techniques, and climate-positive impact, boosting their brand equity.",
    website: "https://sandalverse.com",
    topBadge: "AGRO-FORESTRY",
    cardBgType: "dark",
    tags: ["Cinematic Shoot", "Drone Videography", "Brand Video"],
    metricBadge: "↑ 5.0★ Rated Review",
    metricValue: "4K",
    metricLabel: "VIDEO QUALITY",
    logoUrl: "/images/sandal-verse-logo.jpg",
    testimonial: {
      author: "Mr. Amitanshu Rout",
      role: "CEO, Sandal Verse Pvt. Ltd.",
      text: "The cinematic and drone shoot produced by BotMate exceeded our expectations. They beautifully captured the scale and vision of our white sandalwood project, providing us with an invaluable asset for investor pitching and marketing. Absolute professionals!",
      rating: 5,
      avatarUrl: "/images/amitanshu-rout.jpg"
    }
  },
  {
    slug: "kippl",
    client: "KIPPL",
    industry: "Real Estate & Infrastructure",
    category: "Branding",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%)",
    initials: "KP",
    tagline: "Designing premium brochures and informative brand assets for infrastructure leaders.",
    result: "4.7★ Rating & Max Alignment",
    metrics: ["4.7★ Client Rating", "15+ Creative Assets", "100% Brand Alignment", "4.8/5 Design Score"],
    challenge: "Kapilash Infrasol Project Pvt. Ltd. (KIPPL), based at DLF Cyber City, Patia, Bhubaneswar, needed professional corporate brochures, flyers, and informative branding assets to pitch their infrastructure projects to enterprise clients and government bodies.",
    solution: "We designed a complete set of premium marketing brochures, corporate profile decks, and technical infographics. The layouts perfectly incorporated their brand guidelines and highlighted project delivery timelines, leading to successful corporate bidding.",
    website: "https://kippl.in",
    topBadge: "INFRASTRUCTURE",
    cardBgType: "dark",
    tags: ["Brochure Design", "Information Design", "Corporate Identity"],
    metricBadge: "↑ 4.7★ Rated Designs",
    metricValue: "15+",
    metricLabel: "ASSETS DELIVERED",
    logoUrl: "/images/kippl-logo.jpg",
    testimonial: {
      author: "Mr. Ankit Singla",
      role: "CEO, KIPPL",
      text: "The brochure designs and corporate presentation decks provided by BotMate were of outstanding quality. They perfectly aligned with our corporate identity and helped us pitch our projects to corporate clients with great success. Highly recommended!",
      rating: 5,
      avatarUrl: "/images/ankit-singla.jpg"
    }
  },
  {
    slug: "technest-solutions",
    client: "TechNest Solutions",
    industry: "B2B SaaS",
    category: "SEO & Ads",
    gradient: "linear-gradient(135deg, #ff9f00 0%, #cc6600 40%, #331a00 100%)",
    initials: "TN",
    tagline: "5× ROAS. Every single month.",
    result: "5× ROAS Consistently",
    metrics: ["5× ROAS on Meta Ads", "₹80K/Month Ad Budget Managed", "+95% MQL Growth", "Cost per Lead reduced by 60%"],
    challenge: "TechNest was spending ₹80,000/month on Meta Ads with a 1.2× ROAS and no clear attribution model. Their targeting was broad and their creatives hadn't been refreshed in 6 months.",
    solution: "We rebuilt their entire paid ads funnel — new audience segmentation by job title and company size, fresh creative sets every 3 weeks, a retargeting ladder from awareness to demo-booking, and weekly budget reallocation based on ROAS data.",
    website: "https://technestsolutions.com",
    topBadge: "HEALTH & WELLNESS",
    cardBgType: "light",
    tags: ["Meta Ads", "Audience Segmentation", "Funnel Optimization"],
    metricBadge: "↑ 5x ROAS in 30 days",
    metricValue: "5x",
    metricLabel: "ROAS"
  },
  {
    slug: "glowbox-india",
    client: "GlowBox India",
    industry: "Beauty & D2C",
    category: "Branding",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #cc3300 40%, #1a0800 100%)",
    initials: "GB",
    tagline: "80% of queries handled by AI. Before 9am.",
    result: "80% Queries Automated",
    metrics: ["80% Customer Queries Automated", "3× Faster Response Time", "4.8★ Customer Satisfaction", "₹1.2L/Month Support Cost Saved"],
    challenge: "GlowBox India's support team was handling 400+ daily WhatsApp and Instagram DM queries manually. Response time averaged 6 hours, causing cart abandonment and negative reviews.",
    solution: "We built a custom AI chatbot integrated with their product catalog, FAQ database, and order tracking API. The bot handles size queries, order status, returns, and product recommendations — escalating only complex issues to humans.",
    website: "https://glowboxindia.com",
    topBadge: "SAAS / B2B",
    cardBgType: "light",
    tags: ["AI Chatbot", "WhatsApp API", "CRM Integration"],
    metricBadge: "↑ 80% Queries Automated",
    metricValue: "80%",
    metricLabel: "QUERIES AUTOMATED"
  }
];
