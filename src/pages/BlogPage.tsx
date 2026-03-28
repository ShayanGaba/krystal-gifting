//done

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { heroImage, productImages } from "@/assets/imageMap";

const posts = [
  {
    id: "1",
    tag: "Strategy",
    title: "The 2026 Guide to Corporate Gifting That Actually Works",
    excerpt:
      "How AI is reshaping the way companies build relationships — and what your gifting program should look like this year.",
    image: heroImage,
    date: "Mar 10, 2026",
    readTime: "8 min",
    featured: true,
    live: false,
  },
  {
    id: "2",
    tag: "Sustainability",
    title: "5 Sustainable Gift Ideas for Eco-Conscious Brands",
    excerpt:
      "Align your gifting strategy with sustainability goals — without sacrificing quality or impact.",
    image: Object.values(productImages)[3],
    date: "Mar 5, 2026",
    readTime: "5 min",
    featured: false,
    live: false,
  },
  {
    id: "3",
    tag: "Research",
    title: "Why Personalized Gifts Drive 4.2× Higher Client Retention",
    excerpt:
      "Data-backed insights on how personalization outperforms generic gifting across every key metric.",
    image: Object.values(productImages)[0],
    date: "Feb 28, 2026",
    readTime: "6 min",
    featured: false,
    live: false,
  },
  {
    id: "4",
    tag: "Executive",
    title: "The Art of Executive Gifting: A Concierge Approach",
    excerpt:
      "When the stakes are high, every detail matters. White-glove service and what it means for your top relationships.",
    image: Object.values(productImages)[7],
    date: "Feb 20, 2026",
    readTime: "7 min",
    featured: false,
    live: false,
  },
];

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="pt-32 pb-12 border-b border-white/6">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <p className="font-ui text-[9.5px] tracking-[0.4em] text-primary mb-4 uppercase">
              Insights & Guides
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              {/* ✅ Fixed: Krystal Journal not Guild Journal */}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide">
                The Krystal Journal
              </h1>
              <p className="text-sm text-white/30 max-w-xs leading-relaxed md:text-right">
                Perspectives on corporate gifting, client relationships, and the
                art of appreciation.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-14">
        {/* ── Featured ──────────────────────────────────────────────────── */}
        <FadeIn>
          {/* ✅ Not clickable — article not live yet */}
          <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/7 mb-6 cursor-default">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent lg:hidden" />
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full gradient-gold text-[9px] font-ui tracking-[0.2em] text-primary-foreground uppercase">
                Featured
              </span>
            </div>
            <div className="bg-white/3 p-7 lg:p-10 flex flex-col justify-center">
              <span className="font-ui text-[9.5px] tracking-[0.3em] text-primary uppercase mb-3">
                {featured.tag}
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-wide leading-tight mb-4">
                {featured.title}
              </h2>
              <p className="text-sm text-white/45 leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-white/25 font-ui tracking-wider">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  <Clock className="w-3 h-3" />
                  <span>{featured.readTime}</span>
                </div>
                {/* ✅ Coming soon badge instead of read more */}
                <span className="px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-ui tracking-wider text-white/25">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Rest ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group rounded-2xl overflow-hidden border border-white/7 bg-white/2 hover:bg-white/3 transition-all duration-300 flex flex-col h-full cursor-default"
              >
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[9px] font-ui tracking-wider text-white/50 uppercase">
                    {post.tag}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-display text-base font-bold text-white tracking-wider leading-snug mb-2.5 flex-1">
                    {post.title}
                  </h2>
                  <p className="text-xs text-white/35 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/6">
                    <div className="flex items-center gap-2 text-[9px] text-white/20 font-ui tracking-wider">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/15" />
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    {/* ✅ Coming soon instead of arrow */}
                    <span className="text-[9px] font-ui tracking-wider text-white/20">
                      Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* ── Bottom note ───────────────────────────────────────────────── */}
        <FadeIn delay={0.2} className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-xs text-white/30 font-ui tracking-wider">
              Full articles dropping soon — follow us for updates
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
