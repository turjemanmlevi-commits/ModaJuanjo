/**
 * Site navigation. Mirrors the live store menu one-to-one
 * (labels, order and destinations).
 */
export type MenuChild = { label: string; href: string };
export type MenuItem = { label: string; href: string; children?: MenuChild[] };

export const MAIN_MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/pages/nostra-storia",
    children: [
      { label: "Contact", href: "/pages/contact" },
      { label: "Our Story", href: "/pages/nostra-storia" },
      { label: "Work With Us", href: "/pages/lavora-con-noi" },
    ],
  },
  {
    label: "Dresses",
    href: "/collections/abiti",
    children: [
      { label: "All Dresses", href: "/collections/abiti" },
      { label: "Beach Dresses", href: "/collections/abiti-da-spiaggia" },
      { label: "Relaxed Dresses", href: "/collections/abiti-ampi" },
      { label: "Everyday Dresses", href: "/collections/abiti-casual" },
      { label: "Short Dresses", href: "/collections/abiti-corti" },
    ],
  },
  {
    label: "Jumpsuits",
    href: "/collections/salopette",
    children: [
      { label: "All Jumpsuits", href: "/collections/salopette" },
      { label: "Button-Front Jumpsuits", href: "/collections/salopette-abbottonata" },
      { label: "Denim Sets", href: "/collections/set-in-denim" },
    ],
  },
  {
    label: "Blouses & Tops",
    href: "/collections/bluse-top",
    children: [
      { label: "Spring Blouses", href: "/collections/bluse-primaverili" },
      { label: "Printed Blouses", href: "/collections/bluse-stampate" },
      { label: "Longline Blouses", href: "/collections/bluse-lunghe" },
      { label: "Lightweight Blouses", href: "/collections/bluse-estive" },
      { label: "Floral Tops", href: "/collections/top-floreali" },
    ],
  },
  { label: "Cardigans", href: "/collections/cardigan" },
  { label: "Trousers", href: "/collections/pantaloni" },
  { label: "Skirts", href: "/collections/gonna" },
  { label: "Swimwear", href: "/collections/costumi" },
  { label: "Bags", href: "/collections/borse" },
  {
    label: "Shoes",
    href: "/collections/scarpe",
    children: [
      { label: "Loafers", href: "/collections/mocassini" },
      { label: "Sneakers", href: "/collections/sneakers" },
      { label: "Sandals", href: "/collections/sandali" },
      { label: "Heels", href: "/collections/tacchi" },
      { label: "Mary Janes", href: "/collections/scarpe-mary-jane" },
    ],
  },
  { label: "Sunglasses", href: "/collections/occhiali-da-sole" },
  { label: "Track Your Order", href: "/pages/track-your-order" },
];

/** Category items only (everything that is a shop destination). */
export const SHOP_MENU = MAIN_MENU.filter(
  (m) => m.href.startsWith("/collections/"),
);

export const FOOTER_LINKS = {
  information: [
    { label: "Privacy policy", href: "/policies/privacy-policy" },
    { label: "Refund policy", href: "/policies/refund-policy" },
    { label: "Shipping policy", href: "/policies/shipping-policy" },
    { label: "Terms of service", href: "/policies/terms-of-service" },
  ],
  company: [
    { label: "Our Story", href: "/pages/nostra-storia" },
    { label: "Work With Us", href: "/pages/lavora-con-noi" },
    { label: "Contact", href: "/pages/contact" },
  ],
};

export const STORE = {
  name: "MODESSAE",
  domain: "https://modessae.com",
  email: "info@modessae.com",
  loginUrl: "https://modessae.com/account/login",
  checkoutBase: "https://modessae.com/cart/",
};
