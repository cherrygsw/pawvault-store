// Wix media fields return internal `wix:image://v1/<mediaId>/<filename>#...` URIs,
// not browser-loadable URLs. Convert to the public static.wixstatic.com CDN URL.
export function resolveWixImage(image?: string | null): string | null {
  if (!image) return null;
  const match = image.match(/^wix:image:\/\/v1\/([^/]+)\//);
  return match ? `https://static.wixstatic.com/media/${match[1]}` : null;
}
