//done

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Menu, X, Search, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "AI Finder", path: "/ai-finder" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

// ✅ FIX #1 — smart active check: exact for "/" home, startsWith for all others
const isActive = (linkPath: string, currentPath: string) => {
  if (linkPath === "/") return currentPath === "/";
  return currentPath.startsWith(linkPath);
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  // ✅ FIX #4 — scroll state for dynamic navbar background
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // ✅ FIX #4 — listen to scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
    setMobileOpen(false);
    setSearchQuery("");
    setMobileSearchQuery("");
  }, [location.pathname]);

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = mobileSearchQuery.trim();
    if (!query) return;
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setMobileOpen(false);
    setMobileSearchQuery("");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent, isMobile = false) => {
    if (e.key === "Escape") {
      if (isMobile) {
        setMobileSearchQuery("");
      } else {
        setSearchOpen(false);
        setSearchQuery("");
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 gold-border border-t-0 border-l-0 border-r-0 transition-all duration-500 ${
        // ✅ FIX #4 — richer background when scrolled
        scrolled
          ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-glass"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        {/* Logo with subtext */}
        <Link to="/" className="flex flex-col items-start gap-0 flex-shrink-0">
          <span className="font-display text-xl md:text-2xl font-bold gradient-gold-text tracking-wide leading-none">
            KRYSTAL
          </span>
          <span className="font-ui text-[7.5px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] text-foreground/40 uppercase leading-none mt-[4px] md:mt-[1px]">
            Luxury Corporate Gifting
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              className={`font-ui text-xs tracking-widest transition-colors duration-300 ${
                // ✅ FIX #1 — using smart isActive()
                isActive(link.path, location.pathname)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* ✅ FIX #3 — AnimatePresence moved OUTSIDE the button */}
          {/* Search — desktop only */}
          <AnimatePresence mode="wait">
            <motion.button
              key={searchOpen ? "close-search" : "open-search"}
              onClick={() => setSearchOpen(!searchOpen)}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:flex text-foreground/70 hover:text-primary transition-colors duration-300"
              aria-label="Toggle search"
            >
              {searchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </motion.button>
          </AnimatePresence>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-foreground/70 hover:text-primary transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full gradient-gold text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-foreground/70 hover:text-primary transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full gradient-gold text-[10px] font-bold flex items-center justify-center text-primary-foreground"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          {/* ✅ FIX #3 — AnimatePresence outside the button for hamburger too */}
          <AnimatePresence mode="wait">
            <motion.button
              key={mobileOpen ? "close-menu" : "open-menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden text-foreground/70 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden lg:block border-t border-border bg-glass"
          >
            <div className="container mx-auto px-4 lg:px-8 py-4">
              <form
                onSubmit={handleDesktopSearch}
                className="flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-primary flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => handleSearchKeyDown(e, false)}
                  placeholder="Search gifts, collections, occasions..."
                  className="flex-1 bg-transparent text-sm font-ui tracking-wide text-foreground placeholder:text-foreground/30 outline-none border-none focus:ring-0"
                />
                {searchQuery.trim() && (
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full gradient-gold text-primary-foreground text-xs font-ui tracking-widest font-semibold hover:opacity-90 transition-opacity"
                  >
                    SEARCH <ArrowRight className="w-3 h-3" />
                  </motion.button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {/* Mobile Menu — replace existing */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/8 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col items-center gap-6">
              {/* ✅ Centered nav links */}
              <div className="flex flex-col items-center gap-1 w-full">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path + link.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`font-display text-2xl font-bold py-3 block text-center tracking-wide transition-colors duration-200 ${
                        isActive(link.path, location.pathname)
                          ? "text-primary"
                          : "text-white/70 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-primary/30" />

              {/* ✅ Search at bottom of menu */}
              <form
                onSubmit={handleMobileSearch}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-full border border-primary/25 bg-white/4"
              >
                <Search className="w-4 h-4 text-primary flex-shrink-0" />
                <input
                  ref={mobileSearchRef}
                  type="text"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onKeyDown={(e) => handleSearchKeyDown(e, true)}
                  placeholder="Search gifts..."
                  className="flex-1 bg-transparent text-sm font-ui text-white placeholder:text-white/30 outline-none border-none focus:ring-0"
                />
                {mobileSearchQuery.trim() && (
                  <button type="submit" className="text-primary">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
