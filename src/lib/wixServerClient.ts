import { createClient, OAuthStrategy } from '@wix/sdk';
import { currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';
import { WIX_CLIENT_ID } from 'astro:env/client';
import type { AstroCookies } from 'astro';

const TOKEN_COOKIE = 'wixVisitorTokens';
const TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Ecom operations (cart, checkout) need a visitor session that's consistent
// across requests. Astro.locals.wixClient is only populated for pages the
// Wix pages system renders, not for plain Astro API routes — so cart
// mutations build their own client here, persisting visitor tokens in a
// first-party cookie instead of relying on that per-page injection.
export async function getWixServerClient(cookies: AstroCookies) {
  const raw = cookies.get(TOKEN_COOKIE)?.value;
  let tokens: any;
  try {
    tokens = raw ? JSON.parse(raw) : undefined;
  } catch {
    tokens = undefined;
  }

  const client = createClient({
    modules: { currentCart, redirects },
    auth: OAuthStrategy({ clientId: WIX_CLIENT_ID, tokens }),
  });

  if (!tokens) {
    tokens = await client.auth.generateVisitorTokens();
    client.auth.setTokens(tokens);
  }

  cookies.set(TOKEN_COOKIE, JSON.stringify(tokens), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: TOKEN_COOKIE_MAX_AGE,
  });

  return client;
}
