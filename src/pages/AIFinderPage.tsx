//done

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Check,
  RotateCcw,
  Gift,
  Zap,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { products, calculateMatch } from "@/data/products";
import ProductCard from "@/components/ProductCard";

// ─── QUESTIONS — no emojis, clean formal copy ─────────────────────────────────
const questions = [
  {
    key: "recipient",
    label: "QUESTION 1 OF 7",
    title: "Who are you gifting?",
    subtitle: "Select the primary recipient of your gifts.",
    options: [
      { value: "Employees" },
      { value: "Clients" },
      { value: "Corporate Events" },
      { value: "Executives" },
      { value: "New Hires" },
    ],
  },
  {
    key: "occasion",
    label: "QUESTION 2 OF 7",
    title: "What's the occasion?",
    subtitle: "This helps us match the right tone and presentation.",
    options: [
      { value: "Employee Appreciation" },
      { value: "Holiday / Seasonal" },
      { value: "Milestone Achievement" },
      { value: "Corporate Event" },
      { value: "Welcome / Onboarding" },
    ],
  },
  {
    key: "quantity",
    label: "QUESTION 3 OF 7",
    title: "How many recipients?",
    subtitle: "We'll tailor pricing and logistics accordingly.",
    options: [
      { value: "1–10 people" },
      { value: "11–50 people" },
      { value: "51–100 people" },
      { value: "100+ people" },
    ],
  },
  {
    key: "budget",
    label: "QUESTION 4 OF 7",
    title: "Budget per gift?",
    subtitle: "We have curated options across all price points.",
    options: [
      { value: "Under PKR 2,000" },
      { value: "PKR 2,000–5,000" },
      { value: "PKR 5,000–10,000" },
      { value: "PKR 10,000–20,000" },
      { value: "PKR 20,000+" },
    ],
  },
  {
    key: "values",
    label: "QUESTION 5 OF 7",
    title: "What matters most?",
    subtitle: "Your priorities reflected in every gift we recommend.",
    options: [
      { value: "Sustainability / Eco-friendly" },
      { value: "Luxury / Premium" },
      { value: "Practical / Useful" },
      { value: "Unique / Memorable" },
      { value: "Tech / Innovation" },
    ],
  },
  {
    key: "type",
    label: "QUESTION 6 OF 7",
    title: "Preferred gift type?",
    subtitle: "Physical products, experiences, or custom branded.",
    options: [
      { value: "Physical products" },
      { value: "Experience gifts" },
      { value: "Subscription boxes" },
      { value: "Custom branded" },
      { value: "Mix of options" },
    ],
  },
  {
    key: "preferences",
    label: "QUESTION 7 OF 7",
    title: "Any specific preferences?",
    subtitle: "Fine-tune your recommendations with one last detail.",
    options: [
      { value: "Tech gadgets" },
      { value: "Wellness / Self-care" },
      { value: "Food & Beverages" },
      { value: "Office supplies" },
      { value: "Apparel / Fashion" },
    ],
  },
];

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen() {
  const steps = [
    "Analysing your preferences…",
    "Matching to our catalogue…",
    "Ranking by relevance…",
    "Curating your results…",
  ];
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStepIdx((p) => Math.min(p + 1, steps.length - 1));
    }, 450);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-sm"
      >
        {/* Spinning ring */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-primary/25 border-t-primary"
          />
          <div className="absolute inset-2 rounded-full gradient-gold flex items-center justify-center shadow-gold">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
          Finding Your Perfect Gifts
        </h2>
        <p className="text-[13px] text-white/35 mb-8 leading-relaxed">
          Our AI is cross-referencing your answers against our full catalogue.
        </p>

        <div className="h-6 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-ui text-[10px] tracking-[0.3em] text-primary uppercase"
            >
              {steps[stepIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-px mx-auto rounded-full bg-white/8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.85, ease: "easeInOut" }}
            className="h-full gradient-gold rounded-full"
            style={{ boxShadow: "0 0 8px rgba(212,175,55,0.5)" }}
          />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: i <= stepIdx ? 1 : 0.2,
                scale: i === stepIdx ? 1.4 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── RESULTS PAGE ─────────────────────────────────────────────────────────────
function ResultsPage({
  recommendations,
  onRetake,
  answers,
}: {
  recommendations: ((typeof products)[0] & { matchScore: number })[];
  onRetake: () => void;
  answers: Record<string, string[]>;
}) {
  // Summary of what user selected — shown as context pills
  const summaryPills = [
    answers.recipient?.[0],
    answers.occasion?.[0],
    answers.budget?.[0],
    answers.values?.[0],
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero band */}
      <div className="relative bg-[#0a0a0a] pt-28 pb-12 border-b border-white/6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 mb-6">
              <Trophy className="w-3.5 h-3.5 text-primary" />
              <span className="font-ui text-[9px] tracking-[0.3em] text-primary uppercase">
                AI-Curated Results
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.05]">
              Your Perfect Gifts,
              <br />
              <span className="gradient-gold-text">Matched by AI.</span>
            </h1>

            <p className="text-[13px] text-white/40 max-w-md mx-auto leading-relaxed mb-6">
              Based on your brief, we found{" "}
              <span className="text-primary font-semibold">
                {recommendations.length} gifts
              </span>{" "}
              that match your requirements. Sorted by relevance score.
            </p>

            {/* User's answer context pills */}
            {summaryPills.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
                {summaryPills.map((ans, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[10px] font-ui tracking-wider text-white/45"
                  >
                    {ans}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Results grid */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {recommendations.length === 0 ? (
          <div className="text-center py-24">
            <Gift className="w-12 h-12 text-primary/25 mx-auto mb-4" />
            <h3 className="font-display text-xl text-white mb-2">
              No exact matches found
            </h3>
            <p className="text-[13px] text-white/35 mb-8 leading-relaxed max-w-xs mx-auto">
              Try broadening your budget range or adjusting your preferences for
              more results.
            </p>
            <button
              onClick={onRetake}
              className="h-11 px-7 rounded-full border border-primary/40 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              RETAKE QUIZ
            </button>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {recommendations.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(i * 0.05, 0.4),
                    duration: 0.4,
                  }}
                >
                  <ProductCard
                    product={product}
                    matchScore={product.matchScore}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-14 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={onRetake}
                className="h-11 px-7 rounded-full border border-white/12 bg-white/3 font-ui text-[10px] tracking-[0.2em] text-white/50 inline-flex items-center gap-2 hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RETAKE QUIZ
              </button>
              <Link
                to="/shop"
                className="h-11 px-7 rounded-full gradient-gold font-ui text-[10px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.03] transition-all duration-300"
              >
                BROWSE ALL GIFTS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://wa.me/923282200919"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-7 rounded-full bg-[#25D366] font-ui text-[10px] tracking-[0.2em] text-white inline-flex items-center gap-2 hover:scale-[1.03] transition-all duration-300"
              >
                <Zap className="w-3.5 h-3.5" /> ORDER VIA WHATSAPP
              </a>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AIFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);

  // ── Auto-advance: when user selects an answer, wait 320ms then go next
  // The small delay lets the user see their selection highlighted before moving
  const handleSelect = (key: string, value: string) => {
    // Update answer immediately so checkmark + highlight shows
    setAnswers((prev) => ({ ...prev, [key]: [value] }));

    // Auto-advance after brief pause
    setTimeout(() => {
      if (step < questions.length - 1) {
        setDirection(1);
        setStep((p) => p + 1);
      } else {
        // Last question — show loader then results
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setShowResults(true);
        }, 1900);
      }
    }, 320);
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((p) => p - 1);
    }
  };

  const handleSkip = () => {
    setDirection(1);
    if (step < questions.length - 1) {
      setStep((p) => p + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowResults(true);
      }, 1900);
    }
  };

  const handleRetake = () => {
    setShowResults(false);
    setLoading(false);
    setStep(0);
    setAnswers({});
    setDirection(1);
  };

  // ── Accurate matching: threshold 25 so results always show
  const recommendations = products
    .map((p) => ({ ...p, matchScore: calculateMatch(p, answers) }))
    .filter((p) => p.matchScore >= 25)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12);

  if (loading) return <LoadingScreen />;
  if (showResults)
    return (
      <ResultsPage
        recommendations={recommendations}
        onRetake={handleRetake}
        answers={answers}
      />
    );

  const q = questions[step];

  // ✅ Progress = steps COMPLETED, not current step
  // Step 0 with no answer = 0%. Step 0 answered/moved to step 1 = 14% etc.
  const progress = (step / questions.length) * 100;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-24">
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/6 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-ui text-[9.5px] tracking-[0.3em] text-primary uppercase">
              AI Gift Finder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-2 leading-[1.1] tracking-wide"
          >
            Find Your Perfect Gift
            <br />
            <span className="gradient-gold-text">in 30 Seconds.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[13px] text-white/35 leading-relaxed"
          >
            Answer 7 quick questions — we'll match the ideal gifts for your
            requirements.
          </motion.p>
        </div>

        {/* ── Progress ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ui text-[9.5px] tracking-[0.25em] text-white/30 uppercase">
              {q.label}
            </span>
            {/* ✅ Shows 0% on Q1 — only increments after each completed step */}
            <span className="font-ui text-[9.5px] tracking-[0.2em] text-primary">
              {Math.round(progress)}% complete
            </span>
          </div>

          {/* Bar */}
          <div className="h-px rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full gradient-gold rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ boxShadow: "0 0 6px rgba(212,175,55,0.4)" }}
            />
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-between mt-2.5">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor:
                    i < step
                      ? "hsl(46,65%,52%)"
                      : i === step
                        ? "rgba(212,175,55,0.5)"
                        : "rgba(255,255,255,0.1)",
                  scale: i === step ? 1.3 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="w-1.5 h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* ── Question ── */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl tracking-wide font-bold text-white mb-1.5">
                {q.title}
              </h2>
              <p className="text-[13.5px] text-white/35">{q.subtitle}</p>
            </div>

            {/* Options — no emojis, clean formal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, i) => {
                const selected = answers[q.key]?.[0] === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28 }}
                    onClick={() => handleSelect(q.key, opt.value)}
                    className={`relative group flex items-center justify-between gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                      selected
                        ? "border-primary/60 bg-primary/10 shadow-[0_0_18px_rgba(212,175,55,0.1)]"
                        : "border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Gold left accent on selected */}
                    {selected && (
                      <motion.div
                        layoutId={`accent-${q.key}`}
                        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={`text-sm font-medium flex-1 leading-tight transition-colors ${
                        selected
                          ? "text-white"
                          : "text-white/55 group-hover:text-white/80"
                      }`}
                    >
                      {opt.value}
                    </span>

                    {/* Checkmark — appears on select */}
                    <AnimatePresence>
                      {selected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 22,
                          }}
                          className="w-5 h-5 rounded-full gradient-gold flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation — Back + Skip only (Next removed — auto-advance handles it) ── */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="h-11 px-5 rounded-full border border-white/10 font-ui text-[10.5px] tracking-[0.2em] text-white/35 disabled:opacity-20 disabled:cursor-not-allowed hover:border-white/25 hover:text-white/60 transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK
          </button>

          {/* Auto-advance hint */}
          <p className="font-ui text-[9px] tracking-[0.15em] text-white/18 hidden sm:block">
            Select an option to continue
          </p>

          <button
            onClick={handleSkip}
            className="h-11 px-5 rounded-full border border-white/8 font-ui text-[10.5px] tracking-[0.2em] text-white/30 hover:border-white/18 hover:text-white/50 transition-all duration-200"
          >
            SKIP
          </button>
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-[10px] text-white/15 font-ui tracking-wider mt-8"
        >
          No account needed · 30 seconds · 100% personalised
        </motion.p>
      </div>
    </div>
  );
}
