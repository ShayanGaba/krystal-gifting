//done

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Leaf,
  Zap,
  Gift,
  Palette,
  Truck,
  MessageCircle,
  X,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Star,
  Award,
} from "lucide-react";
import { heroImage, collectionImages } from "@/assets/imageMap";
import { collections } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, hsl(46,65%,52%), hsl(30,45%,50%))",
      }}
    />
  );
}

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let s = 0;
    const step = target / (2000 / 16);
    const t = setInterval(() => {
      s += step;
      if (s >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [isInView, target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

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
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MarqueeStrip() {
  const items = [
    "✦ SHELL PAKISTAN",
    "✦ UNILEVER",
    "✦ HBL BANK",
    "✦ ENGRO CORP",
    "✦ JAZZ TELECOM",
    "✦ NESTLÉ",
    "✦ TELENOR",
    "✦ PACKAGES LIMITED",
    "✦ LUCKY CEMENT",
    "✦ HABIB METRO",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/8 py-3.5 bg-[#060606]">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-ui text-[9px] tracking-[0.32em] text-white/25 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const POPUP_KEY = "krystal_nl_dismissed_at";
const SUB_KEY = "krystal_nl_subscribed";
const POPUP_COOLDOWN_DAYS = 7;
const SHOW_DELAY_MS = 10000;

function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const isSubscribed = localStorage.getItem(SUB_KEY);
    if (isSubscribed) return;

    const dismissedAt = localStorage.getItem(POPUP_KEY);
    if (dismissedAt) {
      const lastDismissed = Number(dismissedAt);
      const msPerDay = 24 * 60 * 60 * 1000;
      const daysSince = (Date.now() - lastDismissed) / msPerDay;

      if (daysSince < POPUP_COOLDOWN_DAYS) return;
    }

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    if (!submitted) {
      localStorage.setItem(POPUP_KEY, Date.now().toString());
    }
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setSubmitted(true);
    localStorage.setItem(SUB_KEY, "true");

    setTimeout(dismiss, 3000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-[#0d0d0d] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-primary/10 blur-[60px] pointer-events-none" />

            <div className="px-8 pt-8 pb-10 relative z-10">
              <button
                onClick={dismiss}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form-state"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                      <Gift className="w-6 h-6 text-black" />
                    </div>

                    <p className="font-ui text-[10px] tracking-[0.4em] text-primary mb-2 uppercase font-bold">
                      Limited Invite
                    </p>

                    <h3 className="font-display text-[1.75rem] font-bold text-white mb-2 leading-tight">
                      10% Off Your <br />
                      First Order
                    </h3>

                    <p className="text-[13px] text-white/40 mb-8 leading-relaxed">
                      Join Karachi’s elite corporate network. Get early access
                      to new collections and bespoke pricing.
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      <div className="relative">
                        <input
                          autoFocus
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          }}
                          placeholder="name@company.com"
                          className={`w-full h-12 px-5 rounded-xl bg-white/5 border text-white text-sm placeholder:text-white/20 focus:outline-none transition-all ${
                            error
                              ? "border-red-500/50 bg-red-500/5 focus:border-red-500"
                              : "border-white/10 focus:border-primary focus:bg-white/[0.08]"
                          }`}
                        />
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[11px] text-red-400 mt-2 ml-1"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-xl gradient-gold font-ui text-[11px] font-bold tracking-[0.25em] text-black hover:brightness-110 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-primary/10"
                      >
                        CLAIM DISCOUNT
                      </button>
                    </form>

                    <p className="text-[10px] text-white/10 text-center mt-6 tracking-wide">
                      NO SPAM • PRIVACY FIRST • UNSUBSCRIBE ANYTIME
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      Welcome to Krystal.
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Your exclusive discount code is <br /> heading to your
                      inbox now.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validateEmail = (val: string) => {
    if (!val.trim()) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="bg-[#f8eeec] py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <p className="font-ui text-[10px] tracking-[0.35em] text-primary/85 mb-2 uppercase">
                Stay Ahead
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-wide leading-[1.15]">
                Exclusive Access.
                <br className="hidden md:block" /> Better Pricing.
              </h3>
              <p className="text-[13.5px] text-[#1a1a1a]/45 mt-2 leading-relaxed">
                Subscribe for early access to new collections and priority
                corporate rates.
              </p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary/10 border border-primary/25"
                  >
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-ui text-[11px] tracking-[0.15em] text-primary">
                      SUBSCRIBED — CHECK YOUR INBOX
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-2 w-full md:w-auto"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="your@company.com"
                        disabled={status === "loading"}
                        className={`flex-1 md:w-52 h-11 px-4 rounded-full bg-white border text-[#1a1a1a] text-sm placeholder:text-[#1a1a1a]/25 focus:outline-none transition-colors disabled:opacity-60 shadow-sm ${error ? "border-red-400 focus:border-red-400" : "border-[#1a1a1a]/10 focus:border-primary"}`}
                      />
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="h-11 px-6 rounded-full gradient-gold font-ui text-[10px] tracking-[0.2em] text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-2"
                      >
                        {status === "loading" ? (
                          <>
                            <svg
                              className="w-3 h-3 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            SENDING...
                          </>
                        ) : (
                          "SUBSCRIBE"
                        )}
                      </button>
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-500 px-4"
                      >
                        {error}
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah Khan",
    role: "HR Director",
    company: "TechCorp Pakistan",
    initials: "SK",
    rating: 5,
    text: "We commissioned 200 onboarding kits and the quality exceeded every expectation. Each one was customised to the last detail — our new hires were genuinely impressed.",
  },
  {
    name: "Ahmed Raza",
    role: "Chief Executive",
    company: "Raza Industries",
    initials: "AR",
    rating: 5,
    text: "The executive journals we sent to key clients were stunning. Three of them called personally just to say thank you — that kind of response is rare.",
  },
  {
    name: "Fatima Ali",
    role: "Events Manager",
    company: "MediaGroup",
    initials: "FA",
    rating: 5,
    text: "Delivered 150 gala hampers without a single issue. The presentation was immaculate and the response from guests was overwhelming.",
  },
  {
    name: "Omar Sheikh",
    role: "Head of Procurement",
    company: "Engro Corp",
    initials: "OS",
    rating: 5,
    text: "Managing large-scale gifting used to be a logistical challenge. Krystal made the entire process seamless — from selection to doorstep delivery across multiple cities.",
  },
  {
    name: "Ayesha Tariq",
    role: "Brand Manager",
    company: "Jazz Telecom",
    initials: "AT",
    rating: 5,
    text: "The branded packaging alone elevated our perception with partners. Premium, thoughtful, and delivered exactly on time for our quarterly milestone event.",
  },
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

  return (
    <section className="bg-[#0a0a0a] py-24 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="font-ui text-[10px] tracking-[0.35em] text-primary mb-3 uppercase">
            Client Voices
          </p>
          <h2 className="font-display text-4xl tracking-wide md:text-5xl font-bold text-white">
            Trusted by
            <br />
            Industry Leaders
          </h2>
          <p className="text-[13.5px] text-white/35 mt-4 max-w-sm mx-auto leading-relaxed">
            Real results from companies across Pakistan and beyond.
          </p>
        </FadeIn>

        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl min-h-[260px] md:min-h-[230px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="relative bg-white/[0.03] border border-white/8 rounded-2xl p-8 md:p-10 overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
                <span className="absolute top-6 right-8 font-display text-7xl text-primary/8 leading-none select-none pointer-events-none">
                  "
                </span>

                <div className="flex gap-0.5 mb-5">
                  {[...Array(testimonials[current].rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 text-primary fill-primary"
                    />
                  ))}
                </div>

                <p className="text-[15px] text-white/65 leading-relaxed mb-7 relative z-10 max-w-lg">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                    <span className="font-ui text-[11px] font-bold text-primary-foreground">
                      {testimonials[current].initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-white/35">
                      {testimonials[current].role} ·{" "}
                      {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/50 hover:text-primary transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/50 hover:text-primary transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`}
                  />
                </button>
              ))}
            </div>

            <span className="font-ui text-[10px] tracking-[0.2em] text-white/25">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {!paused && (
            <div className="mt-3 h-px bg-white/8 rounded-full overflow-hidden">
              <motion.div
                key={current}
                className="h-full bg-primary rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const FEATURED_IDS = [
  "executive-luxury",
  "client-appreciation",
  "employee-recognition",
  "tech-gadgets",
];

const COLLECTION_ICONS: Record<string, React.ElementType> = {
  "executive-luxury": Award,
  "client-appreciation": Gift,
  "employee-recognition": Star,
  "tech-gadgets": Zap,
};

const features = [
  {
    icon: Sparkles,
    label: "AI-POWERED",
    title: "Smart Gift Matching",
    desc: "Our AI analyses recipient profile, budget, and occasion to surface the most relevant gift — every single time.",
  },
  {
    icon: Globe,
    label: "GLOBAL REACH",
    title: "Delivered in 5+ Countries",
    desc: "Reliable logistics with strong local operations across Pakistan. Every order tracked, every delivery guaranteed.",
  },
  {
    icon: Leaf,
    label: "SUSTAINABLE",
    title: "Responsible Luxury",
    desc: "Ethically sourced products, mindful packaging, and a gifting philosophy built around lasting value.",
  },
  {
    icon: Zap,
    label: "ENTERPRISE",
    title: "Built for Scale",
    desc: "Bulk ordering, automated scheduling, and dedicated account management for programmes above PKR 50,000.",
  },
];

const steps = [
  {
    num: 1,
    icon: Sparkles,
    title: "Discover",
    desc: "Browse curated collections or let AI find the perfect match in seconds.",
  },
  {
    num: 2,
    icon: Palette,
    title: "Personalise",
    desc: "Add your brand identity, custom message, and premium packaging.",
  },
  {
    num: 3,
    icon: Truck,
    title: "Schedule",
    desc: "Automate bulk orders and deliveries across any timeline or location.",
  },
  {
    num: 4,
    icon: Gift,
    title: "Delight",
    desc: "Track every delivery and measure the impact of your gifting programme.",
  },
];

export default function HomePage() {
  const { products } = useProducts();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const featuredCollections = collections.filter((c) =>
    FEATURED_IDS.includes(c.id),
  );
  // useEffect(() => {
  //   getProducts().then((data) => {
  //     console.log("Sanity products:", data);
  //   });
  // }, []);

  return (
    <div className="overflow-x-hidden">
      <ScrollProgressBar />
      <NewsletterPopup />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        style={{ position: "relative" }}
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury corporate gifts"
            className="w-full h-full object-cover opacity-[0.18]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/75 to-[#0a0a0a]" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/7 blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/4 blur-[110px]" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-amber-900/8 blur-[90px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-4 lg:px-8 text-center pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8 backdrop-blur-sm whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
            <span className="font-ui text-[9px] tracking-[0.22em] text-primary sm:hidden">
              AI GIFTING · 100+ COMPANIES
            </span>
            <span className="font-ui text-[9px] tracking-[0.3em] text-primary hidden sm:inline">
              AI-POWERED GIFTING · TRUSTED BY 100+ COMPANIES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.95,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="font-display text-5xl md:text-7xl lg:text-[90px] font-bold leading-[0.9] tracking-tight mb-8"
          >
            <span className="gradient-gold-text">Legacy,</span>
            <br />
            <span className="text-white">Wrapped.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-body text-base md:text-[1.05rem] text-white/45 max-w-md mx-auto mb-10 leading-relaxed"
          >
            Corporate gifting that builds lasting relationships, not just
            goodwill. Curated for the world's most discerning brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/shop"
              className="h-12 px-8 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.04] transition-all duration-300 gold-shimmer"
            >
              BROWSE GIFTS <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-finder"
              className="h-12 px-8 rounded-full border border-white/12 bg-white/3 backdrop-blur-sm font-ui text-[11px] tracking-[0.2em] text-white/65 inline-flex items-center gap-2 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" /> AI FINDER
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto"
          >
            {[
              { num: 100, suffix: "+", label: "Companies" },
              { num: 1000, suffix: "+", label: "Gifts Delivered" },
              { num: 100, suffix: "%", label: "Satisfaction" },
              { num: 5, suffix: "+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-ui text-[9px] tracking-[0.25em] text-white/30 mt-1 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/18 flex items-start justify-center pt-1.5 mx-auto"
          >
            <div className="w-1 h-2 rounded-full bg-primary/50" />
          </motion.div>
        </motion.div> */}
      </section>

      <MarqueeStrip />

      <section className="bg-[#f8eeec] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/85 mb-3 uppercase">
                Curated for Excellence
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-wide leading-[1.05]">
                Gift Collections
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-[13px] text-[#1a1a1a]/45 max-w-s md:text-right leading-relaxed">
                Thoughtfully assembled for every occasion and every recipient.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 font-ui text-[10px] tracking-[0.2em] text-primary hover:opacity-65 transition-opacity"
              >
                VIEW ALL <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-2.5 md:gap-4">
            {featuredCollections.map((col, i) => {
              const IconComp = COLLECTION_ICONS[col.id] || Gift;
              return (
                <FadeIn key={col.id} delay={i * 0.07}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(col.name)}`}
                    className="block group"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 22,
                      }}
                      className={`relative overflow-hidden rounded-2xl ${i < 2 ? "h-72 md:h-80" : "h-60 md:h-64"}`}
                    >
                      <img
                        src={collectionImages[col.id]}
                        alt={col.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
                      {col.badge && (
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] font-ui tracking-[0.2em] gradient-gold text-primary-foreground uppercase">
                          {col.badge}
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                              <IconComp className="w-3 h-3 text-primary" />
                            </div>
                            <h3 className="font-display text-base font-bold text-white tracking-wider">
                              {col.name}
                            </h3>
                          </div>
                          <p className="text-[10px] text-white/40 font-ui tracking-widest">
                            {col.count} PRODUCTS
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/15 transition-all duration-300 flex-shrink-0">
                          <ArrowRight className="w-3.5 h-3.5 text-white/55 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[170px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/3 blur-[130px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary mb-4 uppercase">
                AI-Powered Discovery
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide leading-[1.05] mb-5">
                The Perfect Gift,
                <br />
                Found in <span className="gradient-gold-text">Seconds.</span>
              </h2>
              <p className="text-[13.5px] text-white/40 mb-8 leading-relaxed max-w-sm">
                Answer three simple questions. Our AI cross-references your
                recipient, budget, and occasion against our full catalogue — and
                surfaces exactly the right gift.
              </p>
              <Link
                to="/ai-finder"
                className="h-12 px-7 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.04] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" /> START AI FINDER
              </Link>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="flex flex-col gap-3">
                {[
                  {
                    q: "Who are you gifting?",
                    hint: "Client, employee, partner…",
                  },
                  {
                    q: "What's the occasion?",
                    hint: "Onboarding, milestone, seasonal…",
                  },
                  { q: "Budget per gift?", hint: "PKR 2,000 – 50,000+" },
                ].map((item, i) => (
                  <motion.div
                    key={item.q}
                    whileHover={{
                      x: 6,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-white/3 border border-white/7 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors duration-300"
                  >
                    <span className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/75">
                        {item.q}
                      </p>
                      <p className="text-xs text-white/28 mt-0.5">
                        {item.hint}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#f8eeec] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <p className="font-ui text-[10px] tracking-[0.35em] text-primary/85 mb-3 uppercase">
                Trending Now
              </p>
              <h2 className="font-display tracking-wide text-4xl md:text-5xl font-bold text-[#1a1a1a]">
                Best&#8209;Selling Gifts
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-1.5 font-ui text-[10px] tracking-[0.2em] text-primary hover:opacity-65 transition-opacity"
            >
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
            {products.slice(0, 4).map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.06}>
                <div>
                  <ProductCard product={product} />
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-full border border-primary/50 font-ui text-[10px] tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              VIEW FULL CATALOGUE <ArrowRight className="w-3 h-3" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="font-ui text-[10px] tracking-[0.35em] text-primary mb-3 uppercase">
              Why Krystal
            </p>
            <h2 className="font-display text-4xl tracking-wide md:text-5xl font-bold text-white">
              Gifting That Works
              <br />
              For Your Business
            </h2>
            <p className="text-[13.5px] text-white/35 mt-4 max-w-md mx-auto leading-relaxed">
              We don't just deliver gifts. We build programmes that turn
              appreciation into long-term loyalty.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group p-7 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-primary/25 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/4 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl border border-primary/20 bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/14 group-hover:border-primary/35 transition-colors duration-300">
                      <feat.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-ui text-[9px] tracking-[0.3em] text-primary/55 mb-1 uppercase">
                        {feat.label}
                      </p>
                      <h3 className="font-display text-lg tracking-wide font-bold text-white mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-[13px] text-white/38 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8eeec] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <p className="font-ui text-[10px] tracking-[0.35em] text-primary/85 mb-3 uppercase">
              The Process
            </p>
            <h2 className="font-display text-4xl tracking-wide md:text-5xl font-bold text-[#1a1a1a]">
              From Brief
              <br />
              to Delivered
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-[44px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            {steps.map((step, i) => (
              <FadeIn
                key={step.num}
                delay={i * 0.1}
                className="text-center relative"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 w-[72px] h-[72px] md:w-[88px] md:h-[88px] mx-auto rounded-full gradient-gold flex items-center justify-center shadow-gold mb-4 md:mb-5"
                >
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </motion.div>
                <p className="font-ui text-[9.5px] tracking-[0.3em] text-primary/75 mb-1 uppercase">
                  Step {step.num}
                </p>
                <h3 className="font-display text-base tracking-wide md:text-lg font-bold text-[#1a1a1a] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[12.5px] md:text-[13px] text-[#1a1a1a]/45 leading-relaxed px-1">
                  {step.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="gradient-gold py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: 100, suffix: "+", label: "Companies Trust Us" },
              { num: 1000, suffix: "+", label: "Gifts Delivered" },
              { num: 100, suffix: "%", label: "Satisfaction Rate" },
              { num: 5, suffix: "+", label: "Countries Served" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">
                  <AnimatedCounter target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-ui text-[10px] tracking-[0.25em] text-primary-foreground/65 mt-2 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterStrip />

      <section className="bg-[#0a0a0a] py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <p className="font-ui text-[10px] tracking-[0.35em] text-primary mb-5 uppercase">
              Get Started
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.0] tracking-wide mb-5">
              Elevate Your
              <br />
              <span className="gradient-gold-text">Corporate Gifting.</span>
            </h2>
            <p className="text-[13.5px] text-white/38 max-w-md mx-auto mb-10 leading-relaxed tracking-wide">
              Join 100+ companies who use Krystal to turn every business
              touchpoint into a lasting impression.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
              <Link
                to="/shop"
                className="h-12 px-8 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.04] transition-all duration-300"
              >
                BROWSE COLLECTIONS <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="h-12 px-8 rounded-full border border-white/10 bg-white/2 font-ui text-[11px] tracking-[0.2em] text-white/55 inline-flex items-center gap-2 hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                BOOK A CONSULTATION
              </Link>
              <a
                href="https://wa.me/923282200919"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 rounded-full bg-[#25D366] font-ui text-[11px] tracking-[0.2em] text-white inline-flex items-center gap-2 hover:scale-[1.04] hover:opacity-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" /> WHATSAPP US
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
