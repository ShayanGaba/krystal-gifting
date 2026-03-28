import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "923282200919";
const WA_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in corporate gifting. Can you help me?",
);

export default function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // Appears after 3s on all screen sizes — no dismiss, always accessible
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Show tooltip once per session, 1.2s after button appears
  useEffect(() => {
    if (!visible) return;
    if (sessionStorage.getItem("wa_tooltip_seen")) return;
    const t = setTimeout(() => {
      setTooltip(true);
      sessionStorage.setItem("wa_tooltip_seen", "1");
    }, 1200);
    return () => clearTimeout(t);
  }, [visible]);

  // Auto-hide tooltip after 5s
  useEffect(() => {
    if (!tooltip) return;
    const t = setTimeout(() => setTooltip(false), 5000);
    return () => clearTimeout(t);
  }, [tooltip]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* Tooltip bubble */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setTooltip(false)}
                className="relative bg-[#111] border border-white/10 rounded-2xl px-4 py-3 shadow-xl max-w-[190px] cursor-pointer"
              >
                <p className="text-xs font-medium text-white leading-snug mb-0.5">
                  Need help choosing?
                </p>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Chat with us — reply in minutes.
                </p>
                {/* Triangle pointer */}
                <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-[#111] border-r border-b border-white/10 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ✅ Main button — no dismiss X */}
          <motion.a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setTooltip(false)}
            className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-black/30"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.824L.057 23.25a.75.75 0 0 0 .916.99l5.639-1.481A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.618-.506-5.12-1.387l-.363-.215-3.746.982.999-3.635-.236-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            {/* Online indicator */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
