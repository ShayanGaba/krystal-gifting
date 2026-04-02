import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 text-center max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[120px] md:text-[160px] font-bold leading-none gradient-gold-text mb-2 select-none"
        >
          404
        </motion.div>

        <p className="font-ui text-[9px] tracking-[0.4em] text-primary mb-4 uppercase">
          Page Not Found
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide mb-4 leading-tight">
          This page doesn't exist.
        </h1>
        <p className="text-sm text-white/35 leading-relaxed mb-10 max-w-xs mx-auto">
          The URL{" "}
          <span className="font-mono text-white/50 text-xs">
            {location.pathname}
          </span>{" "}
          couldn't be found. It may have moved or been removed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="h-12 px-8 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.03] transition-all duration-300"
          >
            <Home className="w-4 h-4" /> GO HOME
          </Link>
          <Link
            to="/shop"
            className="h-12 px-8 rounded-full border border-white/10 font-ui text-[11px] tracking-[0.2em] text-white/50 inline-flex items-center gap-2 hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" /> BROWSE GIFTS
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
