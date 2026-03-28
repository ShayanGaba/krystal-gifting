//done

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// ─── CURTAIN REVEAL ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 1.0, delay, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── FADE ─────────────────────────────────────────────────────────────────────
function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ABOUT PAGE — 3 SECTIONS ──────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);

  const beliefs = [
    {
      n: "01",
      line: "Every gift is a brand impression.",
      sub: "It either strengthens a relationship or weakens one. There is no neutral.",
    },
    {
      n: "02",
      line: "Generic is forgettable.",
      sub: "Nothing in our catalogue exists by accident. Every product is hand-selected.",
    },
    {
      n: "03",
      line: "Precision over volume.",
      sub: "We'd rather help one company gift exceptionally than a thousand gift carelessly.",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* ══════════════════════════════════════════════════════════════
          SECTION 01 — WHO
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16"
      >
        {/* Ambient orb */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

        {/* Left rail — hidden on mobile so it doesn't look off-center */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="hidden md:block absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/18 to-transparent origin-top"
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 container mx-auto px-4 lg:px-8"
        >
          {/* Overline — centered on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center md:justify-start gap-4 mb-12"
          >
            <span className="font-ui text-[9.5px] tracking-[0.45em] text-primary uppercase">
              Krystal
            </span>
            <div className="h-px w-8 bg-primary/30" />
            <span className="font-ui text-[9.5px] tracking-[0.35em] text-white/25 uppercase">
              Est. 2020 · Karachi
            </span>
          </motion.div>

          {/* Hero headline — centered on mobile, left on desktop */}
          <div className="max-w-5xl mx-auto md:mx-0 text-center md:text-left">
            <Reveal delay={0.3}>
              <h1 className="font-display font-bold leading-[0.86] tracking-tight text-[14vw] md:text-[10.5vw] lg:text-[9vw] text-white">
                We don't
              </h1>
            </Reveal>
            <Reveal delay={0.42}>
              <h1 className="font-display font-bold leading-[0.86] tracking-tight text-[14vw] md:text-[10.5vw] lg:text-[9vw] gradient-gold-text">
                send gifts.
              </h1>
            </Reveal>
            <Reveal delay={0.54}>
              <h1 className="font-display font-bold leading-[0.86] tracking-tight text-[14vw] md:text-[10.5vw] lg:text-[9vw] text-white/12">
                We build legacies.
              </h1>
            </Reveal>
          </div>

          {/* Bottom row — stacked centered on mobile, side-by-side on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-14 md:mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between gap-8 md:gap-6"
          >
            <p className="text-[13.5px] text-white/30 max-w-[260px] leading-relaxed text-center md:text-left">
              Pakistan's most trusted corporate gifting partner. Founded in
              2020. 100+ enterprise clients. 5+ countries.
            </p>

            {/* Stats — centered on mobile */}
            <div className="flex items-center justify-center gap-8 md:gap-10">
              {[
                { v: "100+", l: "Clients" },
                { v: "100%", l: "Satisfaction" },
                { v: "5+", l: "Countries" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95 + i * 0.08, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="font-display text-xl md:text-2xl font-bold gradient-gold-text">
                    {s.v}
                  </div>
                  <div className="font-ui text-[8px] tracking-[0.28em] text-white/25 uppercase mt-0.5">
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom gold rule */}
        <div className="absolute bottom-0 left-0 right-0">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
            className="origin-left h-px bg-gradient-to-r from-primary/40 via-primary/12 to-transparent"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02 — THE STORY: Cream editorial section
      ══════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════
          02 — THE STORY: Cream editorial section
      ══════════════════════════════════════════ */}
      <section className="bg-[#f5ede8] py-28 md:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <Fade className="mb-12">
            <span className="font-ui text-[9.5px] tracking-[0.42em] text-primary/85 uppercase">
              The Story
            </span>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
            {/* Pull quote */}
            <div>
              <Reveal delay={0.05}>
                <p className="font-display text-[1.9rem] md:text-[2.4rem] font-bold text-[#0a0a0a] leading-[1.15]">
                  "Corporate gifting in Pakistan was broken. Companies were
                  sending
                  <span className="gradient-gold-text">
                    {" "}
                    forgettable things{" "}
                  </span>
                  to important people."
                </p>
              </Reveal>
            </div>

            {/* Body */}
            <Fade delay={0.15}>
              <div className="space-y-5 pt-1">
                <p className="text-[14px] text-[#0a0a0a]/60 leading-[1.9]">
                  In 2020, our founders set out to change that. Not with more
                  products — but with a different philosophy. Gifting is a
                  language, and like any language, it demands precision,
                  context, and intention.
                </p>
                <p className="text-[14px] text-[#0a0a0a]/60 leading-[1.9]">
                  We built Krystal around a simple conviction: every gift you
                  send is a brand impression. It either strengthens a
                  relationship or weakens one. There is no neutral.
                </p>
                <p className="text-[14px] text-[#0a0a0a]/60 leading-[1.9]">
                  Six years and 100+ enterprise clients later — we remain the
                  only gifting partner in Pakistan built with that standard at
                  its core.
                </p>

                {/* --- BLOG CTA ADDED HERE --- */}
                <div className="pt-6">
                  <Link
                    to="/blog"
                    className="group inline-flex items-center gap-3 text-[12px] font-display font-bold text-[#0a0a0a] uppercase tracking-[0.15em] transition-colors hover:text-primary"
                  >
                    <span className="relative pb-1">
                      Explore Our Journal
                      {/* Animated Underlines */}
                      <span className="absolute left-0 bottom-0 w-full h-px bg-[#0a0a0a]/15 scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
                      <span className="absolute left-0 bottom-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
                  </Link>
                </div>
                {/* --------------------------- */}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 03 — WHAT WE STAND FOR
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-28 md:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <Fade className="mb-14">
            <span className="font-ui text-[9.5px] tracking-[0.45em] text-primary/85 uppercase">
              What We Stand For
            </span>
          </Fade>

          <div>
            {beliefs.map((b, i) => (
              <Fade key={b.n} delay={i * 0.12}>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-9 border-t border-white/8 last:border-b cursor-default"
                >
                  <span className="font-ui text-[9px] tracking-[0.28em] text-white/20 pt-1.5 flex-shrink-0 w-8">
                    {b.n}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug mb-2 group-hover:text-primary transition-colors tracking-wide duration-300">
                      {b.line}
                    </h3>
                    <p className="text-[13px] text-white/60 leading-relaxed max-w-md">
                      {b.sub}
                    </p>
                  </div>
                </motion.div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
