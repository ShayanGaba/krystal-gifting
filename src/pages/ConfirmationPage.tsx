// do implement localstorage or yk saved option in cart system

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle, Package, Mail } from "lucide-react";

export default function ConfirmationPage() {
  // ✅ useMemo prevents new order number on every re-render
  const orderNum = useMemo(
    () =>
      `KRY-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`,
    [],
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNum);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-32 relative z-10">
        <div className="max-w-lg mx-auto text-center">
          {/* ✅ Animated checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="w-24 h-24 rounded-3xl gradient-gold mx-auto mb-8 flex items-center justify-center shadow-gold"
          >
            <Check
              className="w-12 h-12 text-primary-foreground"
              strokeWidth={2.5}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-ui text-[9.5px] tracking-[0.4em] text-primary mb-4 uppercase">
              Order Confirmed
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide mb-3 leading-tight">
              Thank You.
              <br />
              Your Order is In.
            </h1>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm mx-auto">
              We've received your order and our team is on it. Expect a
              confirmation email shortly.
            </p>

            {/* Order number */}
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/4 border border-white/10 hover:border-primary/30 transition-all duration-200 mb-10"
            >
              <span className="font-mono text-sm text-white/60">
                {orderNum}
              </span>
              <span className="font-ui text-[9px] tracking-wider text-white/25 group-hover:text-primary transition-colors">
                COPY
              </span>
            </button>
          </motion.div>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
          >
            {[
              {
                icon: Mail,
                title: "Email Sent",
                desc: "Check your inbox for order details",
              },
              {
                icon: Package,
                title: "Processing",
                desc: "Your order is being prepared",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Updates",
                desc: "Shipping updates sent via WhatsApp",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="bg-white/[0.025] border border-white/7 rounded-2xl p-5 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <p className="text-xs font-semibold text-white/70 mb-1">
                  {item.title}
                </p>
                <p className="text-[11.5px] text-white/30 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/shop"
              className="h-12 px-8 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.03] transition-all duration-300"
            >
              CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923282200919?text=Hi!%20I%20just%20placed%20order%20and%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 rounded-full bg-[#25D366] font-ui text-[11px] tracking-[0.2em] text-white inline-flex items-center gap-2 hover:scale-[1.03] hover:opacity-95 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" /> WHATSAPP US
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
