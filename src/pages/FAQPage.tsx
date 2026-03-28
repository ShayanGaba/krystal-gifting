import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    cat: "Ordering",
    items: [
      {
        q: "What is the minimum order quantity?",
        a: "No minimum for standard products. Custom branded items require a minimum of 10 units. Bulk pricing kicks in at 10+ units.",
      },
      {
        q: "How do bulk order discounts work?",
        a: "Orders of 10+ units receive 11% off, 50+ receive 22% off, and 100+ receive 30%+ off. Contact us for custom enterprise quotes.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Cash on Delivery, Bank Transfer, Credit & Debit Cards, Digital Wallets, and Purchase Orders for corporate accounts.",
      },
    ],
  },
  {
    cat: "Customization",
    items: [
      {
        q: "Can I add my company logo?",
        a: "Yes. We offer logo engraving, embossing, screen printing, and laser etching. Upload your artwork during checkout or contact us — mockups are provided within 24 hours.",
      },
      {
        q: "Can I include a personalized message?",
        a: "Absolutely. Each gift can include a custom message card up to 100 characters, at no extra cost.",
      },
    ],
  },
  {
    cat: "Shipping",
    items: [
      {
        q: "What shipping options are available?",
        a: "Standard delivery 3–5 days (free over PKR 5,000), Express 1–2 days (PKR 800), Same-Day within Karachi (PKR 1,500). International shipping available to 45+ countries in 7–14 days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. We deliver to 45+ countries. International shipping rates are calculated at checkout based on destination and weight.",
      },
    ],
  },
  {
    cat: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "30-day returns on unused items in original packaging. Full refund or exchange. Customized items are non-returnable due to their personalized nature.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "Contact us within 48 hours with photos and we'll arrange a full replacement or refund immediately — no questions asked.",
      },
    ],
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>("Ordering-0");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="pt-32 pb-14 border-b border-white/6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-primary/4 blur-[130px] pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn className="max-w-2xl">
            <p className="font-ui text-[9.5px] tracking-[0.4em] text-primary mb-4 uppercase">
              Help Centre
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-white/40 leading-relaxed">
              Everything you need to know about ordering, customization,
              shipping, and returns. Can't find your answer?{" "}
              <a
                href="/contact"
                className="text-primary hover:underline transition-colors"
              >
                Contact us directly.
              </a>
            </p>
          </FadeIn>
        </div>
      </div>

      {/* FAQ content */}
      <div className="container mx-auto px-4 lg:px-8 py-14 max-w-3xl">
        {faqData.map((section, si) => (
          <FadeIn key={section.cat} delay={si * 0.06} className="mb-10">
            {/* Category label */}
            <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary mb-4 uppercase">
              {section.cat}
            </p>

            {/* Items */}
            <div className="space-y-2">
              {section.items.map((item, ii) => {
                const key = `${section.cat}-${ii}`;
                const isOpen = openItem === key;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-primary/25 bg-white/3"
                        : "border-white/7 bg-white/[0.015] hover:border-white/14"
                    }`}
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? null : key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span
                        className={`text-sm font-medium pr-4 transition-colors duration-200 ${
                          isOpen ? "text-white" : "text-white/65"
                        }`}
                      >
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-colors duration-200 ${
                            isOpen ? "text-primary" : "text-white/25"
                          }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm text-white/40 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        ))}

        {/* Bottom CTA */}
        <FadeIn
          delay={0.3}
          className="mt-12 p-6 rounded-2xl border border-white/7 bg-white/[0.02] text-center"
        >
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary mb-3 uppercase">
            Still Have Questions?
          </p>
          <p className="text-sm text-white/40 mb-5 leading-relaxed tracking-wide">
            Our team responds within 4 hours during business hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="h-11 px-7 rounded-full gradient-gold font-ui text-[10.5px] tracking-[0.2em] text-primary-foreground hover:shadow-gold hover:scale-[1.03] transition-all duration-300 inline-flex items-center"
            >
              CONTACT US
            </a>
            <a
              href="https://wa.me/923282200919"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-7 rounded-full bg-[#25D366] font-ui text-[10.5px] tracking-[0.2em] text-white hover:scale-[1.03] hover:opacity-95 transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.824L.057 23.25a.75.75 0 0 0 .916.99l5.639-1.481A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.618-.506-5.12-1.387l-.363-.215-3.746.982.999-3.635-.236-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WHATSAPP US
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
