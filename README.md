# Janeh by Manoush

Handcrafted jewelry catalog website with an integrated admin panel.

## Why This Stack?

| Technology | Why |
|---|---|
| **React + TypeScript** | Scalable, type-safe component architecture ideal for product catalogs and admin CRUD logic |
| **Vite** | Blazing-fast dev server and optimized production builds via native ESM |
| **React Router v6** | SEO-friendly URLs (`/products/:slug`) with nested layouts for public + admin sections |
| **Ant Design v5** | Production-ready UI library with tables, forms, upload, layout — perfect for rapid admin panel development |
| **Playwright** | Reliable cross-browser E2E tests that run against the real app |
| **ESLint + Prettier** | Consistent code style enforced automatically |
| **Husky + lint-staged** | Pre-commit hooks ensure no unformatted or lint-failing code is committed |
| **Strict TypeScript** | Catches bugs at compile time; `noUncheckedIndexedAccess` and all strict flags enabled |
| **Path alias `@/*`** | Clean imports (`@/api/products.api`) instead of fragile relative paths |

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Install Playwright browsers
pnpm exec playwright install

# 3. Copy environment config
cp .env.example .env

# 4. Start development server
pnpm dev

# 5. Run E2E tests
pnpm test:e2e
```

## Architecture Rules (MANDATORY)

These rules are **not optional**. Every file in this project must follow them.

### File Responsibility

| Folder | Contains | Never Contains |
|---|---|---|
| `src/types/*` | TypeScript interfaces, enums, types | Logic, constants, JSX |
| `src/consts/*` | Route paths, static values, enum constants | Logic, types, JSX |
| `src/styles/*` | Global CSS | Component-specific styles |
| `src/utils/*` | Pure helper functions | API calls, UI logic, types |
| `src/api/*` | HTTP calls returning typed data | UI logic, JSX, constants |
| `src/config/*` | Environment variable readers | Logic, UI, types |
| `src/components/*` | Reusable JSX + component logic | Type definitions, API calls, inline styles |
| `src/pages/*` | Page-level JSX + page logic | Shared types, shared constants |

### Forbidden Patterns

- **NO** inline styles (`style={{}}`) — use CSS Modules or `src/styles/`
- **NO** type definitions inside components — move to `src/types/`
- **NO** constants defined inside components — move to `src/consts/`
- **NO** API logic inside components — call functions from `src/api/`
- **NO** mixed concerns in a single file

### If Any Rule Is Violated

Refactor immediately. No exceptions.

## Project Structure

```
src/
  app/
    App.tsx                          # Root component
    routes.tsx                       # All route definitions
    layout/
      AppLayout.tsx                  # Public header/content/footer
    providers/
      AntdProvider.tsx               # Ant Design theme config
  pages/
    Home/HomePage.tsx                # Landing page
    Catalog/CatalogPage.tsx          # Women / Men collections
    Product/ProductPage.tsx          # Single product detail
    About/AboutPage.tsx              # About the brand
    Contact/ContactPage.tsx          # Contact form
    Admin/
      AdminLayout.tsx                # Admin sidebar layout
      Products/
        AdminProductsListPage.tsx    # Product table + CRUD
        AdminProductEditPage.tsx     # Edit product form
      Orders/
        AdminOrdersPage.tsx          # Orders table
    NotFound/NotFoundPage.tsx        # 404 page
  components/
    ProductCard/ProductCard.tsx      # Reusable product card
  api/
    http.ts                          # Typed fetch wrapper
    products.api.ts                  # Product API calls
    orders.api.ts                    # Order API calls
  types/
    product.ts                       # Product interfaces & enums
    order.ts                         # Order interfaces & enums
  consts/
    routes.ts                        # Route path constants
    enums.ts                         # App-wide constants
  utils/
    formatPrice.ts                   # Price formatting helper
    slugify.ts                       # URL slug generator
  config/
    env.ts                           # Environment variable reader
  styles/
    global.css                       # Global reset & base styles
  main.tsx                           # App entry point
tests/
  e2e/
    public-flow.spec.ts              # Public pages E2E tests
    admin-flow.spec.ts               # Admin panel E2E tests
playwright.config.ts                 # Playwright configuration
```

## Routes

### Public

| Path | Page |
|---|---|
| `/` | Home |
| `/women` | Women's catalog |
| `/men` | Men's catalog |
| `/products/:slug` | Product detail |
| `/about` | About |
| `/contact` | Contact |
| `*` | 404 Not Found |

### Admin

| Path | Page |
|---|---|
| `/admin/products` | Products list |
| `/admin/products/:id` | Edit product |
| `/admin/orders` | Orders list |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:e2e:ui` | Run Playwright tests with UI |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001/api` |
