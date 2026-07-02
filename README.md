# PawVault

A pet supplies storefront built on Astro with Wix Headless (Wix Stores, eCommerce, Data, and Contacts).

## Features

- **Product catalog** — browse products backed by live Wix Stores data (`/products`, `/products/[slug]`)
- **Cart & checkout** — add, update, and remove items, then check out through Wix eCommerce
- **Pet-match quiz** — a short quiz (`/quiz`) that filters products by pet type, size, age, and other traits
- **Newsletter signup** — subscribes visitors to a Wix Contacts list
- **About & FAQ pages** — static content pages for store info

## Tech stack

- [Astro](https://astro.build) with the [Wix Astro integration](https://dev.wix.com/docs/go-headless)
- [@wix/stores](https://dev.wix.com/docs/sdk/backend-modules/stores) and [@wix/ecom](https://dev.wix.com/docs/sdk/backend-modules/ecom) for catalog and cart/checkout
- [@wix/data](https://dev.wix.com/docs/sdk/backend-modules/data) and [@wix/crm](https://dev.wix.com/docs/sdk/backend-modules/crm) for contacts/newsletter
- Tailwind CSS
- TypeScript

## Project structure

```
src/
  components/       Shared Astro components
  layouts/          Page layout
  lib/              Wix client helpers (products, contacts, images, featured items)
  pages/            Site routes
    products/       Catalog + product detail
    api/cart/       Cart API routes (add, update, remove, checkout)
    api/newsletter/ Newsletter subscribe route
public/             Static assets, logos, favicon
```

## Getting started

Install dependencies:

```bash
npm install
```

Set up your local environment by copying `.env.local` (not committed) with your Wix app credentials:

```
WIX_CLOUD_PROVIDER=
WIX_CLIENT_ID=
WIX_CLIENT_INSTANCE_ID=
WIX_CLIENT_PUBLIC_KEY=
WIX_CLIENT_SECRET=
```

Run the dev server:

```bash
npm run dev
```

Other useful scripts:

```bash
npm run build     # wix build
npm run preview   # wix preview
npm run release   # wix release
```

## Need help?

- [Wix Headless Documentation](https://dev.wix.com/docs/go-headless)
- [Wix SDK Documentation](https://dev.wix.com/docs/sdk)
- [Community on Discord](https://discord.gg/n6TBrSnYTp)
