// //done

// import React, { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { Clock, ArrowRight } from "lucide-react";
// import { heroImage, productImages } from "@/assets/imageMap";

// const posts = [
//   {
//     id: "1",
//     tag: "Strategy",
//     title: "The 2026 Guide to Corporate Gifting That Actually Works",
//     excerpt:
//       "How AI is reshaping the way companies build relationships — and what your gifting program should look like this year.",
//     image: heroImage,
//     date: "Mar 10, 2026",
//     readTime: "8 min",
//     featured: true,
//     live: false,
//   },
//   {
//     id: "2",
//     tag: "Sustainability",
//     title: "5 Sustainable Gift Ideas for Eco-Conscious Brands",
//     excerpt:
//       "Align your gifting strategy with sustainability goals — without sacrificing quality or impact.",
//     image: Object.values(productImages)[3],
//     date: "Mar 5, 2026",
//     readTime: "5 min",
//     featured: false,
//     live: false,
//   },
//   {
//     id: "3",
//     tag: "Research",
//     title: "Why Personalized Gifts Drive 4.2× Higher Client Retention",
//     excerpt:
//       "Data-backed insights on how personalization outperforms generic gifting across every key metric.",
//     image: Object.values(productImages)[0],
//     date: "Feb 28, 2026",
//     readTime: "6 min",
//     featured: false,
//     live: false,
//   },
//   {
//     id: "4",
//     tag: "Executive",
//     title: "The Art of Executive Gifting: A Concierge Approach",
//     excerpt:
//       "When the stakes are high, every detail matters. White-glove service and what it means for your top relationships.",
//     image: Object.values(productImages)[7],
//     date: "Feb 20, 2026",
//     readTime: "7 min",
//     featured: false,
//     live: false,
//   },
// ];

