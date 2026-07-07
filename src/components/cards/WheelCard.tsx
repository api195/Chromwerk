"use client";

import { SmartImage as Image } from "@/components/ui/SmartImage";
import type { Wheel } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, cn } from "@/lib/utils";

const availabilityStyle: Record<Wheel["availability"], string> = {
  Verfügbar: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Reserviert: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "Auf Anfrage": "text-chrome-300 border-white/20 bg-white/5",
};

export function WheelCard({ wheel }: { wheel: Wheel }) {
  const { add } = useCart();
  const soldOut = wheel.availability === "Reserviert";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 transition-all duration-500 hover:border-chrome-400/40 hover:shadow-chrome">
      {/* Bild */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
        <Image
          src={wheel.image}
          alt={`${wheel.brand} ${wheel.model} – ${wheel.finish}`}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-widest",
            availabilityStyle[wheel.availability]
          )}
        >
          {wheel.availability}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-200 backdrop-blur">
          {wheel.size}″
        </span>
      </div>

      {/* Inhalt */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
              {wheel.brand}
            </h3>
            <p className="text-sm text-chrome-400">{wheel.model}</p>
          </div>
          <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] uppercase tracking-widest text-chrome-300">
            {wheel.condition}
          </span>
        </div>

        {/* Technische Daten */}
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div className="flex justify-between border-b border-white/5 pb-1">
            <dt className="text-chrome-500">Lochkreis</dt>
            <dd className="text-chrome-200">{wheel.boltPattern}</dd>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1">
            <dt className="text-chrome-500">Zoll</dt>
            <dd className="text-chrome-200">{wheel.size}″</dd>
          </div>
          <div className="col-span-2 flex justify-between border-b border-white/5 pb-1">
            <dt className="text-chrome-500">Finish</dt>
            <dd className="text-right text-chrome-200">{wheel.finish}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-chrome-100">
              {formatPrice(wheel.price)}
            </p>
            <p className="text-[11px] text-chrome-500">{wheel.unit}</p>
          </div>
        </div>

        {/* Aktionen */}
        <div className="mt-5 flex gap-2">
          <Button
            variant="chrome"
            size="sm"
            className="flex-1"
            onClick={() =>
              add({
                id: wheel.id,
                name: `${wheel.brand} ${wheel.model}`,
                price: wheel.price,
                image: wheel.image,
                meta: `${wheel.size}″ · ${wheel.boltPattern} · ${wheel.finish}`,
                type: "wheel",
              })
            }
            disabled={soldOut}
          >
            {soldOut ? "Reserviert" : "Kaufen"}
          </Button>
          <Button href="/kontakt" variant="ghost" size="sm" className="flex-1">
            Anfragen
          </Button>
        </div>
      </div>
    </article>
  );
}
