// import { useState, useEffect } from "react";
// import { getProducts, getCollections } from "@/lib/sanity";
// import {
//   products as fallbackProducts,
//   collections as fallbackCollections,
// } from "@/data/products";
// import type { Product } from "@/data/products";

// export function useProducts() {
//   const [products, setProducts] = useState<Product[]>(fallbackProducts);
//   const [collections, setCollections] = useState(fallbackCollections);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [usingFallback, setUsingFallback] = useState(false);

//   useEffect(() => {
//     let cancelled = false;

//     async function fetchData() {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch products from Sanity
//         const sanityProducts = await getProducts();

//         if (!cancelled) {
//           if (sanityProducts && sanityProducts.length > 0) {
//             // ✅ Clean and validate data
//             const cleaned = sanityProducts.filter((p: any) => p.id && p.name);
//             if (cleaned.length > 0) {
//               setProducts(cleaned as Product[]);
//               setUsingFallback(false);
//               console.log(`✅ Loaded ${cleaned.length} products from Sanity`);
//             } else {
//               console.warn(
//                 "⚠️ Sanity returned empty/invalid products, using fallback",
//               );
//               setUsingFallback(true);
//             }
//           } else {
//             console.warn("⚠️ No products in Sanity, using fallback data");
//             setUsingFallback(true);
//           }
//         }

//         // Fetch collections from Sanity
//         const sanityCollections = await getCollections();
//         if (!cancelled && sanityCollections && sanityCollections.length > 0) {
//           setCollections(sanityCollections);
//         }
//       } catch (err: any) {
//         console.error("❌ Sanity fetch error:", err);
//         if (!cancelled) {
//           setError(err.message || "Failed to load from CMS");
//           setUsingFallback(true);
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     fetchData();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return { products, collections, loading, error, usingFallback };
// }

// import { useState, useEffect } from "react";
// import { getProducts, getCollections } from "@/lib/sanity";
// import {
//   products as fallbackProducts,
//   collections as fallbackCollections,
// } from "@/data/products";
// import type { Product } from "@/data/products";

// export function useProducts() {
//   const [products, setProducts] = useState<Product[]>(fallbackProducts);
//   const [collections, setCollections] = useState(fallbackCollections);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [usingFallback, setUsingFallback] = useState(false);

//   useEffect(() => {
//     let cancelled = false;

//     async function fetchData() {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch products from Sanity
//         const sanityProducts = await getProducts();

//         if (!cancelled) {
//           if (sanityProducts && sanityProducts.length > 0) {
//             // ✅ Clean and validate data — sanitize null arrays
//             const cleaned = sanityProducts
//               .filter((p: any) => p.id && p.name)
//               .map((p: any) => ({
//                 ...p,
//                 badges: p.badges || [],
//                 tags: p.tags || [],
//                 features: p.features || [],
//                 suitableFor: p.suitableFor || [],
//                 values: p.values || [],
//                 images: p.images || undefined,
//                 originalPrice: p.originalPrice || undefined,
//                 stockCount: p.stockCount || undefined,
//                 image: p.image || "/placeholder.svg",
//               }));

//             if (cleaned.length > 0) {
//               setProducts(cleaned as Product[]);
//               setUsingFallback(false);
//               console.log(`✅ Loaded ${cleaned.length} products from Sanity`);
//             } else {
//               console.warn(
//                 "⚠️ Sanity returned empty/invalid products, using fallback",
//               );
//               setUsingFallback(true);
//             }
//           } else {
//             console.warn("⚠️ No products in Sanity, using fallback data");
//             setUsingFallback(true);
//           }
//         }

//         // Fetch collections from Sanity
//         const sanityCollections = await getCollections();
//         if (!cancelled && sanityCollections && sanityCollections.length > 0) {
//           setCollections(sanityCollections);
//         }
//       } catch (err: any) {
//         console.error("❌ Sanity fetch error:", err);
//         if (!cancelled) {
//           setError(err.message || "Failed to load from CMS");
//           setUsingFallback(true);
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     fetchData();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return { products, collections, loading, error, usingFallback };
// }






