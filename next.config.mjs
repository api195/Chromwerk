/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js / R3F ökosystem sauber transpilieren
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Erlaubt das Rendern der eigenen Platzhalter-SVGs über next/image.
    // (Nur eigene, vertrauenswürdige SVGs ablegen.)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Später hier echte Bild-CDNs / Domains eintragen:
    remotePatterns: [],
  },
  eslint: {
    // Der Produktions-Build soll nicht an Lint-Warnungen scheitern.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
