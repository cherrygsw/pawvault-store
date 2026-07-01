// The paid-traffic hero products, in display order. These get premium
// placement on the homepage and a neutral "Featured" label on /products.
// Kept as a hand-maintained list because Wix Stores has no native
// "featured" flag; update this array to change which products are promoted.
export const FEATURED_SLUGS = [
  'anti-mud-paw-mat',
  'deshedding-tool',
  'portable-dog-water-bottle',
] as const;

export function isFeatured(slug?: string | null): boolean {
  return !!slug && (FEATURED_SLUGS as readonly string[]).includes(slug);
}