// import { useState, useEffect } from "react";
// import { getProducts, getCollections } from "@/lib/sanity";
// import {
//   products as fallbackProducts,
//   collections as fallbackCollections,
// } from "@/data/products";
// import type { Product } from "@/data/products";

// export function useProducts() {
//   const [products, setProducts] = useState<Product[]>(fallbackProducts);
//   const [collections, setCollections] = useState(fallbackCollections);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let cancelled = false;

//     async function fetchAll() {
//       try {
//         // ── Fetch products ──────────────────────────────────────────────────
//         const rawProducts = await getProducts();

//         if (!cancelled && rawProducts && rawProducts.length > 0) {
//           const cleaned = rawProducts
//             .filter((p: any) => p.id && p.name)
//             .map((p: any) => ({
//               ...p,
//               // ✅ Sanity CDN URL is already resolved — use it directly
//               image: p.image || "/placeholder.svg",
//               images: p.images || undefined,
//               badges: p.badges || [],
//               tags: p.tags || [],
//               features: p.features || [],
//               suitableFor: p.suitableFor || [],
//               values: p.values || [],
//               originalPrice: p.originalPrice || undefined,
//               stockCount: p.stockCount || undefined,
//             }));

//           if (cleaned.length > 0) {
//             setProducts(cleaned as Product[]);
//             console.log(`✅ Loaded ${cleaned.length} products from Sanity`);
//           }
//         }
//       } catch (err: any) {
//         if (!cancelled) {
//           console.error("❌ Sanity products fetch error:", err);
//           // Keep fallback products already in state
//         }
//       }

//       try {
//         // ── Fetch collections ───────────────────────────────────────────────
//         const rawCollections = await getCollections();

//         if (!cancelled && rawCollections && rawCollections.length > 0) {
//           setCollections(rawCollections);
//           console.log(
//             `✅ Loaded ${rawCollections.length} collections from Sanity`,
//           );
//         }
//       } catch (err: any) {
//         if (!cancelled) {
//           console.error("❌ Sanity collections fetch error:", err);
//           // Keep fallback collections already in state
//         }
//       }

//       if (!cancelled) setLoading(false);
//     }

//     fetchAll();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return { products, collections, loading };
// }













import { useState, useEffect } from "react";
import { getProducts, getCollections } from "@/lib/sanity";
import {
  products as fallbackProducts,
  collections as fallbackCollections,
} from "@/data/products";
import type { Product } from "@/data/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [collections, setCollections] = useState(fallbackCollections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      // ── Products ────────────────────────────────────────────────────────────
      try {
        const raw = await getProducts();
        if (!cancelled && raw && raw.length > 0) {
          const cleaned = raw
            .filter((p: any) => p.id && p.name)
            .map((p: any) => ({
              ...p,
              image: p.image || "/placeholder.svg",
              images: p.images || undefined,
              badges: p.badges || [],
              tags: p.tags || [],
              features: p.features || [],
              suitableFor: p.suitableFor || [],
              values: p.values || [],
              originalPrice: p.originalPrice || undefined,
              stockCount: p.stockCount || undefined,
            }));
          if (cleaned.length > 0) {
            setProducts(cleaned as Product[]);
            console.log(`✅ Loaded ${cleaned.length} products from Sanity`);
          }
        }
      } catch (err) {
        if (!cancelled) console.error("❌ Products fetch error:", err);
      }

      // ── Collections ─────────────────────────────────────────────────────────
      try {
        const cols = await getCollections();
        if (!cancelled && cols && cols.length > 0) {
          setCollections(cols);
          console.log(`✅ Loaded ${cols.length} collections from Sanity`);
        }
      } catch (err) {
        if (!cancelled) console.error("❌ Collections fetch error:", err);
      }

      if (!cancelled) setLoading(false);
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { products, collections, loading };
}