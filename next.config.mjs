/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js / R3F ökosystem sauber transpilieren
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimierte Bilder länger im CDN-Cache halten (weniger Neuberechnungen)
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
  // console.* aus dem Produktions-Bundle entfernen (Fehler/Warnungen bleiben)
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
};

export default nextConfig;
