# Krystal — Luxury Corporate Gifting Platform

Pakistan's premier AI-powered corporate gifting platform. Built for enterprise.

---

## Overview

Krystal is a full-stack React/TypeScript web application for luxury corporate gifting. It features an AI gift matching engine, a curated product catalogue, cart and wishlist management, and a WhatsApp-first ordering flow designed for the Pakistani market.

**Stack:** React · TypeScript · Tailwind CSS · Framer Motion · React Router v6 · Vite

---

## Features

- **AI Gift Finder** — 7-question quiz with auto-advance, accurate product matching (weighted scoring across budget, recipient, values, occasion, and type)
- **Shop** — Filterable catalogue with sidebar, search, quick filters, price range, sort, and 2/3-column grid toggle
- **Product Detail** — Bulk pricing table, customization toggles (logo, message, gift wrap), accordion specs, product-specific reviews
- **Cart** — Animated line items, free shipping progress bar, order summary with WhatsApp ordering
- **Wishlist** — Persisted to `localStorage` with heart toggle throughout the site
- **Newsletter Popup** — 30-day cooldown via `localStorage`, form validation, success state
- **WhatsApp Widget** — Fixed bottom-right, opens pre-filled conversation
- **Scroll Progress Bar** — Gold gradient, fixed top on homepage

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── assets/          imageMap.ts — product/hero/collection image mappings
├── components/      Navbar, Footer, ProductCard, StarRating, ScrollToTop, WhatsAppWidget
├── context/         CartContext, WishlistContext
├── data/            products.ts — all product, review, collection, and calculateMatch logic
├── lib/             whatsapp.ts — message generators, formatPrice
├── pages/           Index, ShopPage, ProductDetailPage, CartPage, WishlistPage,
│                    CheckoutPage, ConfirmationPage, AIFinderPage, AboutPage,
│                    ContactPage, FAQPage, BlogPage, NotFound
└── App.tsx          Route configuration, providers
```

---

## Key Decisions

| Decision | Rationale |
|---|---|
| Bodoni Moda + Outfit | Display serif for editorial luxury feel; Outfit for clean, modern UI copy |
| `#0a0a0a` dark bg | Richer than pure black, prevents harshness |
| `hsl(46,65%,52%)` gold | Warm enough to feel genuine, restrained enough for luxury |
| WhatsApp-first ordering | Primary conversion channel for Pakistani enterprise buyers |
| AI matching threshold 25% | Ensures results always show; scored across 6 weighted factors |

---

## License

Private. All rights reserved. Built for Krystal, 2026.