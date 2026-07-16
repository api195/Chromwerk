import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Felgen – Coming Soon",
  description:
    "Der Chromwerk Felgen-Shop mit hochglanzverdichteten Felgensätzen erscheint in Kürze.",
  robots: { index: false, follow: true },
};

/**
 * Felgen-Shop – Coming Soon (bewusst nicht in der Navigation verlinkt).
 * Zum Launch: diese Seite wieder durch den Shop ersetzen
 * (WheelShop aus @/components/shop/WheelShop) und den Nav-Eintrag
 * in src/data/site.ts ergänzen.
 */
export default function FelgenPage() {
  return (
    <ComingSoon
      eyebrow="Chromwerk Köln"
      title="Felgen"
      description="Der Verkauf hochglanzverdichteter Felgensätze startet in Kürze. Du möchtest deine eigenen Felgen veredeln lassen? Buch jetzt deinen Termin."
    />
  );
}
