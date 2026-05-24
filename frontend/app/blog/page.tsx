"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGetStarted } from "@/context/GetStartedContext";
import { AnimatedText } from "@/components/AnimationSystem";
import Footer from "@/components/Footer";
import MorphBlob from "@/components/MorphBlob";
import dynamic from "next/dynamic";
import { POSTS } from "./[slug]/page";

const HoloGrid = dynamic(() => import("@/components/HoloGrid"), { ssr: false, loading: () => null });

const CATEGORIES = ["All", "AI Marketing", "Social Media", "Web & SEO"];

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { openGetStarted } = useGetStarted();

  // Convert posts object to array
  const postsList = Object.values(POSTS);

  // Filter posts based on active category
  const filteredPosts = activeCategory === "All"
    ? postsList
    : postsList.filter((post) => post.category === activeCategory);

  return (
    <main className="blog-main">
      {/* Background visual components */}
      <div className="bg-decorations" aria-hidden="true">
        <HoloGrid />
        <MorphBlob className="blob-1" />
        <MorphBlob className="blob-2" />
      </div>

      <div className="blog-content-wrapper">
        {/* ── HERO SECTION ── */}
        <section className="blog-hero">
          <div className="hero-content">
            <motion.div
              className="pre-tag"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="tag-bracket">[</span>
              <span className="tag-text">INSIGHTS & RESOURCES</span>
              <span className="tag-bracket">]</span>
            </motion.div>

            <h1 className="hero-title">
              <AnimatedText text="BotMate Blog" el="span" delay={0.3} />
            </h1>

            {/* Animated cyan underline */}
            <motion.div
              className="title-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />

            <p className="hero-subtitle">
              AI insights, growth strategies, and digital trends to keep you ahead.
            </p>
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

        {/* ── BLOG CARDS GRID ── */}
        <section className="grid-section">
          <motion.div 
            className="blog-grid"
            layout
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="blog-card-wrapper"
              >
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card">
                    {/* Top Row: Category + Read Time */}
                    <div className="card-top-meta">
                      <span className="card-category">{post.category}</span>
                      <span className="card-readtime">{post.readTime}</span>
                    </div>

                    {/* Gradient Illustration Area */}
                    <div className="gradient-illustration-wrapper">
                      <div 
                        className="gradient-illustration" 
                        style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      >
                        <div className="glow-effect" />
                      </div>
                    </div>

                    {/* Title & Excerpt */}
                    <div className="card-main-content">
                      <h3 className="card-article-title">{post.title}</h3>
                      <p className="card-excerpt">{post.excerpt}</p>
                    </div>

                    {/* Bottom Row: Author + Date + Link */}
                    <div className="card-bottom-row">
                      <div className="author-info">
                        <div className="author-avatar">{post.authorInitials}</div>
                        <div className="author-text-meta">
                          <span className="author-name">{post.author}</span>
                          <span className="publish-date">{post.date}</span>
                        </div>
                      </div>
                      <span className="read-action">Read Article →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="empty-state">
              <p>No articles found in this category.</p>
            </div>
          )}
        </section>

        {/* ── BOTTOM CTA STRIP ── */}
        <section className="blog-cta-banner">
          <MorphBlob className="cta-blob-1" />
          <MorphBlob className="cta-blob-2" />
          <div className="cta-banner-content">
            <h2 className="cta-banner-heading">Want strategies like these delivered to your brand?</h2>
            <button 
              onClick={openGetStarted} 
              className="cta-banner-btn"
            >
              Get Started →
            </button>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        .blog-main {
          background: #060a0f;
          min-height: 100vh;
          position: relative;
          color: #fff;
          font-family: "Montserrat", sans-serif !important;
          padding-top: 80px; /* Offset for sticky navbar */
          overflow-x: hidden;
        }

        .blog-main * {
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
          top: 5%;
          left: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%);
          opacity: 0.6;
        }

        .blob-2 {
          bottom: 20%;
          right: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%);
          opacity: 0.5;
        }

        .blog-content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          position: relative;
          z-index: 1;
        }

        /* ── HERO SECTION ── */
        .blog-hero {
          position: relative;
          padding: 80px 0 60px;
          text-align: center;
          border-bottom: 1px solid rgba(0, 229, 255, 0.05);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .pre-tag {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 24px;
          font-family: monospace !important;
          font-size: 12px;
          letter-spacing: 0.3em;
          color: rgba(0, 229, 255, 0.65);
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
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .hero-title {
          font-size: clamp(40px, 7vw, 76px);
          font-weight: 900;
          color: #fff;
          line-height: 1;
          margin: 0 0 20px;
          letter-spacing: -2px;
        }

        .title-line {
          height: 3px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          border-radius: 2px;
          transform-origin: center;
          margin: 0 auto 32px;
          width: 160px;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ── CATEGORY FILTER BAR ── */
        .filter-section {
          padding: 40px 0;
          display: flex;
          justify-content: center;
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
          background: transparent;
          border: 1px solid rgba(0, 229, 255, 0.2);
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .filter-pill:hover {
          border-color: rgba(0, 229, 255, 0.5);
          color: #fff;
        }

        .filter-pill.active {
          background: #00e5ff;
          border-color: #00e5ff;
          color: #000;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.35);
        }

        /* ── BLOG CARDS GRID ── */
        .grid-section {
          margin-bottom: 80px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .blog-card-wrapper {
          display: flex;
        }

        .blog-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          width: 100%;
        }

        .blog-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          width: 100%;
          position: relative;
        }

        .blog-card-link:hover .blog-card {
          transform: translateY(-8px);
          border-color: #00e5ff;
          box-shadow: 0 15px 40px rgba(0, 229, 255, 0.08);
          background: rgba(0, 229, 255, 0.01);
        }

        .card-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-category {
          color: #00e5ff;
          font-family: monospace !important;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-readtime {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .gradient-illustration-wrapper {
          position: relative;
          height: 200px;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .gradient-illustration {
          height: 100%;
          width: 100%;
          transition: transform 0.5s ease;
        }

        .blog-card-link:hover .gradient-illustration {
          transform: scale(1.05);
        }

        /* CSS Glow Effect on Hover */
        .glow-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .blog-card-link:hover .glow-effect {
          opacity: 1;
        }

        .card-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-article-title {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-excerpt {
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

        .card-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid #00e5ff;
          background: rgba(0, 229, 255, 0.1);
          color: #00e5ff;
          font-size: 11px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .author-text-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .author-name {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .publish-date {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.4);
        }

        .read-action {
          font-size: 13px;
          font-weight: 700;
          color: #00e5ff;
          transition: transform 0.2s ease;
        }

        .blog-card-link:hover .read-action {
          transform: translateX(4px);
        }

        .empty-state {
          text-align: center;
          padding: 60px 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 16px;
        }

        /* ── BOTTOM CTA STRIP ── */
        .blog-cta-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 25, 55, 0.8) 0%, rgba(4, 8, 15, 0.95) 50%, rgba(0, 45, 75, 0.8) 100%);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 24px;
          padding: 64px 40px;
          text-align: center;
          overflow: hidden;
          margin-top: 40px;
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
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
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
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .blog-content-wrapper {
            padding: 24px 16px 48px;
          }

          .blog-hero {
            padding: 40px 0;
          }

          .hero-title {
            font-size: 40px;
          }

          .hero-subtitle {
            font-size: 15px;
          }

          .filter-section {
            padding: 24px 0;
          }

          .filter-pill {
            padding: 8px 18px;
            font-size: 13px;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .blog-card {
            padding: 20px;
          }

          .gradient-illustration-wrapper {
            height: 180px;
          }

          .blog-cta-banner {
            padding: 40px 20px;
          }
        }
      `}</style>
    </main>
  );
}
