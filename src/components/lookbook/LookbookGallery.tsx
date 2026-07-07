"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LookbookCard } from "@/components/cards/LookbookCard";
import {
  lookbookProjects,
  lookbookVehicles,
  lookbookWheelTypes,
  lookbookSizes,
  lookbookConditions,
  lookbookFinishes,
} from "@/data/lookbook";
import { cn } from "@/lib/utils";

/**
 * LookbookGallery – Galerie mit Filtern.
 * Filtert clientseitig nach Fahrzeugmarke, Felgentyp, Zollgröße,
 * Zustand und Finish. Neue Projekte in /data/lookbook.ts erscheinen
 * automatisch inklusive Filteroptionen.
 */
type Filters = {
  vehicle: string;
  wheelType: string;
  size: string;
  condition: string;
  finish: string;
};

const initial: Filters = {
  vehicle: "",
  wheelType: "",
  size: "",
  condition: "",
  finish: "",
};

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: (string | number)[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-chrome-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={value === ""} onClick={() => onChange("")}>
          Alle
        </FilterChip>
        {options.map((o) => (
          <FilterChip
            key={o}
            active={value === String(o)}
            onClick={() => onChange(String(o))}
          >
            {typeof o === "number" ? `${o}″` : o}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-all",
        active
          ? "border-crimson bg-crimson text-white"
          : "border-white/10 text-chrome-400 hover:border-chrome-400/40 hover:text-chrome-100"
      )}
    >
      {children}
    </button>
  );
}

export function LookbookGallery() {
  const [filters, setFilters] = useState<Filters>(initial);

  const set = (key: keyof Filters) => (v: string) =>
    setFilters((f) => ({ ...f, [key]: v }));

  const results = useMemo(() => {
    return lookbookProjects.filter((p) => {
      if (filters.vehicle && p.vehicle !== filters.vehicle) return false;
      if (filters.wheelType && p.wheelType !== filters.wheelType) return false;
      if (filters.size && String(p.size) !== filters.size) return false;
      if (filters.condition && p.condition !== filters.condition) return false;
      if (filters.finish && p.finish !== filters.finish) return false;
      return true;
    });
  }, [filters]);

  const anyActive = Object.values(filters).some(Boolean);

  return (
    <div>
      {/* Filterleiste */}
      <div className="mb-10 space-y-5 rounded-2xl border border-white/10 bg-ink-800/40 p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FilterGroup
            label="Fahrzeugmarke"
            value={filters.vehicle}
            options={lookbookVehicles}
            onChange={set("vehicle")}
          />
          <FilterGroup
            label="Felgentyp"
            value={filters.wheelType}
            options={lookbookWheelTypes}
            onChange={set("wheelType")}
          />
          <FilterGroup
            label="Zollgröße"
            value={filters.size}
            options={lookbookSizes}
            onChange={set("size")}
          />
          <FilterGroup
            label="Zustand"
            value={filters.condition}
            options={lookbookConditions}
            onChange={set("condition")}
          />
          <FilterGroup
            label="Finish"
            value={filters.finish}
            options={lookbookFinishes}
            onChange={set("finish")}
          />
        </div>
        {anyActive && (
          <button
            onClick={() => setFilters(initial)}
            className="text-xs uppercase tracking-widest text-chrome-500 underline-offset-4 hover:text-crimson hover:underline"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Ergebnisse */}
      <p className="mb-6 text-sm text-chrome-500">
        {results.length}{" "}
        {results.length === 1 ? "Projekt" : "Projekte"} gefunden
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-chrome-400">
          Keine Projekte für diese Filter. Setze die Filter zurück.
        </div>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <LookbookCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
