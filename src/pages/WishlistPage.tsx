import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { productImages } from "@/assets/imageMap";
import { formatPrice } from "@/lib/whatsapp";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[150px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 text-center"
        >
          <div className="w-16 h-16 rounded-2xl border border-white/8 bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
            <Heart className="w-7 h-7 text-white/15" />
          </div>
          <p className="font-ui text-[9px] tracking-[0.35em] text-primary mb-3 uppercase">
            Wishlist
          </p>
          <h1 className="font-display text-3xl font-bold text-white tracking-wide mb-3">
            Nothing saved yet
          </h1>
          <p className="text-sm text-white/35 mb-8 max-w-xs mx-auto leading-relaxed">
            Save your favourite gifts and come back to them anytime.
          </p>
          <Link
            to="/shop"
            className="inline-flex h-12 px-8 rounded-full gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground items-center gap-2 hover:shadow-gold hover:scale-[1.03] transition-all duration-300"
          >
            BROWSE GIFTS <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="pt-28 pb-8 border-b border-white/6">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/80 mb-3 uppercase">
            Saved Items
          </p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wide">
              Wishlist
            </h1>
            <span className="font-ui text-[10.5px] tracking-[0.2em] text-white/35">
              {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AnimatePresence>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, i) => {
              const daysAgo = Math.floor(
                (Date.now() - item.addedAt.getTime()) / 86400000,
              );
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group bg-white/[0.025] border border-white/7 rounded-2xl overflow-hidden hover:border-white/14 transition-colors duration-300"
                >
                  <Link to={`/product/${item.id}`} className="block">
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={productImages[item.id] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromWishlist(item.id);
                          toast.info("Removed from wishlist");
                        }}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-[9.5px] text-white/30 font-ui tracking-wider mb-1">
                      {daysAgo === 0 ? "Added today" : `${daysAgo}d ago`}
                    </p>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-base font-semibold text-white/80 leading-snug mb-2 hover:text-primary transition-colors line-clamp-2 tracking-wide">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-display text-base tracking-wider font-bold text-white">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-white/35 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          category: item.category,
                        });
                        toast.success("Added to cart!");
                      }}
                      className="w-full h-9 rounded-lg gradient-gold font-ui text-[9.5px] tracking-[0.15em] text-primary-foreground flex items-center justify-center gap-1.5 hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
                    >
                      <ShoppingBag className="w-3 h-3" /> ADD TO CART
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-ui text-[10.5px] tracking-[0.2em] text-white/35 hover:text-primary transition-colors uppercase"
          >
            Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
