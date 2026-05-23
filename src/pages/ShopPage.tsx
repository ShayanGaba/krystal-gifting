// //done

// import React, { useState, useMemo, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   X,
//   SearchX,
//   AlertCircle,
//   ChevronDown,
//   LayoutGrid,
//   LayoutList,
//   Filter,
// } from "lucide-react";
// import { useSearchParams } from "react-router-dom";
// import { categories } from "@/data/products";
// import { useProducts } from "@/hooks/useProducts";
// import ProductCard from "@/components/ProductCard";

// function classifySearchError(query: string, resultCount: number) {
//   if (resultCount > 0) return null;
//   const t = query.trim();
//   if (t.length < 2)
//     return {
//       icon: "too-short" as const,
//       title: "Keep typing…",
//       subtitle: "Enter at least 2 characters to search.",
//     };
//   if (/^[^a-zA-Z0-9]+$/.test(t))
//     return {
//       icon: "gibberish" as const,
//       title: "That doesn't look like a search",
//       subtitle: "Please use words or product names to search.",
//     };
//   if (t.length > 4 && !/[aeiouAEIOU]/.test(t))
//     return {
//       icon: "gibberish" as const,
//       title: "Hmm, we don't recognize that",
//       subtitle: "Try a product name, brand, or gift occasion.",
//     };
//   if (/^\d+$/.test(t))
//     return {
//       icon: "no-match" as const,
//       title: "No products match that number",
//       subtitle: "Try searching by product name or category instead.",
//     };
//   return {
//     icon: "no-match" as const,
//     title: `No results for "${t}"`,
//     subtitle: "Try a different keyword, or browse our categories.",
//   };
// }

// function CustomSelect({
//   value,
//   onChange,
//   options,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   options: { value: string; label: string }[];
// }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const current = options.find((o) => o.value === value);

//   useEffect(() => {
//     const h = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   return (
//     <div ref={ref} className="relative z-20">
//       <button
//         onClick={() => setOpen(!open)}
//         className="h-10 pl-4 pr-3 rounded-xl bg-[#1a1a1a] border border-white/12 text-white/75 text-xs font-ui tracking-wider flex items-center gap-2 hover:border-primary/50 hover:text-white transition-all duration-200 min-w-[175px]"
//       >
//         <span className="flex-1 text-left">{current?.label}</span>
//         <motion.div
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <ChevronDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />
//         </motion.div>
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -6, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -6, scale: 0.97 }}
//             transition={{ duration: 0.15 }}
//             className="absolute right-0 top-12 z-30 min-w-[175px] bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
//           >
//             <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
//             {options.map((opt) => (
//               <button
//                 key={opt.value}
//                 onClick={() => {
//                   onChange(opt.value);
//                   setOpen(false);
//                 }}
//                 className={`w-full px-4 py-2.5 text-left text-xs font-ui tracking-wider transition-colors duration-150 ${
//                   value === opt.value
//                     ? "text-primary bg-primary/8 font-medium"
//                     : "text-white/55 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function FilterTag({
//   label,
//   onRemove,
// }: {
//   label: string;
//   onRemove: () => void;
// }) {
//   return (
//     <motion.span
//       initial={{ opacity: 0, scale: 0.85 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.85 }}
//       className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/12 border border-primary/30 text-primary text-[10px] font-ui tracking-wider"
//     >
//       {label}
//       <button
//         onClick={onRemove}
//         className="hover:text-white transition-colors ml-0.5"
//       >
//         <X className="w-3 h-3" />
//       </button>
//     </motion.span>
//   );
// }

// export default function ShopPage() {
//   const { products } = useProducts();
//   const QUICK_FILTER_MAP: Record<string, (p: (typeof products)[0]) => boolean> =
//     {
//       All: () => true,
//       Bestseller: (p) => p.badges.includes("Bestseller"),
//       New: (p) => p.badges.includes("New"),
//       Eco: (p) => p.badges.includes("Eco"),
//       Premium: (p) => p.badges.includes("Premium"),
//     };
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [search, setSearch] = useState(searchParams.get("search") || "");
//   const [quickFilter, setQuickFilter] = useState("All");
//   const [category, setCategory] = useState(
//     searchParams.get("category") || "All",
//   );
//   const [sortBy, setSortBy] = useState("popular");
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [gridCols, setGridCols] = useState<2 | 3>(3);

//   useEffect(() => {
//     const s = searchParams.get("search") || "";
//     const c = searchParams.get("category") || "";
//     if (s) setSearch(s);
//     if (c) setCategory(c);
//     if (s || c) setSearchParams({});
//   }, [searchParams]);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     let result = products.filter((p) => {
//       const matchSearch =
//         !q ||
//         p.name.toLowerCase().includes(q) ||
//         p.brand.toLowerCase().includes(q) ||
//         p.category.toLowerCase().includes(q);
//       const matchCategory = category === "All" || p.category === category;
//       const matchQuick = QUICK_FILTER_MAP[quickFilter]?.(p) ?? true;
//       const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
//       return matchSearch && matchCategory && matchQuick && matchPrice;
//     });
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "newest":
//         result.sort(
//           (a, b) =>
//             (b.badges.includes("New") ? 1 : 0) -
//             (a.badges.includes("New") ? 1 : 0),
//         );
//         break;
//       default:
//         result.sort((a, b) => b.reviewCount - a.reviewCount);
//     }
//     return result;
//   }, [search, category, quickFilter, sortBy, priceRange]);

//   const searchError = classifySearchError(search, filtered.length);

//   const activeFiltersCount = [
//     category !== "All",
//     quickFilter !== "All",
//     priceRange[1] < 50000,
//     search !== "",
//   ].filter(Boolean).length;

