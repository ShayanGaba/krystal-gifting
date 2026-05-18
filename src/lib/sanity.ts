import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// ✅ HARDCODED FALLBACKS — so it works even if env vars are missing
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "aogs8pnc";
const DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
const API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true, // ✅ CDN for speed, set false for fresh data
  apiVersion: API_VERSION,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// ✅ FIXED GROQ — transforms Sanity array specs → frontend object format
export async function getProducts() {
  return client
    .fetch(
      `
    *[_type == "product"] {
      "id": id.current,
      name,
      brand,
      price,
      originalPrice,
      "image": image.asset->url,
      "images": images[].asset->url,
      category,
      description,
      shortDescription,
      rating,
      reviewCount,
      badges,
      tags,
      suitableFor,
      values,
      features,
      inStock,
      stockCount,
      "specifications": specifications.entries[] { "key": key, "value": value }
    }
  `,
    )
    .then((data: any[]) => {
      // Transform array of {key, value} into Record<string, string>
      return data.map((p: any) => ({
        ...p,
        specifications: p.specifications
          ? Object.fromEntries(
              p.specifications.map((s: any) => [s.key, s.value]),
            )
          : undefined,
      }));
    });
}

// ✅ Get single product by ID
export async function getProductById(id: string) {
  return client
    .fetch(
      `
    *[_type == "product" && id.current == $id][0] {
      "id": id.current,
      name,
      brand,
      price,
      originalPrice,
      "image": image.asset->url,
      "images": images[].asset->url,
      category,
      description,
      shortDescription,
      rating,
      reviewCount,
      badges,
      tags,
      suitableFor,
      values,
      features,
      inStock,
      stockCount,
      "specifications": specifications.entries[] { "key": key, "value": value }
    }
  `,
      { id },
    )
    .then((p: any) => {
      if (!p) return null;
      return {
        ...p,
        specifications: p.specifications
          ? Object.fromEntries(
              p.specifications.map((s: any) => [s.key, s.value]),
            )
          : undefined,
      };
    });
}

// ✅ Get collections
export async function getCollections() {
  return client.fetch(`
    *[_type == "collection"] | order(order asc) {
      "id": id.current,
      name,
      description,
      "image": image.asset->url,
      count,
      size,
      badge,
      badgeColor,
      featured
    }
  `);
}

// ✅ Get reviews for a product
export async function getReviews(productId: string) {
  return client.fetch(
    `
    *[_type == "review" && product->id.current == $productId] | order(date desc) {
      "id": _id,
      "productId": product->id.current,
      name,
      role,
      company,
      rating,
      title,
      text,
      date,
      helpful,
      verified
    }
  `,
    { productId },
  );
}

// ✅ Get blog posts
export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost" && live == true] | order(date desc) {
      "id": id.current,
      tag,
      title,
      excerpt,
      "image": image.asset->url,
      date,
      readTime,
      featured,
      live
    }
  `);
}

// ✅ Get featured blog post
export async function getFeaturedBlogPost() {
  return client.fetch(`
    *[_type == "blogPost" && live == true && featured == true][0] {
      "id": id.current,
      tag,
      title,
      excerpt,
      "image": image.asset->url,
      date,
      readTime,
      featured,
      live
    }
  `);
}
