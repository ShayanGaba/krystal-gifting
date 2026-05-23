// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, Eye, ShoppingBag } from "lucide-react";
// import { Product } from "@/data/products";
// import { productImages } from "@/assets/imageMap";
// import { formatPrice } from "@/lib/whatsapp";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { toast } from "sonner";
// import StarRating from "@/components/StarRating"; // ✅ import new component

// interface ProductCardProps {
//   product: Product;
//   matchScore?: number;
// }

// export default function ProductCard({ product, matchScore }: ProductCardProps) {
//   const { addToCart } = useCart();
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
//   const wishlisted = isInWishlist(product.id);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       image: productImages[product.id] || "/placeholder.svg",
//       category: product.category,
//     });
//     toast.success("Added to cart!", {
//       description: product.name,
//       action: {
//         label: "View Cart",
//         onClick: () => (window.location.href = "/cart"),
//       },
//     });
//   };

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (wishlisted) {
//       removeFromWishlist(product.id);
//       toast.info("Removed from wishlist");
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         originalPrice: product.originalPrice,
//         image: productImages[product.id] || "/placeholder.svg",
//         category: product.category,
//       });
//       toast.success("Added to wishlist!");
//     }
//   };

//   const discount = product.originalPrice
//     ? Math.round(
//         ((product.originalPrice - product.price) / product.originalPrice) * 100,
//       )
//     : 0;

//   return (
//     <Link to={`/product/${product.id}`}>
//       <motion.div
//         whileHover={{ y: -8 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-card gold-border"
//       >
//         {/* Badges */}
//         <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 z-10 flex flex-col gap-1 md:gap-2">
//           {product.badges.map((badge) => (
//             <span
//               key={badge}
//               className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[11px] font-ui tracking-wider ${
//                 badge === "Eco"
//                   ? "bg-success/90 text-foreground"
//                   : badge === "New"
//                     ? "bg-primary/90 text-primary-foreground"
//                     : "gradient-gold text-primary-foreground"
//               }`}
//             >
//               {badge}
//             </span>
//           ))}
//           {matchScore !== undefined && (
//             <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[11px] font-ui tracking-wider gradient-gold text-primary-foreground">
//               {matchScore}% Match
//             </span>
//           )}
//         </div>

//         {/* Desktop quick actions */}
//         <div className="absolute top-4 right-4 z-10 flex-col gap-2 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button
//             onClick={handleWishlist}
//             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${wishlisted ? "gradient-gold text-primary-foreground" : "bg-glass gold-border hover:bg-primary hover:text-primary-foreground"}`}
//           >
//             <Heart
//               className="w-4 h-4"
//               fill={wishlisted ? "currentColor" : "none"}
//             />
//           </button>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               window.location.href = `/product/${product.id}`;
//             }}
//             className="w-10 h-10 rounded-full bg-glass gold-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Mobile wishlist */}
//         <button
//           onClick={handleWishlist}
//           className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 md:hidden ${wishlisted ? "gradient-gold text-primary-foreground" : "bg-black/30 backdrop-blur-sm text-white/70"}`}
//         >
//           <Heart
//             className="w-3.5 h-3.5"
//             fill={wishlisted ? "currentColor" : "none"}
//           />
//         </button>

//         {/* Image */}
//         <div className="aspect-[3/5.7] md:aspect-[3/5] overflow-hidden">
//           <img
//             src={productImages[product.id] || "/placeholder.svg"}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             loading="lazy"
//           />
//         </div>

//         {/* Info */}
//         <div className="absolute bottom-0 left-0 right-0 bg-glass-light p-3 md:p-5 border-t border-foreground/10">
//           <p className="font-ui text-[8px] md:text-[10px] tracking-widest text-muted-foreground mb-0.5 md:mb-1 truncate">
//             {product.brand}
//           </p>
//           <h3 className="font-subhead text-[14px] md:text-lg text-foreground mb-0.5 md:mb-1 leading-tight line-clamp-2 tracking-wide">
//             {product.name}
//           </h3>
//           <p className="hidden md:block text-xs text-muted-foreground mb-2 line-clamp-1">
//             {product.shortDescription}
//           </p>

//           {/* ✅ Fractional stars */}
//           <div className="mb-1.5 md:mb-2">
//             <StarRating
//               rating={product.rating}
//               size="sm"
//               showValue={true}
//               reviewCount={product.reviewCount}
//             />
//           </div>

//           <div className="flex items-center justify-between gap-1">
//             <div className="flex items-center gap-1 md:gap-2 min-w-0">
//               <span className="font-display text-sm md:text-xl font-bold text-foreground truncate tracking-wider">
//                 {formatPrice(product.price)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-[10px] md:text-sm text-muted-foreground line-through hidden sm:inline truncate">
//                   {formatPrice(product.originalPrice)}
//                 </span>
//               )}
//             </div>
//             {discount > 0 && (
//               <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-ui bg-success/20 text-success whitespace-nowrap">
//                 -{discount}%
//               </span>
//             )}
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="w-full mt-2 md:mt-3 h-8 md:h-11 rounded-lg md:rounded-xl gradient-gold font-ui text-[9px] md:text-xs tracking-widest text-primary-foreground flex items-center justify-center gap-1.5 md:gap-2 hover:shadow-gold transition-shadow duration-300"
//           >
//             <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
//             ADD TO CART
//           </button>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }





// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, Eye, ShoppingBag } from "lucide-react";
// import { Product } from "@/data/products";
// import { productImages } from "@/assets/imageMap";
// import { formatPrice } from "@/lib/whatsapp";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { toast } from "sonner";
// import StarRating from "@/components/StarRating";

// interface ProductCardProps {
//   product: Product;
//   matchScore?: number;
// }

// // ✅ Resolve image: prefer Sanity CDN URL on product.image,
// //    fall back to local static map, then placeholder
// function resolveImage(product: Product): string {
//   // Sanity returns a full https:// URL — use it directly
//   if (product.image && product.image.startsWith("http")) {
//     return product.image;
//   }
//   // Local static imageMap (used when Sanity is unavailable / fallback data)
//   const local = productImages[product.id];
//   if (local) return local;
//   // Final fallback
//   return "/placeholder.svg";
// }

// export default function ProductCard({ product, matchScore }: ProductCardProps) {
//   const { addToCart } = useCart();
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
//   const wishlisted = isInWishlist(product.id);

//   // Resolved once — used in both the img tag and cart payload
//   const imageSrc = resolveImage(product);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       image: imageSrc,
//       category: product.category,
//     });
//     toast.success("Added to cart!", {
//       description: product.name,
//       action: {
//         label: "View Cart",
//         onClick: () => (window.location.href = "/cart"),
//       },
//     });
//   };

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (wishlisted) {
//       removeFromWishlist(product.id);
//       toast.info("Removed from wishlist");
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         originalPrice: product.originalPrice,
//         image: imageSrc,
//         category: product.category,
//       });
//       toast.success("Added to wishlist!");
//     }
//   };

//   const discount = product.originalPrice
//     ? Math.round(
//         ((product.originalPrice - product.price) / product.originalPrice) *
//           100,
//       )
//     : 0;

//   return (
//     <Link to={`/product/${product.id}`}>
//       <motion.div
//         whileHover={{ y: -8 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-card gold-border"
//       >
//         {/* Badges */}
//         <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 z-10 flex flex-col gap-1 md:gap-2">
//           {product.badges.map((badge) => (
//             <span
//               key={badge}
//               className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[11px] font-ui tracking-wider ${
//                 badge === "Eco"
//                   ? "bg-success/90 text-foreground"
//                   : badge === "New"
//                     ? "bg-primary/90 text-primary-foreground"
//                     : "gradient-gold text-primary-foreground"
//               }`}
//             >
//               {badge}
//             </span>
//           ))}
//           {matchScore !== undefined && (
//             <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[11px] font-ui tracking-wider gradient-gold text-primary-foreground">
//               {matchScore}% Match
//             </span>
//           )}
//         </div>

//         {/* Desktop quick actions */}
//         <div className="absolute top-4 right-4 z-10 flex-col gap-2 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button
//             onClick={handleWishlist}
//             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${wishlisted ? "gradient-gold text-primary-foreground" : "bg-glass gold-border hover:bg-primary hover:text-primary-foreground"}`}
//           >
//             <Heart
//               className="w-4 h-4"
//               fill={wishlisted ? "currentColor" : "none"}
//             />
//           </button>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               window.location.href = `/product/${product.id}`;
//             }}
//             className="w-10 h-10 rounded-full bg-glass gold-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Mobile wishlist */}
//         <button
//           onClick={handleWishlist}
//           className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 md:hidden ${wishlisted ? "gradient-gold text-primary-foreground" : "bg-black/30 backdrop-blur-sm text-white/70"}`}
//         >
//           <Heart
//             className="w-3.5 h-3.5"
//             fill={wishlisted ? "currentColor" : "none"}
//           />
//         </button>

//         {/* Image — uses resolved Sanity CDN URL or local fallback */}
//         <div className="aspect-[3/5.7] md:aspect-[3/5] overflow-hidden">
//           <img
//             src={imageSrc}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             loading="lazy"
//           />
//         </div>

//         {/* Info */}
//         <div className="absolute bottom-0 left-0 right-0 bg-glass-light p-3 md:p-5 border-t border-foreground/10">
//           <p className="font-ui text-[8px] md:text-[10px] tracking-widest text-muted-foreground mb-0.5 md:mb-1 truncate">
//             {product.brand}
//           </p>
//           <h3 className="font-subhead text-[14px] md:text-lg text-foreground mb-0.5 md:mb-1 leading-tight line-clamp-2 tracking-wide">
//             {product.name}
//           </h3>
//           <p className="hidden md:block text-xs text-muted-foreground mb-2 line-clamp-1">
//             {product.shortDescription}
//           </p>

//           {/* Fractional stars */}
//           <div className="mb-1.5 md:mb-2">
//             <StarRating
//               rating={product.rating}
//               size="sm"
//               showValue={true}
//               reviewCount={product.reviewCount}
//             />
//           </div>

//           <div className="flex items-center justify-between gap-1">
//             <div className="flex items-center gap-1 md:gap-2 min-w-0">
//               <span className="font-display text-sm md:text-xl font-bold text-foreground truncate tracking-wider">
//                 {formatPrice(product.price)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-[10px] md:text-sm text-muted-foreground line-through hidden sm:inline truncate">
//                   {formatPrice(product.originalPrice)}
//                 </span>
//               )}
//             </div>
//             {discount > 0 && (
//               <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-ui bg-success/20 text-success whitespace-nowrap">
//                 -{discount}%
//               </span>
//             )}
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="w-full mt-2 md:mt-3 h-8 md:h-11 rounded-lg md:rounded-xl gradient-gold font-ui text-[9px] md:text-xs tracking-widest text-primary-foreground flex items-center justify-center gap-1.5 md:gap-2 hover:shadow-gold transition-shadow duration-300"
//           >
//             <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
//             ADD TO CART
//           </button>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }





import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { productImages } from "@/assets/imageMap";
import { formatPrice } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import StarRating from "@/components/StarRating";

interface ProductCardProps {
  product: Product;
  matchScore?: number;
}

// ✅ Sanity CDN URL first, local static map as fallback, then placeholder
function resolveImage(product: Product): string {
  if (product.image && product.image.startsWith("http")) return product.image;
  const local = productImages[product.id];
  if (local) return local;
  return "/placeholder.svg";
}

export default function ProductCard({ product, matchScore }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const imageSrc = resolveImage(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageSrc,
      category: product.category,
    });
    toast.success("Added to cart!", {
      description: product.name,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: imageSrc,
        category: product.category,
      });
      toast.success("Added to wishlist!");
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-card gold-border"
      >
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 z-10 flex flex-col gap-1 md:gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[11px] font-ui tracking-wider ${
                badge === "Eco"
                  ? "bg-success/90 text-foreground"
                  : badge === "New"
                    ? "bg-primary/90 text-primary-foreground"
                    : "gradient-gold text-primary-foreground"
              }`}
            >
              {badge}
            </span>
          ))}
          {matchScore !== undefined && (
            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[11px] font-ui tracking-wider gradient-gold text-primary-foreground">
              {matchScore}% Match
            </span>
          )}
        </div>

        {/* Desktop quick actions */}
        <div className="absolute top-4 right-4 z-10 flex-col gap-2 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${wishlisted ? "gradient-gold text-primary-foreground" : "bg-glass gold-border hover:bg-primary hover:text-primary-foreground"}`}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/product/${product.id}`;
            }}
            className="w-10 h-10 rounded-full bg-glass gold-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 md:hidden ${wishlisted ? "gradient-gold text-primary-foreground" : "bg-black/30 backdrop-blur-sm text-white/70"}`}
        >
          <Heart className="w-3.5 h-3.5" fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Image — Sanity CDN URL or local fallback */}
        <div className="aspect-[3/5.7] md:aspect-[3/5] overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-glass-light p-3 md:p-5 border-t border-foreground/10">
          <p className="font-ui text-[8px] md:text-[10px] tracking-widest text-muted-foreground mb-0.5 md:mb-1 truncate">
            {product.brand}
          </p>
          <h3 className="font-subhead text-[14px] md:text-lg text-foreground mb-0.5 md:mb-1 leading-tight line-clamp-2 tracking-wide">
            {product.name}
          </h3>
          <p className="hidden md:block text-xs text-muted-foreground mb-2 line-clamp-1">
            {product.shortDescription}
          </p>

          <div className="mb-1.5 md:mb-2">
            <StarRating
              rating={product.rating}
              size="sm"
              showValue={true}
              reviewCount={product.reviewCount}
            />
          </div>

          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 md:gap-2 min-w-0">
              <span className="font-display text-sm md:text-xl font-bold text-foreground truncate tracking-wider">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] md:text-sm text-muted-foreground line-through hidden sm:inline truncate">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-ui bg-success/20 text-success whitespace-nowrap">
                -{discount}%
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full mt-2 md:mt-3 h-8 md:h-11 rounded-lg md:rounded-xl gradient-gold font-ui text-[9px] md:text-xs tracking-widest text-primary-foreground flex items-center justify-center gap-1.5 md:gap-2 hover:shadow-gold transition-shadow duration-300"
          >
            <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            ADD TO CART
          </button>
        </div>
      </motion.div>
    </Link>
  );
}