//   const hasActiveFilters = activeFiltersCount > 0;

//   const clearAllFilters = () => {
//     setCategory("All");
//     setSearch("");
//     setQuickFilter("All");
//     setPriceRange([0, 50000]);
//   };

//   const sortOptions = [
//     { value: "popular", label: "Most Popular" },
//     { value: "newest", label: "Newest First" },
//     { value: "price-low", label: "Price: Low → High" },
//     { value: "price-high", label: "Price: High → Low" },
//     { value: "rating", label: "Highest Rated" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0a0a0a]">
//       <div className="bg-[#0a0a0a] pt-28 pb-8 border-b border-white/6">
//         <div className="container mx-auto px-4 lg:px-8">
//           <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/80 mb-3 uppercase">
//             Curated Collection
//           </p>
//           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
//             <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
//               {search.trim() ? (
//                 <>
//                   Results for{" "}
//                   <span className="gradient-gold-text">"{search}"</span>
//                 </>
//               ) : (
//                 "Shop All Gifts"
//               )}
//             </h1>
//             {search.trim() && filtered.length > 0 && (
//               <motion.p
//                 key={filtered.length}
//                 initial={{ opacity: 0, y: 4 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-xs text-white/30 font-ui tracking-wider"
//               >
//                 {filtered.length}{" "}
//                 {filtered.length === 1 ? "product" : "products"} found
//               </motion.p>
//             )}
//           </div>

//           <AnimatePresence>
//             {hasActiveFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="flex flex-wrap items-center gap-2 mt-4 overflow-hidden"
//               >
//                 {search && (
//                   <FilterTag
//                     label={`"${search}"`}
//                     onRemove={() => setSearch("")}
//                   />
//                 )}
//                 {category !== "All" && (
//                   <FilterTag
//                     label={category}
//                     onRemove={() => setCategory("All")}
//                   />
//                 )}
//                 {quickFilter !== "All" && (
//                   <FilterTag
//                     label={quickFilter}
//                     onRemove={() => setQuickFilter("All")}
//                   />
//                 )}
//                 {priceRange[1] < 50000 && (
//                   <FilterTag
//                     label={`Up to PKR ${priceRange[1].toLocaleString()}`}
//                     onRemove={() => setPriceRange([0, 50000])}
//                   />
//                 )}
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-[10px] font-ui tracking-wider text-white/30 hover:text-primary transition-colors px-1 underline underline-offset-2"
//                 >
//                   Clear all
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 lg:px-8 py-7">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <AnimatePresence>
//             {showFilters && (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden"
//                   onClick={() => setShowFilters(false)}
//                 />
//                 <motion.div
//                   initial={{ x: "-100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "-100%" }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-[#0d0d0d] border-r border-white/8 flex flex-col lg:hidden"
//                 >
//                   <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
//                     <div className="flex items-center gap-2">
//                       <span className="font-ui text-xs tracking-[0.25em] text-white/60 uppercase">
//                         Filters
//                       </span>
//                       {activeFiltersCount > 0 && (
//                         <span className="w-5 h-5 rounded-full gradient-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center">
//                           {activeFiltersCount}
//                         </span>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => setShowFilters(false)}
//                       className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <div className="flex-1 overflow-y-auto sidebar-scroll p-5">
//                     <SidebarContent
//                       search={search}
//                       setSearch={setSearch}
//                       quickFilter={quickFilter}
//                       setQuickFilter={setQuickFilter}
//                       category={category}
//                       setCategory={setCategory}
//                       priceRange={priceRange}
//                       setPriceRange={setPriceRange}
//                       hasActiveFilters={hasActiveFilters}
//                       clearAllFilters={clearAllFilters}
//                       onClose={() => setShowFilters(false)}
//                     />
//                   </div>
//                   <div className="p-5 border-t border-white/8 flex-shrink-0">
//                     <button
//                       onClick={() => setShowFilters(false)}
//                       className="w-full h-11 rounded-xl gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground hover:opacity-90 transition-opacity"
//                     >
//                       VIEW {filtered.length} RESULTS
//                     </button>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>

//           <div className="hidden lg:block w-60 flex-shrink-0">
//             <div
//               className="sticky top-24 sidebar-scroll overflow-y-auto pr-1"
//               style={{ maxHeight: "calc(100vh - 7rem)" }}
//             >
//               <SidebarContent
//                 search={search}
//                 setSearch={setSearch}
//                 quickFilter={quickFilter}
//                 setQuickFilter={setQuickFilter}
//                 category={category}
//                 setCategory={setCategory}
//                 priceRange={priceRange}
//                 setPriceRange={setPriceRange}
//                 hasActiveFilters={hasActiveFilters}
//                 clearAllFilters={clearAllFilters}
//               />
//             </div>
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className="lg:hidden relative flex items-center gap-2 h-9 px-4 rounded-xl bg-[#1a1a1a] border border-white/12 text-white/60 text-xs font-ui tracking-wider hover:border-primary/50 hover:text-white transition-all"
//                 >
//                   <Filter className="w-3.5 h-3.5" />
//                   Filters
//                   {activeFiltersCount > 0 && (
//                     <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full gradient-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center">
//                       {activeFiltersCount}
//                     </span>
//                   )}
//                 </button>
//                 <motion.p
//                   key={filtered.length}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-xs text-white/25 font-ui tracking-wider"
//                 >
//                   {filtered.length}{" "}
//                   {filtered.length === 1 ? "product" : "products"}
//                 </motion.p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl bg-[#1a1a1a] border border-white/8">
//                   <button
//                     onClick={() => setGridCols(3)}
//                     title="3 columns"
//                     className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${gridCols === 3 ? "bg-primary/15 text-primary" : "text-white/25 hover:text-white/55"}`}
//                   >
//                     <LayoutGrid className="w-3.5 h-3.5" />
//                   </button>
//                   <button
//                     onClick={() => setGridCols(2)}
//                     title="2 columns"
//                     className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${gridCols === 2 ? "bg-primary/15 text-primary" : "text-white/25 hover:text-white/55"}`}
//                   >
//                     <LayoutList className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//                 <CustomSelect
//                   value={sortBy}
//                   onChange={setSortBy}
//                   options={sortOptions}
//                 />
//               </div>
//             </div>

