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

### Imports

- **Same folder:** use relative `./file` (e.g. `import { X } from "./types"`).
- **Elsewhere in project:** use path from project root, e.g. `src/components/ProductCard`, `src/pages/Home`, `src/api/http`. Do not use path aliases (e.g. no `@/`).

### Component folder structure

Every component has a folder whose name is the logical component name. Use these files:

| File | Purpose |
|------|--------|
| `index.tsx` | Component implementation; declare as `const ComponentName: React.FC<Props> = ...` and export default. |
| `styles.module.css` | Component styles (use when custom CSS is needed). |
| `types.ts` | Optional; props and other types used only by this component. |
| `utils.ts` | Optional; pure helpers used only by this component. |
| `consts.ts` | Optional; constants used only by this component. |

- Import components by folder: `import HomePage from "src/pages/Home"`, `import ProductCard from "src/components/ProductCard"`.
- Do not put types, constants, or utils inside `index.tsx` when a dedicated file exists.
- Do not write any inline styles — use `styles.module.css` or `src/styles/`.

### Forbidden Patterns

- **NO** inline styles (`style={{}}`) — use `styles.module.css` or `src/styles/`; do not write any inline styles.
- **NO** type definitions inside `index.tsx` when the component has a `types.ts` or type belongs in `src/types/`.
- **NO** constants inside `index.tsx` when the component has `consts.ts` or constant belongs in `src/consts/`.
- **NO** API logic inside components — call functions from `src/api/`.
- **NO** mixed concerns in a single file.

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
    Home/index.tsx                   # Landing page
    Catalog/index.tsx                # Women / Men collections
    Product/index.tsx                # Single product detail
    About/index.tsx                  # About the brand
    Contact/index.tsx                # Contact form
    Admin/
      index.tsx                      # Admin sidebar layout
      Products/
        AdminProductsListPage.tsx    # (or index.tsx) Product table + CRUD
        AdminProductEditPage.tsx     # Edit product form
      Orders/
        AdminOrdersPage.tsx          # Orders table
    NotFound/index.tsx               # 404 page
  components/
    ProductCard/
      index.tsx                      # Component entry
      styles.module.css              # Component styles
      types.ts                       # Optional: props & local types
      utils.ts                       # Optional: local helpers
      consts.ts                      # Optional: local constants
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
| `/admin/products/new` | New product |
| `/admin/products/:id` | View product |
| `/admin/products/:id/edit` | Edit product |
| `/admin/collections` | Collections list |
| `/admin/collections/new` | New collection |
| `/admin/collections/:id/edit` | Edit collection |
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

## Changing the app font

The app uses a single font family for the whole UI. To change it:

1. **Edit** `src/styles/global.css`: update the `--app-font-family` variable in the `:root` block (e.g. `--app-font-family: "Your Font", sans-serif;`).
2. **If using a web font** (e.g. Google Fonts): add the corresponding `<link>` in `index.html` so the font loads. Ant Design and all other components will pick up the font from this one variable.
