# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ДИМБО Пицца — pizzeria web app + Telegram Web App for ordering pizza in Volzhsk, Mari El, Russia. Site: https://dimbopizza.ru

## Commands

```bash
npm run dev            # Dev server on :5173 (proxies API to api.dimbopizza.ru)
npm run build          # Production build (vite build --mode production)
npm run build-with-types  # Type-check + build
npm run lint           # ESLint
npm run type-check     # tsc --noEmit
npm run docker:build   # docker build -t pizzanat-web .
```

No test runner configured. Node >=20, npm >=10 required.

## Tech Stack

React 19, Vite 7, Mantine 8, React Router 7, TypeScript 5, Axios. Docker + nginx for deployment on Timeweb Cloud Apps (port 3478).

## Architecture

### Routing (App.tsx — 880 lines, 130+ routes)

Two-tier entry: `PlatformRouter` splits into `TelegramApp` (Telegram Web App) or `WebApp` (browser). SEO routes are loaded dynamically via `useSEORoutes()` hook from `src/routes/*.ts` files. If matched, they short-circuit before the hardcoded `<Routes>` block. All routes wrapped in `<AppShell>` with `<TelegramBottomNav />`.

### State Management

**Context + useReducer** (NOT Zustand, despite it being in package.json):
- `src/contexts/AuthContext.tsx` — auth, tokens, SMS/Telegram login (localStorage: `pizzanat_user`, `pizzanat_tokens`)
- `src/contexts/ProductsContext.tsx` — products, cart, categories, search, filters, favorites
- `src/contexts/TelegramContext.tsx` — Telegram Web App detection

### SEO Pages (template pattern)

SEO landing pages are thin wrappers passing a keyword to a shared template component. Templates live in `src/components/seo/` (KidsPageTemplate, BlogArticleTemplate, ProductSEOTemplate, etc.). Pages use React.lazy with named-export workarounds:

```tsx
lazy(() => import('./XxxPage').then(m => ({ default: m.XxxPage })))
```

Route configs are in `src/routes/*.ts` as `SEORouteConfig[]` arrays. Page data in `src/data/*.ts`.

### Custom SEO (no react-helmet)

- `src/utils/seo.ts` — 190+ Russian keywords, `setPageMeta()` via DOM manipulation
- `src/utils/schemaOrg.ts` — Schema.org JSON-LD generators (Restaurant, Product, FAQ, etc.)
- `src/components/SEOHead.tsx` — `useSEO` hook + `SEOPageWrapper` component
- `src/utils/routeGenerator.tsx` — `useSEORoutes()` for dynamic route matching

### API Layer

- `src/config/api.ts` — endpoint URLs as const object, environment detection
- `src/services/api.ts` — Axios client with interceptors (token injection, 401/403 handling), `BaseApiService` class
- `src/services/authApi.ts`, `productsApi.ts` — domain API methods

### Auth

`<ProtectedRoute>` wraps routes. Public/SEO pages use `requireAuth={false}`, protected pages use `requireAuth={true}` via catch-all `/*`. `src/utils/pageUtils.ts` has `isSEOPage()`, `isPublicPage()`, `isAuthPage()` helpers.

## Conventions

- **Language**: All comments and UI text are in Russian
- **Naming**: PascalCase for components and files; route slugs are transliterated Russian kebab-case (e.g., `/dostavka-pizzy`)
- **Exports**: Named exports preferred; lazy-loaded pages use named exports + default wrapper
- **No SSR/SSG**: Pure SPA, all rendering happens client-side
- **Analytics**: Yandex Metrika (103585127), VK Pixel (3695469) with ecommerce tracking
- **API**: Backend at `api.dimbopizza.ru/api/v1`, dev proxy in vite.config.ts to same domain

## Key Directories

- `src/pages/product-seo/`, `kids-seo/`, `zelenodolsk-kids-seo/`, `zelenodolsk-delivery-seo/`, `product-city/` — SEO landing pages (100+ pages)
- `src/pages/blog/` — 30 blog pages
- `src/routes/` — route config arrays for dynamic SEO routes
- `src/data/` — page content configs and keyword data
- `scripts/` — code generators for SEO pages (`.cjs` files)
- `docs/` — project documentation in Russian

## Deployment

Docker multi-stage build (Alpine + nginx). `nginx.conf` handles SPA fallback (`try_files $uri $uri/ /index.html`), gzip, static asset caching (1yr), health endpoint at `/health`. Non-root user `dimbopizza` in container. GitHub Actions workflow at `.github/workflows/deploy.yml`.