//             <AnimatePresence mode="wait">
//               {filtered.length === 0 ? (
//                 <motion.div
//                   key="empty"
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="flex flex-col items-center justify-center py-24 text-center"
//                 >
//                   {searchError?.icon === "gibberish" ? (
//                     <AlertCircle className="w-10 h-10 text-primary/25 mb-4" />
//                   ) : (
//                     <SearchX className="w-10 h-10 text-primary/25 mb-4" />
//                   )}
//                   <h3 className="font-display text-xl font-bold text-white mb-2">
//                     {searchError?.title ?? "No products found"}
//                   </h3>
//                   <p className="text-sm text-white/30 max-w-xs mb-7 leading-relaxed">
//                     {searchError?.subtitle ?? "Try adjusting your filters."}
//                   </p>
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-7 py-2.5 rounded-full bg-primary/10 border border-primary/40 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//                   >
//                     CLEAR ALL FILTERS
//                   </button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key={`grid-${gridCols}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className={`grid gap-4 ${
//                     gridCols === 3
//                       ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
//                       : "grid-cols-2 md:grid-cols-2"
//                   }`}
//                 >
//                   {filtered.map((product, i) => (
//                     <motion.div
//                       key={product.id}
//                       initial={{ opacity: 0, y: 16 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{
//                         delay: Math.min(i * 0.025, 0.3),
//                         duration: 0.4,
//                       }}
//                     >
//                       <ProductCard product={product} />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SidebarContent({
//   search,
//   setSearch,
//   quickFilter,
//   setQuickFilter,
//   category,
//   setCategory,
//   priceRange,
//   setPriceRange,
//   hasActiveFilters,
//   clearAllFilters,
//   onClose,
// }: {
//   search: string;
//   setSearch: (v: string) => void;
//   quickFilter: string;
//   setQuickFilter: (v: string) => void;
//   category: string;
//   setCategory: (v: string) => void;
//   priceRange: [number, number];
//   setPriceRange: (v: [number, number]) => void;
//   hasActiveFilters: boolean;
//   clearAllFilters: () => void;
//   onClose?: () => void;
// }) {
//   return (
//     <div className="space-y-4">
//       <div className="relative">
//         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/50" />
//         <input
//           type="text"
//           placeholder="Search gifts…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full h-11 pl-10 pr-9 rounded-xl
//             bg-[#1e1e1e] border border-white/14
//             text-white text-sm placeholder:text-white/30
//             focus:border-primary/60 focus:bg-[#222222]
//             focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]
//             focus:outline-none transition-all duration-200"
//         />
//         {search && (
//           <button
//             onClick={() => setSearch("")}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
//           >
//             <X className="w-3.5 h-3.5" />
//           </button>
//         )}
//       </div>

//       <div>
//         <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 mb-2.5 uppercase">
//           Quick Filter
//         </p>
//         <div className="flex flex-wrap gap-1.5">
//           {["All", "Bestseller", "New", "Eco", "Premium"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setQuickFilter(f)}
//               className={`px-3 py-1 rounded-full text-[10px] font-ui tracking-wider transition-all duration-200 ${
//                 quickFilter === f
//                   ? "gradient-gold text-primary-foreground shadow-gold"
//                   : "bg-white/6 border border-white/10 text-white/50 hover:border-primary/40 hover:text-white/80 hover:bg-white/8"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-[#141414] border border-white/8 rounded-xl p-4">
//         <div className="flex items-center justify-between mb-3">
//           <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 uppercase">
//             Price Range
//           </p>
//           <span className="text-[11px] text-primary font-ui font-semibold">
//             PKR {priceRange[1].toLocaleString()}
//           </span>
//         </div>
//         <input
//           type="range"
//           min={0}
//           max={50000}
//           step={500}
//           value={priceRange[1]}
//           onChange={(e) =>
//             setPriceRange([priceRange[0], parseInt(e.target.value)])
//           }
//           className="w-full accent-[hsl(46,65%,52%)] cursor-pointer"
//         />
//         <div className="flex justify-between mt-1.5">
//           <span className="text-[9px] text-white/22 font-ui">PKR 0</span>
//           <span className="text-[9px] text-white/22 font-ui">PKR 50,000</span>
//         </div>
//       </div>

//       <div className="bg-[#141414] border border-white/8 rounded-xl p-4">
//         <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 uppercase mb-2.5">
//           Categories
//         </p>
//         <div className="space-y-px">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setCategory(cat);
//                 onClose?.();
//               }}
//               className={`w-full text-left px-3 py-2 rounded-lg text-xs font-ui tracking-wide transition-all duration-150 flex items-center justify-between ${
//                 category === cat
//                   ? "bg-primary/12 text-primary border border-primary/20"
//                   : "text-white/45 hover:text-white/75 hover:bg-white/5"
//               }`}
//             >
//               {cat}
//               {category === cat && (
//                 <motion.div
//                   layoutId="cat-dot"
//                   className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <AnimatePresence>
//         {hasActiveFilters && (
//           <motion.button
//             initial={{ opacity: 0, y: -4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -4 }}
//             onClick={clearAllFilters}
//             className="w-full h-10 rounded-xl bg-primary/8 border border-primary/35 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//           >
//             CLEAR ALL FILTERS
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }









