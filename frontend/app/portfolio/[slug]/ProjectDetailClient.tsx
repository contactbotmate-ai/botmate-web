"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { Project } from "../projectsData";
import Footer from "@/components/Footer";
import { useGetStarted } from "@/context/GetStartedContext";
import { useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   AR CORNER BRACKETS
───────────────────────────────────────────── */
function ARBrackets({
  size = 20,
  color = "#00e5ff",
  thickness = 2,
}: {
  size?: number;
  color?: string;
  thickness?: number;
}) {
  const s = `${size}px`;
  const b = `${thickness}px solid ${color}`;
  return (
    <>
      <span style={{ position: "absolute", top: 0, left: 0, width: s, height: s, borderTop: b, borderLeft: b, pointerEvents: "none" }} />
      <span style={{ position: "absolute", top: 0, right: 0, width: s, height: s, borderTop: b, borderRight: b, pointerEvents: "none" }} />
      <span style={{ position: "absolute", bottom: 0, left: 0, width: s, height: s, borderBottom: b, borderLeft: b, pointerEvents: "none" }} />
      <span style={{ position: "absolute", bottom: 0, right: 0, width: s, height: s, borderBottom: b, borderRight: b, pointerEvents: "none" }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNT UP METRIC CARD
───────────────────────────────────────────── */
function MetricCard({ metric }: { metric: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(0);

  const parsed = useMemo(() => {
    const match = metric.match(/([0-9.]+)/);
    if (match) {
      const valStr = match[1];
      const index = match.index || 0;
      const prefix = metric.substring(0, index);
      const suffix = metric.substring(index + valStr.length);
      return {
        prefix,
        value: parseFloat(valStr),
        isDecimal: valStr.includes('.'),
        suffix
      };
    }
    return { prefix: "", value: 0, isDecimal: false, suffix: metric };
  }, [metric]);

  useEffect(() => {
    if (!inView || parsed.value === 0) return;

    let start = 0;
    const end = parsed.value;
    const duration = 1500; // ms
    const increment = end / (duration / 16); // ~60fps

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [parsed, inView]);

  const displayValue = parsed.isDecimal ? count.toFixed(1) : Math.floor(count);
  
  const symbolMatch = parsed.suffix.match(/^([%×x★LKs]+)/);
  const symbol = symbolMatch ? symbolMatch[0] : "";
  const labelText = parsed.suffix.substring(symbol.length).trim();

  // If labelText is empty, display the prefix as label
  const finalValueText = `${parsed.prefix}${displayValue}${symbol}`;
  const finalLabelText = labelText || parsed.prefix.trim();

  return (
    <div className="metric-card" ref={ref}>
      <span className="metric-num">{finalValueText}</span>
      <span className="metric-label">{finalLabelText}</span>
      <style jsx>{`
        .metric-card {
          background: rgba(0, 229, 255, 0.04);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          text-align: center;
          flex: 1 1 calc(50% - 12px);
          min-width: 140px;
          transition: border-color 0.3s;
        }
        .metric-card:hover {
          border-color: rgba(0, 229, 255, 0.4);
        }
        .metric-num {
          font-size: 28px;
          font-weight: 900;
          color: #00e5ff;
        }
        .metric-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          font-family: monospace !important;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const { openGetStarted } = useGetStarted();

  return (
    <main className="detail-main">
      <div className="detail-content-wrapper">
        {/* ── BACK NAVIGATION ── */}
        <div className="back-bar">
          <Link href="/portfolio" className="back-link">
            ← Back to Portfolio
          </Link>
        </div>

        {/* ── PROJECT HERO ── */}
        <section className="project-hero" style={{ background: project.gradient }}>
          <ARBrackets size={28} color="rgba(255, 255, 255, 0.3)" thickness={1.5} />
          <div className="hero-scan-line" aria-hidden="true" />
          <div className="hero-inner">
            {project.logoUrl ? (
              <div className={["firstcry-intellitots", "sandal-verse", "kippl"].includes(project.slug) ? "hero-logo-img-wrapper logo-bg-white" : "hero-logo-img-wrapper"}>
                <img src={project.logoUrl} alt={`${project.client} Logo`} className="hero-logo-img" />
              </div>
            ) : (
              <span className="hero-initials">{project.initials}</span>
            )}
            <h1 className="hero-client-name">{project.client}</h1>
            <div className="hero-tags">
              <span className="category-pill">{project.category}</span>
              <span className="industry-tag">{project.industry}</span>
            </div>
          </div>
        </section>

        {/* ── TWO COLUMN CONTENT LAYOUT ── */}
        <div className="content-layout">
          {/* Left Main Content */}
          <div className="main-column">
            <h2 className="project-tagline">&ldquo;{project.tagline}&rdquo;</h2>

            {/* The Challenge Section */}
            <section className="case-section">
              <span className="section-label">// THE CHALLENGE</span>
              <div className="challenge-callout">
                <p className="case-paragraph">{project.challenge}</p>
              </div>
            </section>

            {/* Our Solution Section */}
            <section className="case-section">
              <span className="section-label">// OUR SOLUTION</span>
              <p className="case-paragraph">{project.solution}</p>
            </section>

            {/* Client Video Review Section */}
            {project.youtubeEmbedId && (
              <section className="case-section">
                <span className="section-label">// CLIENT VIDEO REVIEW</span>
                <div className="video-player-wrapper">
                  <div className="video-player-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.youtubeEmbedId}`}
                      title={`${project.client} Video Review`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="video-iframe"
                    ></iframe>
                  </div>
                  <div className="video-overlay-details">
                    <div className="video-icon-badge">
                      <span className="play-icon">▶</span>
                      <span className="badge-text">Success Story Video</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Client Video Review (Instagram Embed) */}
            {project.instagramEmbedId && (
              <section className="case-section">
                <span className="section-label">// CLIENT VIDEO REVIEW</span>
                <div className="instagram-embed-wrapper">
                  <div className="instagram-embed-container">
                    <iframe
                      src={`https://www.instagram.com/p/${project.instagramEmbedId}/embed`}
                      title={`${project.client} Instagram Video`}
                      allowTransparency
                      frameBorder="0"
                      scrolling="no"
                      className="instagram-iframe"
                    ></iframe>
                  </div>
                </div>
              </section>
            )}

            {/* Client Testimonial Section */}
            {project.testimonial && (
              <section className="case-section testimonial-section">
                <span className="section-label">// CLIENT TESTIMONIAL</span>
                <div className="testimonial-card-large">
                  <div className="testimonial-grid-layout">
                    {/* Left Column: Large Image */}
                    {project.testimonial.avatarUrl && (
                      <div className="testimonial-left-col">
                        <div className="author-avatar-wrapper-large animate-glowing">
                          <img src={project.testimonial.avatarUrl} alt={project.testimonial.author} className="author-avatar-large" />
                          <div className="hud-corner-brackets">
                            <span className="h-tl" />
                            <span className="h-tr" />
                            <span className="h-bl" />
                            <span className="h-br" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Right Column: Content */}
                    <div className="testimonial-right-col">
                      <div className="testimonial-meta-row">
                        <div className="author-meta-details">
                          <h4 className="author-name-large">{project.testimonial.author}</h4>
                          <span className="author-role-large">{project.testimonial.role}</span>
                        </div>
                        <div className="rating-stars-large">
                          {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                            <span key={i} className="star-icon-large">★</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="testimonial-body-large">
                        <p className="testimonial-text-large">&ldquo;{project.testimonial.text}&rdquo;</p>
                      </div>
                      
                      {project.testimonial.instagramUrl && (
                        <div className="testimonial-footer-large">
                          <a href={project.testimonial.instagramUrl} target="_blank" rel="noopener noreferrer" className="testimonial-insta-link-large">
                            <span className="insta-icon">📸</span> View Owner's Post <span className="icon-arrow">↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Results Section */}
            <section className="case-section">
              <span className="section-label">// RESULTS</span>
              <div className="metrics-grid">
                {project.metrics.map((metric, idx) => (
                  <MetricCard key={idx} metric={metric} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sticky Sidebar */}
          <aside className="sidebar-column">
            <div className="sticky-sidebar">
              {/* Project Info Card */}
              <div className="info-card">
                <div className="info-row">
                  <span className="info-label">CLIENT</span>
                  <span className="info-value">{project.client}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">INDUSTRY</span>
                  <span className="info-value">{project.industry}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">CATEGORY</span>
                  <span className="info-value">{project.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">WEBSITE</span>
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="info-link">
                    {project.website.replace("https://", "")} <span className="icon-arrow">↗</span>
                  </a>
                </div>
              </div>

              {/* Contact CTA Card */}
              <div className="contact-card">
                <h3 className="contact-card-heading">Want similar results?</h3>
                <p className="contact-card-sub">Let&apos;s talk about your brand&apos;s growth potential.</p>
                <Link href="/contact" className="contact-btn">
                  Start a Project →
                </Link>
                <button onClick={openGetStarted} className="contact-text-link">
                  or Book a Free Strategy Call
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED PROJECTS STRIP ── */}
        <section className="related-section">
          <h2 className="related-title">// MORE WORK</h2>
          <div className="related-grid">
            {relatedProjects.map((rp) => (
              <Link href={`/portfolio/${rp.slug}`} key={rp.slug} className="related-card-link">
                <div className="related-card">
                  {/* Visual card top */}
                  <div className="related-card-visual" style={{ background: rp.gradient }}>
                    <ARBrackets size={10} color="rgba(0,229,255,0.2)" thickness={1.5} />
                    <span className="related-initials">{rp.initials}</span>
                    <span className="related-category-badge">{rp.category}</span>
                  </div>
                  {/* Card bottom */}
                  <div className="related-card-info">
                    <h3 className="related-client">{rp.client}</h3>
                    <span className="related-industry">{rp.industry}</span>
                    <p className="related-result">{rp.result}</p>
                    <span className="related-action">View Case Study →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── DETAIL CTA BANNER ── */}
        <section className="detail-cta-banner">
          <div className="cta-banner-content">
            <h2 className="cta-banner-heading">Ready to scale your business?</h2>
            <p className="cta-banner-sub">Join 50+ businesses already scaling with BotMate&apos;s AI-powered strategies.</p>
            <div className="cta-btns">
              <button 
                onClick={openGetStarted} 
                className="cta-banner-btn-primary"
              >
                Get Started →
              </button>
              <Link href="/contact" className="cta-banner-btn-outline">
                Book a Free Call
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        .detail-main {
          background: #060a0f;
          min-height: 100vh;
          position: relative;
          color: #fff;
          font-family: "Montserrat", sans-serif !important;
          padding-top: 80px; /* Offset for fixed navbar */
          overflow-x: hidden;
        }

        .detail-main * {
          font-family: "Montserrat", sans-serif !important;
          box-sizing: border-box;
        }

        .detail-content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px 80px;
          position: relative;
          z-index: 1;
        }

        /* ── BACK BAR ── */
        .back-bar {
          padding: 10px 0 30px;
        }

        .back-link {
          color: #00e5ff;
          text-decoration: none;
          font-family: monospace !important;
          font-size: 12px;
          font-weight: 500;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
          text-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
        }

        /* ── PROJECT HERO ── */
        .project-hero {
          position: relative;
          height: 340px;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          margin-bottom: 56px;
        }

        .hero-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          box-shadow: 0 0 10px rgba(255,255,255,0.4);
          animation: heroScan 6s linear infinite;
          opacity: 0.5;
          pointer-events: none;
        }

        @keyframes heroScan {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          padding: 24px;
        }

        .hero-initials {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 96px;
          font-weight: 900;
          color: rgba(255,255,255,0.15);
          user-select: none;
          z-index: -1;
          letter-spacing: -4px;
        }

        .hero-logo-img-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          z-index: 1;
        }

        .hero-logo-img-wrapper.logo-bg-white {
          background: #ffffff;
          padding: 10px 24px;
          border-radius: 14px;
          box-shadow: 0 6px 25px rgba(255, 255, 255, 0.15);
        }

        .hero-logo-img {
          display: block;
          max-height: 100px;
          max-width: 250px;
          object-fit: contain;
        }

        .hero-logo-img-wrapper:not(.logo-bg-white) .hero-logo-img {
          filter: drop-shadow(0 0 15px rgba(0,0,0,0.5));
        }

        .instagram-embed-wrapper {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          transition: border-color 0.3s ease;
        }

        .instagram-embed-wrapper:hover {
          border-color: rgba(0, 229, 255, 0.45);
        }

        .instagram-embed-container {
          width: 100%;
          max-width: 500px;
          height: 600px;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
        }

        .instagram-iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .testimonial-card-large {
          background: rgba(0, 229, 255, 0.03);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          box-shadow: 0 20px 45px rgba(0,0,0,0.4);
          text-align: left;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card-large:hover {
          border-color: rgba(0, 229, 255, 0.35);
          box-shadow: 0 20px 45px rgba(0, 229, 255, 0.08);
        }

        .testimonial-grid-layout {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 40px;
          align-items: center;
        }

        .testimonial-left-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .author-avatar-wrapper-large {
          width: 180px;
          height: 180px;
          border-radius: 20px;
          overflow: hidden;
          border: 3px solid #00e5ff;
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.25);
          position: relative;
          transition: transform 0.3s ease;
        }

        .testimonial-card-large:hover .author-avatar-wrapper-large {
          transform: scale(1.03);
        }

        .author-avatar-large {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
        }

        .hud-corner-brackets span {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: #00e5ff;
          border-style: solid;
        }

        .h-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .h-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
        .h-bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
        .h-br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

        .testimonial-right-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .testimonial-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .author-meta-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .author-name-large {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .author-role-large {
          font-size: 13px;
          font-family: monospace !important;
          color: #00e5ff;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .rating-stars-large {
          display: flex;
          gap: 4px;
        }

        .star-icon-large {
          color: #ff9f00;
          font-size: 18px;
          text-shadow: 0 0 8px rgba(255, 159, 0, 0.4);
        }

        .testimonial-body-large {
          margin: 0;
        }

        .testimonial-text-large {
          font-size: 16.5px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          margin: 0;
        }

        .testimonial-footer-large {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
          display: flex;
          justify-content: flex-end;
        }

        .testimonial-insta-link-large {
          font-size: 12px;
          font-family: monospace !important;
          font-weight: 700;
          color: #00e5ff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s;
        }

        .testimonial-insta-link-large:hover {
          opacity: 0.8;
          text-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
        }

        @media (max-width: 768px) {
          .testimonial-grid-layout {
            grid-template-columns: 1fr;
            gap: 24px;
            text-align: center;
          }
          .testimonial-meta-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
          }
          .testimonial-footer-large {
            justify-content: center;
          }
        }

        .video-player-wrapper {
          position: relative;
          background: rgba(0, 229, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .video-player-wrapper:hover {
          border-color: rgba(0, 229, 255, 0.45);
          box-shadow: 0 15px 35px rgba(0, 229, 255, 0.05);
        }

        .video-player-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .video-overlay-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding: 0 4px;
        }

        .video-icon-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.2);
          padding: 6px 12px;
          border-radius: 50px;
          font-family: monospace !important;
          font-size: 11px;
          color: #00e5ff;
        }

        .play-icon {
          font-size: 10px;
          animation: pulseIcon 2s infinite;
        }

        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .hero-client-name {
          font-size: 32px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 16px 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .hero-tags {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
        }

        .category-pill {
          background: rgba(0, 229, 255, 0.12);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: #00e5ff;
          font-size: 11px;
          font-family: monospace !important;
          padding: 6px 14px;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .industry-tag {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-family: monospace !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── TWO COLUMN CONTENT LAYOUT ── */
        .content-layout {
          display: flex;
          gap: 48px;
          align-items: flex-start;
          margin-bottom: 80px;
        }

        .main-column {
          flex: 1;
        }

        .sidebar-column {
          width: 320px;
          flex-shrink: 0;
        }

        .sticky-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Left Content Column */
        .project-tagline {
          font-size: 28px;
          font-weight: 900;
          color: #fff;
          font-style: italic;
          margin: 0 0 32px 0;
          line-height: 1.35;
          letter-spacing: -0.5px;
        }

        .case-section {
          margin-bottom: 40px;
        }

        .section-label {
          display: block;
          font-family: monospace !important;
          color: #00e5ff;
          font-size: 11px;
          letter-spacing: 0.2em;
          margin-bottom: 16px;
        }

        .case-paragraph {
          font-size: 15.5px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.85;
          margin: 0;
        }

        .challenge-callout {
          border-left: 3px solid rgba(0,229,255,0.5);
          padding: 16px 20px;
          background: rgba(0,229,255,0.03);
          border-radius: 0 10px 10px 0;
        }

        .metrics-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        /* Sticky Sidebar Columns */
        .info-card {
          background: rgba(0, 229, 255, 0.03);
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-row:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 16px;
        }

        .info-label {
          font-family: monospace !important;
          font-size: 10px;
          color: #00e5ff;
          letter-spacing: 0.15em;
        }

        .info-value {
          font-size: 14px;
          color: #fff;
          font-weight: 600;
        }

        .info-link {
          font-size: 14px;
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
        }

        .info-link:hover {
          color: #00e5ff;
        }

        .icon-arrow {
          font-size: 11px;
          color: #00e5ff;
        }

        .contact-card {
          background: rgba(0, 229, 255, 0.05);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
        }

        .contact-card-heading {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px 0;
        }

        .contact-card-sub {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
          margin: 0 0 24px 0;
        }

        .contact-btn {
          display: block;
          background: #00e5ff;
          color: #000;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 24px;
          border-radius: 50px;
          transition: all 0.25s;
          box-shadow: 0 4px 15px rgba(0, 229, 255, 0.25);
          border: none;
          cursor: pointer;
          width: 100%;
        }

        .contact-btn:hover {
          background: #00f7ff;
          box-shadow: 0 6px 20px rgba(0, 229, 255, 0.45);
          transform: translateY(-1px);
        }

        .contact-text-link {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #00e5ff;
          font-size: 12px;
          font-weight: 500;
          margin-top: 16px;
          transition: opacity 0.2s;
        }

        .contact-text-link:hover {
          opacity: 0.8;
          text-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
        }

        /* ── RELATED PROJECTS STRIP ── */
        .related-section {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 56px;
          margin-bottom: 56px;
        }

        .related-title {
          font-family: monospace !important;
          color: rgba(255,255,255,0.3);
          font-size: 11px;
          letter-spacing: 0.2em;
          margin-bottom: 24px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .related-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
        }

        .related-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          width: 100%;
        }

        .related-card-link:hover .related-card {
          border-color: rgba(0, 229, 255, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0, 229, 255, 0.07);
        }

        .related-card-visual {
          height: 160px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .related-initials {
          font-size: 48px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -1.5px;
        }

        .related-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 229, 255, 0.12);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: #00e5ff;
          font-size: 9px;
          font-family: monospace !important;
          padding: 3px 8px;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .related-card-info {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .related-client {
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 2px 0;
        }

        .related-industry {
          font-size: 10px;
          font-family: monospace !important;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
        }

        .related-result {
          font-size: 12px;
          color: rgba(0, 229, 255, 0.7);
          font-weight: 600;
          margin: 8px 0 16px 0;
        }

        .related-action {
          font-size: 11px;
          font-weight: 700;
          color: #00e5ff;
          margin-top: auto;
          transition: transform 0.2s ease;
        }

        .related-card-link:hover .related-action {
          transform: translateX(4px);
        }

        /* ── DETAIL CTA BANNER ── */
        .detail-cta-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 25, 55, 0.8) 0%, rgba(4, 8, 15, 0.95) 50%, rgba(0, 45, 75, 0.8) 100%);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 24px;
          padding: 64px 40px;
          text-align: center;
          overflow: hidden;
          margin-top: 40px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        /* ── RESPONSIVE DESIGN ── */
        @media (max-width: 960px) {
          .content-layout {
            flex-direction: column;
            gap: 40px;
          }

          .sidebar-column {
            width: 100%;
          }

          .sticky-sidebar {
            position: static;
          }

          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .detail-content-wrapper {
            padding: 20px 16px 48px;
          }

          .project-hero {
            height: 280px;
            margin-bottom: 36px;
          }

          .hero-client-name {
            font-size: 26px;
          }

          .hero-initials {
            font-size: 72px;
          }

          .project-tagline {
            font-size: 22px;
            margin-bottom: 24px;
          }

          .metrics-grid {
            gap: 16px;
          }

          .related-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .detail-cta-banner {
            padding: 40px 20px;
          }
        }
      `}</style>
    </main>
  );
}
