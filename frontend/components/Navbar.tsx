"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { useGetStarted } from "@/context/GetStartedContext";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Portfolio", href: "/portfolio" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openGetStarted } = useGetStarted();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.25, ease: "easeInOut" as const },
        opacity: { duration: 0.2 },
        staggerChildren: 0.04,
        staggerDirection: -1 as const
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.35, ease: "easeOut" as const },
        opacity: { duration: 0.2 },
        staggerChildren: 0.05,
        delayChildren: 0.08
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      x: -16,
      transition: { duration: 0.2, ease: "easeInOut" as const }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: "easeOut" as const }
    }
  };

  return (
    <>
      <nav className="navbar">
        {/* LEFT LOGO */}
        <div className="nav-left">
          <Link href="/" className="nav-logo" aria-label="BotMate Home" onClick={closeMobile}>
            <span className="logo-desktop">
              <Image
                src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png"
                alt="BotMate logo"
                width={90}
                height={90}
                priority
              />
            </span>
            <span className="logo-mobile">
              <img
                src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png"
                alt="BotMate logo"
                className="mobile-logo-img"
              />
            </span>
          </Link>
        </div>

        {/* CENTER LINKS */}
        <ul className="nav-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="nav-item">
                <Link href={link.href} className={`nav-link${isActive ? " active" : ""}`}>
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="underline" className="underline" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT CTA */}
        <div className="nav-right">
          <button onClick={openGetStarted} className="nav-cta" aria-label="Get Started with BotMate">
            Get Started
          </button>
        </div>

        {/* HAMBURGER — mobile only */}
        <button
          className="hamburger"
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`ham-line ${mobileOpen ? "open-1" : ""}`} />
          <span className={`ham-line ${mobileOpen ? "open-2" : ""}`} />
          <span className={`ham-line ${mobileOpen ? "open-3" : ""}`} />
        </button>
      </nav>

      {/* MOBILE FULL DROPDOWN */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className="mobile-links">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li key={link.name} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className={`mobile-link${isActive ? " active" : ""}`}
                      onClick={closeMobile}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div className="mobile-cta-wrap" variants={linkVariants}>
              <button
                className="mobile-cta"
                onClick={() => {
                  closeMobile();
                  openGetStarted();
                }}
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`

        /* ══ NAVBAR ══ */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          background: rgba(4, 8, 15, 0.92);
          backdrop-filter: blur(10px);
          z-index: 1200;
        }

        .nav-left { display: flex; align-items: center; }

        .logo-desktop {
          display: block;
        }

        .logo-mobile {
          display: none;
        }

        .nav-logo img {
          width: 200px;
          height: 200px;
          object-fit: contain;
          display: block;
        }

        /* ══ DESKTOP LINKS ══ */
        .nav-center {
          display: flex;
          justify-content: center;
          gap: 30px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-item { position: relative; }

        .nav-link {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 10px;
          position: relative;
          transition: color 0.3s, text-shadow 0.3s;
          letter-spacing: 0.5px;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #00e5ff;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
        }

        .underline {
          position: absolute;
          bottom: -4px; left: 0;
          height: 2px; width: 100%;
          background: #00e5ff;
          border-radius: 2px;
        }

        /* ══ CTA ══ */
        .nav-right { display: flex; justify-content: flex-end; }

        .nav-cta {
          background: #00e5ff;
          padding: 10px 24px;
          border-radius: 50px;
          color: black;
          font-weight: 700;
          font-size: 14px;
          transition: box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
          cursor: pointer;
          border: none;
          font-family: inherit;
        }
        .nav-cta:hover {
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.8);
          transform: translateY(-2px);
        }

        /* ══ HAMBURGER ══ */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 10px;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .hamburger:hover {
          background: rgba(0, 229, 255, 0.08);
        }

        .ham-line {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }

        /* X state on open */
        .open-1 { transform: translateY(7px) rotate(45deg); }
        .open-2 { opacity: 0; transform: scaleX(0); }
        .open-3 { transform: translateY(-7px) rotate(-45deg); }

        /* ══ MOBILE DROPDOWN ══ */
        .mobile-menu {
          position: fixed;
          top: 64px;
          left: 0;
          width: 100%;
          background: rgba(4, 8, 15, 0.96);
          backdrop-filter: blur(16px);
          z-index: 1100;
          padding: 20px 20px 28px;
          border-bottom: 1px solid rgba(0, 229, 255, 0.12);
          overflow: hidden;
        }

        .mobile-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mobile-link {
          display: block;
          color: rgba(255, 255, 255, 0.82);
          text-decoration: none;
          font-size: 17px;
          font-weight: 500;
          padding: 13px 10px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.3px;
        }
        .mobile-link:hover,
        .mobile-link.active {
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.07);
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.35);
        }

        .mobile-cta-wrap {
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .mobile-cta {
          width: 100%;
          background: #00e5ff;
          padding: 13px 24px;
          border-radius: 50px;
          color: #000;
          font-weight: 700;
          font-size: 15px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: box-shadow 0.3s, transform 0.2s;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.35);
        }
        .mobile-cta:hover {
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.65);
          transform: translateY(-1px);
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .logo-desktop {
            display: none !important;
          }
          .logo-mobile {
            display: flex !important;
            align-items: center;
          }

          .mobile-logo-img {
            width: 160px !important;
            height: auto !important;
            object-fit: contain;
            display: block;
          }

          .navbar { 
            padding: 0 20px; 
            height: 64px; 
          }
          
          /* Hide desktop-only elements */
          .nav-center, 
          .nav-right { 
            display: none !important; 
          }
          
          .hamburger { 
            display: flex !important; 
          }
        }

        @media (max-width: 480px) {
          .navbar { 
            padding: 0 16px; 
            height: 64px; 
          }

          .mobile-logo-img {
            width: 140px !important;
          }

          .mobile-menu {
            top: 64px;
            padding: 16px 16px 24px;
          }
        }
      `}</style>
    </>
  );
}