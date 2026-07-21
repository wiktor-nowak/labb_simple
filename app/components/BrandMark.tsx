import Image from "next/image";

const SOURCES = {
  small: "/images/LABB_Alpha_Small.png",
  medium: "/images/LABB_Alpha_Medium.png",
} as const;

type BrandMarkProps = {
  size?: keyof typeof SOURCES;
  pixels: number;
  className?: string;
};

/**
 * Real LABB cube monogram artwork (public/images). Note: the source PNGs
 * have an opaque white/halftone-gray face baked into the artwork itself,
 * not a transparent background — it will show against dark surfaces even
 * without a wrapper box.
 */
export default function BrandMark({
  size = "small",
  pixels,
  className,
}: BrandMarkProps) {
  return (
    <Image
      src={SOURCES[size]}
      alt="LABB Studio"
      width={pixels}
      height={pixels}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
