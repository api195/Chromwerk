"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WheelCard } from "@/components/cards/WheelCard";
import { wheels, wheelBrands, wheelSizes, wheelConditions } from "@/data/wheels";
import { cn } from "@/lib/utils";

/** Felgen-Shop mit Marken-, Größen- und Zustandsfilter + Sortierung. */
export function WheelShop() {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState<"neu" | "preis-auf" | "preis-ab">("neu");

  const results = useMemo(() => {
    let list = wheels.filter((w) => {
      if (brand && w.brand !== brand) return false;
      if (size && String(w.size) !== size) return false;
      if (condition && w.condition !== condition) return false;
      return true;
    });
    if (sort === "preis-auf") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "preis-ab") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [brand, size, condition, sort]);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-all",
      active
        ? "border-crimson bg-crimson text-white"
        : "border-white/10 text-chrome-400 hover:border-chrome-400/40 hover:text-chrome-100"
    );

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-ink-800/40 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-chrome-500">
              Marke
            </p>
            <div className="flex flex-wrap gap-2">
              <button className={chip(brand === "")} onClick={() => setBrand("")}>
                Alle
              </button>
              {wheelBrands.map((b) => (
                <button key={b} className={chip(brand === b)} onClick={() => setBrand(b)}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-chrome-500">
                Zollgröße
              </p>
              <div className="flex flex-wrap gap-2">
                <button className={chip(size === "")} onClick={() => setSize("")}>
                  Alle
                </button>
                {wheelSizes.map((s) => (
                  <button key={s} className={chip(size === String(s))} onClick={() => setSize(String(s))}>
                    {s}″
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-chrome-500">
                Zustand
              </p>
              <div className="flex flex-wrap gap-2">
                <button className={chip(condition === "")} onClick={() => setCondition("")}>
                  Alle
                </button>
                {wheelConditions.map((c) => (
                  <button key={c} className={chip(condition === c)} onClick={() => setCondition(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sortierung */}
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-chrome-500">
            Sortieren
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-chrome-200 focus:border-crimson focus:outline-none"
          >
            <option value="neu">Empfohlen</option>
            <option value="preis-auf">Preis aufsteigend</option>
            <option value="preis-ab">Preis absteigend</option>
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-chrome-500">
        {results.length} {results.length === 1 ? "Felgensatz" : "Felgensätze"}
      </p>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((w) => (
            <motion.div
              key={w.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <WheelCard wheel={w} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
