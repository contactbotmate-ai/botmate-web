"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppPopup() {
    const whatsappNumber = "919777209527";
    const message = "Hello! I'm interested in BotMate services.";
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="whatsapp-popup-container">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block"
                aria-label="Chat with BotMate on WhatsApp"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all"
                >
                    <MessageCircle size={24} className="sm:hidden" />
                    <MessageCircle size={28} className="hidden sm:block" />
                </motion.div>

                {/* Pulse Effect */}
                <span className="absolute -inset-2 rounded-full border border-[#25D366] opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" />
            </a>

            <style jsx>{`
                .whatsapp-popup-container {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 50;
                }
                @media (max-width: 1024px) {
                    .whatsapp-popup-container {
                        bottom: 16px;
                        right: 16px;
                    }
                }
            `}</style>
        </div>
    );
}
