//done

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  Award,
  X,
} from "lucide-react";
import { getReviewDistribution, products, reviews } from "@/data/products";
import { productImages } from "@/assets/imageMap";
import {
  formatPrice,
  openWhatsApp,
  generateProductWhatsAppMessage,
} from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import StarRating from "@/components/StarRating";

function LogoUpload({
  logoFile,
  setLogoFile,
}: {
  logoFile: File | null;
  setLogoFile: (f: File | null) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.match(/image\/(png|svg\+xml|jpeg|jpg)/)) {
      toast.error("Please upload PNG, SVG, or JPG files only.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    setLogoFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".png,.svg,.jpg,.jpeg,.ai"
        onChange={onInputChange}
        className="hidden"
      />

      {logoFile ? (
        // ✅ Preview state
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-primary/8 border border-primary/25"
        >
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={URL.createObjectURL(logoFile)}
              alt="Logo preview"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white/80 truncate">
              {logoFile.name}
            </p>
            <p className="text-[10px] text-white/30">
              {(logoFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLogoFile(null)}
            className="text-white/25 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        // ✅ Drop zone
        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          animate={{
            borderColor: dragging
              ? "rgba(212,175,55,0.5)"
              : "rgba(212,175,55,0.2)",
          }}
          className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 ${
            dragging ? "bg-primary/8" : "bg-white/2 hover:bg-white/4"
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <p className="text-xs text-white/50 mb-0.5">
            {dragging
              ? "Drop your logo here"
              : "Drag & drop or click to upload"}
          </p>
          <p className="text-[10px] text-white/20">PNG, SVG, JPG — Max 5MB</p>
        </motion.div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [addLogo, setAddLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "description",
  );

  if (!product)
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 text-center px-4">
        <h1 className="font-display text-3xl text-white tracking-wide mb-4">
          Product not found
        </h1>
        <Link
          to="/shop"
          className="text-primary font-ui text-sm tracking-wider"
        >
          ← Back to Shop
        </Link>
      </div>
    );

  const wishlisted = isInWishlist(product.id);
  const image = productImages[product.id] || "/placeholder.svg";
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  if (related.length < 4)
    related.push(
      ...products
        .filter((p) => p.id !== product.id && !related.includes(p))
        .slice(0, 4 - related.length),
    );

  const unitPrice = product.price + (giftWrap ? 500 : 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const customization = [
      addLogo ? "Logo added" : "",
      message ? `Message: "${message}"` : "",
      giftWrap ? "Gift wrapping" : "",
    ]
      .filter(Boolean)
      .join(", ");
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: unitPrice,
        originalPrice: product.originalPrice,
        image,
        category: product.category,
        customization: customization || undefined,
      },
      quantity,
    );
    toast.success("Added to cart!", {
      description: `${product.name} × ${quantity}`,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  };

  const handleWhatsApp = () => {
    const customization = [
      addLogo ? "Logo" : "",
      message || "",
      giftWrap ? "Gift wrap" : "",
    ]
      .filter(Boolean)
      .join(", ");
    openWhatsApp(
      generateProductWhatsAppMessage({
        name: product.name,
        price: product.price,
        quantity,
        customization: customization || "None",
      }),
    );
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image,
        category: product.category,
      });
      toast.success("Added to wishlist!");
    }
  };
  // ✅ Share functionality — Web Share API with clipboard fallback
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `${product.shortDescription} — ${formatPrice(product.price)}`,
      url: window.location.href,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Unable to share. Please copy the URL manually.");
      }
    }
  };

  const accordionItems = [
    { key: "description", title: "Description", content: product.description },
    {
      key: "specs",
      title: "Specifications",
      content: product.specifications
        ? Object.entries(product.specifications)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        : "Contact us for specifications.",
    },
    {
      key: "customization",
      title: "Customization",
      content:
        "Logo engraving, embossing, screen printing, and laser etching available. Mockups within 24 hours. Min 10 units for custom branding.",
    },
    {
      key: "shipping",
      title: "Shipping & Delivery",
      content:
        "Standard: 3–5 days (Free over PKR 5,000)\nExpress: 1–2 days (PKR 800)\nSame-Day: Karachi only (PKR 1,500)\nInternational: 7–14 days",
    },
    {
      key: "returns",
      title: "Returns & Guarantee",
      content:
        "30-day returns on unused items. Full refund or exchange. Customized items are non-returnable. Quality guaranteed.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 lg:px-8 py-8 pt-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/25 mb-8 font-ui tracking-wide">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/50 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/8 aspect-[4/5]">
              <img
                src={image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start space-y-5"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={`px-3 py-1 rounded-full text-[9px] font-ui tracking-wider uppercase ${
                    badge === "Eco"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : badge === "New"
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "gradient-gold text-primary-foreground"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title */}
            <div>
              <p className="font-ui text-[9.5px] tracking-[0.3em] text-white/30 mb-1 uppercase">
                {product.brand}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-wider leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating — ✅ fractional stars */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-white/60">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-2xl md:text-3xl font-bold text-white whitespace-nowrap tracking-wide">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-display text-base text-white/25 line-through whitespace-nowrap tracking-wide">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-ui bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="text-sm">
              {product.inStock ? (
                product.stockCount && product.stockCount < 10 ? (
                  <p className="text-amber-400 font-medium">
                    Only {product.stockCount} left in stock
                  </p>
                ) : (
                  <p className="text-emerald-400">
                    In Stock — Ships within 1–2 days
                  </p>
                )
              ) : (
                <p className="text-red-400">Out of Stock</p>
              )}
            </div>

            {/* Short desc */}
            <p className="text-sm text-white/45 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-white/60 leading-relaxed">
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* Bulk pricing */}
            <div className="bg-white/[0.025] border border-white/7 rounded-xl p-4">
              <p className="font-ui text-[8.5px] tracking-[0.3em] text-primary mb-3 uppercase">
                Bulk Pricing
              </p>
              <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 text-xs">
                <span className="text-white/25">Qty</span>
                <span className="text-white/25">Price/ea</span>
                <span className="text-white/25">Savings</span>
                <span className="text-white/70">1–9</span>
                <span className="text-white/70">
                  {formatPrice(product.price)}
                </span>
                <span className="text-white/30">—</span>
                <span className="text-white/70">10–49</span>
                <span className="text-white/70">
                  {formatPrice(Math.round(product.price * 0.89))}
                </span>
                <span className="text-emerald-400">11%</span>
                <span className="text-white/70">50–99</span>
                <span className="text-white/70">
                  {formatPrice(Math.round(product.price * 0.78))}
                </span>
                <span className="text-emerald-400">22%</span>
                <span className="text-white/70">100+</span>
                <span className="text-primary">Contact</span>
                <span className="text-emerald-400">30%+</span>
              </div>
            </div>

            {/* Customization */}
            <div className="space-y-3">
              {/* Logo toggle */}
              {/* Logo toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setAddLogo(!addLogo)}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${addLogo ? "gradient-gold" : "bg-white/10"}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${addLogo ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </div>
                <span className="text-sm text-white/60">Add Company Logo</span>
              </label>

              {addLogo && (
                <LogoUpload logoFile={logoFile} setLogoFile={setLogoFile} />
              )}

              {/* Message toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setMessage(message ? "" : " ")}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${message ? "gradient-gold" : "bg-white/10"}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-[white] transition-transform duration-300 ${message ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </div>
                <span className="text-sm text-white/60">
                  Personalized Message
                </span>
              </label>
              {message !== "" && (
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                    placeholder="Enter your message…"
                    className="w-full h-20 p-3 rounded-xl bg-[#101010] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-primary/50 focus:outline-none resize-none transition-all"
                    maxLength={100}
                  />
                  <span className="absolute bottom-2 right-3 text-[10px] text-white/20">
                    {message.trim().length}/100
                  </span>
                </div>
              )}

              {/* Gift wrap */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setGiftWrap(!giftWrap)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${giftWrap ? "border-primary bg-primary" : "border-white/20"}`}
                >
                  {giftWrap && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm text-white/60">
                  Premium Gift Wrapping{" "}
                  <span className="text-primary">+PKR 500</span>
                </span>
              </label>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/8 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-14 h-11 text-center bg-transparent text-white text-sm font-medium border-x border-white/8 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/8 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/25">
                Need 50+?{" "}
                <Link
                  to={"/contact"}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Request quote
                </Link>
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-14 rounded-xl gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground flex items-center justify-center gap-2 hover:shadow-gold transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO CART —{" "}
                {formatPrice(totalPrice)}
              </motion.button>
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-14 rounded-xl bg-[#25D366] font-ui text-[11px] tracking-[0.2em] text-white flex items-center justify-center gap-2 hover:opacity-95 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" /> ORDER VIA WHATSAPP
              </motion.button>
            </div>

            {/* Secondary */}
            <div className="flex gap-3">
              <button
                onClick={handleWishlist}
                className={`flex-1 h-11 rounded-xl border flex items-center justify-center gap-2 font-ui text-[10px] tracking-wider transition-all duration-300 ${
                  wishlisted
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 text-white/35 hover:border-primary/40 hover:text-primary"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={wishlisted ? "currentColor" : "none"}
                />
                {wishlisted ? "WISHLISTED" : "WISHLIST"}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 h-11 rounded-xl border border-white/10 text-white/35 flex items-center justify-center gap-2 font-ui text-[10px] tracking-wider hover:border-white/20 hover:text-white/55 transition-all duration-300"
              >
                <Share2 className="w-4 h-4" /> SHARE
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Shield, label: "SSL Secure" },
                { icon: Award, label: "Authentic" },
                { icon: RefreshCw, label: "30-Day Return" },
                { icon: Truck, label: "Fast Shipping" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-white/20" />
                  <span className="text-[10px] text-white/25 font-ui tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Accordions */}
        <div className="mt-16 max-w-2xl">
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary mb-6 uppercase">
            Product Details
          </p>
          {accordionItems.map((item) => (
            <div key={item.key} className="border-b border-white/8">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === item.key ? null : item.key)
                }
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-display text-lg tracking-wide text-white group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <motion.div
                  animate={{ rotate: openAccordion === item.key ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-4 h-4 text-primary" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === item.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm text-white/40 whitespace-pre-line leading-relaxed">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-16">
          {/* Reviews header — ✅ use StarRating for fractional display */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            {/* Left — title + rating number + stars */}
            <div>
              <h2 className="font-display text-2xl font-bold text-white tracking-wide mb-3">
                Reviews
              </h2>
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-bold text-white">
                  {product.rating}
                </span>
                <div>
                  <StarRating rating={product.rating} size="md" />
                  <p className="text-[10.5px] text-white/25 font-ui mt-1">
                    {product.reviewCount} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Real review bar chart — calculated from actual reviews data */}
            <div className="flex-shrink-0 w-48 md:w-56 space-y-1.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const dist = getReviewDistribution(product.id);
                const pct = dist[stars] ?? 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-white/35 w-3 font-ui flex-shrink-0">
                      {stars}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full gradient-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          duration: 0.6,
                          delay: (5 - stars) * 0.08,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-white/30 w-6 font-ui flex-shrink-0 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {reviews
              .filter((r) => r.productId === product.id)
              .slice(0, 4)
              .map((review) => (
                <div
                  key={review.id}
                  className="bg-white/[0.025] border border-white/7 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center font-bold text-xs text-primary-foreground">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">
                          {review.name}
                        </p>
                        <p className="text-[10.5px] text-white/30">
                          {review.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10.5px] text-white/30 font-ui">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-white/70 mb-1">
                    {review.title}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary mb-3 uppercase">
            You May Also Like
          </p>
          <h2 className="font-display text-2xl font-bold text-white tracking-wider mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
