//done

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Send,
  Sparkles,
  Shield,
  Zap,
  Link,
} from "lucide-react";
import { HelpCircle } from "lucide-react";

const EJS_SERVICE = "service_m1ca9n2";
const EJS_TEMPLATE = "template_0ivebdn";
const EJS_KEY = "GlD8bIb_GmDPhs3SJ";
const WA_NUMBER = "923282200919";

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
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-12 px-4 rounded-xl bg-white/4 border text-sm text-left flex items-center justify-between transition-all duration-200 focus:outline-none ${
          hasError
            ? "border-red-500/50 bg-red-500/5"
            : open
              ? "border-primary/60 bg-white/5"
              : "border-white/10 hover:border-white/20"
        } ${value ? "text-white" : "text-white/30"}`}
      >
        <span>{value || placeholder}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150 ${
                  value === opt
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full h-12 px-4 rounded-xl bg-[#0a0a0a] border text-white text-sm placeholder:text-white/20 focus:outline-none transition-all duration-200 ${
    hasError
      ? "border-red-500/50 focus:border-red-500/70 bg-red-500/5"
      : "border-white/10 focus:border-primary/50 focus:bg-white/5"
  }`;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-ui text-[9.5px] tracking-[0.25em] text-white/40 uppercase">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-400 px-1 flex items-center gap-1"
          >
            <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0 mt-px" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const INQUIRY_TYPES = [
  "General Inquiry",
  "Bulk Order (50+ gifts)",
  "Custom Branding",
  "Corporate Partnership",
  "Event Gifting",
  "Technical Support",
];

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@krystal.com",
    sub: "Reply within 4 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 328 2200919",
    sub: "Mon–Sat, 9AM–7PM PKT",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
    sub: "Serving 10+ countries",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon–Sat 9AM–7PM",
    sub: "PKT (GMT+5)",
  },
];

const TRUST_ITEMS = [
  { icon: Shield, text: "Your data is never shared or sold." },
  { icon: Zap, text: "We respond within 4 business hours." },
  { icon: Sparkles, text: "Dedicated account manager for orders PKR 50,000+." },
];

