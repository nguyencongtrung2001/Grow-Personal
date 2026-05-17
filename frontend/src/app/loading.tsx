import { Skeleton } from "@/components/ui/skeleton";

/**
 * Global Loading Skeleton — App Router segment boundary.
 * Mirrors the exact spatial structure of the dashboard viewport to achieve CLS = 0.
 * Rendered automatically by Next.js when a page segment is suspended.
 */
export default function Loading() {
  return (
    <div className="w-full space-y-6" aria-busy="true" aria-label="Loading content">

      {/* ── Page Header Skeleton ──────────────────────────────────── */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-72 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>

      {/* ── KPI Stats Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        ))}
      </div>

      {/* ── Main Content Grid ─────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Left Column — Large Card (e.g., BigCalendar / Chart) */}
        <div className="w-full lg:w-[62%] rounded-xl border border-slate-200 bg-white p-5 shadow-sm h-[620px] flex flex-col gap-4">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-36 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>
          {/* Weekday labels row */}
          <div className="grid grid-cols-7 gap-px">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-6 rounded" />
            ))}
          </div>
          {/* Calendar cell grid */}
          <div className="grid grid-cols-7 gap-px flex-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="bg-slate-50 rounded p-1.5 space-y-1 min-h-[72px]">
                <Skeleton className="h-3 w-5 rounded" />
                {i % 5 === 0 && <Skeleton className="h-3.5 w-full rounded" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Stacked Widget Cards */}
        <div className="w-full lg:w-[38%] flex flex-col gap-4">
          {/* Mini date picker skeleton */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded" />
              <div className="flex gap-1">
                <Skeleton className="h-7 w-7 rounded" />
                <Skeleton className="h-7 w-7 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-full rounded-md" />
              ))}
            </div>
          </div>

          {/* Task form skeleton */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>

          {/* Agenda list skeleton */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <Skeleton className="h-5 w-32 rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-1 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-full rounded" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table / Analytics Footer Skeleton ────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36 rounded" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <div className="space-y-2">
          {/* Table header */}
          <div className="grid grid-cols-5 gap-3 pb-2 border-b border-slate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 rounded" />
            ))}
          </div>
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-3 py-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton
                  key={j}
                  className="h-4 rounded"
                  style={{ opacity: 1 - i * 0.12 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
