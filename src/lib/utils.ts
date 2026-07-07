import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-Klassen sicher zusammenführen (Konflikte werden aufgelöst). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Preis im deutschen Format, z. B. 1.890,00 € */
export function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
