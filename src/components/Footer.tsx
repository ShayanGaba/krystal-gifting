import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  RotateCcw,
  Truck,
} from "lucide-react";

const links = [
  {
    heading: "Company",
    items: [
      { label: "About", path: "/about" },
      { label: "Shop", path: "/shop" },
      { label: "AI Finder", path: "/ai-finder" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    heading: "Solutions",
    items: [
      { label: "Corporate Gifting", path: "/shop" },
      { label: "Employee Recognition", path: "/shop" },
      { label: "Onboarding Kits", path: "/shop" },
      { label: "Bulk Orders", path: "/contact" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "FAQ", path: "/faq" },
      { label: "Shipping Info", path: "/faq" },
      { label: "Returns", path: "/faq" },
      { label: "Track Order", path: "/contact" },
    ],
  },
];

const trustItems = [
  { icon: Shield, label: "SSL Secure" },
  { icon: Shield, label: "Authentic Goods" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Truck, label: "Fast Shipping" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-white/6">
      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/*
          Mobile:  Brand full-width, then links in 2+1 grid
          Desktop: 4-column [brand | company | solutions | support]
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          {/* ── Brand ── */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <span className="font-display text-xl font-bold gradient-gold-text tracking-wider">
                KRYSTAL
              </span>
              <p className="font-ui text-[8px] tracking-[0.3em] text-white/30 uppercase mt-0.5">
                Luxury Corporate Gifting
              </p>
            </Link>

            <p className="text-[13px] text-white/30 leading-relaxed mb-7 max-w-[210px]">
              Pakistan's premier corporate gifting partner. Every gift, a
              lasting impression.
            </p>

            <div className="flex flex-col gap-3.5">
              <a
                href="https://wa.me/923282200919"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group w-fit"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                <span className="text-[12.5px] text-white/30 group-hover:text-white/70 transition-colors">
                  +92 328 2200919
                </span>
              </a>
              <a
                href="mailto:hello@krystal.pk"
                className="flex items-center gap-2.5 group w-fit"
              >
                <Mail className="w-3.5 h-3.5 text-primary/45 flex-shrink-0" />
                <span className="text-[12.5px] text-white/30 group-hover:text-white/70 transition-colors">
                  hello@krystal.pk
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                <span className="text-[12.5px] text-white/30">
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>

          {/* ── Link columns ──
              Mobile: first two side-by-side in row 1, last one alone in row 2 (left-aligned)
              Desktop: each in its own column
          ── */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {links.map((col) => (
              <div key={col.heading}>
                <p className="font-ui text-[8.5px] tracking-[0.35em] text-primary/75 uppercase mb-5">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        className="text-[13px] text-white/30 hover:text-white/70 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gold rule ── */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="container mx-auto px-4 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-[9px] tracking-[0.2em] text-white/20 order-last sm:order-first">
            © 2026 KRYSTAL. ALL RIGHTS RESERVED.
          </p>

          {/* Trust badges — icons only on mobile, text on desktop */}
          <div className="flex items-center gap-5">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-primary/35 flex-shrink-0" />
                <span className="font-ui text-[9px] tracking-[0.15em] text-white/40 uppercase hidden sm:block">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="font-ui text-[9px] tracking-[0.25em] text-primary/55 hover:text-primary transition-colors uppercase inline-flex items-center gap-1.5"
          >
            SHOP NOW <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
