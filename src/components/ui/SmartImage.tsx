import Image, { type ImageProps } from "next/image";

/**
 * SmartImage – dünner Wrapper um next/image.
 * ------------------------------------------------------------------
 * Reicht SVG-Platzhalter am Bild-Optimizer vorbei (der SVGs nicht als
 * "gültiges Bild" akzeptiert). Sobald du echte Fotos (JPG/PNG/WebP)
 * einsetzt, greift die Next.js-Bildoptimierung automatisch wieder.
 *
 * Nutzung wie <Image> – einfach denselben Props-Satz.
 */
export function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isSvg = src.toLowerCase().endsWith(".svg");
  // alt wird über {...props} durchgereicht (Wrapper-Komponente):
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} unoptimized={props.unoptimized ?? isSvg} />;
}
