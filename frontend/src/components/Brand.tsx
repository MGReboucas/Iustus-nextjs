import Image from "next/image";

type Props = { size?: number; className?: string; decorative?: boolean };

/** Marca única para site, checkout e portais; lettering e acento estão no SVG. */
export default function Brand({ size = 80, className = "", decorative = false }: Props) {
  return <Image src="/brand/iustus-logo.svg" width={size} height={size}
    className={`iustus-brand ${className}`} alt={decorative ? "" : "ÍUSTUS — Defesa Jurídica"}
    unoptimized draggable={false} />;
}
