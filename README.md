# 1Fi Marketplace

A submission for the 1Fi SDE Intern assignment: adds the **1Fi Marketplace** section to the
existing Shop page, alongside placeholder **Top Brands** and **Nearby Stores** tabs.

## Stack & why

- **Next.js (App Router) + TypeScript + Tailwind CSS v4** — before writing any code, I inspected
  the live app at `app.1fi.in/shop` via Chrome DevTools. Two things confirmed the stack:
  1. The **Sources** panel showed a `_next/static` asset path, which is unique to Next.js.
  2. CSS-module class names on `<body>` (`geist_...-module`, `geist_mono_...-module`) matched
     Next.js's automatic font-optimization output for the **Geist** / **Geist Mono** font family
     (loaded via `next/font`).

  Based on that, this project uses the same fonts and the same `src/app` + `src/components`
  folder conventions to stay close to the real codebase.
- **lucide-react** for icons — lightweight, tree-shakeable, and a common choice in modern
  Next.js apps.
- No state-management library — the feature is small enough that local component state plus a
  thin data layer is more readable than introducing Redux/Zustand for its own sake.

## Design tokens

Sampled directly from screenshots of the real app (hero banner, pill tab switcher, brand cards,
bottom nav):

| Token | Value | Used for |
|---|---|---|
| `--color-brand-primary` | `#7C3AED` | CTAs, active states, links |
| `--color-brand-primary-dark` | `#5B21B6` | Gradient/hover |
| `--color-brand-surface` | `#F5F3FF` | Card/image backgrounds, search bar |
| `--color-brand-border` | `#EDE9FE` | Card borders, dividers |
| `--color-brand-success` | `#16A34A` | Ratings, "no-cost EMI" badges |

The bottom nav (Home, Shop, EMI Dues, Limit, Profile) and the two-option pill switcher
(Top Brands / Nearby Stores) already existed in the real app — I extended the pill switcher to
three options rather than redesigning it, per the assignment's note that a full redesign isn't
expected.

I only had hands-on screenshots of a handful of real screens, not the full app, so beyond those
specific screens some spacing/shadow choices are my best-effort match rather than a verified
pixel-perfect trace.

## Structure

```
src/
  app/
    page.tsx                          # redirects to /shop
    shop/
      page.tsx                        # hero + 3-tab switcher (Top Brands / Nearby Stores / Marketplace)
      marketplace/[productId]/page.tsx  # product detail, variants, EMI plan selection, confirm CTA
  components/
    ShopTabs.tsx, BottomNav.tsx, SearchBar.tsx
    ProductCard.tsx, ProductImage.tsx, VariantSelector.tsx, EMIPlanCard.tsx
    StatusStates.tsx                  # shared loading skeletons / error / empty states
    shop/
      TopBrandsPanel.tsx, NearbyStoresPanel.tsx   # intentionally blank per spec
      MarketplacePanel.tsx            # search + category filter + product grid
  lib/api.ts                          # mock "API" layer (see below)
  types/marketplace.ts                # Product / ProductVariant / EMIPlan types
  data/products.json                  # mock product catalog
```

## Data & API handling

Nothing is hardcoded into UI components. All product/EMI data flows through `src/lib/api.ts`:

- `getProducts()`, `getProductById(id)`, `getEMIPlans(productId, variantId)` simulate real
  network calls — artificial delay, rejected promises on failure — so the calling components
  handle loading/error states the same way they would against a real backend.
- **EMI plans are computed, not stored.** `calculateEMIPlans(price)` derives 3/6/9/12-month
  no-cost EMI tenures from the variant's price, so any product automatically gets consistent,
  correct EMI options rather than someone hand-authoring plans per SKU. It also flags a
  "Recommended" tenure using a simple affordability heuristic (closest to ~8% of price/month).
- Swapping this for a real backend later means replacing the internals of `lib/api.ts` only —
  no component changes required.

### Testing error states

Every fetch supports a `simulateError` flag via URL query param:
- `/shop/marketplace/iphone-16?simulateError=1` — product detail error state
- `/shop?simulateError=1` — marketplace listing error state

## Product images

Product photos are real, freely-licensed stock photos (Unsplash), not the actual brand product
photography — this avoids using copyrighted Apple/Samsung/Sony marketing images in a mock
project. Products without a photo fall back to a category-matched icon (phone, laptop,
headphones, luggage, AC unit, watch) rendered via `ProductImage.tsx`.

## Known interaction fix worth calling out

Initially, changing the EMI plan or variant *after* confirming would silently update the
"confirmed" banner to reflect the new selection — without the user ever pressing "Proceed" for
it. Fixed by resetting `confirmed` to `false` whenever the variant or plan selection changes,
so users must explicitly re-confirm after changing their mind. Caught this during manual QA
against the built flow.

## What's implemented vs out of scope

- **Implemented**: product listing (search + category filter), product detail, variants, EMI
  plan selection, confirm CTA, loading/error/empty states throughout, responsive mobile-first
  layout (tested at 375px width).
- **Out of scope (per spec)**: Top Brands / Nearby Stores — intentionally left blank.
- **Out of scope (per spec)**: real checkout/payment — the confirm button shows a confirmation
  state; wiring it to an actual order/checkout flow was outside the brief ("CTA to proceed with
  the selected plan").
- **Also explored but intentionally not replicated**: tapping into a real brand under
  "Top Brands" (e.g. Air India) opens a gift-voucher amount-entry flow, distinct from a product
  catalog. Since the assignment explicitly requires product variants and EMI plans for
  Marketplace specifically (and says Top Brands needs no implementation), I built Marketplace as
  a product catalog rather than mirroring that flow.

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000 (redirects to /shop)
```

```bash
npm run build && npm start   # production build
```