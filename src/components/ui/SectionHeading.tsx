import type { ReactNode } from "react";

export function SectionHeading({
  title,
  aside,
  align = "left",
  className = "",
}: {
  title: ReactNode;
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      } ${className}`}
    >
      <h2 className="display-md uppercase">{title}</h2>
      {aside && <div className="text-sm text-ink-mute">{aside}</div>}
    </div>
  );
}
