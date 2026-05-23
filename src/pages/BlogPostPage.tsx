import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getBlogPostById } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

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
  content?: any[];
  metaDescription?: string;
}

// ─── Date formatter ───────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return dateStr;
}

// ─── Portable Text components (styles for rich text content) ──────────────────
const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-[15px] text-white/60 leading-[1.9] mb-5">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-xl font-bold text-white tracking-wide mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-primary pl-6 my-6">
        <p className="text-[15px] text-white/50 italic leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-2 mb-5 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-2 mb-5 ml-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-[15px] text-white/60 leading-relaxed flex gap-2">
        <span className="text-primary mt-1.5 flex-shrink-0">✦</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-[15px] text-white/60 leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="text-white/70 italic">{children}</em>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const src = value?.asset?.url || value?.asset?._ref;
      if (!src) return null;
      return (
        <div className="my-8 rounded-2xl overflow-hidden border border-white/8">
          <img
            src={src.startsWith("http") ? src : undefined}
            alt={value?.alt || ""}
            className="w-full h-auto object-cover"
          />
          {value?.caption && (
            <p className="text-center text-xs text-white/30 font-ui tracking-wider py-3 bg-white/2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 animate-pulse">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="h-4 w-24 bg-white/8 rounded-full mb-8" />
        <div className="h-3 w-16 bg-white/6 rounded-full mb-4" />
        <div className="h-8 w-4/5 bg-white/8 rounded-full mb-3" />
        <div className="h-8 w-3/5 bg-white/8 rounded-full mb-6" />
        <div className="h-4 w-48 bg-white/5 rounded-full mb-10" />
        <div className="aspect-[16/9] bg-white/5 rounded-2xl mb-10" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-3 bg-white/5 rounded-full ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Fade in helper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    getBlogPostById(id)
      .then((data: BlogPost | null) => {
        if (cancelled) return;
        if (data) {
          setPost(data);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <Skeleton />;

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 text-center px-4">
        <p className="font-ui text-[9px] tracking-[0.35em] text-primary mb-4 uppercase">
          404
        </p>
        <h1 className="font-display text-3xl font-bold text-white tracking-wide mb-4">
          Article not found
        </h1>
        <p className="text-sm text-white/35 mb-8">
          This post may not be published yet or the link has changed.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 h-11 px-7 rounded-full gradient-gold font-ui text-[10px] tracking-[0.2em] text-primary-foreground hover:shadow-gold hover:scale-[1.03] transition-all duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO JOURNAL
        </Link>
      </div>
    );
  }

  if (!post) return null;

  const heroSrc =
    post.image && post.image.startsWith("http") ? post.image : undefined;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <div className="relative pt-28 pb-0 overflow-hidden">
        {heroSrc && (
          <div className="absolute inset-0 z-0">
            <img
              src={heroSrc}
              alt={post.title}
              className="w-full h-full object-cover opacity-[0.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative z-10 pt-10 pb-14">
          <FadeIn>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/35 hover:text-primary transition-colors font-ui text-[10px] tracking-[0.2em] uppercase mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-ui tracking-[0.25em] text-primary uppercase">
                <Tag className="w-2.5 h-2.5" />
                {post.tag}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-white/25 font-ui tracking-wider">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide leading-[1.05] mb-5">
              {post.title}
            </h1>

            <p className="text-[15px] text-white/40 leading-relaxed mb-6 max-w-xl">
              {post.excerpt}
            </p>

            <p className="font-ui text-[10px] tracking-[0.2em] text-white/25 uppercase">
              {formatDate(post.date)}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Hero image (full width) */}
      {heroSrc && (
        <FadeIn delay={0.1}>
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-14">
            <div className="rounded-2xl overflow-hidden border border-white/8 aspect-[16/9]">
              <img
                src={heroSrc}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24">
        {post.content && post.content.length > 0 ? (
          <FadeIn delay={0.15}>
            <div className="prose-luxury">
              <PortableText value={post.content} components={ptComponents} />
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.15}>
            <div className="py-16 text-center border border-white/7 rounded-2xl bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse mr-2" />
              <span className="font-ui text-[10px] tracking-[0.3em] text-white/30 uppercase">
                Full article coming soon
              </span>
            </div>
          </FadeIn>
        )}

        {/* Back link */}
        <FadeIn delay={0.2} className="mt-16 pt-8 border-t border-white/8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-ui text-[10px] tracking-[0.2em] text-white/30 hover:text-primary transition-colors uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}