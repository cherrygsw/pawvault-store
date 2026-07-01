import type { APIRoute } from 'astro';
import { getWixServerClient } from '../../../lib/wixServerClient';

export const POST: APIRoute = async ({ cookies, url }) => {
  try {
    const client = await getWixServerClient(cookies);

    const { checkoutId } = await client.currentCart.createCheckoutFromCurrentCart({
      channelType: 'WEB',
    });

    const { redirectSession } = await client.redirects.createRedirectSession({
      ecomCheckout: { checkoutId },
      callbacks: {
        postFlowUrl: url.origin,
        thankYouPageUrl: `${url.origin}/products`,
      },
    });

    return new Response(JSON.stringify({ checkoutUrl: redirectSession?.fullUrl }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Failed to start checkout' }), { status: 500 });
  }
};
