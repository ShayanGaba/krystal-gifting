// do emailjs part

import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CreditCard,
  Banknote,
  Wallet,
  FileText,
  ChevronDown,
  Lock,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  formatPrice,
  openWhatsApp,
  generateCartWhatsAppMessage,
} from "@/lib/whatsapp";
import emailjs from "@emailjs/browser";

const EJS_SERVICE = "service_m1ca9n2";
const EJS_TEMPLATE = "template_0ivebdn";
const EJS_KEY = "GlD8bIb_GmDPhs3SJ";

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
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
        className="w-full h-12 px-4 rounded-xl bg-white/4 border border-white/10 text-sm text-white text-left flex items-center justify-between hover:border-white/20 focus:border-primary/50 focus:outline-none transition-all"
      >
        <span>{value}</span>
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
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/50"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${value === opt ? "text-primary bg-primary/8" : "text-white/55 hover:text-white hover:bg-white/5"}`}
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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.025] border border-white/8 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/6">
        <h2 className="font-display text-lg font-bold text-white tracking-wider">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full h-12 px-4 rounded-xl bg-[#101010] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-primary/50 focus:outline-none focus:bg-white/5 transition-all";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    isWhatsApp: true,
    street: "",
    city: "Karachi",
    province: "Sindh",
    instructions: "",
    shipping: "standard",
    payment: "cod",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const upd = (k: string, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const shipping = useMemo(() => {
    if (form.shipping === "express") return 800;
    if (form.shipping === "sameday") return 1500;
    return totalPrice >= 5000 ? 0 : 800;
  }, [form.shipping, totalPrice]);

  const grandTotal = totalPrice + shipping;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.street.trim()) e.street = "Street address is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);

    const itemsSummary = items
      .map(
        (i) =>
          `• ${i.name} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`,
      )
      .join("\n");

    const orderDetails = [
      "🛍️ NEW ORDER — KRYSTAL",
      "",
      "👤 Customer",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}${form.isWhatsApp ? " (WhatsApp)" : ""}`,
      "",
      "📦 Items",
      itemsSummary,
      "",
      "💰 Pricing",
      `Subtotal: ${formatPrice(totalPrice)}`,
      `Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}`,
      `Total: ${formatPrice(grandTotal)}`,
      "",
      "🚚 Delivery",
      `${form.street}, ${form.city}, ${form.province}`,
      form.instructions ? `Notes: ${form.instructions}` : "",
      `Shipping: ${form.shipping}`,
      "",
      "💳 Payment",
      form.payment.toUpperCase(),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      // send to emailJS
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          inquiry_type: "New Order",
          message: orderDetails,
          reply_to: form.email,
        },
        EJS_KEY,
      );
    } catch (err) {
      console.error("EmailJS error:", err);
      // still proceed — don't block user
    }

    clearCart();
    navigate("/confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 text-center px-4">
        <h1 className="font-display text-3xl text-white mb-4 tracking-wide">
          Nothing to checkout
        </h1>
        <Link
          to="/shop"
          className="text-primary font-ui text-sm tracking-wider"
        >
          Browse Gifts →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="pt-28 pb-8 border-b border-white/6">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/80 mb-3 uppercase">
            Secure Checkout
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide">
              Checkout
            </h1>
            <div className="flex items-center gap-2">
              {["Cart", "Details", "Confirm"].map((s, i) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex items-center gap-1.5 ${i <= 1 ? "text-primary" : "text-white/20"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${i < 1 ? "gradient-gold text-primary-foreground" : i === 1 ? "border border-primary" : "border border-white/15"}`}
                    >
                      {i < 1 ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    <span className="font-ui text-[9.5px] tracking-wider hidden sm:inline">
                      {s}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-8 h-px ${i < 1 ? "bg-primary" : "bg-white/10"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-5">
            <Card title="Customer Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => upd("name", e.target.value)}
                    placeholder="Full Name *"
                    className={inputCls}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-400 mt-1 px-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => upd("email", e.target.value)}
                    placeholder="Email Address *"
                    className={inputCls}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1 px-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => upd("phone", e.target.value)}
                    placeholder="Phone Number *"
                    className={inputCls}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1 px-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <label className="flex items-center gap-3 h-12 cursor-pointer">
                  <div
                    onClick={() => upd("isWhatsApp", !form.isWhatsApp)}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${form.isWhatsApp ? "bg-[#25D366]" : "bg-white/10"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${form.isWhatsApp ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </div>
                  <span className="text-sm text-white/60">
                    This number is on WhatsApp
                  </span>
                </label>
              </div>
            </Card>

            <Card title="Delivery Address">
              <div className="space-y-4">
                <div>
                  <input
                    required
                    value={form.street}
                    onChange={(e) => upd("street", e.target.value)}
                    placeholder="Street Address *"
                    className={inputCls}
                  />
                  {errors.street && (
                    <p className="text-[11px] text-red-400 mt-1 px-1">
                      {errors.street}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={form.city}
                    onChange={(v) => upd("city", v)}
                    options={[
                      "Karachi",
                      "Lahore",
                      "Islamabad",
                      "Rawalpindi",
                      "Faisalabad",
                      "Multan",
                      "Peshawar",
                      "Quetta",
                    ]}
                  />
                  <Select
                    value={form.province}
                    onChange={(v) => upd("province", v)}
                    options={["Sindh", "Punjab", "KPK", "Balochistan"]}
                  />
                </div>
                <textarea
                  value={form.instructions}
                  onChange={(e) => upd("instructions", e.target.value)}
                  placeholder="Delivery instructions (optional)"
                  className="w-full h-20 p-4 rounded-xl bg-[#101010] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-primary/50 focus:outline-none resize-none transition-all"
                />
              </div>
            </Card>

            <Card title="Shipping Method">
              <div className="space-y-3">
                {[
                  {
                    value: "standard",
                    label: "Standard Delivery",
                    sub: "3–5 business days",
                    price: totalPrice >= 5000 ? "Free" : "PKR 800",
                  },
                  {
                    value: "express",
                    label: "Express Delivery",
                    sub: "1–2 business days",
                    price: "PKR 800",
                  },
                  {
                    value: "sameday",
                    label: "Same-Day (Karachi)",
                    sub: "Order before 12PM",
                    price: "PKR 1,500",
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${form.shipping === opt.value ? "border-primary bg-primary/6" : "border-white/8 hover:border-white/16 bg-white/2"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.shipping === opt.value ? "border-primary" : "border-white/20"}`}
                      >
                        {form.shipping === opt.value && (
                          <div className="w-2.5 h-2.5 rounded-full gradient-gold" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">
                          {opt.label}
                        </p>
                        <p className="text-xs text-white/35">{opt.sub}</p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold ${opt.price === "Free" ? "text-primary" : "text-white/70"}`}
                    >
                      {opt.price}
                    </span>
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.value}
                      checked={form.shipping === opt.value}
                      onChange={(e) => upd("shipping", e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </Card>

            <Card title="Payment Method">
              <div className="space-y-3">
                {[
                  {
                    value: "cod",
                    label: "Cash on Delivery",
                    icon: Banknote,
                    tag: "Most Popular",
                  },
                  { value: "bank", label: "Bank Transfer", icon: CreditCard },
                  {
                    value: "card",
                    label: "Credit / Debit Card",
                    icon: CreditCard,
                  },
                  { value: "wallet", label: "Digital Wallet", icon: Wallet },
                  { value: "po", label: "Purchase Order", icon: FileText },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${form.payment === opt.value ? "border-primary bg-primary/6" : "border-white/8 hover:border-white/16 bg-white/2"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.payment === opt.value ? "border-primary" : "border-white/20"}`}
                    >
                      {form.payment === opt.value && (
                        <div className="w-2.5 h-2.5 rounded-full gradient-gold" />
                      )}
                    </div>
                    <opt.icon className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <span className="text-sm text-white/75 flex-1">
                      {opt.label}
                    </span>
                    {opt.tag && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-ui tracking-wider gradient-gold text-primary-foreground">
                        {opt.tag}
                      </span>
                    )}
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={form.payment === opt.value}
                      onChange={(e) => upd("payment", e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
            <div className="bg-[#0d0d0d] border border-white/8 rounded-2xl overflow-hidden">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-white mb-5 tracking-wider">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/70 truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-white/30 font-ui">
                          × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm text-white/70 flex-shrink-0 tracking-wide">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/6 mb-4" />

                <div className="space-y-2.5 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white/70 tracking-wide">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Shipping</span>
                    <span
                      className={
                        shipping === 0 ? "text-primary" : "text-white/70"
                      }
                    >
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="h-px bg-white/6" />
                  <div className="flex justify-between items-end">
                    <span className="font-ui text-[10.5px] tracking-wider text-white/40 uppercase">
                      Total
                    </span>
                    <span className="font-display text-2xl tracking-wider font-bold text-white">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full h-14 rounded-xl gradient-gold font-ui text-[11.5px] tracking-[0.2em] text-primary-foreground flex items-center justify-center gap-2 hover:shadow-gold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
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
                      PLACING ORDER…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> PLACE ORDER —{" "}
                      {formatPrice(grandTotal)}
                    </>
                  )}
                </motion.button>
                <p className="text-[10.5px] text-white/20 text-center mt-3">
                  128-bit SSL encryption · Your data is secure
                </p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/6 rounded-xl px-5 py-4 space-y-3">
              {[
                { icon: Lock, label: "Secure & encrypted checkout" },
                { icon: Truck, label: "Free shipping over PKR 5,000" },
                { icon: Check, label: "30-day hassle-free returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" />
                  <span className="font-ui text-[9px] tracking-[0.2em] text-white/25 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
