"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 transition-all duration-500 hover:border-chrome-400/40 hover:shadow-chrome">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-ink-700 to-ink-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-crimson px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-widest text-crimson">
          {product.tagline}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-chrome-400">
          {product.description}
        </p>

        <details className="mt-3 text-xs text-chrome-400">
          <summary className="cursor-pointer select-none text-chrome-300 hover:text-white">
            Anwendung
          </summary>
          <p className="mt-2 leading-relaxed">{product.usage}</p>
        </details>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-chrome-100">
              {formatPrice(product.price)}
            </p>
            <p className="text-[11px] text-chrome-500">{product.size}</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              add({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                meta: product.size,
                type: "product",
              })
            }
          >
            In den Warenkorb
          </Button>
        </div>
      </div>
    </article>
  );
}
