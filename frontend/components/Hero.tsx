"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { AnimatedText } from "./AnimationSystem";
import { useGetStarted } from "@/context/GetStartedContext";

/* ─────────────────────────────────────────────
   AR CORNER BRACKETS
───────────────────────────────────────────── */
function ARBrackets({ size = 20, color = "#00e5ff", thickness = 2 }: { size?: number; color?: string; thickness?: number }) {
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
   HUD READOUT
───────────────────────────────────────────── */
function HUDReadout({ label, value }: { label: string; value: string }) {
  return (
    <div className="hud-readout">
      <span className="hud-label">{label}</span>
      <span className="hud-value">{value}</span>
      <style jsx>{`
        .hud-readout { display: flex; flex-direction: column; gap: 2px; }
        .hud-label { font-size: 9px; letter-spacing: 0.2em; color: rgba(0,229,255,0.4); text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; }
        .hud-value { font-size: 13px; letter-spacing: 0.1em; color: #00e5ff; font-family: Arial, Helvetica, sans-serif; font-weight: 700; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OPTIMIZED VIDEO (lazy load + intersection)
───────────────────────────────────────────── */
const OptimizedVideo = ({ src, poster, preload = "metadata" }: { src: string; poster: string; preload?: "none" | "metadata" | "auto" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      autoPlay
      preload={preload}
      className="hero-video-bg"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

/* ─────────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────────── */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { openGetStarted } = useGetStarted();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <div className="hero-container" ref={containerRef}>
      <section className="hero">

        {/* ── BACKGROUND ── */}
        <div className="hero-bg">
          <OptimizedVideo
            src="https://res.cloudinary.com/dh6ibke5w/video/upload/v1777274519/Robodino_Final_y3n3cq.mp4"
            poster="https://res.cloudinary.com/dh6ibke5w/image/upload/q_auto,f_auto,w_800/v1777274515/hero-poster_p8qcmr.png"
          />
          {/* Dark overlay so text is always legible on mobile */}
          <div className="video-overlay" />
          <div className="grid-overlay" />
          <div className="speed-lines" />
          <div className="glow-blob" />
          <div className="glow-blob glow-blob-2" />
        </div>

        {/* ── CONTENT ── */}
        <div className="hero-inner">
          <div className="hero-left">
            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ display: "block" }}
              >
                Grow Your Brand
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                style={{ display: "block" }}
              >
                Digitally with
              </motion.span>
              <motion.span
                className="highlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                BOTMATE
              </motion.span>
            </h1>

            <div className="hero-sub-wrap">
              <AnimatedText
                text="Enter a virtual tech universe. Experience premium, AI-driven growth strategies designed for the future of business."
                className="hero-sub"
                delay={0.8}
              />
            </div>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <button onClick={openGetStarted} className="btn-primary" aria-label="Start Your Journey with BotMate">
                <span>Start Your Journey</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <Link href="/packages" className="btn-outline" aria-label="View BotMate Packages">
                View Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ SHELL ══ */
        .hero-container {
          background: #060a0f;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        /* ══ HERO ══ */
        .hero {
          min-height: 100vh;
          min-height: 100dvh; /* dynamic viewport height — fixes mobile browser chrome */
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 72px;
        }

        /* ══ BACKGROUND ══ */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          /* Ensure the bg always fills — critical for mobile */
          width: 100%;
          height: 100%;
        }

        /* ══ VIDEO ══
             Key fixes:
             1. object-fit: cover  — always fills container
             2. object-position: center center — keeps subject centred on all screens
             3. Removed mix-blend-mode: screen on mobile (causes invisible video on some Android/iOS)
             4. width/height 100% + position absolute inset:0 — no gaps
        ══ */
        .hero-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          /* screen blend looks great on desktop but breaks on many mobile browsers */
          mix-blend-mode: screen;
          filter: brightness(1.1);
          z-index: 1;
          pointer-events: none;
          /* Prevent iOS from making the video element a floating layer */
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* ══ DARK OVERLAY
             Adds legibility on mobile where the video
             can be brighter / contrast is lower
        ══ */
        .video-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(6,10,15,0.35) 0%,
            rgba(6,10,15,0.20) 50%,
            rgba(6,10,15,0.55) 100%
          );
          pointer-events: none;
        }

        .grid-overlay {
          position: absolute; inset: 0;
          z-index: 3;
          background-image:
            linear-gradient(rgba(0,175,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.04) 1px, transparent 1px);
          background-size: 100px 100px;
          mask-image: radial-gradient(ellipse 80% 80% at 65% 50%, black 0%, transparent 100%);
          pointer-events: none;
        }

        .speed-lines {
          position: absolute; inset: 0;
          z-index: 3;
          background: repeating-linear-gradient(
            -35deg,
            transparent 0, transparent 120px,
            rgba(0,175,255,0.025) 121px,
            rgba(0,175,255,0.025) 122px
          );
          animation: shiftLines 8s linear infinite;
          pointer-events: none;
        }

        .glow-blob {
          position: absolute; top: 45%; right: 5%;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%);
          transform: translateY(-50%);
          border-radius: 50%;
          animation: pulse 5s ease-in-out infinite alternate;
          z-index: 3;
          pointer-events: none;
        }
        .glow-blob-2 {
          right: auto; left: -10%; top: 20%;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(0,80,180,0.08) 0%, transparent 70%);
          animation-delay: 2s;
        }

        /* ══ LAYOUT ══ */
        .hero-inner {
          position: relative; z-index: 4;
          width: 100%;
          padding: 0 64px 0 130px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 40px;
        }

        /* ══ LEFT ══ */
        .hero-left {
          flex: 0 0 auto;
          max-width: 600px;
          z-index: 4;
          text-align: left;
        }

        .hero-title {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 700;
          line-height: 1.08;
          color: #fff;
          letter-spacing: -1.5px;
          margin-bottom: 22px;
        }
        .hero-title .highlight {
          color: #00e5ff;
          display: block;
          text-shadow: 0 0 30px rgba(0,229,255,0.4);
          letter-spacing: -2px;
          margin-top: 5px;
        }

        .hero-sub {
          font-size: 15.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          max-width: 470px;
          margin-bottom: 42px;
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .btn-primary {
          background: #00e5ff; color: #000;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15.5px; font-weight: 700;
          padding: 15px 36px; border-radius: 50px;
          border: none; cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(0,229,255,0.4);
        }
        .btn-primary:hover {
          background: #00f7ff;
          box-shadow: 0 10px 40px rgba(0,229,255,0.55);
          transform: translateY(-2px); gap: 13px;
        }

        .btn-outline {
          background: transparent; color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15.5px; font-weight: 600;
          padding: 14px 36px; border-radius: 50px;
          border: 2px solid rgba(0,229,255,0.4);
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center;
          transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: #00e5ff; color: #00e5ff;
          box-shadow: 0 0 20px rgba(0,229,255,0.18);
          transform: translateY(-2px);
        }

        /* ══ KEYFRAMES ══ */
        @keyframes shiftLines {
          0%   { background-position: 0 0; }
          100% { background-position: 300px 300px; }
        }
        @keyframes pulse {
          from { opacity: 0.6; transform: translateY(-50%) scale(1); }
          to   { opacity: 1;   transform: translateY(-50%) scale(1.1); }
        }

        /* ══ TABLET (≤960px) ══ */
        @media (max-width: 960px) {
          .hero-inner {
            flex-direction: column;
            padding: 60px 28px 48px;
            text-align: center;
            gap: 0;
            justify-content: center;
            align-items: center;
          }
          .hero-left {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-sub {
            text-align: center;
            max-width: 500px;
          }
          .hero-btns { justify-content: center; }

          /* On tablet/mobile screens, disable mix-blend-mode so
             the video is always visible regardless of browser quirks */
          .hero-video-bg {
            mix-blend-mode: normal;
            filter: brightness(0.85) saturate(1.2);
          }
          /* Slightly stronger overlay on smaller screens */
          .video-overlay {
            background: linear-gradient(
              to bottom,
              rgba(6,10,15,0.45) 0%,
              rgba(6,10,15,0.25) 40%,
              rgba(6,10,15,0.65) 100%
            );
          }
          /* Reduce blob sizes for mobile performance */
          .glow-blob { width: 400px; height: 400px; right: -10%; }
          .glow-blob-2 { width: 260px; height: 260px; }
        }

        /* ══ MOBILE (≤600px) ══ */
        @media (max-width: 600px) {
          .hero {
            min-height:100vh;
            min-height: 100dvh;
            align-items: flex-end; /* push content toward bottom so video subject shows */
            padding-top: 0;
          }
            .logo {
  width: 120px;
  height: auto;
}
          .hero-inner {
            padding: 24px 20px 52px;
            /* Content sits at the bottom, video hero-shot at the top */
            justify-content: flex-end;
            align-items: center;
          }
          .hero-title {
            font-size: clamp(32px, 9vw, 44px);
            letter-spacing: -1px;
            margin-bottom: 14px;
          }
          .hero-title .highlight { letter-spacing: -1.5px; }
          .hero-sub {
            font-size: 14px;
            margin-bottom: 28px;
            color: rgba(255,255,255,0.7);
          }
          .hero-btns { gap: 12px; margin-bottom: 0; }
          .btn-primary, .btn-outline {
            font-size: 14px;
            padding: 13px 26px;
          }

          /* Video: keep it full screen, anchored to top so the
             character/subject is visible above the text block */
          .hero-video-bg {
            object-position: top center;
            mix-blend-mode: normal;
            filter: brightness(0.8) saturate(1.2);
          }
          /* Stronger gradient at bottom for text legibility */
          .video-overlay {
            background: linear-gradient(
              to bottom,
              rgba(6,10,15,0.15) 0%,
              rgba(6,10,15,0.10) 35%,
              rgba(6,10,15,0.80) 70%,
              rgba(6,10,15,0.95) 100%
            );
          }
          .glow-blob { display: none; }
          .glow-blob-2 { display: none; }
          .speed-lines { opacity: 0.4; }
          .grid-overlay { opacity: 0.5; }
        }

        /* ══ VERY SMALL (≤380px) ══ */
        @media (max-width: 380px) {
          .hero-title { font-size: 28px; }
          .btn-primary, .btn-outline { padding: 12px 20px; font-size: 13px; }
          .hero-btns { flex-direction: column; align-items: stretch; }
          .btn-primary, .btn-outline { justify-content: center; }
        }
      `}</style>
    </div>
  );
}