"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Copy, Check, Linkedin, Twitter, MessageSquare, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import MorphBlob from "@/components/MorphBlob";

// ─────────────────────────────────────────────
// POSTS DATA
// ─────────────────────────────────────────────

interface Section {
  id: string;
  h2: string;
  paragraphs: string[];
  h3s?: { h3: string; text: string }[];
  callout?: string;
  stats?: { number: string; label: string }[];
}

interface Post {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  gradient: string;
  image: string;
  bio: string;
  content: {
    intro: string;
    sections: Section[];
  };
}

export const POSTS: Record<string, Post> = {
  "ai-replacing-marketing-tasks": {
    slug: "ai-replacing-marketing-tasks",
    category: "AI Marketing",
    readTime: "5 min read",
    title: "How AI is Replacing Manual Marketing Tasks in 2025",
    excerpt: "From automated copywriting to predictive audience targeting — discover how forward-thinking brands are scaling faster using AI-powered strategies.",
    author: "Dev Dibyansu",
    authorInitials: "DD",
    date: "May 12, 2025",
    gradient: "linear-gradient(135deg, #00e5ff 0%, #0066cc 50%, #003366 100%)",
    image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1779599136/ai-marketing_gefmys.jpg",
    bio: "Dev Dibyansu is the visionary founder and CEO of BotMate AI. He leads the overall strategy, business growth, and long-term direction of the brand.",
    content: {
      intro: "The year 2025 marks a watershed moment in digital growth. The transition from manual campaign coordination to automated, artificial intelligence-driven infrastructure has reached full maturity. For years, marketing teams spent precious hours formatting spreadsheets, manually setting up A/B testing variants, drafting generic email replies, and adjusting bidding budgets across advertising channels. Today, these tasks are not only automated but actively optimized by specialized AI systems. Forward-thinking brands are shifting their human capital away from tedious coordination and redirecting it toward high-level strategy and storytelling.",
      sections: [
        {
          id: "what-tasks-ai-is-replacing",
          h2: "What Tasks AI is Replacing",
          paragraphs: [
            "Several core operational tasks that once consumed entire agency departments have been completely automated by modern AI models. In copywriting, advanced natural language models construct thousands of ad variations, product descriptions, and promotional emails tailored to specific buyer personas in seconds. Rather than writing three variations of a Facebook headline, AI copy generators evaluate demographic datasets to formulate dozens of highly targetable copy choices."
          ],
          h3s: [
            {
              h3: "Natural Language Generation for Copywriting",
              text: "Advanced language engines analyze user browsing history and brand tone guidelines to produce personalized copy at scale. This allows brands to communicate with dynamic messaging based on user behavioral markers rather than broadcasting static, generic statements to a general audience."
            },
            {
              h3: "Automated Multi-Variant A/B Testing",
              text: "Historically, running A/B tests required setting up landing pages, configuring trackable links, and manually evaluating analytics weekly. AI engines now run continuously, analyzing user interaction in real time, automatically retiring underperforming creative formats, and shifting budgets toward successful layout patterns without any human developer intervention."
            }
          ]
        },
        {
          id: "roi-difference-ai-vs-manual",
          h2: "The ROI Difference — AI vs Manual Campaigns",
          paragraphs: [
            "The commercial justification for deploying AI-driven marketing campaigns lies in the stark performance metrics compared to manual structures. Human marketers, regardless of experience, are constrained by time and cognitive bandwidth. They analyze historical reports that are days or weeks old. AI, conversely, processes millions of incoming data signals instantly. By adjusting keyword bids, programmatic ads, and email flow schedules on the fly, automated engines optimize budgets before wasteful spending accumulates."
          ],
          stats: [
            { number: "3x", label: "Campaign Execution Speed" },
            { number: "60%", label: "Operating Cost Reduction" },
            { number: "5x", label: "Creative Asset Output" }
          ]
        },
        {
          id: "how-botmate-uses-ai",
          h2: "How BotMate Uses AI in Client Campaigns",
          paragraphs: [
            "At BotMate, we have built a custom marketing stack that integrates predictive modeling with neural content distribution. We do not just use off-the-shelf software; we engineer specialized programmatic integrations that monitor competitive landscapes and adjust campaign variables dynamically. Our systems automate budget allocation between channels, ensuring search, social, and display campaigns collaborate rather than compete for the same user attention.",
            "By implementing behavioral triggers, our client websites adapt their visual elements and call-to-actions dynamically based on the traffic source and user intent. This creates a frictionless pathway from discovery to checkout, multiplying conversion efficiency."
          ],
          callout: "Our AI stack has driven 8x average ROI across 50+ brands by combining predictive analytics with automated real-time bidding."
        },
        {
          id: "what-ai-cannot-replace",
          h2: "What AI Cannot Replace",
          paragraphs: [
            "Despite the profound computational power of machine learning, there remain essential components of marketing that defy automation. AI is built upon analyzing existing historical datasets to predict future likelihoods. It relies on patterns. True marketing breakthroughs, however, often occur when a brand breaks the pattern, doing something entirely unexpected that captures the cultural zeitgeist."
          ],
          h3s: [
            {
              h3: "Strategic Brand Empathy",
              text: "Building deep trust requires an intuitive understanding of human vulnerability, aspirations, and values. AI can simulate sympathetic copy, but defining a brand's moral compass and long-term positioning requires human leadership."
            },
            {
              h3: "High-Concept Creative Vision",
              text: "Creating a revolutionary brand message that challenges societal assumptions or invents a new aesthetic category is a distinctively human talent. AI can optimize the distribution of the message, but the spark of conceptual genius remains ours."
            }
          ]
        },
        {
          id: "how-to-start-integrating-ai",
          h2: "How to Start Integrating AI into Your Marketing Today",
          paragraphs: [
            "Transitioning your business toward AI integration does not require replacing your entire team overnight. Instead, look for micro-opportunities where automation can relieve immediate bottlenecks. Begin by mapping your current workflow to identify repetitive, rule-based tasks such as report collection, scheduling, or basic email sorting. These are the prime candidates for automation.",
            "To successfully kickstart your AI transition, focus on these actionable steps:"
          ]
        }
      ]
    }
  },
  "instagram-algorithm-2025": {
    slug: "instagram-algorithm-2025",
    category: "Social Media",
    readTime: "7 min read",
    title: "The Instagram Algorithm Decoded: What Actually Works in 2025",
    excerpt: "We analysed 10,000+ posts to uncover the exact patterns that drive real engagement, reach, and follower growth on Instagram this year.",
    author: "Aditya",
    authorInitials: "A",
    date: "April 28, 2025",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #cc3300 50%, #1a0a00 100%)",
    image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1779599138/instagram-algorithm_fpki1i.jpg",
    bio: "Aditya is a senior social media strategist and content developer at BotMate AI. He specializes in demographic psychology and community cultivation, leading brand growth campaigns.",
    content: {
      intro: "Navigating Instagram's organic distribution landscape has become highly challenging for brand managers. In 2025, Meta has refined its artificial intelligence sorting recommendation engine, moving further away from simple chronological feeds and even user follower lists, choosing instead to prioritize content based on deep predictive interest indicators. If your business is still relying on basic posting strategies from a year ago, you are likely noticing a major decline in organic impressions. We conducted a rigorous analysis of over 10,000 posts to extract the core mathematical patterns that dictate visual reach today.",
      sections: [
        {
          id: "ranking-signals-2025",
          h2: "The 5 Ranking Signals Instagram Weighs in 2025",
          paragraphs: [
            "The Instagram algorithm is not a single code structure; it is a collection of neural networks that evaluate content through distinct classification layers. For organic feed posts, reels, and stories, five primary indicators determine how far your content is distributed to non-followers. Ranking high on these signals is the only way to break out of algorithmic stagnation."
          ],
          h3s: [
            {
              h3: "Reels Watch Time & Completion Rate",
              text: "Instagram measures the millisecond duration a user spends on your video. If a user watches a reel multiple times or stays until the final frame, the algorithm triggers a massive reach multiplier, categorizing the video as high-value."
            },
            {
              h3: "DMs, Shares, and Micro-Interactions",
              text: "The absolute highest signal of content quality in 2025 is when a viewer shares your post via Direct Messages (DMs). This behavior tells Meta that your content is so valuable it prompted a private human conversation, which is the platform's core goal."
            }
          ]
        },
        {
          id: "data-revelations",
          h2: "What Our Data from 10,000+ Posts Revealed",
          paragraphs: [
            "By evaluating thousands of content pieces across B2B, e-commerce, and service-based profiles, our research team identified several surprising discrepancies between popular social media myths and actual empirical performance. Relying on generic hashtags or standard schedules has virtually zero impact on distribution. Instead, visual quality, initial speed of save actions, and average watch time ratio were the determining elements of successful reach."
          ],
          stats: [
            { number: "3x", label: "Reels Reach Multiplier" },
            { number: "2.1x", label: "Carousel Save Increase" },
            { number: "8.2%", label: "Average Brand Engagement" }
          ]
        },
        {
          id: "posting-cadence",
          h2: "The Posting Cadence That Actually Works",
          paragraphs: [
            "The era of posting three times a day to beat the algorithm is officially dead. In fact, flooding your profile with low-quality content actively harms your account's standing. If the recommendation engine delivers your post to an initial test group and they swipe away, your profile's internal quality score drops. In 2025, a disciplined cadence prioritizing deep engagement over volume is the most effective approach."
          ],
          h3s: [
            {
              h3: "Quality Over Frequency",
              text: "Deploying 3 to 4 premium, highly engaging posts per week consistently outperforms low-effort daily posting. Give each post room to breathe in the feed for at least 36 hours so the algorithm can fully test it with different audience segments."
            },
            {
              h3: "Optimal Story Distribution",
              text: "While feed posts should be curated, Stories are your tool for building intimacy. Maintaining 5 to 8 interactive Stories daily keeps your brand active in the top bubble row and builds close-friend lists."
            }
          ]
        },
        {
          id: "content-formats-ranked",
          h2: "Content Formats Ranked by Performance in 2025",
          paragraphs: [
            "Not all content formats are created equal. When planning your content calendar, you must allocate resources based on the format's mathematical weight in the feed. Short-form looping Reels are the primary vehicle for raw audience discovery and brand awareness. Multi-slide educational Carousels are the primary vehicle for driving account saves, which signals authority and boosts search positioning. Static, single images are best reserved for clean announcements or high-impact branding assets.",
            "By balancing these formats, you construct a balanced funnel that introduces new viewers to your ecosystem, educates them, and converts them into engaged followers."
          ]
        },
        {
          id: "how-botmate-manages-instagram",
          h2: "How BotMate Manages Instagram for 30+ Brands",
          paragraphs: [
            "At BotMate, we manage social presence through a combination of creative production and analytical insight. We monitor trending audio, visual hooks, and industry changes hourly, adapting our clients' content strategies dynamically. Rather than guessing what works, we build structured visual templates that make high-value sharing and saving an intuitive action for the viewer.",
            "Our design team crafts visual assets that look premium, and our copywriters construct captions that spark engagement. This system builds social communities that actively drive business revenue."
          ],
          callout: "8.2% average engagement rate vs industry average of 1.4% achieved across our portfolio brands."
        }
      ]
    }
  },
  "website-losing-customers": {
    slug: "website-losing-customers",
    category: "Web & SEO",
    readTime: "6 min read",
    title: "Why Your Website Is Silently Losing You Customers",
    excerpt: "Page speed, UX failures, and poor conversion architecture — the real reasons your site visitors leave without buying, and exactly how to fix them.",
    author: "Dev Dibyansu",
    authorInitials: "DD",
    date: "April 10, 2025",
    gradient: "linear-gradient(135deg, #00ff9d 0%, #006644 50%, #001a11 100%)",
    image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1779599139/website-conversions_bwwjk5.jpg",
    bio: "Dev Dibyansu is the visionary founder and CEO of BotMate AI. He leads the overall strategy, business growth, and long-term direction of the brand.",
    content: {
      intro: "Many businesses invest heavily in driving paid advertising and social media traffic to their websites, only to wonder why their monthly revenue remains stagnant. They focus entirely on top-of-funnel traffic while neglecting the conversion platform itself. In the modern digital economy, users possess an incredibly low tolerance for friction. A beautiful website layout is entirely useless if it takes four seconds to load, hides its pricing structure, or makes finding the checkout button an annoying puzzle. Your website is likely leaking high-intent customers every day.",
      sections: [
        {
          id: "silent-killers",
          h2: "The 5 Silent Killers of Website Conversions",
          paragraphs: [
            "Conversions do not fail due to a single major glitch; they fail due to a series of subtle user experience design flaws. The primary killer is layout friction—forcing the user to guess where to go next. The second is lack of social proof; users will not input credit card details without visible trust markers. The third is bad mobile responsiveness, followed by complex forms and unclear calls-to-action."
          ],
          h3s: [
            {
              h3: "Confusing Layout Architecture",
              text: "If a user lands on your site and cannot identify what you sell within three seconds, they will leave. Clean layouts with clear typographic hierarchy are essential for guiding visitors to conversion."
            },
            {
              h3: "Over-Complicated Web Forms",
              text: "Every extra input field you add to a signup or checkout form decreases conversion probability. Keep form fields minimal to ensure a quick and seamless user experience."
            }
          ]
        },
        {
          id: "page-speed-cost",
          h2: "Page Speed — Every 1 Second Costs You",
          paragraphs: [
            "The direct mathematical relationship between server response latency and financial loss is well documented. Modern search engine algorithms like Google's Core Web Vitals evaluate loading metrics as a ranking signal, burying slow websites in search results. More importantly, real human users will simply abandon the site if it does not load instantly. High-fidelity layouts must be backed by premium hosting and optimized code assets."
          ],
          stats: [
            { number: "7%", label: "Conversion Drop per 1s Delay" },
            { number: "53%", label: "Bounce Rate if Load > 3s" },
            { number: "8%", label: "Average BotMate Site Conversion" }
          ]
        },
        {
          id: "ux-mistakes",
          h2: "The UX Mistakes We See on Every Site We Audit",
          paragraphs: [
            "During our comprehensive site audits at BotMate, we routinely identify consistent layout and design mistakes. Many websites bury their core call-to-action buttons in obscure footer areas or style them in colors that match the background, making them blend in. Others display intrusive, large popups immediately upon page load, frustrating visitors before they even read the headline."
          ],
          h3s: [
            {
              h3: "Invisible Contact Options",
              text: "Forcing users to hunt for support information or booking forms destroys buying intent. Make your primary CTA highly visible in a sticky navigation bar."
            },
            {
              h3: "Static Social Proof",
              text: "Displaying generic, text-only reviews without photos or third-party platforms (like Google or Trustpilot) does not build trust. Authenticated social proof is crucial."
            }
          ]
        },
        {
          id: "what-high-converting-site-looks-like",
          h2: "What a High-Converting Website Actually Looks Like",
          paragraphs: [
            "A high-converting website is designed around user intent, not just aesthetic trends. It features a sticky navigation header, a clear headline that explains value, and primary CTAs that are visible without scrolling. The website speed is optimized through modern frameworks like Next.js, and visual assets are compressed for fast loading. Every page flows logically toward a single call to action.",
            "By removing visual distractions and layout friction, you create a direct path for the user to make a purchase or book a strategy call."
          ]
        },
        {
          id: "how-botmate-builds-websites",
          h2: "How BotMate Builds Websites That Convert",
          paragraphs: [
            "At BotMate, we engineer websites using modern, high-performance frameworks like Next.js and Tailwind CSS. We construct custom digital architectures that render instantly. Our designs prioritize conversion rate optimization (CRO) from the initial wireframe stage. We integrate advanced analytics to monitor user behavior, continuously testing and refining layout elements to maximize conversions.",
            "By partnering with us, you ensure your site is built to convert visitors into loyal customers."
          ],
          callout: "Our average client site converts at 8% vs the industry average of 2.5% by implementing dynamic personalization and behavioral analytics."
        }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const post = POSTS[slug];

  const [activeId, setActiveId] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // If slug is invalid, redirect to blog or show error
  useEffect(() => {
    if (slug && !post) {
      router.push("/blog");
    }
  }, [slug, post, router]);

  // Scroll spy effect to highlight active TOC item
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset for navbar and padding
      let activeSectionId = "";

      for (const section of post.content.sections) {
        const el = sectionsRef.current[section.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            activeSectionId = section.id;
            break;
          }
        }
      }

      // If we are at the very top of the page, default to first section or empty
      if (window.scrollY < 200) {
        activeSectionId = post.content.sections[0]?.id || "";
      }

      if (activeSectionId && activeSectionId !== activeId) {
        setActiveId(activeSectionId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [post, activeId]);

  if (!post) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #060a0f;
            color: #00e5ff;
            font-family: "Montserrat", sans-serif;
          }
          .loader {
            border: 3px solid rgba(0, 229, 255, 0.1);
            border-top: 3px solid #00e5ff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Get related articles (the other 2 posts)
  const relatedPosts = Object.values(POSTS).filter((p) => p.slug !== post.slug);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = sectionsRef.current[id];
    if (el) {
      const topOffset = el.offsetTop - 120; // accounting for sticky navbar
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
      setActiveId(id);
      setIsMobileTocOpen(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(post.title);

  return (
    <main className="article-main">
      {/* Background patterns */}
      <div className="bg-decorations" aria-hidden="true">
        <div className="grid-overlay optimized-bg-pattern" />
        <MorphBlob className="blob-1" />
        <MorphBlob className="blob-2" />
      </div>

      <div className="article-container">
        {/* ── BREADCRUMBS ── */}
        <div className="breadcrumb-row">
          <Link href="/blog" className="breadcrumb-link back-link">
            <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back to Blog
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-category">{post.category}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">{post.title}</span>
        </div>

        {/* ── ARTICLE HERO ── */}
        <section className="article-hero">
          <span className="category-pill">{post.category}</span>
          <h1 className="article-title">{post.title}</h1>
          
          <div className="meta-row">
            <div className="meta-avatar">{post.authorInitials}</div>
            <span className="meta-author">{post.author}</span>
            <span className="meta-dot">·</span>
            <span className="meta-date">{post.date}</span>
            <span className="meta-dot">·</span>
            <span className="meta-readtime">{post.readTime}</span>
          </div>

          <motion.div
            className="cyan-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </section>

        {/* ── MOBILE ACCORDION TABLE OF CONTENTS ── */}
        <div className="mobile-toc-wrapper">
          <button 
            className="mobile-toc-header"
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            aria-expanded={isMobileTocOpen}
          >
            <span className="mono-label">// TABLE OF CONTENTS</span>
            {isMobileTocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <AnimatePresence>
            {isMobileTocOpen && (
              <motion.div 
                className="mobile-toc-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="mobile-toc-list">
                  {post.content.sections.map((section) => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`}
                        onClick={(e) => handleTocClick(e, section.id)}
                        className={`mobile-toc-link ${activeId === section.id ? "active" : ""}`}
                      >
                        {section.h2}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── TWO-COLUMN CONTENT LAYOUT ── */}
        <div className="content-layout">
          {/* Sticky Left Table of Contents */}
          <aside className="toc-column">
            <div className="toc-sticky-container">
              <span className="toc-title">// TABLE OF CONTENTS</span>
              <ul className="toc-list">
                {post.content.sections.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`} 
                      onClick={(e) => handleTocClick(e, section.id)}
                      className={`toc-link ${activeId === section.id ? "active" : ""}`}
                    >
                      {section.h2}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Article Content Area */}
          <article className="body-column">
            <p className="intro-text">{post.content.intro}</p>

            {post.content.sections.map((section) => (
              <section 
                key={section.id} 
                id={section.id}
                ref={(el) => { sectionsRef.current[section.id] = el; }}
                className="article-section"
              >
                <h2 className="section-h2">{section.h2}</h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="section-p">{p}</p>
                ))}

                {/* Optional H3 subsections */}
                {section.h3s && section.h3s.map((h3Item, idx) => (
                  <div key={idx} className="h3-subsection">
                    <h3 className="section-h3">{h3Item.h3}</h3>
                    <p className="section-p">{h3Item.text}</p>
                  </div>
                ))}

                {/* Optional Callout Box */}
                {section.callout && (
                  <div className="callout-box">
                    <p className="callout-text">{section.callout}</p>
                  </div>
                )}

                {/* Optional Key Stat Boxes */}
                {section.stats && (
                  <div className="stats-container">
                    {section.stats.map((stat, idx) => (
                      <div key={idx} className="stat-card">
                        <span className="stat-number">{stat.number}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render bullet points for the last guide section */}
                {section.id === "how-to-start-integrating-ai" && (
                  <ul className="custom-bullet-list">
                    <li>
                      <strong>Audit Internal Bottlenecks:</strong> Highlight time-sink activities like data entry or email drafts that could be instantly managed by software.
                    </li>
                    <li>
                      <strong>Deploy Low-Risk Automation:</strong> Launch micro-automations for scheduling or review collections before changing your core marketing tools.
                    </li>
                    <li>
                      <strong>Educate & Align Teams:</strong> Assist your employees in understanding AI prompts and analytical platforms, turning them into operators rather than manual workers.
                    </li>
                    <li>
                      <strong>Analyze and Iterate:</strong> Monitor metrics weekly, allowing your automated bidding networks to recalibrate and optimize budgets.
                    </li>
                  </ul>
                )}
              </section>
            ))}

            {/* ── SHARE ROW ── */}
            <div className="share-row">
              <span className="share-label">Share this article:</span>
              <div className="share-buttons">
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} />
                  <span>Twitter / X</span>
                </a>
                <a 
                  href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn"
                  aria-label="Share on WhatsApp"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </a>
                <button 
                  onClick={handleCopyLink}
                  className={`share-btn copy-btn ${copied ? "copied" : ""}`}
                  aria-label="Copy Link to Clipboard"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            {/* ── AUTHOR CARD ── */}
            <div className="author-card">
              <div className="author-avatar-large">{post.authorInitials}</div>
              <div className="author-details">
                <h4 className="author-name">{post.author}</h4>
                <span className="author-role">Content Strategist at BotMate AI</span>
                <p className="author-bio">{post.bio}</p>
              </div>
            </div>
          </article>
        </div>

        {/* ── RELATED ARTICLES STRIP ── */}
        <section className="related-section">
          <h2 className="related-title">// MORE FROM BOTMATE</h2>
          <div className="related-grid">
            {relatedPosts.map((related) => (
              <Link href={`/blog/${related.slug}`} key={related.slug} className="related-card-link">
                <div className="related-card">
                  <div className="gradient-illustration" style={{ backgroundImage: `url(${related.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="glow-effect" />
                  </div>
                  <div className="related-card-content">
                    <div className="related-top">
                      <span className="related-category">{related.category}</span>
                      <span className="related-readtime">{related.readTime}</span>
                    </div>
                    <h3 className="related-card-title">{related.title}</h3>
                    <p className="related-excerpt">{related.excerpt}</p>
                    <div className="related-bottom">
                      <div className="author-row">
                        <div className="author-avatar-small">{related.authorInitials}</div>
                        <span className="author-name-small">{related.author}</span>
                      </div>
                      <span className="read-more-text">Read Article →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-banner">
          <MorphBlob className="cta-blob-1" />
          <MorphBlob className="cta-blob-2" />
          <div className="cta-banner-content">
            <h2 className="cta-banner-heading">Ready to apply these strategies to your brand?</h2>
            <Link href="/contact" className="cta-banner-btn">
              Book a Free Call
            </Link>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        .article-main {
          background: #060a0f;
          min-height: 100vh;
          position: relative;
          color: #fff;
          font-family: "Montserrat", sans-serif !important;
          padding-top: 80px; /* offset for fixed navbar */
          overflow-x: hidden;
        }

        .article-main * {
          font-family: "Montserrat", sans-serif !important;
          box-sizing: border-box;
        }

        .bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 2px 2px, rgba(0, 229, 255, 0.03) 1px, transparent 0);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 90%);
        }

        .blob-1 {
          top: 10%;
          left: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
          opacity: 0.7;
        }

        .blob-2 {
          bottom: 30%;
          right: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%);
          opacity: 0.5;
        }

        .article-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }

        /* ── BREADCRUMBS ── */
        .breadcrumb-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: monospace !important;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 40px;
          overflow-x: auto;
          white-space: nowrap;
          padding-bottom: 8px;
        }

        .breadcrumb-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb-link:hover {
          color: #00e5ff;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          background: rgba(0, 229, 255, 0.06);
          border: 1px solid rgba(0, 229, 255, 0.15);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .breadcrumb-sep {
          color: #00e5ff;
          font-weight: bold;
        }

        .breadcrumb-category {
          color: rgba(0, 229, 255, 0.8);
          font-weight: 600;
        }

        .breadcrumb-active {
          color: rgba(255, 255, 255, 0.8);
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 300px;
        }

        /* ── ARTICLE HERO ── */
        .article-hero {
          margin-bottom: 48px;
          text-align: left;
        }

        .category-pill {
          display: inline-block;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: #00e5ff;
          font-family: monospace !important;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .article-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin: 0 0 24px 0;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          flex-wrap: wrap;
        }

        .meta-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #00e5ff;
          background: rgba(0, 229, 255, 0.1);
          color: #00e5ff;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.5px;
        }

        .meta-author {
          font-weight: 700;
          color: #fff;
        }

        .meta-dot {
          color: rgba(0, 229, 255, 0.4);
        }

        .cyan-line {
          height: 2px;
          background: linear-gradient(90deg, #00e5ff, transparent);
          margin-top: 32px;
          transform-origin: left;
        }

        /* ── TABLE OF CONTENTS MOBILE ── */
        .mobile-toc-wrapper {
          display: none;
          background: rgba(0, 229, 255, 0.03);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 32px;
        }

        .mobile-toc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0;
        }

        .mono-label {
          font-family: monospace !important;
          color: #00e5ff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .mobile-toc-content {
          overflow: hidden;
          margin-top: 16px;
        }

        .mobile-toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid rgba(0, 229, 255, 0.1);
          padding-top: 16px;
        }

        .mobile-toc-link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }

        .mobile-toc-link.active {
          color: #00e5ff;
          font-weight: 700;
        }

        /* ── TWO COLUMN CONTENT LAYOUT ── */
        .content-layout {
          display: flex;
          gap: 64px;
          align-items: start;
          margin-bottom: 80px;
        }

        /* Left Sticky TOC column */
        .toc-column {
          width: 240px;
          flex-shrink: 0;
          position: sticky;
          top: 100px;
        }

        .toc-sticky-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .toc-title {
          font-family: monospace !important;
          color: #00e5ff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          border-left: 2px solid rgba(0, 229, 255, 0.15);
        }

        .toc-list li {
          margin: 0;
          padding: 0;
        }

        .toc-link {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          display: block;
          padding: 10px 16px;
          line-height: 1.4;
          border-left: 2px solid transparent;
          margin-left: -2px;
          transition: all 0.2s;
        }

        .toc-link:hover {
          color: #fff;
          background: rgba(0, 229, 255, 0.02);
        }

        .toc-link.active {
          color: #00e5ff;
          font-weight: 700;
          border-left: 2px solid #00e5ff;
          background: rgba(0, 229, 255, 0.04);
        }

        /* Right Article content column */
        .body-column {
          flex: 1;
          min-width: 0; /* fixes overflow in flex elements */
        }

        .intro-text {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 40px;
          font-weight: 500;
        }

        .article-section {
          margin-bottom: 48px;
        }

        .section-h2 {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin: 48px 0 16px;
          padding-top: 80px; /* offset for anchor scroll positioning */
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }

        .section-p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.85;
          margin-bottom: 24px;
        }

        .h3-subsection {
          margin-top: 32px;
          margin-bottom: 16px;
        }

        .section-h3 {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 24px 0 12px;
        }

        .article-section strong {
          color: #fff;
          font-weight: 700;
        }

        /* Callout Box styling */
        .callout-box {
          background: rgba(0, 229, 255, 0.05);
          border-left: 3px solid #00e5ff;
          padding: 20px 24px;
          border-radius: 0 12px 12px 0;
          margin: 32px 0;
        }

        .callout-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 15.5px;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
          font-weight: 500;
        }

        /* Key stats boxes container */
        .stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 36px 0;
        }

        .stats-container .stat-card {
          background: rgba(0, 229, 255, 0.04);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 14px;
          padding: 24px 20px;
          text-align: center;
          transition: border-color 0.3s;
        }

        .stats-container .stat-card:hover {
          border-color: rgba(0, 229, 255, 0.4);
        }

        .stats-container .stat-number {
          display: block;
          font-size: 32px;
          font-weight: 900;
          color: #00e5ff;
          margin-bottom: 8px;
          font-family: monospace !important;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.25);
        }

        .stats-container .stat-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.4;
        }

        /* Custom Bullet List */
        .custom-bullet-list {
          list-style: none;
          padding: 0;
          margin: 28px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .custom-bullet-list li {
          position: relative;
          padding-left: 28px;
          font-size: 15.5px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.65);
        }

        .custom-bullet-list li::before {
          content: "›";
          position: absolute;
          left: 8px;
          top: -2px;
          color: #00e5ff;
          font-size: 22px;
          font-weight: bold;
          line-height: 1;
        }

        /* ── SHARE ROW ── */
        .share-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 32px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 64px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .share-label {
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .share-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 8px;
          padding: 10px 18px;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          background: transparent;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .share-btn:hover {
          border-color: #00e5ff;
          background: rgba(0, 229, 255, 0.06);
          color: #00e5ff;
        }

        .copy-btn.copied {
          border-color: #4ade80;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.06);
        }

        /* ── AUTHOR CARD ── */
        .author-card {
          display: flex;
          gap: 32px;
          background: rgba(0, 229, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 18px;
          padding: 32px;
          align-items: center;
        }

        .author-avatar-large {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 3px solid #00e5ff;
          background: rgba(0, 229, 255, 0.1);
          color: #00e5ff;
          font-size: 22px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
        }

        .author-details {
          flex: 1;
        }

        .author-name {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 4px 0;
        }

        .author-role {
          display: block;
          font-size: 12px;
          color: #00e5ff;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .author-bio {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
          margin: 0;
        }

        /* ── RELATED ARTICLES STRIP ── */
        .related-section {
          margin-top: 80px;
          margin-bottom: 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 60px;
        }

        .related-title {
          font-family: monospace !important;
          color: #00e5ff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 32px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .related-card-link {
          text-decoration: none;
          color: inherit;
        }

        .related-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .related-card-link:hover .related-card {
          transform: translateY(-6px);
          border-color: #00e5ff;
          box-shadow: 0 15px 40px rgba(0, 229, 255, 0.08);
        }

        .gradient-illustration {
          height: 180px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .glow-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .related-card-link:hover .glow-effect {
          opacity: 1;
        }

        .related-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .related-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .related-category {
          color: #00e5ff;
          font-family: monospace !important;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .related-readtime {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .related-card-title {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .related-excerpt {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.5;
          margin: 0 0 24px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .related-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .author-avatar-small {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1.5px solid #00e5ff;
          background: rgba(0, 229, 255, 0.1);
          color: #00e5ff;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .author-name-small {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .read-more-text {
          font-size: 13px;
          font-weight: 700;
          color: #00e5ff;
        }

        /* ── CTA BANNER ── */
        .cta-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 25, 55, 0.8) 0%, rgba(4, 8, 15, 0.95) 50%, rgba(0, 45, 75, 0.8) 100%);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 24px;
          padding: 64px 40px;
          text-align: center;
          overflow: hidden;
          margin-top: 80px;
          margin-bottom: 24px;
        }

        .cta-banner-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-banner-heading {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 32px 0;
          letter-spacing: -1px;
        }

        .cta-banner-btn {
          display: inline-block;
          background: #00e5ff;
          color: #060a0f;
          padding: 14px 36px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.25s;
          box-shadow: 0 5px 20px rgba(0, 229, 255, 0.35);
        }

        .cta-banner-btn:hover {
          background: #00f7ff;
          box-shadow: 0 8px 30px rgba(0, 229, 255, 0.6);
          transform: translateY(-2px);
        }

        .cta-blob-1 {
          top: -150px;
          left: -150px;
          opacity: 0.15;
        }

        .cta-blob-2 {
          bottom: -150px;
          right: -150px;
          opacity: 0.1;
        }

        /* ── RESPONSIVE DESIGN ── */
        @media (max-width: 960px) {
          .content-layout {
            gap: 32px;
          }
          .toc-column {
            width: 200px;
          }
        }

        @media (max-width: 768px) {
          .article-container {
            padding: 24px 16px;
          }

          .breadcrumb-row {
            margin-bottom: 24px;
          }

          .content-layout {
            flex-direction: column;
            gap: 0;
          }

          .toc-column {
            display: none; /* Hide sidebar TOC on mobile */
          }

          .mobile-toc-wrapper {
            display: block; /* Show mobile accordion TOC */
          }

          .body-column {
            width: 100%;
          }

          .intro-text {
            font-size: 16px;
            margin-bottom: 24px;
          }

          .section-h2 {
            font-size: 22px;
            margin: 32px 0 12px;
            padding-top: 70px;
          }

          .section-p {
            font-size: 14.5px;
            margin-bottom: 16px;
          }

          .stats-container {
            grid-template-columns: 1fr; /* Stack stats on mobile */
            gap: 12px;
          }

          .stats-container .stat-card {
            padding: 16px;
          }

          .share-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 24px 0;
            margin-top: 40px;
          }

          .share-buttons {
            width: 100%;
          }

          .share-btn {
            width: 100%;
            justify-content: center;
          }

          .author-card {
            flex-direction: column;
            text-align: center;
            padding: 24px;
            gap: 16px;
          }

          .related-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .cta-banner {
            padding: 40px 20px;
            margin-top: 48px;
          }
        }
      `}</style>
    </main>
  );
}