//done

// import React, { useState, useMemo, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   X,
//   SearchX,
//   AlertCircle,
//   ChevronDown,
//   LayoutGrid,
//   LayoutList,
//   Filter,
// } from "lucide-react";
// import { useSearchParams } from "react-router-dom";
// import { categories } from "@/data/products";
// import { useProducts } from "@/hooks/useProducts";
// import ProductCard from "@/components/ProductCard";

// function classifySearchError(query: string, resultCount: number) {
//   if (resultCount > 0) return null;
//   const t = query.trim();
//   if (t.length < 2)
//     return {
//       icon: "too-short" as const,
//       title: "Keep typing…",
//       subtitle: "Enter at least 2 characters to search.",
//     };
//   if (/^[^a-zA-Z0-9]+$/.test(t))
//     return {
//       icon: "gibberish" as const,
//       title: "That doesn't look like a search",
//       subtitle: "Please use words or product names to search.",
//     };
//   if (t.length > 4 && !/[aeiouAEIOU]/.test(t))
//     return {
//       icon: "gibberish" as const,
//       title: "Hmm, we don't recognize that",
//       subtitle: "Try a product name, brand, or gift occasion.",
//     };
//   if (/^\d+$/.test(t))
//     return {
//       icon: "no-match" as const,
//       title: "No products match that number",
//       subtitle: "Try searching by product name or category instead.",
//     };
//   return {
//     icon: "no-match" as const,
//     title: `No results for "${t}"`,
//     subtitle: "Try a different keyword, or browse our categories.",
//   };
// }

// function CustomSelect({
//   value,
//   onChange,
//   options,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   options: { value: string; label: string }[];
// }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const current = options.find((o) => o.value === value);

//   useEffect(() => {
//     const h = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   return (
//     <div ref={ref} className="relative z-20">
//       <button
//         onClick={() => setOpen(!open)}
//         className="h-10 pl-4 pr-3 rounded-xl bg-[#1a1a1a] border border-white/12 text-white/75 text-xs font-ui tracking-wider flex items-center gap-2 hover:border-primary/50 hover:text-white transition-all duration-200 min-w-[175px]"
//       >
//         <span className="flex-1 text-left">{current?.label}</span>
//         <motion.div
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <ChevronDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />
//         </motion.div>
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -6, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -6, scale: 0.97 }}
//             transition={{ duration: 0.15 }}
//             className="absolute right-0 top-12 z-30 min-w-[175px] bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
//           >
//             <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
//             {options.map((opt) => (
//               <button
//                 key={opt.value}
//                 onClick={() => {
//                   onChange(opt.value);
//                   setOpen(false);
//                 }}
//                 className={`w-full px-4 py-2.5 text-left text-xs font-ui tracking-wider transition-colors duration-150 ${
//                   value === opt.value
//                     ? "text-primary bg-primary/8 font-medium"
//                     : "text-white/55 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function FilterTag({
//   label,
//   onRemove,
// }: {
//   label: string;
//   onRemove: () => void;
// }) {
//   return (
//     <motion.span
//       initial={{ opacity: 0, scale: 0.85 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.85 }}
//       className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/12 border border-primary/30 text-primary text-[10px] font-ui tracking-wider"
//     >
//       {label}
//       <button
//         onClick={onRemove}
//         className="hover:text-white transition-colors ml-0.5"
//       >
//         <X className="w-3 h-3" />
//       </button>
//     </motion.span>
//   );
// }

// export default function ShopPage() {
//   const { products } = useProducts();
//   const QUICK_FILTER_MAP: Record<string, (p: (typeof products)[0]) => boolean> =
//     {
//       All: () => true,
//       Bestseller: (p) => p.badges.includes("Bestseller"),
//       New: (p) => p.badges.includes("New"),
//       Eco: (p) => p.badges.includes("Eco"),
//       Premium: (p) => p.badges.includes("Premium"),
//     };
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [search, setSearch] = useState(searchParams.get("search") || "");
//   const [quickFilter, setQuickFilter] = useState("All");
//   const [category, setCategory] = useState(
//     searchParams.get("category") || "All",
//   );
//   const [sortBy, setSortBy] = useState("popular");
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [gridCols, setGridCols] = useState<2 | 3>(3);

//   useEffect(() => {
//     const s = searchParams.get("search") || "";
//     const c = searchParams.get("category") || "";
//     if (s) setSearch(s);
//     if (c) setCategory(c);
//     if (s || c) setSearchParams({});
//   }, [searchParams]);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     let result = products.filter((p) => {
//       const matchSearch =
//         !q ||
//         p.name.toLowerCase().includes(q) ||
//         p.brand.toLowerCase().includes(q) ||
//         p.category.toLowerCase().includes(q);
//       const matchCategory = category === "All" || p.category === category;
//       const matchQuick = QUICK_FILTER_MAP[quickFilter]?.(p) ?? true;
//       const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
//       return matchSearch && matchCategory && matchQuick && matchPrice;
//     });
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "newest":
//         result.sort(
//           (a, b) =>
//             (b.badges.includes("New") ? 1 : 0) -
//             (a.badges.includes("New") ? 1 : 0),
//         );
//         break;
//       default:
//         result.sort((a, b) => b.reviewCount - a.reviewCount);
//     }
//     return result;
//   }, [search, category, quickFilter, sortBy, priceRange, products]);

//   const searchError = classifySearchError(search, filtered.length);

