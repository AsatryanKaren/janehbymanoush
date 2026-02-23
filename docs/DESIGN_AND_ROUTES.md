# Design and routes (Figma-based)

Design reference: [Figma – Collection page](https://www.figma.com/design/wkiHDJeJbqPgMpQOqF1r2B/Untitled?node-id=23-203).

## Color palette (luxury earthy: dark browns, bronze, stone text)

All tokens are defined in `src/styles/global.css`.

### Main backgrounds
- **Page / content dark:** `#1d1715` — `var(--color-page)` / `var(--color-content-dark)`
- **Header:** `rgba(29, 23, 21, 0.8)` with blur — `var(--color-header)`
- **Footer:** `#161413` — `var(--color-footer)`

### Accents (bronze/copper)
- **Main bronze (prices, active links, badges):** `#bf7a5a` — `var(--color-accent)`
- **Muted gold (footer headings, icons):** `#8d734a` — `var(--color-accent-muted)`
- **Light bronze (e.g. “New Collection” badges):** `#c29a73` — `var(--color-accent-light)`

### Text (stone/taupe hierarchy)
- **Primary:** `#ffffff` — `var(--color-text-primary)`
- **Main headings:** `#f5f5f4` — `var(--color-text-heading)`
- **Product titles:** `#e7e5e4` — `var(--color-text-product)`
- **Body / descriptions:** `#a8a29e` — `var(--color-text-body)`
- **Section labels:** `#78716c` — `var(--color-text-label)`
- **Button text (dark on light):** `#181611` — `var(--color-button-on-light)`

### Borders / UI
- `#44403c` — `var(--color-border)`
- `#57534e` — `var(--color-border-muted)`
- `#292524` — `var(--color-border-subtle)`

## Routes that use the dark header and footer

All **public** routes under `AppLayout` use the dark header (semi-transparent + blur) and dark footer with the stone/bronze text hierarchy and accent for the active nav item.

| Route    | Path              | Description     |
|----------|-------------------|-----------------|
| Home     | `/`               | Home page       |
| Catalog  | `/catalog`        | Full catalog    |
| Women    | `/women`          | Women's collection |
| Men      | `/men`            | Men's collection   |
| Product  | `/products/:slug` | Product detail  |
| About    | `/about`          | About us        |
| Contact  | `/contact`        | Contact         |

Admin routes (`/admin/*`) use `AdminLayout` and their own styling.

## Content area: light vs dark

- **Light content** — main area background `#f5f5f4`. Used for:
  - Home (`/`), About (`/about`), Contact (`/contact`), Product (`/products/:slug`), Not found.

- **Dark content** — main area `var(--color-page)` (#1d1715) with stone/taupe text. Used for:
  - Catalog (`/catalog`), Women (`/women`), Men (`/men`), and any future catalog sub-routes.

Content background is set in `src/app/layout/index.tsx` via `isCatalogRoute`.
