import type { APIRoute } from 'astro';
import { getWixServerClient } from '../../../lib/wixServerClient';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { lineItemId } = await request.json();

  if (!lineItemId) {
    return new Response(JSON.stringify({ error: 'Invalid lineItemId' }), { status: 400 });
  }

  try {
    const client = await getWixServerClient(cookies);
    const result = await client.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
    return new Response(JSON.stringify({ cart: result.cart }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Failed to remove item' }), { status: 500 });
  }
};