//   const activeFiltersCount = [
//     category !== "All",
//     quickFilter !== "All",
//     priceRange[1] < 50000,
//     search !== "",
//   ].filter(Boolean).length;

//   const hasActiveFilters = activeFiltersCount > 0;

//   const clearAllFilters = () => {
//     setCategory("All");
//     setSearch("");
//     setQuickFilter("All");
//     setPriceRange([0, 50000]);
//   };

//   const sortOptions = [
//     { value: "popular", label: "Most Popular" },
//     { value: "newest", label: "Newest First" },
//     { value: "price-low", label: "Price: Low → High" },
//     { value: "price-high", label: "Price: High → Low" },
//     { value: "rating", label: "Highest Rated" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0a0a0a]">
//       <div className="bg-[#0a0a0a] pt-28 pb-8 border-b border-white/6">
//         <div className="container mx-auto px-4 lg:px-8">
//           <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/80 mb-3 uppercase">
//             Curated Collection
//           </p>
//           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
//             <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
//               {search.trim() ? (
//                 <>
//                   Results for{" "}
//                   <span className="gradient-gold-text">"{search}"</span>
//                 </>
//               ) : (
//                 "Shop All Gifts"
//               )}
//             </h1>
//             {search.trim() && filtered.length > 0 && (
//               <motion.p
//                 key={filtered.length}
//                 initial={{ opacity: 0, y: 4 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-xs text-white/30 font-ui tracking-wider"
//               >
//                 {filtered.length}{" "}
//                 {filtered.length === 1 ? "product" : "products"} found
//               </motion.p>
//             )}
//           </div>

//           <AnimatePresence>
//             {hasActiveFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="flex flex-wrap items-center gap-2 mt-4 overflow-hidden"
//               >
//                 {search && (
//                   <FilterTag
//                     label={`"${search}"`}
//                     onRemove={() => setSearch("")}
//                   />
//                 )}
//                 {category !== "All" && (
//                   <FilterTag
//                     label={category}
//                     onRemove={() => setCategory("All")}
//                   />
//                 )}
//                 {quickFilter !== "All" && (
//                   <FilterTag
//                     label={quickFilter}
//                     onRemove={() => setQuickFilter("All")}
//                   />
//                 )}
//                 {priceRange[1] < 50000 && (
//                   <FilterTag
//                     label={`Up to PKR ${priceRange[1].toLocaleString()}`}
//                     onRemove={() => setPriceRange([0, 50000])}
//                   />
//                 )}
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-[10px] font-ui tracking-wider text-white/30 hover:text-primary transition-colors px-1 underline underline-offset-2"
//                 >
//                   Clear all
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 lg:px-8 py-7">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <AnimatePresence>
//             {showFilters && (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden"
//                   onClick={() => setShowFilters(false)}
//                 />
//                 <motion.div
//                   initial={{ x: "-100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "-100%" }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-[#0d0d0d] border-r border-white/8 flex flex-col lg:hidden"
//                 >
//                   <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
//                     <div className="flex items-center gap-2">
//                       <span className="font-ui text-xs tracking-[0.25em] text-white/60 uppercase">
//                         Filters
//                       </span>
//                       {activeFiltersCount > 0 && (
//                         <span className="w-5 h-5 rounded-full gradient-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center">
//                           {activeFiltersCount}
//                         </span>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => setShowFilters(false)}
//                       className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <div className="flex-1 overflow-y-auto sidebar-scroll p-5">
//                     <SidebarContent
//                       search={search}
//                       setSearch={setSearch}
//                       quickFilter={quickFilter}
//                       setQuickFilter={setQuickFilter}
//                       category={category}
//                       setCategory={setCategory}
//                       priceRange={priceRange}
//                       setPriceRange={setPriceRange}
//                       hasActiveFilters={hasActiveFilters}
//                       clearAllFilters={clearAllFilters}
//                       onClose={() => setShowFilters(false)}
//                     />
//                   </div>
//                   <div className="p-5 border-t border-white/8 flex-shrink-0">
//                     <button
//                       onClick={() => setShowFilters(false)}
//                       className="w-full h-11 rounded-xl gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground hover:opacity-90 transition-opacity"
//                     >
//                       VIEW {filtered.length} RESULTS
//                     </button>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>

//           <div className="hidden lg:block w-60 flex-shrink-0">
//             <div
//               className="sticky top-24 sidebar-scroll overflow-y-auto pr-1"
//               style={{ maxHeight: "calc(100vh - 7rem)" }}
//             >
//               <SidebarContent
//                 search={search}
//                 setSearch={setSearch}
//                 quickFilter={quickFilter}
//                 setQuickFilter={setQuickFilter}
//                 category={category}
//                 setCategory={setCategory}
//                 priceRange={priceRange}
//                 setPriceRange={setPriceRange}
//                 hasActiveFilters={hasActiveFilters}
//                 clearAllFilters={clearAllFilters}
//               />
//             </div>
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className="lg:hidden relative flex items-center gap-2 h-9 px-4 rounded-xl bg-[#1a1a1a] border border-white/12 text-white/60 text-xs font-ui tracking-wider hover:border-primary/50 hover:text-white transition-all"
//                 >
//                   <Filter className="w-3.5 h-3.5" />
//                   Filters
//                   {activeFiltersCount > 0 && (
//                     <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full gradient-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center">
//                       {activeFiltersCount}
//                     </span>
//                   )}
//                 </button>
//                 <motion.p
//                   key={filtered.length}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-xs text-white/25 font-ui tracking-wider"
//                 >
//                   {filtered.length}{" "}
//                   {filtered.length === 1 ? "product" : "products"}
//                 </motion.p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl bg-[#1a1a1a] border border-white/8">
//                   <button
//                     onClick={() => setGridCols(3)}
//                     title="3 columns"
//                     className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${gridCols === 3 ? "bg-primary/15 text-primary" : "text-white/25 hover:text-white/55"}`}
//                   >
//                     <LayoutGrid className="w-3.5 h-3.5" />
//                   </button>
//                   <button
//                     onClick={() => setGridCols(2)}
//                     title="2 columns"
//                     className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${gridCols === 2 ? "bg-primary/15 text-primary" : "text-white/25 hover:text-white/55"}`}
//                   >
//                     <LayoutList className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//                 <CustomSelect
//                   value={sortBy}
//                   onChange={setSortBy}
//                   options={sortOptions}
//                 />
//               </div>
//             </div>

