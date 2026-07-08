import type { Wheel } from "@/types";
import { site } from "@/data/site";

// Bis echte Produktfotos vorliegen, zeigen ausgewählte Felgen die Hero-Felge.
const HERO = site.heroImage;

/**
 * Felgen-Shop – Dummy-Daten.
 * ------------------------------------------------------------------
 * Ersetze `image` durch echte Produktfotos in /public/images/wheels/.
 * Preise, Verfügbarkeit und Zustand später via CMS/Datenbank pflegen.
 */
export const wheels: Wheel[] = [
  {
    id: "w-001",
    brand: "BBS",
    model: "CH-R",
    size: 20,
    boltPattern: "5x112",
    finish: "Hochglanzverdichtet Silber",
    condition: "Aufbereitet",
    price: 2490,
    unit: "Satz (4 Stk.)",
    availability: "Verfügbar",
    image: HERO,
    tags: ["Y-Speiche", "Audi", "VW"],
  },
  {
    id: "w-002",
    brand: "OZ Racing",
    model: "Superturismo",
    size: 19,
    boltPattern: "5x120",
    finish: "Chrom-Hochglanz",
    condition: "Wie neu",
    price: 1890,
    unit: "Satz (4 Stk.)",
    availability: "Verfügbar",
    image: "/images/wheels/wheel-placeholder.svg",
    tags: ["Mehrspeiche", "BMW"],
  },
  {
    id: "w-003",
    brand: "AMG",
    model: "Multispoke",
    size: 19,
    boltPattern: "5x112",
    finish: "Hochglanzverdichtet",
    condition: "Aufbereitet",
    price: 2190,
    unit: "Satz (4 Stk.)",
    availability: "Reserviert",
    image: "/images/wheels/wheel-placeholder.svg",
    tags: ["Multispoke", "Mercedes"],
  },
  {
    id: "w-004",
    brand: "Vossen",
    model: "HF-5",
    size: 21,
    boltPattern: "5x112",
    finish: "Poliert Chrom",
    condition: "Neu",
    price: 3290,
    unit: "Satz (4 Stk.)",
    availability: "Verfügbar",
    image: HERO,
    tags: ["Concave", "Audi", "Porsche"],
  },
  {
    id: "w-005",
    brand: "Rotiform",
    model: "BUC",
    size: 18,
    boltPattern: "5x114.3",
    finish: "Hochglanz Silber",
    condition: "Gebraucht",
    price: 1290,
    unit: "Satz (4 Stk.)",
    availability: "Verfügbar",
    image: "/images/wheels/wheel-placeholder.svg",
    tags: ["Mesh", "Honda", "Nissan"],
  },
  {
    id: "w-006",
    brand: "BBS",
    model: "LM",
    size: 18,
    boltPattern: "5x120",
    finish: "Chrom-Hochglanz",
    condition: "Aufbereitet",
    price: 2650,
    unit: "Satz (4 Stk.)",
    availability: "Auf Anfrage",
    image: "/images/wheels/wheel-placeholder.svg",
    tags: ["Mesh", "BMW", "Klassiker"],
  },
  {
    id: "w-007",
    brand: "HRE",
    model: "P101",
    size: 20,
    boltPattern: "5x112",
    finish: "Hochglanzverdichtet",
    condition: "Wie neu",
    price: 3890,
    unit: "Satz (4 Stk.)",
    availability: "Verfügbar",
    image: "/images/wheels/wheel-placeholder.svg",
    tags: ["Mehrspeiche", "Porsche"],
  },
  {
    id: "w-008",
    brand: "Ronal",
    model: "R10 Turbo",
    size: 17,
    boltPattern: "4x100",
    finish: "Poliert Chrom",
    condition: "Gebraucht",
    price: 990,
    unit: "Satz (4 Stk.)",
    availability: "Verfügbar",
    image: "/images/wheels/wheel-placeholder.svg",
    tags: ["Klassiker", "Golf", "Youngtimer"],
  },
];

// Filter-Optionen aus den vorhandenen Daten ableiten (auto-aktualisierend)
export const wheelBrands = Array.from(new Set(wheels.map((w) => w.brand))).sort();
export const wheelSizes = Array.from(new Set(wheels.map((w) => w.size))).sort(
  (a, b) => a - b
);
export const wheelConditions = Array.from(
  new Set(wheels.map((w) => w.condition))
);
