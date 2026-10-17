import Image from "next/image";

/** Existing APK artwork; the SVG paths are unchanged, with its safe-area padding cropped. */
export function BrandEmblem({ size = 28 }: { size?: number }) {
  return (
    <Image
      className="brand-emblem"
      src="/images/brand/socially-emblem.svg"
      alt=""
      width={size}
      height={size}
    />
  );
}

export function SociallyLogo({ size = 64, preload = false }: { size?: number; preload?: boolean }) {
  return (
    <Image
      className="socially-logo"
      src="/images/brand/socially-logo.webp"
      alt="Socially"
      width={size}
      height={size}
      sizes={`${size}px`}
      preload={preload}
    />
  );
}

export function SociallyWordmark() {
  return (
    <a href="#top" className="pluto-brand" aria-label="Socially home">
      <BrandEmblem />
      socially
    </a>
  );
}