//             <AnimatePresence mode="wait">
//               {filtered.length === 0 ? (
//                 <motion.div
//                   key="empty"
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="flex flex-col items-center justify-center py-24 text-center"
//                 >
//                   {searchError?.icon === "gibberish" ? (
//                     <AlertCircle className="w-10 h-10 text-primary/25 mb-4" />
//                   ) : (
//                     <SearchX className="w-10 h-10 text-primary/25 mb-4" />
//                   )}
//                   <h3 className="font-display text-xl font-bold text-white mb-2">
//                     {searchError?.title ?? "No products found"}
//                   </h3>
//                   <p className="text-sm text-white/30 max-w-xs mb-7 leading-relaxed">
//                     {searchError?.subtitle ?? "Try adjusting your filters."}
//                   </p>
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-7 py-2.5 rounded-full bg-primary/10 border border-primary/40 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//                   >
//                     CLEAR ALL FILTERS
//                   </button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key={`grid-${gridCols}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className={`grid gap-4 ${
//                     gridCols === 3
//                       ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
//                       : "grid-cols-2 md:grid-cols-2"
//                   }`}
//                 >
//                   {filtered.map((product, i) => (
//                     <motion.div
//                       key={product.id}
//                       initial={{ opacity: 0, y: 16 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{
//                         delay: Math.min(i * 0.025, 0.3),
//                         duration: 0.4,
//                       }}
//                     >
//                       <ProductCard product={product} />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SidebarContent({
//   search,
//   setSearch,
//   quickFilter,
//   setQuickFilter,
//   category,
//   setCategory,
//   priceRange,
//   setPriceRange,
//   hasActiveFilters,
//   clearAllFilters,
//   onClose,
// }: {
//   search: string;
//   setSearch: (v: string) => void;
//   quickFilter: string;
//   setQuickFilter: (v: string) => void;
//   category: string;
//   setCategory: (v: string) => void;
//   priceRange: [number, number];
//   setPriceRange: (v: [number, number]) => void;
//   hasActiveFilters: boolean;
//   clearAllFilters: () => void;
//   onClose?: () => void;
// }) {
//   return (
//     <div className="space-y-4">
//       <div className="relative">
//         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/50" />
//         <input
//           type="text"
//           placeholder="Search gifts…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full h-11 pl-10 pr-9 rounded-xl
//             bg-[#1e1e1e] border border-white/14
//             text-white text-sm placeholder:text-white/30
//             focus:border-primary/60 focus:bg-[#222222]
//             focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]
//             focus:outline-none transition-all duration-200"
//         />
//         {search && (
//           <button
//             onClick={() => setSearch("")}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
//           >
//             <X className="w-3.5 h-3.5" />
//           </button>
//         )}
//       </div>

//       <div>
//         <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 mb-2.5 uppercase">
//           Quick Filter
//         </p>
//         <div className="flex flex-wrap gap-1.5">
//           {["All", "Bestseller", "New", "Eco", "Premium"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setQuickFilter(f)}
//               className={`px-3 py-1 rounded-full text-[10px] font-ui tracking-wider transition-all duration-200 ${
//                 quickFilter === f
//                   ? "gradient-gold text-primary-foreground shadow-gold"
//                   : "bg-white/6 border border-white/10 text-white/50 hover:border-primary/40 hover:text-white/80 hover:bg-white/8"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-[#141414] border border-white/8 rounded-xl p-4">
//         <div className="flex items-center justify-between mb-3">
//           <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 uppercase">
//             Price Range
//           </p>
//           <span className="text-[11px] text-primary font-ui font-semibold">
//             PKR {priceRange[1].toLocaleString()}
//           </span>
//         </div>
//         <input
//           type="range"
//           min={0}
//           max={50000}
//           step={500}
//           value={priceRange[1]}
//           onChange={(e) =>
//             setPriceRange([priceRange[0], parseInt(e.target.value)])
//           }
//           className="w-full accent-[hsl(46,65%,52%)] cursor-pointer"
//         />
//         <div className="flex justify-between mt-1.5">
//           <span className="text-[9px] text-white/22 font-ui">PKR 0</span>
//           <span className="text-[9px] text-white/22 font-ui">PKR 50,000</span>
//         </div>
//       </div>

//       <div className="bg-[#141414] border border-white/8 rounded-xl p-4">
//         <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 uppercase mb-2.5">
//           Categories
//         </p>
//         <div className="space-y-px">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setCategory(cat);
//                 onClose?.();
//               }}
//               className={`w-full text-left px-3 py-2 rounded-lg text-xs font-ui tracking-wide transition-all duration-150 flex items-center justify-between ${
//                 category === cat
//                   ? "bg-primary/12 text-primary border border-primary/20"
//                   : "text-white/45 hover:text-white/75 hover:bg-white/5"
//               }`}
//             >
//               {cat}
//               {category === cat && (
//                 <motion.div
//                   layoutId="cat-dot"
//                   className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <AnimatePresence>
//         {hasActiveFilters && (
//           <motion.button
//             initial={{ opacity: 0, y: -4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -4 }}
//             onClick={clearAllFilters}
//             className="w-full h-10 rounded-xl bg-primary/8 border border-primary/35 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//           >
//             CLEAR ALL FILTERS
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }












