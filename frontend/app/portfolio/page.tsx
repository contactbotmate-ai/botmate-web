"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { AnimatedText, StaggerReveal, RevealItem } from "@/components/AnimationSystem";
import Footer from "@/components/Footer";
import { PROJECTS } from "./projectsData";
import dynamic from "next/dynamic";
import { useGetStarted } from "@/context/GetStartedContext";

const HoloGrid = dynamic(() => import("@/components/HoloGrid"), { ssr: false, loading: () => null });
const MorphBlob = dynamic(() => import("@/components/MorphBlob"), { ssr: false, loading: () => null });

const CATEGORIES = ["All", "Social Media", "Web Development", "SEO & Ads", "Branding"];

/* ─────────────────────────────────────────────
   AR CORNER BRACKETS
   Inline implementation matching other pages
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

export default function PortfolioListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { openGetStarted } = useGetStarted();

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="portfolio-main">
      {/* Background visual components */}
      <div className="bg-decorations" aria-hidden="true">
        <HoloGrid />
        <MorphBlob className="blob-1" />
        <MorphBlob className="blob-2" />
      </div>

      <div className="portfolio-content-wrapper">
        {/* ── HERO SECTION ── */}
        <section className="portfolio-hero" ref={heroRef}>
          <div className="hero-content">
            <motion.div
              className="pre-tag"
              initial={{ opacity: 0, y: 15 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="tag-bracket">[</span>
              <span className="tag-text">OUR WORK</span>
              <span className="tag-bracket">]</span>
            </motion.div>

            <h1 className="hero-title">
              <AnimatedText text="Projects We're Proud Of" el="span" delay={0.3} />
            </h1>

            {/* Animated cyan underline */}
            <motion.div
              className="title-line"
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />

            <p className="hero-subtitle">
              Real brands. Real results. Here&apos;s what we&apos;ve built.
            </p>

            {/* Stats row below subtitle (same style as PackagesHero stat boxes) */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                { val: "50+", label: "Clients Served" },
                { val: "₹2Cr+", label: "Revenue Generated" },
                { val: "98%", label: "Client Retention" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="hero-stat"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ARBrackets size={8} color="rgba(0, 229, 255, 0.25)" thickness={1} />
                  <span className="hs-val">{s.val}</span>
                  <span className="hs-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORY FILTER BAR ── */}
        <section className="filter-section">
          <div className="filter-bar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-pill ${activeCategory === category ? "active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ── PROJECTS CARDS GRID ── */}
        <section className="grid-section">
          <StaggerReveal stagger={0.1} delay={0.2}>
            <div className="projects-grid">
              {filteredProjects.map((project) => {
                const displayIndex = PROJECTS.findIndex(p => p.slug === project.slug) + 1;
                const formattedIndex = String(displayIndex).padStart(2, "0");
                return (
                  <RevealItem key={project.slug}>
                    <Link href={`/portfolio/${project.slug}`} className="project-card-link">
                      <div className="project-card">
                        {/* Top section: Dual-tone Header */}
                        <div 
                          className={`project-card-header card-header-${project.cardBgType}`}
                          style={project.logoUrl ? { background: project.gradient, display: "flex", alignItems: "center", justifyContent: "center" } : {}}
                        >
                          {project.logoUrl ? (
                            <div className="card-logo-wrapper">
                              <img src={project.logoUrl} alt={`${project.client} Logo`} className="card-logo-img" />
                            </div>
                          ) : (
                            <span className="top-section-badge">{project.topBadge}</span>
                          )}
                          <span className="large-bg-number">{formattedIndex}</span>
                        </div>

                        {/* Bottom section: Detailed Info */}
                        <div className="project-card-body">
                          <span className="card-category-tag">{project.category.toUpperCase()}</span>
                          <h3 className="card-client-name">{project.client}</h3>
                          <p className="card-tagline">{project.tagline}</p>
                          
                          {/* Service Tags */}
                          <div className="card-tags-row">
                            {project.tags.map((tag) => (
                              <span key={tag} className="tag-pill">{tag}</span>
                            ))}
                          </div>

                          {/* Metrics row */}
                          <div className="card-metrics-row">
                            <span className="metric-highlight-badge">{project.metricBadge}</span>
                            <div className="metric-big-stat">
                              <span className="stat-val">{project.metricValue}</span>
                              <span className="stat-lbl">{project.metricLabel}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </RevealItem>
                );
              })}
            </div>
          </StaggerReveal>

          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <p>No projects found in this category.</p>
            </div>
          )}
        </section>

        {/* ── BOTTOM CTA STRIP ── */}
        <section className="portfolio-cta-banner">
          <MorphBlob className="cta-blob-1" />
          <MorphBlob className="cta-blob-2" />
          <div className="cta-banner-content">
            <h2 className="cta-banner-heading">Want results like these for your brand?</h2>
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
        .portfolio-main {
          background: #060a0f;
          min-height: 100vh;
          position: relative;
          color: #ffffff;
          font-family: "Montserrat", sans-serif !important;
          padding-top: 80px; /* Offset for sticky navbar */
          overflow-x: hidden;
        }

        .portfolio-main * {
          font-family: "Montserrat", sans-serif !important;
          box-sizing: border-box;
        }

        .bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .blob-1 {
          top: 15%;
          left: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%);
          opacity: 0.6;
        }

        .blob-2 {
          bottom: 20%;
          right: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.04) 0%, transparent 70%);
          opacity: 0.5;
        }

        .portfolio-content-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 48px 80px;
          position: relative;
          z-index: 1;
        }

        /* ── HERO SECTION ── */
        .portfolio-hero {
          position: relative;
          padding: 100px 0 80px;
          text-align: center;
          background-color: #060a0f;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66zm0 18l28 16v32l-28 16l-28-16v-32l28-16z' fill='none' stroke='%2300e5ff' stroke-opacity='0.03' stroke-width='1.5'/%3E%3C/svg%3E");
          background-size: 56px 100px;
          border-bottom: 1px solid rgba(0, 229, 255, 0.08);
        }

        .portfolio-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(0, 229, 255, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .pre-tag {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 24px;
          font-family: monospace !important;
          font-size: 12px;
          letter-spacing: 0.3em;
          color: #00e5ff;
        }

        .tag-bracket {
          color: #00e5ff;
          font-size: 14px;
          font-weight: bold;
        }

        .tag-text {
          animation: tagBlink 2s ease-in-out infinite;
        }

        @keyframes tagBlink {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .hero-title {
          font-size: clamp(38px, 6vw, 64px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin: 0 0 20px;
          letter-spacing: -1.5px;
        }

        .title-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          border-radius: 2px;
          transform-origin: center;
          margin: 0 auto 32px;
          width: 120px;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 20px;
        }

        /* ── HERO STATS (PackagesHero-style) ── */
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .hero-stat {
          position: relative;
          background: rgba(0, 229, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 12px;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 150px;
          transition: all 0.3s ease;
        }

        .hero-stat:hover {
          background: rgba(0, 229, 255, 0.04);
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: 0 10px 25px rgba(0, 229, 255, 0.08);
        }

        .hs-val {
          font-size: 28px;
          font-weight: 800;
          color: #00e5ff;
          letter-spacing: -1px;
        }

        .hs-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-family: monospace !important;
        }

        /* ── CATEGORY FILTER BAR ── */
        .filter-section {
          padding: 40px 0;
          display: flex;
          justify-content: center;
          background: #060a0f;
        }

        .filter-bar {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          max-width: 100%;
          padding: 4px;
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }

        .filter-bar::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome/Safari */
        }

        .filter-pill {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.15);
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .filter-pill:hover {
          border-color: rgba(0, 229, 255, 0.4);
          color: #ffffff;
        }

        .filter-pill.active {
          background: #00e5ff;
          border-color: #00e5ff;
          color: #060a0f;
          font-weight: 700;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.35);
        }

        /* ── PROJECTS CARDS GRID ── */
        .grid-section {
          margin-bottom: 80px;
          background: #060a0f;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .project-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          width: 100%;
        }

        .project-card {
          background: #09111a;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          width: 100%;
          position: relative;
          height: 100%;
        }

        .project-card-link:hover .project-card {
          border-color: rgba(0, 229, 255, 0.35);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 229, 255, 0.06);
        }

        /* Top dual-tone section (Profile box) */
        .project-card-header {
          height: 180px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px; /* ~1cm border gap */
          overflow: hidden;
        }

        .card-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          z-index: 2;
          padding: 8px;
          transition: transform 0.35s ease;
        }

        .card-logo-img {
          width: 100%;
          height: 100%;
          max-height: 130px;
          max-width: 90%;
          object-fit: contain;
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 10px rgba(0, 229, 255, 0.15));
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        .project-card-link:hover .card-logo-wrapper {
          transform: scale(1.06);
        }

        .project-card-link:hover .card-logo-img {
          filter: drop-shadow(0 8px 24px rgba(0, 229, 255, 0.45));
        }

        .card-header-light {
          background: linear-gradient(135deg, #07222c 0%, #03131b 100%);
        }

        .card-header-dark {
          background: linear-gradient(135deg, #0b182a 0%, #050d17 100%);
        }

        .top-section-badge {
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.25);
          color: #00e5ff;
          font-size: 11px;
          font-family: monospace !important;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 50px;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .card-header-dark .top-section-badge {
          background: rgba(0, 102, 204, 0.15);
          border: 1px solid rgba(0, 102, 204, 0.3);
          color: #3399ff;
        }

        .large-bg-number {
          position: absolute;
          top: -10px;
          right: 15px;
          font-size: 100px;
          font-weight: 900;
          line-height: 1;
          user-select: none;
          z-index: 1;
        }

        .card-header-light .large-bg-number {
          color: rgba(0, 229, 255, 0.05);
        }

        .card-header-dark .large-bg-number {
          color: rgba(255, 255, 255, 0.03);
        }

        /* Bottom info section */
        .project-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          background: #09111a;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card-category-tag {
          font-size: 11px;
          font-family: monospace !important;
          color: #00e5ff;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 6px;
          display: block;
        }

        .card-client-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .card-tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          margin: 0 0 20px 0;
        }

        .card-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tag-pill {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 500;
        }

        .card-metrics-row {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .metric-highlight-badge {
          background: rgba(0, 229, 255, 0.08);
          color: #00e5ff;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 50px;
        }

        .metric-big-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }

        .stat-val {
          font-size: 28px;
          font-weight: 900;
          color: #00e5ff;
          line-height: 1;
        }

        .stat-lbl {
          font-size: 9px;
          font-family: monospace !important;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 16px;
        }

        /* ── BOTTOM CTA STRIP ── */
        .portfolio-cta-banner {
          position: relative;
          background: #09111a;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66zm0 18l28 16v32l-28 16l-28-16v-32l28-16z' fill='none' stroke='%2300e5ff' stroke-opacity='0.02' stroke-width='1.5'/%3E%3C/svg%3E");
          background-size: 56px 100px;
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 24px;
          padding: 64px 40px;
          text-align: center;
          overflow: hidden;
          margin-top: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .cta-banner-content {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-banner-heading {
          font-size: clamp(24px, 4.5vw, 36px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 12px 0;
          letter-spacing: -1px;
        }

        .cta-banner-sub {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          margin: 0 0 32px 0;
        }

        .cta-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-banner-btn-primary {
          background: #00e5ff;
          color: #060a0f;
          padding: 15px 38px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 15px rgba(0, 229, 255, 0.3);
        }

        .cta-banner-btn-primary:hover {
          background: #00c2d8;
          box-shadow: 0 6px 20px rgba(0, 229, 255, 0.45);
          transform: translateY(-2px);
        }

        .cta-banner-btn-outline {
          background: transparent;
          color: #ffffff;
          padding: 13px 36px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cta-banner-btn-outline:hover {
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .cta-blob-1 {
          top: -150px;
          left: -150px;
          opacity: 0.08;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%);
        }

        .cta-blob-2 {
          bottom: -150px;
          right: -150px;
          opacity: 0.05;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%);
        }

        /* ── RESPONSIVE DESIGN ── */
        @media (max-width: 1024px) {
          .portfolio-content-wrapper {
            padding: 40px 24px 60px;
          }
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .portfolio-hero {
            padding: 60px 0;
          }

          .hero-title {
            font-size: 38px;
          }

          .hero-subtitle {
            font-size: 15px;
          }

          .hero-stats {
            gap: 12px;
          }

          .hero-stat {
            padding: 12px 20px;
            min-width: 130px;
          }

          .hs-val {
            font-size: 24px;
          }

          .filter-section {
            padding: 24px 0;
          }

          .filter-pill {
            padding: 8px 18px;
            font-size: 13px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .project-card-header {
            height: 130px;
          }

          .portfolio-cta-banner {
            padding: 40px 20px;
          }
        }
      `}</style>
    </main>
  );
}
