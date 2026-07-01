import type { APIRoute } from 'astro';
import { getWixServerClient } from '../../../lib/wixServerClient';

// Fixed public app ID for the Wix Stores catalog — required on every cart line item
// that references a Stores product. Not a secret; same value for every Wix site.
const STORES_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { catalogItemId, quantity, variantId } = await request.json();

  if (!catalogItemId || typeof quantity !== 'number' || quantity < 1) {
    return new Response(JSON.stringify({ error: 'Invalid catalogItemId or quantity' }), { status: 400 });
  }

  // Products with options (e.g. the paw mat's Medium/Large/XL) require the
  // chosen variant so the cart line references the right size.
  const catalogReference: Record<string, any> = { catalogItemId, appId: STORES_APP_ID };
  if (variantId) {
    catalogReference.options = { variantId };
  }

  try {
    const client = await getWixServerClient(cookies);
    const result = await client.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference,
          quantity,
        },
      ],
    });
    const itemCount = result.cart?.lineItems?.reduce((sum: number, li: any) => sum + (li.quantity ?? 0), 0) ?? 0;
    return new Response(JSON.stringify({ itemCount }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Failed to add to cart' }), { status: 500 });
  }
};