//done

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SearchX,
  AlertCircle,
  ChevronDown,
  LayoutGrid,
  LayoutList,
  Filter,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { categories, products } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const QUICK_FILTER_MAP: Record<string, (p: (typeof products)[0]) => boolean> = {
  All: () => true,
  Bestseller: (p) => p.badges.includes("Bestseller"),
  New: (p) => p.badges.includes("New"),
  Eco: (p) => p.badges.includes("Eco"),
  Premium: (p) => p.badges.includes("Premium"),
};

function classifySearchError(query: string, resultCount: number) {
  if (resultCount > 0) return null;
  const t = query.trim();
  if (t.length < 2)
    return {
      icon: "too-short" as const,
      title: "Keep typing…",
      subtitle: "Enter at least 2 characters to search.",
    };
  if (/^[^a-zA-Z0-9]+$/.test(t))
    return {
      icon: "gibberish" as const,
      title: "That doesn't look like a search",
      subtitle: "Please use words or product names to search.",
    };
  if (t.length > 4 && !/[aeiouAEIOU]/.test(t))
    return {
      icon: "gibberish" as const,
      title: "Hmm, we don't recognize that",
      subtitle: "Try a product name, brand, or gift occasion.",
    };
  if (/^\d+$/.test(t))
    return {
      icon: "no-match" as const,
      title: "No products match that number",
      subtitle: "Try searching by product name or category instead.",
    };
  return {
    icon: "no-match" as const,
    title: `No results for "${t}"`,
    subtitle: "Try a different keyword, or browse our categories.",
  };
}

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative z-20">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 pl-4 pr-3 rounded-xl bg-[#1a1a1a] border border-white/12 text-white/75 text-xs font-ui tracking-wider flex items-center gap-2 hover:border-primary/50 hover:text-white transition-all duration-200 min-w-[175px]"
      >
        <span className="flex-1 text-left">{current?.label}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-30 min-w-[175px] bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-xs font-ui tracking-wider transition-colors duration-150 ${
                  value === opt.value
                    ? "text-primary bg-primary/8 font-medium"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/12 border border-primary/30 text-primary text-[10px] font-ui tracking-wider"
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:text-white transition-colors ml-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  );
}

