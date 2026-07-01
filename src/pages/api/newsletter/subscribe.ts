import type { APIRoute } from 'astro';
import { getWixContactsClient } from '../../../lib/wixContactsClient';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), { status: 400 });
  }

  try {
    const client = getWixContactsClient();
    await client.contacts.createContact(
      { emails: { items: [{ email, primary: true }] } },
      { allowDuplicates: true }
    );
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Could not save your email. Please try again.' }), { status: 500 });
  }
};
