import { createClient, AppStrategy } from '@wix/sdk';
import { productsV3 } from '@wix/stores';
import { WIX_CLIENT_ID } from 'astro:env/client';
import { WIX_CLIENT_SECRET, WIX_CLIENT_INSTANCE_ID } from 'astro:env/server';

// Astro.locals.wixClient (the framework's built-in per-page client) reads the
// legacy V1 Products API, which returns zero items against this site's V3
// Stores catalog with no error — so product reads use an app-authenticated
// client instead, which has confirmed V3 catalog read access.
function buildClient() {
  return createClient({
    modules: { productsV3 },
    auth: AppStrategy({
      appId: WIX_CLIENT_ID,
      appSecret: WIX_CLIENT_SECRET,
      instanceId: WIX_CLIENT_INSTANCE_ID,
    }),
  });
}

let client: ReturnType<typeof buildClient> | null = null;

export function getWixProductsClient() {
  if (!client) {
    client = buildClient();
  }
  return client;
}
