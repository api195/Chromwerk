import { cn } from "@/lib/utils";

/** Wiederverwendbare, einheitlich gestylte Formular-Bausteine. */

const fieldBase =
  "w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-chrome-100 placeholder:text-chrome-600 transition focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/50";

export function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-medium uppercase tracking-widest text-chrome-400"
    >
      {children}
      {required && <span className="ml-1 text-crimson">*</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea {...props} className={cn(fieldBase, "min-h-32 resize-y", props.className)} />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(fieldBase, props.className)} />;
}

export function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
    </div>
  );
}
