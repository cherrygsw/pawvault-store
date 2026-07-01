import { createClient, AppStrategy } from '@wix/sdk';
import { contacts } from '@wix/crm';
import { WIX_CLIENT_ID } from 'astro:env/client';
import { WIX_CLIENT_SECRET, WIX_CLIENT_INSTANCE_ID } from 'astro:env/server';

function buildClient() {
  return createClient({
    modules: { contacts },
    auth: AppStrategy({
      appId: WIX_CLIENT_ID,
      appSecret: WIX_CLIENT_SECRET,
      instanceId: WIX_CLIENT_INSTANCE_ID,
    }),
  });
}

let client: ReturnType<typeof buildClient> | null = null;

export function getWixContactsClient() {
  if (!client) {
    client = buildClient();
  }
  return client;
}
