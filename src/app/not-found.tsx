import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60dvh] flex-col items-start justify-center py-20">
      <p className="label text-ink-mute">404</p>
      <h1 className="display-lg mt-4">This page has sold out.</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        We couldn&apos;t find what you were looking for. Everything that&apos;s left is in the closing down sale.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/collections/abiti" className="btn btn-primary">
          Shop now
          <span className="btn-icon">
            <ArrowRight size={14} weight="bold" />
          </span>
        </Link>
        <Link href="/" className="btn btn-outline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