export default function ShopPage() {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [quickFilter, setQuickFilter] = useState("All");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  useEffect(() => {
    const s = searchParams.get("search") || "";
    const c = searchParams.get("category") || "";
    if (s) setSearch(s);
    if (c) setCategory(c);
    if (s || c) setSearchParams({});
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchCategory = category === "All" || p.category === category;
      const matchQuick = QUICK_FILTER_MAP[quickFilter]?.(p) ?? true;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCategory && matchQuick && matchPrice;
    });
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            (b.badges.includes("New") ? 1 : 0) -
            (a.badges.includes("New") ? 1 : 0),
        );
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [search, category, quickFilter, sortBy, priceRange, products]);

  const searchError = classifySearchError(search, filtered.length);

  const activeFiltersCount = [
    category !== "All",
    quickFilter !== "All",
    priceRange[1] < 50000,
    search !== "",
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  const clearAllFilters = () => {
    setCategory("All");
    setSearch("");
    setQuickFilter("All");
    setPriceRange([0, 50000]);
  };

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low → High" },
    { value: "price-high", label: "Price: High → Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="bg-[#0a0a0a] pt-28 pb-8 border-b border-white/6">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="font-ui text-[9.5px] tracking-[0.35em] text-primary/80 mb-3 uppercase">
            Curated Collection
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
              {search.trim() ? (
                <>
                  Results for{" "}
                  <span className="gradient-gold-text">"{search}"</span>
                </>
              ) : (
                "Shop All Gifts"
              )}
            </h1>
            {search.trim() && filtered.length > 0 && (
              <motion.p
                key={filtered.length}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-white/30 font-ui tracking-wider"
              >
                {filtered.length}{" "}
                {filtered.length === 1 ? "product" : "products"} found
              </motion.p>
            )}
          </div>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2 mt-4 overflow-hidden"
              >
                {search && (
                  <FilterTag
                    label={`"${search}"`}
                    onRemove={() => setSearch("")}
                  />
                )}
                {category !== "All" && (
                  <FilterTag
                    label={category}
                    onRemove={() => setCategory("All")}
                  />
                )}
                {quickFilter !== "All" && (
                  <FilterTag
                    label={quickFilter}
                    onRemove={() => setQuickFilter("All")}
                  />
                )}
                {priceRange[1] < 50000 && (
                  <FilterTag
                    label={`Up to PKR ${priceRange[1].toLocaleString()}`}
                    onRemove={() => setPriceRange([0, 50000])}
                  />
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-[10px] font-ui tracking-wider text-white/30 hover:text-primary transition-colors px-1 underline underline-offset-2"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-7">
        <div className="flex flex-col lg:flex-row gap-6">
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-[#0d0d0d] border-r border-white/8 flex flex-col lg:hidden"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-ui text-xs tracking-[0.25em] text-white/60 uppercase">
                        Filters
                      </span>
                      {activeFiltersCount > 0 && (
                        <span className="w-5 h-5 rounded-full gradient-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                          {activeFiltersCount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto sidebar-scroll p-5">
                    <SidebarContent
                      search={search}
                      setSearch={setSearch}
                      quickFilter={quickFilter}
                      setQuickFilter={setQuickFilter}
                      category={category}
                      setCategory={setCategory}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      hasActiveFilters={hasActiveFilters}
                      clearAllFilters={clearAllFilters}
                      onClose={() => setShowFilters(false)}
                    />
                  </div>
                  <div className="p-5 border-t border-white/8 flex-shrink-0">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full h-11 rounded-xl gradient-gold font-ui text-[11px] tracking-[0.2em] text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      VIEW {filtered.length} RESULTS
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="hidden lg:block w-60 flex-shrink-0">
            <div
              className="sticky top-24 sidebar-scroll overflow-y-auto pr-1"
              style={{ maxHeight: "calc(100vh - 7rem)" }}
            >
              <SidebarContent
                search={search}
                setSearch={setSearch}
                quickFilter={quickFilter}
                setQuickFilter={setQuickFilter}
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                hasActiveFilters={hasActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden relative flex items-center gap-2 h-9 px-4 rounded-xl bg-[#1a1a1a] border border-white/12 text-white/60 text-xs font-ui tracking-wider hover:border-primary/50 hover:text-white transition-all"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full gradient-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <motion.p
                  key={filtered.length}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-white/25 font-ui tracking-wider"
                >
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "product" : "products"}
                </motion.p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl bg-[#1a1a1a] border border-white/8">
                  <button
                    onClick={() => setGridCols(3)}
                    title="3 columns"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${gridCols === 3 ? "bg-primary/15 text-primary" : "text-white/25 hover:text-white/55"}`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setGridCols(2)}
                    title="2 columns"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${gridCols === 2 ? "bg-primary/15 text-primary" : "text-white/25 hover:text-white/55"}`}
                  >
                    <LayoutList className="w-3.5 h-3.5" />
                  </button>
                </div>
                <CustomSelect
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* ── Loading skeleton ── */}
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid gap-4 ${
                    gridCols === 3
                      ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-2"
                  }`}
                >
                  {[...Array(gridCols === 3 ? 6 : 4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl md:rounded-3xl overflow-hidden bg-white/[0.03] border border-white/7 animate-pulse"
                    >
                      <div className="aspect-[3/5.7] md:aspect-[3/5] bg-white/5" />
                      <div className="p-3 md:p-5 space-y-2.5">
                        <div className="h-2 w-16 bg-white/8 rounded-full" />
                        <div className="h-4 w-4/5 bg-white/8 rounded-full" />
                        <div className="h-3 w-3/5 bg-white/5 rounded-full" />
                        <div className="h-8 md:h-11 w-full bg-white/5 rounded-lg md:rounded-xl mt-3" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  {searchError?.icon === "gibberish" ? (
                    <AlertCircle className="w-10 h-10 text-primary/25 mb-4" />
                  ) : (
                    <SearchX className="w-10 h-10 text-primary/25 mb-4" />
                  )}
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {searchError?.title ?? "No products found"}
                  </h3>
                  <p className="text-sm text-white/30 max-w-xs mb-7 leading-relaxed">
                    {searchError?.subtitle ?? "Try adjusting your filters."}
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-7 py-2.5 rounded-full bg-primary/10 border border-primary/40 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    CLEAR ALL FILTERS
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`grid-${gridCols}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`grid gap-4 ${
                    gridCols === 3
                      ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-2"
                  }`}
                >
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(i * 0.025, 0.3),
                        duration: 0.4,
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  search,
  setSearch,
  quickFilter,
  setQuickFilter,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  hasActiveFilters,
  clearAllFilters,
  onClose,
}: {
  search: string;
  setSearch: (v: string) => void;
  quickFilter: string;
  setQuickFilter: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/50" />
        <input
          type="text"
          placeholder="Search gifts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-9 rounded-xl
            bg-[#1e1e1e] border border-white/14
            text-white text-sm placeholder:text-white/30
            focus:border-primary/60 focus:bg-[#222222]
            focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]
            focus:outline-none transition-all duration-200"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div>
        <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 mb-2.5 uppercase">
          Quick Filter
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["All", "Bestseller", "New", "Eco", "Premium"].map((f) => (
            <button
              key={f}
              onClick={() => setQuickFilter(f)}
              className={`px-3 py-1 rounded-full text-[10px] font-ui tracking-wider transition-all duration-200 ${
                quickFilter === f
                  ? "gradient-gold text-primary-foreground shadow-gold"
                  : "bg-white/6 border border-white/10 text-white/50 hover:border-primary/40 hover:text-white/80 hover:bg-white/8"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] border border-white/8 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 uppercase">
            Price Range
          </p>
          <span className="text-[11px] text-primary font-ui font-semibold">
            PKR {priceRange[1].toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={50000}
          step={500}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          className="w-full accent-[hsl(46,65%,52%)] cursor-pointer"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] text-white/22 font-ui">PKR 0</span>
          <span className="text-[9px] text-white/22 font-ui">PKR 50,000</span>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/8 rounded-xl p-4">
        <p className="font-ui text-[8.5px] tracking-[0.3em] text-white/35 uppercase mb-2.5">
          Categories
        </p>
        <div className="space-y-px">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                onClose?.();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-ui tracking-wide transition-all duration-150 flex items-center justify-between ${
                category === cat
                  ? "bg-primary/12 text-primary border border-primary/20"
                  : "text-white/45 hover:text-white/75 hover:bg-white/5"
              }`}
            >
              {cat}
              {category === cat && (
                <motion.div
                  layoutId="cat-dot"
                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            onClick={clearAllFilters}
            className="w-full h-10 rounded-xl bg-primary/8 border border-primary/35 text-primary font-ui text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            CLEAR ALL FILTERS
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}