# STOP LOG

## Step 5: SSR JsonLd migration blockers
- `src/components/Breadcrumbs/Breadcrumbs.tsx` is a client component (`use client`, `usePathname`) and currently emits JSON-LD with `next/script`. Migrating to an SSR-only JsonLd pattern would require restructuring routing data flow or splitting into a server wrapper not listed in allowed edit files.
- `src/app/start-free-trial/page.tsx` is a client component (`use client`, `useState`) and currently emits FAQ JSON-LD with `next/script`. SSR schema migration requires moving schema to a server component/layout file (`src/app/start-free-trial/layout.tsx`), which is outside the allowed surface area.

## Step 6: ProductSchema deletion blocked
- `src/components/SchemaOrg/ProductSchema.tsx` is still imported by `src/app/products/competitor-analysis/page.tsx`.
- Deleting the component would require editing `src/app/products/competitor-analysis/page.tsx`, which is outside the allowed surface area for this patch.
