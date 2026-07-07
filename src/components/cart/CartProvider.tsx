"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartItem } from "@/types";

/**
 * Einfacher Warenkorb (Client-seitig, mit localStorage-Persistenz).
 * ------------------------------------------------------------------
 * Solide Grundlage für einen späteren echten Shop: Der State liegt
 * bereits strukturiert vor und kann an ein Checkout-/Payment-Backend
 * (z. B. Stripe) angeschlossen werden.
 */

type State = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: State };

const STORAGE_KEY = "chromwerk-cart";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: action.quantity ?? 1 }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Aus localStorage laden
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // In localStorage speichern
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items: state.items,
      count,
      total,
      isOpen,
      setOpen,
      add: (item, quantity) => {
        dispatch({ type: "ADD", item, quantity });
        setOpen(true);
      },
      remove: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart muss innerhalb von CartProvider genutzt werden");
  return ctx;
}
