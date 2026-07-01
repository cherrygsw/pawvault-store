import { createClient, AppStrategy } from '@wix/sdk';
import { contacts } from '@wix/crm';
import { WIX_CLIENT_ID } from 'astro:env/client';
import { WIX_CLIENT_SECRET, WIX_CLIENT_INSTANCE_ID } from 'astro:env/server';

let client: ReturnType<typeof createClient<{ contacts: typeof contacts }>> | null = null;

export function getWixContactsClient() {
  if (!client) {
    client = createClient({
      modules: { contacts },
      auth: AppStrategy({
        appId: WIX_CLIENT_ID,
        appSecret: WIX_CLIENT_SECRET,
        instanceId: WIX_CLIENT_INSTANCE_ID,
      }),
    });
  }
  return client;
}
