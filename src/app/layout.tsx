import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { UIProvider } from "@/components/layout/UIProvider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { getAllCollections, getCollectionProducts } from "@/lib/catalog";
import type { MenuPreviews } from "@/components/layout/Header";

const tenor = localFont({
  src: "../../public/fonts/TenorSans-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-tenor",
  display: "swap",
});

const outfit = localFont({
  src: [
    { path: "../../public/fonts/Outfit-Variable-latin.woff2", weight: "100 900", style: "normal" },
    { path: "../../public/fonts/Outfit-Variable-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://modessae.com"),
  title: {
    default: "MODESSAE | Closing down sale, everything 50% off",
    template: "%s | MODESSAE",
  },
  description:
    "After 14 years, MODESSAE is closing. Every remaining dress, jumpsuit, blouse, bag and pair of shoes is 50% off with free tracked shipping to Australia and New Zealand.",
  openGraph: {
    siteName: "MODESSAE",
    type: "website",
    locale: "en_AU",
    images: [{ url: "/images/hero.jpg", width: 2000, height: 1493, alt: "Helen and Jess in the MODESSAE boutique" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#e8dcca",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const collections = getAllCollections();
  const previews: MenuPreviews = Object.fromEntries(
    collections.map((c) => [
      c.handle,
      {
        title: c.title,
        count: c.productHandles.length,
        products: getCollectionProducts(c.handle)
          .filter((p) => p.image)
          .slice(0, 3)
          .map((p) => ({
            handle: p.handle,
            title: p.title,
            src: p.image!.src,
            alt: p.image!.alt ?? p.title,
          })),
      },
    ]),
  );
  const searchCollections = collections
    .filter((c) => c.productHandles.length > 0)
    .map((c) => ({ handle: c.handle, title: c.title }));
  return (
    <html lang="en-AU" className={`${tenor.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
          style={{ zIndex: "var(--z-toast)" as unknown as number }}
        >
          Skip to content
        </a>
        <CartProvider>
          <UIProvider>
            <SmoothScroll />
            <AnnouncementBar />
            <Header previews={previews} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <SearchOverlay collections={searchCollections} />
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
