import type { APIRoute } from 'astro';
import { getWixServerClient } from '../../../lib/wixServerClient';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { lineItemId, quantity } = await request.json();

  if (!lineItemId || typeof quantity !== 'number' || quantity < 1) {
    return new Response(JSON.stringify({ error: 'Invalid lineItemId or quantity' }), { status: 400 });
  }

  try {
    const client = await getWixServerClient(cookies);
    const result = await client.currentCart.updateCurrentCartLineItemQuantity([{ _id: lineItemId, quantity }]);
    return new Response(JSON.stringify({ cart: result.cart }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Failed to update cart' }), { status: 500 });
  }
};
