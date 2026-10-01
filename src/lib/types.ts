export type ProductImage = {
  id?: number;
  src: string;
  width: number;
  height: number;
  alt: string | null;
  variantIds?: number[];
};

export type ProductVariant = {
  id: number;
  title: string;
  options: string[];
  price: string;
  compareAtPrice: string | null;
  available: boolean;
  sku: string | null;
  featuredImageId: number | null;
};

export type ProductOption = {
  name: string;
  values: string[];
};

/** Full product record, one file per handle in data/products. */
export type Product = {
  id: number;
  handle: string;
  title: string;
  vendor: string;
  type: string;
  tags: string[];
  createdAt: string;
  publishedAt: string;
  bodyHtml: string;
  options: ProductOption[];
  variants: ProductVariant[];
  images: ProductImage[];
};

/** Light catalogue row used by grids, search and related products. */
export type ProductCard = {
  id: number;
  handle: string;
  title: string;
  type: string;
  tags: string[];
  createdAt: string;
  price: string;
  compareAtPrice: string | null;
  available: boolean;
  image: ProductImage | null;
  hoverImage: ProductImage | null;
  colors: string[];
  sizes: string[];
};

export type Collection = {
  id: number;
  handle: string;
  title: string;
  description: string;
  updatedAt: string;
  productHandles: string[];
};

export type CartLine = {
  variantId: number;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: string;
  compareAtPrice: string | null;
  image: ProductImage | null;
  quantity: number;
};