export default function ContactPage() {
  const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  };

  const [form, setFormState] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const updateForm = (k: string, v: string) => {
    setFormState((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.inquiry) e.inquiry = "Please select an inquiry type.";
    if (!form.message.trim()) e.message = "Please write a message.";
    else if (form.message.trim().length < 10)
      e.message = "Message too short (min 10 characters).";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || "Not provided",
          inquiry_type: form.inquiry,
          message: form.message,
          reply_to: form.email,
        },
        EJS_KEY,
      );
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const waMessage = encodeURIComponent(
    `🎁 *New Krystal Inquiry*\n\n*Name:* ${form.name}\n*Email:* ${form.email}${form.phone ? `\n*Phone:* ${form.phone}` : ""}\n*Inquiry:* ${form.inquiry}\n\n*Message:*\n${form.message}`,
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[130px]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <p className="font-ui text-[9.5px] tracking-[0.4em] text-primary mb-5 uppercase">
              Get In Touch
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide leading-[0.92] mb-6">
              Let's Build
              <br />
              <span className="gradient-gold-text">Something Together.</span>
            </h1>
            <p className="text-base text-white/45 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Planning a bulk order, exploring custom branding, or simply want
              to learn more?{" "}
              <span className="text-white/60">
                Response guaranteed within 4 hours.
              </span>
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-14">
            <div className="lg:col-span-2 space-y-4">
              <FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {CONTACT_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/7 hover:border-primary/25 transition-all duration-200 cursor-default"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-ui text-[8.5px] tracking-[0.25em] text-white/25 uppercase mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-white/80">
                          {item.value}
                        </p>
                        <p className="text-xs text-white/30 mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-[#25D366]/8 border border-[#25D366]/20 hover:bg-[#25D366]/14 hover:border-[#25D366]/35 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.824L.057 23.25a.75.75 0 0 0 .916.99l5.639-1.481A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.618-.506-5.12-1.387l-.363-.215-3.746.982.999-3.635-.236-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#25D366]">
                      Chat on WhatsApp
                    </p>
                    <p className="text-xs text-white/35 mt-0.5">
                      Fastest response — usually within minutes
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#25D366]/40 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                </a>
              </FadeIn>

              <FadeIn delay={0.18}>
                <div className="p-5 rounded-xl border border-white/6 bg-white/2">
                  <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/25 uppercase mb-4">
                    Our Commitment
                  </p>
                  <div className="space-y-3">
                    {TRUST_ITEMS.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-3 h-3 text-primary" />
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={0.08}>
                <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                  <div className="px-7 pt-7 pb-5 border-b border-white/6">
                    <h2 className="font-display text-2xl font-bold text-white tracking-wider">
                      Send a Message
                    </h2>
                    <p className="text-sm text-white/35 mt-1">
                      Fill in the details — we'll get back within 4 hours.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === "sent" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="px-7 py-14 flex flex-col items-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 18,
                            delay: 0.1,
                          }}
                          className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mb-6 shadow-gold"
                        >
                          <CheckCircle className="w-7 h-7 text-primary-foreground" />
                        </motion.div>

                        <p className="font-ui text-[9px] tracking-[0.35em] text-primary mb-3 uppercase">
                          Message Received
                        </p>
                        <h3 className="font-display text-2xl font-bold text-white tracking-wide mb-3">
                          Thank You, {form.name.split(" ")[0]}.
                        </h3>
                        <p className="text-sm text-white/45 max-w-xs leading-relaxed mb-7">
                          Your message has been sent to our team. We'll reply
                          within 4 business hours.
                        </p>

                        <div className="w-full max-w-sm bg-white/3 border border-white/8 rounded-xl p-5 text-left mb-7">
                          <p className="font-ui text-[8px] tracking-[0.3em] text-white/25 uppercase mb-3">
                            What You Sent
                          </p>
                          {[
                            { k: "Name", v: form.name },
                            { k: "Email", v: form.email },
                            { k: "Inquiry", v: form.inquiry },
                          ].map((row) => (
                            <div
                              key={row.k}
                              className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                            >
                              <span className="text-xs text-white/30">
                                {row.k}
                              </span>
                              <span className="text-xs text-white/65 font-medium max-w-[60%] text-right truncate">
                                {row.v}
                              </span>
                            </div>
                          ))}
                        </div>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 px-5 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/18 hover:border-[#25D366]/40 transition-all duration-300 mb-6"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-[#25D366] flex-shrink-0"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.824L.057 23.25a.75.75 0 0 0 .916.99l5.639-1.481A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.618-.506-5.12-1.387l-.363-.215-3.746.982.999-3.635-.236-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                          </svg>
                          <span className="text-xs font-ui tracking-wider text-[#25D366]">
                            Also follow up on WhatsApp
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#25D366]/50 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all duration-200" />
                        </a>

                        <button
                          onClick={() => {
                            setStatus("idle");
                            setFormState(EMPTY_FORM);
                            setErrors({});
                          }}
                          className="text-xs font-ui tracking-wider text-white/25 hover:text-primary transition-colors underline underline-offset-4"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="px-7 py-14 flex flex-col items-center text-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-5">
                          <span className="text-2xl">⚠️</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white tracking-wide mb-3">
                          Something Went Wrong
                        </h3>
                        <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-7">
                          We couldn't send your message. Please reach us
                          directly on WhatsApp or email.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-xs font-ui tracking-wider hover:bg-[#25D366]/18 transition-all"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3.5 h-3.5 fill-[#25D366]"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.508 5.824L.057 23.25a.75.75 0 0 0 .916.99l5.639-1.481A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.618-.506-5.12-1.387l-.363-.215-3.746.982.999-3.635-.236-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                            </svg>
                            WhatsApp Us
                          </a>
                          <button
                            onClick={() => setStatus("idle")}
                            className="px-5 py-2.5 rounded-full border border-white/10 text-white/50 text-xs font-ui tracking-wider hover:border-white/25 hover:text-white/75 transition-all"
                          >
                            Try Again
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {(status === "idle" || status === "sending") && (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        noValidate
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="px-7 py-6 space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Full Name" required error={errors.name}>
                            <input
                              type="text"
                              placeholder="Sarah Khan"
                              value={form.name}
                              onChange={(e) =>
                                updateForm("name", e.target.value)
                              }
                              className={inputCls(!!errors.name)}
                            />
                          </Field>
                          <Field
                            label="Email Address"
                            required
                            error={errors.email}
                          >
                            <input
                              type="email"
                              placeholder="sarah@company.com"
                              value={form.email}
                              onChange={(e) =>
                                updateForm("email", e.target.value)
                              }
                              className={inputCls(!!errors.email)}
                            />
                          </Field>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Phone Number" error={errors.phone}>
                            <input
                              type="tel"
                              placeholder="+92 300 0000000"
                              value={form.phone}
                              onChange={(e) =>
                                updateForm("phone", e.target.value)
                              }
                              className={inputCls(!!errors.phone)}
                            />
                          </Field>
                          <Field
                            label="Inquiry Type"
                            required
                            error={errors.inquiry}
                          >
                            <CustomSelect
                              value={form.inquiry}
                              onChange={(v) => updateForm("inquiry", v)}
                              options={INQUIRY_TYPES}
                              placeholder="Select inquiry type"
                              hasError={!!errors.inquiry}
                            />
                          </Field>
                        </div>

                        <Field
                          label="Your Message"
                          required
                          error={errors.message}
                        >
                          <textarea
                            placeholder="Tell us about your gifting needs — occasion, quantity, budget, timeline…"
                            rows={5}
                            value={form.message}
                            onChange={(e) =>
                              updateForm("message", e.target.value)
                            }
                            className={`${inputCls(!!errors.message)} resize-none py-3 h-auto`}
                          />
                        </Field>

                        <div className="pt-1">
                          <motion.button
                            type="submit"
                            disabled={status === "sending"}
                            whileHover={{
                              scale: status === "sending" ? 1 : 1.01,
                            }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-14 rounded-xl gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground flex items-center justify-center gap-2 hover:opacity-95 hover:shadow-gold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {status === "sending" ? (
                              <>
                                <svg
                                  className="w-4 h-4 animate-spin"
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
                                SENDING…
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                SEND MESSAGE
                              </>
                            )}
                          </motion.button>
                          <p className="text-[10.5px] text-white/20 text-center mt-3">
                            Your information is private and never shared.
                          </p>
                        </div>
                      </motion.form>
                    )}
                    <div className="px-7 pb-7">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="h-px bg-white/5 flex-1" />
                        <span className="font-ui text-[9px] tracking-[0.3em] text-white/20 uppercase">
                          Or find answers fast
                        </span>
                        <div className="h-px bg-white/5 flex-1" />
                      </div>
                      <motion.a
                        href="/faq"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-auto min-h-[56px] rounded-xl bg-white/5 border border-white/10 font-ui text-[10.5px] tracking-[0.2em] text-white flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/25 transition-all duration-300 px-4 py-4 text-center"
                      >
                        <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        VIEW FREQUENTLY ASKED QUESTIONS
                      </motion.a>
                    </div>
                  </AnimatePresence>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/6 py-12 bg-[#070707]">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: "< 4hrs", label: "Response Time" },
                { num: "100+", label: "Companies Served" },
                { num: "100%", label: "Satisfaction Rate" },
                { num: "5", label: "Countries Covered" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold gradient-gold-text mb-1">
                    {s.num}
                  </div>
                  <div className="font-ui text-[9px] tracking-[0.25em] text-white/30 uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
