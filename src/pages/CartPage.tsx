//done

import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { productImages } from "@/assets/imageMap";
import {
  formatPrice,
  openWhatsApp,
  generateCartWhatsAppMessage,
} from "@/lib/whatsapp";

function EmptyCart() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 text-center"
      >
        <div className="w-20 h-20 rounded-2xl border border-white/8 bg-white/[0.03] flex items-center justify-center mx-auto mb-7">
          <ShoppingBag className="w-8 h-8 text-white/20" />
        </div>
        <p className="font-ui text-[9px] tracking-[0.35em] text-primary mb-4 uppercase">
          Your Cart
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-wide mb-3">
          Nothing here yet
        </h1>
        <p className="text-sm text-white/35 mb-10 leading-relaxed max-w-xs mx-auto">
          Discover curated luxury gifts for the people and brands that matter
          most.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="h-12 px-8 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground inline-flex items-center gap-2 hover:shadow-gold hover:scale-[1.03] transition-all duration-300"
          >
            BROWSE GIFTS <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/ai-finder"
            className="h-12 px-8 rounded-full border border-white/10 bg-white/[0.02] font-ui text-[11px] tracking-[0.2em] text-white/45 inline-flex items-center gap-2 hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            AI FINDER
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function QtyControl({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onDecrease}
        className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/8 transition-all duration-200"
      >
        <Minus className="w-3 h-3" />
      </motion.button>
      <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-white border-x border-white/8">
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onIncrease}
        className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/8 transition-all duration-200"
      >
        <Plus className="w-3 h-3" />
      </motion.button>
    </div>
  );
}

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  const FREE_THRESHOLD = 5000;
  const SHIPPING = 800;
  const freeShipping = totalPrice >= FREE_THRESHOLD;
  const shippingCost = freeShipping ? 0 : SHIPPING;
  const orderTotal = totalPrice + shippingCost;
  const progress = Math.min((totalPrice / FREE_THRESHOLD) * 100, 100);
  const remaining = FREE_THRESHOLD - totalPrice;

  const handleWhatsApp = () =>
    openWhatsApp(
      generateCartWhatsAppMessage(
        items.map((i) => ({
          name: i.name,
          variant: i.variant,
          quantity: i.quantity,
          price: i.price,
          customization: i.customization,
        })),
        totalPrice,
      ),
    );

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-[#0a0a0a] pt-28 pb-8 border-b border-white/6">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/80 mb-3 uppercase">
            Review & Checkout
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide mb-3">
            Your Cart
          </h1>
          {/* ✅ Moved below heading, above border */}
          <div className="flex items-center justify-between">
            <span className="font-ui text-[10.5px] tracking-[0.2em] text-white/35">
              {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
            </span>
            <button
              onClick={clearCart}
              className="font-ui text-[9.5px] tracking-[0.2em] text-white/30 hover:text-red-400/60 transition-colors uppercase"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Free shipping bar */}
      <div className="bg-[#0d0d0d] border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-2">
            <AnimatePresence mode="wait">
              {freeShipping ? (
                <motion.p
                  key="free"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-ui text-[10.5px] tracking-[0.2em] text-primary uppercase"
                >
                  ✦ Free shipping unlocked
                </motion.p>
              ) : (
                <motion.p
                  key="remaining"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-ui text-[10.5px] tracking-[0.2em] text-white/30 uppercase"
                >
                  Add {formatPrice(remaining)} for free shipping
                </motion.p>
              )}
            </AnimatePresence>
            <Truck className="w-4 h-4 text-white/30" />
          </div>
          <div className="h-px rounded-full bg-white/6 overflow-hidden">
            <motion.div
              className="h-full gradient-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                boxShadow: freeShipping
                  ? "0 0 6px rgba(212,175,55,0.4)"
                  : "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 min-w-0 space-y-3">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.04,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group flex gap-4 bg-white/[0.025] border border-white/7 rounded-2xl p-4 hover:border-white/12 transition-colors duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/4 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border border-white/8">
                      <img
                        src={productImages[item.id] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-display text-base md:text-lg font-bold text-white hover:text-primary transition-colors duration-200 leading-snug block truncate"
                        >
                          {item.name}
                        </Link>
                        <p className="font-ui text-[9.5px] tracking-[0.2em] text-white/30 uppercase mt-0.5">
                          {item.category}
                        </p>
                        {item.customization && (
                          <p className="text-[11px] text-primary mt-1 font-ui tracking-wide">
                            ✦ {item.customization}
                          </p>
                        )}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full bg-white/4 flex items-center justify-center text-white/25 hover:bg-red-500/15 hover:text-red-400/70 transition-all duration-200 flex-shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
                      <QtyControl
                        quantity={item.quantity}
                        onDecrease={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        onIncrease={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      />
                      <div className="text-right">
                        <div className="font-display text-lg md:text-xl font-bold text-white tracking-wide">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="font-ui text-[9.5px] tracking-wider text-white/25">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-2 font-ui text-[10px] tracking-[0.2em] text-white/25 hover:text-primary transition-colors duration-200 uppercase"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Continue
              Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:w-[340px] flex-shrink-0">
            <div className="lg:sticky lg:top-28 space-y-3">
              <div className="bg-[#0d0d0d] border border-white/8 rounded-2xl overflow-hidden">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-white mb-6 tracking-wider">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-5 text-[13.5px]">
                    <div className="flex justify-between">
                      <span className="text-white/40">
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="text-white/80">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Shipping</span>
                      <span
                        className={
                          freeShipping ? "text-primary" : "text-white/80"
                        }
                      >
                        {freeShipping ? "Free" : formatPrice(SHIPPING)}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-white/6 mb-5" />
                  <div className="flex items-end justify-between mb-6">
                    <span className="font-ui text-[10.5px] tracking-[0.25em] text-white/40 uppercase">
                      Total
                    </span>
                    <div className="text-right">
                      <div className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
                        {formatPrice(orderTotal)}
                      </div>
                      <div className="font-ui text-[9px] tracking-wider text-white/25">
                        VAT included
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Link
                      to="/checkout"
                      className="w-full h-12 rounded-xl gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground flex items-center justify-center gap-2 hover:shadow-gold hover:scale-[1.02] transition-all duration-300"
                    >
                      PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full h-12 rounded-xl bg-[#25D366] font-ui text-[11px] tracking-[0.2em] text-white flex items-center justify-center gap-2 hover:scale-[1.02] hover:opacity-95 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" /> ORDER VIA WHATSAPP
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/6 rounded-xl px-5 py-4 space-y-3">
                {[
                  { icon: Truck, label: "Free shipping over PKR 5,000" },
                  { icon: Shield, label: "Secure checkout" },
                  { icon: RotateCcw, label: "Easy returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                    <span className="font-ui text-[9.5px] tracking-[0.2em] text-white/30 uppercase">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