// function FadeIn({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-50px" });
//   return (
//     <motion.div
//       ref={ref}
//       className={className}
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export default function BlogPage() {
//   const [featured, ...rest] = posts;

//   return (
//     <div className="min-h-screen bg-[#0a0a0a]">
//       <div className="pt-32 pb-12 border-b border-white/6">
//         <div className="container mx-auto px-4 lg:px-8">
//           <FadeIn>
//             <p className="font-ui text-[9.5px] tracking-[0.4em] text-primary mb-4 uppercase">
//               Insights & Guides
//             </p>
//             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//               <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide">
//                 The Krystal Journal
//               </h1>
//               <p className="text-sm text-white/30 max-w-xs leading-relaxed md:text-right">
//                 Perspectives on corporate gifting, client relationships, and the
//                 art of appreciation.
//               </p>
//             </div>
//           </FadeIn>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 lg:px-8 py-14">
//         <FadeIn>
//           <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/7 mb-6 cursor-default">
//             <div className="relative h-64 lg:h-auto overflow-hidden">
//               <img
//                 src={featured.image}
//                 alt={featured.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden lg:block" />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent lg:hidden" />
//               <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full gradient-gold text-[9px] font-ui tracking-[0.2em] text-primary-foreground uppercase">
//                 Featured
//               </span>
//             </div>
//             <div className="bg-white/3 p-7 lg:p-10 flex flex-col justify-center">
//               <span className="font-ui text-[9.5px] tracking-[0.3em] text-primary uppercase mb-3">
//                 {featured.tag}
//               </span>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-wide leading-tight mb-4">
//                 {featured.title}
//               </h2>
//               <p className="text-sm text-white/45 leading-relaxed mb-6">
//                 {featured.excerpt}
//               </p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3 text-[10px] text-white/25 font-ui tracking-wider">
//                   <span>{featured.date}</span>
//                   <span className="w-1 h-1 rounded-full bg-white/15" />
//                   <Clock className="w-3 h-3" />
//                   <span>{featured.readTime}</span>
//                 </div>
//                 <span className="px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-ui tracking-wider text-white/25">
//                   Coming Soon
//                 </span>
//               </div>
//             </div>
//           </div>
//         </FadeIn>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {rest.map((post, i) => (
//             <FadeIn key={post.id} delay={i * 0.08}>
//               <motion.div
//                 whileHover={{ y: -3 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 22 }}
//                 className="group rounded-2xl overflow-hidden border border-white/7 bg-white/2 hover:bg-white/3 transition-all duration-300 flex flex-col h-full cursor-default"
//               >
//                 <div className="relative h-44 overflow-hidden flex-shrink-0">
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-full object-cover"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
//                   <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[9px] font-ui tracking-wider text-white/50 uppercase">
//                     {post.tag}
//                   </span>
//                 </div>
//                 <div className="p-5 flex flex-col flex-1">
//                   <h2 className="font-display text-base font-bold text-white tracking-wider leading-snug mb-2.5 flex-1">
//                     {post.title}
//                   </h2>
//                   <p className="text-xs text-white/35 leading-relaxed mb-4 line-clamp-2">
//                     {post.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between pt-3 border-t border-white/6">
//                     <div className="flex items-center gap-2 text-[9px] text-white/20 font-ui tracking-wider">
//                       <span>{post.date}</span>
//                       <span className="w-1 h-1 rounded-full bg-white/15" />
//                       <Clock className="w-3 h-3" />
//                       <span>{post.readTime}</span>
//                     </div>
//                     <span className="text-[9px] font-ui tracking-wider text-white/20">
//                       Soon
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             </FadeIn>
//           ))}
//         </div>

//         <FadeIn delay={0.2} className="mt-14 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/2">
//             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//             <p className="text-xs text-white/30 font-ui tracking-wider">
//               Full articles dropping soon — follow us for updates
//             </p>
//           </div>
//         </FadeIn>
//       </div>
//     </div>
//   );
// }













import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { heroImage, productImages } from "@/assets/imageMap";
import { getBlogPosts } from "@/lib/sanity";

// ─── Fallback hardcoded posts (shown if Sanity has no published posts yet) ────
const FALLBACK_POSTS = [
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

// ─── Types ────────────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  live: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function resolvePostImage(post: BlogPost): string {
  if (post.image && post.image.startsWith("http")) return post.image;
  return post.image || heroImage;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  // Sanity returns "2026-03-10", fallback returns "Mar 10, 2026" already
  if (dateStr.includes("-")) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return dateStr;
}

// ─── Animation helpers ────────────────────────────────────────────────────────
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

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-white/7 bg-white/2 animate-pulse ${featured ? "grid grid-cols-1 lg:grid-cols-2" : "flex flex-col"}`}
    >
      <div className={`bg-white/6 ${featured ? "h-64 lg:h-auto" : "h-44"}`} />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-2.5 w-16 bg-white/8 rounded-full" />
        <div className="h-4 w-4/5 bg-white/8 rounded-full" />
        <div className="h-4 w-3/5 bg-white/8 rounded-full" />
        <div className="h-3 w-full bg-white/5 rounded-full mt-2" />
        <div className="h-3 w-4/5 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getBlogPosts()
      .then((data: BlogPost[]) => {
        if (cancelled) return;
        if (data && data.length > 0) {
          // Sort: featured first, then by date desc
          const sorted = [...data].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          setPosts(sorted);
          setUsingFallback(false);
          console.log(`✅ Loaded ${sorted.length} blog posts from Sanity`);
        } else {
          // No published posts yet — show fallbacks with "Coming Soon" treatment
          setPosts(FALLBACK_POSTS as BlogPost[]);
          setUsingFallback(true);
          console.log("ℹ️ No published blog posts in Sanity — using fallback");
        }
        setLoading(false);
      })
      .catch((err: any) => {
        if (cancelled) return;
        console.error("❌ Blog posts fetch error:", err);
        setPosts(FALLBACK_POSTS as BlogPost[]);
        setUsingFallback(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Split featured from rest
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ── Header ── */}
      <div className="pt-32 pb-12 border-b border-white/6">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <p className="font-ui text-[9.5px] tracking-[0.4em] text-primary mb-4 uppercase">
              Insights & Guides
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
        <AnimatePresence mode="wait">
          {loading ? (
            // ── Skeleton state ──
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <SkeletonCard featured />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── Featured post ── */}
              {featured && (
                <FadeIn className="mb-6">
                  <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/7">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={resolvePostImage(featured)}
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
                          <span>{formatDate(featured.date)}</span>
                          <span className="w-1 h-1 rounded-full bg-white/15" />
                          <Clock className="w-3 h-3" />
                          <span>{featured.readTime}</span>
                        </div>
                        {featured.live ? (
                          <motion.a
                            href={`/blog/${featured.id}`}
                            whileHover={{ x: 4 }}
                            className="inline-flex items-center gap-1.5 font-ui text-[9px] tracking-[0.2em] text-primary hover:opacity-75 transition-opacity uppercase"
                          >
                            READ <ArrowRight className="w-3 h-3" />
                          </motion.a>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-ui tracking-wider text-white/25">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* ── Rest of posts ── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((post, i) => (
                    <FadeIn key={post.id} delay={i * 0.08}>
                      <motion.div
                        whileHover={{ y: -3 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 22,
                        }}
                        className="group rounded-2xl overflow-hidden border border-white/7 bg-white/2 hover:bg-white/3 transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative h-44 overflow-hidden flex-shrink-0">
                          <img
                            src={resolvePostImage(post)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
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
                              <span>{formatDate(post.date)}</span>
                              <span className="w-1 h-1 rounded-full bg-white/15" />
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                            {post.live ? (
                              <motion.a
                                href={`/blog/${post.id}`}
                                whileHover={{ x: 2 }}
                                className="inline-flex items-center gap-1 font-ui text-[9px] tracking-wider text-primary hover:opacity-75 transition-opacity"
                              >
                                READ <ArrowRight className="w-3 h-3" />
                              </motion.a>
                            ) : (
                              <span className="text-[9px] font-ui tracking-wider text-white/20">
                                Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </FadeIn>
                  ))}
                </div>
              )}

              {/* ── Coming soon strip (only when using fallback or all posts are not live) ── */}
              {(usingFallback || posts.every((p) => !p.live)) && (
                <FadeIn delay={0.2} className="mt-14 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-xs text-white/30 font-ui tracking-wider">
                      Full articles dropping soon — follow us for updates
                    </p>
                  </div>
                </FadeIn>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}