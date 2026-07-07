"use client";

import { SmartImage as Image } from "@/components/ui/SmartImage";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

/**
 * Warenkorb-Drawer – gleitet von rechts ein.
 * Der "Zur Kasse"-Button ist ein Platzhalter: Hier später Checkout /
 * Payment (z. B. Stripe Checkout) anbinden.
 */
export function CartDrawer() {
  const { items, isOpen, setOpen, remove, setQty, total, count, clear } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-900 shadow-chrome"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Warenkorb"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                Warenkorb <span className="text-crimson">({count})</span>
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Warenkorb schließen"
                className="rounded-full p-2 text-chrome-300 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-chrome-400">
                  <div className="mb-4 rounded-full border border-white/10 p-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                    </svg>
                  </div>
                  <p>Dein Warenkorb ist noch leer.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-xl border border-white/10 bg-ink-800 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-700">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium text-chrome-100">{item.name}</p>
                        <p className="text-xs text-chrome-400">{item.meta}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQty(item.id, item.quantity - 1)}
                              className="h-6 w-6 rounded border border-white/10 text-chrome-200 hover:bg-white/10"
                              aria-label="Menge verringern"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm text-chrome-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => setQty(item.id, item.quantity + 1)}
                              className="h-6 w-6 rounded border border-white/10 text-chrome-200 hover:bg-white/10"
                              aria-label="Menge erhöhen"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-chrome-100">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        aria-label="Artikel entfernen"
                        className="self-start text-chrome-500 transition hover:text-crimson"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm uppercase tracking-widest text-chrome-400">
                    Zwischensumme
                  </span>
                  <span className="font-display text-xl font-semibold text-chrome-100">
                    {formatPrice(total)}
                  </span>
                </div>
                {/* TODO: Checkout/Payment-Backend anbinden (z. B. Stripe) */}
                <Button variant="primary" size="lg" className="w-full" onClick={() => alert("Checkout folgt – hier Payment-Backend anbinden.")}>
                  Zur Kasse
                </Button>
                <button
                  onClick={clear}
                  className="mt-3 w-full text-center text-xs uppercase tracking-widest text-chrome-500 hover:text-chrome-300"
                >
                  Warenkorb leeren
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
