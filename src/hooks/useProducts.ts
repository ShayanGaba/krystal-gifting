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
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch products from Sanity
        const sanityProducts = await getProducts();

        if (!cancelled) {
          if (sanityProducts && sanityProducts.length > 0) {
            // ✅ Clean and validate data
            const cleaned = sanityProducts.filter((p: any) => p.id && p.name);
            if (cleaned.length > 0) {
              setProducts(cleaned as Product[]);
              setUsingFallback(false);
              console.log(`✅ Loaded ${cleaned.length} products from Sanity`);
            } else {
              console.warn(
                "⚠️ Sanity returned empty/invalid products, using fallback",
              );
              setUsingFallback(true);
            }
          } else {
            console.warn("⚠️ No products in Sanity, using fallback data");
            setUsingFallback(true);
          }
        }

        // Fetch collections from Sanity
        const sanityCollections = await getCollections();
        if (!cancelled && sanityCollections && sanityCollections.length > 0) {
          setCollections(sanityCollections);
        }
      } catch (err: any) {
        console.error("❌ Sanity fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Failed to load from CMS");
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, collections, loading, error, usingFallback };
}
