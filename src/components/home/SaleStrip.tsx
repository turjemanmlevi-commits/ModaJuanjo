import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Closing down sale",
  "Everything 50% off",
  "Free tracked shipping to Australia and New Zealand",
  "30-day returns",
  "Final sizes only, no restocks",
  "When they're gone, they're gone for good",
];

export function SaleStrip() {
  return (
    <div className="border-y border-line bg-beige py-3">
      <Marquee items={ITEMS} />
    </div>
  );
}
