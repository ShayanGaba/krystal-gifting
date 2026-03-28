// ─── NEWSLETTER STRIP ─────────────────────────────────────────────────────────

import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef, useState } from "react";

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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ✅ Fully functional: email validation, error states, success state
export default function NewsletterStrip() {
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
    // ✅ Simulated API call — replace with your actual email service
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="bg-[#f5f0e8] py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-4xl mx-auto">
            {/* Left copy */}
            <div className="flex-1">
              <p className="font-ui text-[9px] tracking-[0.35em] text-primary/70 mb-2 uppercase">
                Stay Ahead
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-wide">
                10% Off Your
                <br className="hidden md:block" /> First Order
              </h3>
              <p className="text-sm text-[#1a1a1a]/50 mt-2 leading-relaxed">
                Early access to new collections and exclusive corporate pricing.
              </p>
            </div>

            {/* Right — form or success */}
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
                      YOU'RE SUBSCRIBED — CHECK YOUR INBOX
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
                        className={`flex-1 md:w-52 h-11 px-4 rounded-full bg-white border text-[#1a1a1a] text-sm placeholder:text-[#1a1a1a]/30 focus:outline-none transition-colors disabled:opacity-60 ${
                          error
                            ? "border-red-400 focus:border-red-400"
                            : "border-[#1a1a1a]/10 focus:border-primary"
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="h-11 px-6 rounded-full gradient-gold font-ui text-[10px] tracking-[0.2em] text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-2"
                      >
                        {status === "loading" ? (
                          <>
                            {/* ✅ Loading spinner */}
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

                    {/* ✅ Inline validation error */}
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
