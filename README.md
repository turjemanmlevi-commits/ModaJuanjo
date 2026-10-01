# MODESSAE storefront redesign

Rediseño de [modessae.com](https://modessae.com) construido con la skill
`Leonxlnx/taste-skill` (instalada en `.claude/skills/`). Misma información,
mismos colores (`#e8dcca`, blanco, negro) y mismas fuentes (Tenor Sans y Outfit),
con una presentación y animaciones nuevas.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 (tokens de marca en `src/app/globals.css`)
- Motion (`motion/react`) para animaciones, Phosphor Icons
- Fuentes autoalojadas en `public/fonts`

## Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Datos

El catálogo vive en `data/` como JSON (una muestra de ~200 productos y las 29
colecciones de la tienda). Para volver a descargar el catálogo completo desde
Shopify:

```bash
node scripts/fetch-catalog.mjs
```

El carrito se guarda en `localStorage` y el botón "Check out" envía al checkout
real de Shopify mediante un permalink de carrito (`modessae.com/cart/ID:QTY`).

## Estructura

- `src/app` – rutas: portada, `collections/[handle]`, `products/[handle]`,
  `search`, `cart`, `pages/*`, `policies/[handle]`, 404, sitemap, robots
- `src/components` – layout (cabecera, mega-menú, buscador, carrito, footer),
  secciones de portada, producto, colección
- `src/content/site.ts` – todos los textos de la tienda
- `src/lib` – acceso al catálogo, menú, formato de precios, búsqueda
