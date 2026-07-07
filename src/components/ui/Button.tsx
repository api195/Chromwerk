import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "chrome" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-display font-medium uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson/70 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Signal-Button (Chromwerk-Rot)
  primary:
    "bg-crimson text-white shadow-glow hover:bg-crimson-bright hover:shadow-[0_0_50px_-8px_rgba(255,36,54,0.7)] active:scale-[0.98]",
  // Chrom-Optik
  chrome:
    "text-ink-950 bg-gradient-to-b from-white via-chrome-200 to-chrome-400 shadow-chrome hover:from-white hover:to-chrome-300 active:scale-[0.98]",
  // Dezent, dunkel
  ghost:
    "text-chrome-100 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-[0.98]",
  // Umriss
  outline:
    "text-chrome-100 border border-chrome-400/40 hover:border-chrome-200 hover:bg-white/5 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "text-[11px] px-4 py-2",
  md: "text-xs px-6 py-3",
  lg: "text-sm px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
