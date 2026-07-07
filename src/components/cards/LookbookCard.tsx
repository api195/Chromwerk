import Image from "next/image";
import Link from "next/link";
import type { LookbookProject } from "@/types";

export function LookbookCard({ project }: { project: LookbookProject }) {
  return (
    <Link
      href={`/lookbook/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 transition-all duration-500 hover:border-chrome-400/40 hover:shadow-chrome"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-200 backdrop-blur">
            {project.size}″
          </span>
          <span className="rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-200 backdrop-blur">
            {project.wheelType}
          </span>
        </div>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-crimson/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
          Vorher / Nachher
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-widest text-crimson">
          {project.vehicle} · {project.brand}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-chrome-400">
          {project.summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-chrome-300 transition-colors group-hover:text-white">
          Projekt ansehen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
