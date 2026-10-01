import icons from "../../../data/payment-icons.json";

/** The store's own payment badges, exactly as Shopify renders them in the footer. */
export function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Accepted payment methods">
      {(icons as { name: string; svg: string }[]).map((icon) => (
        <li
          key={icon.name}
          className="h-6 w-[38px] [&>svg]:h-full [&>svg]:w-full"
          title={icon.name}
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      ))}
    </ul>
  );
}
