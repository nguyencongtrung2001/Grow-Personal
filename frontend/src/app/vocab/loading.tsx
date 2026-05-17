import { Skeleton } from "@/components/ui/skeleton";

/**
 * Vocab Route — Loading Skeleton.
 * Mirrors the VocabControlPanel (action bar) + VocabDeckGrid (card grid) layout.
 */
export default function VocabLoading() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-8" aria-busy="true" aria-label="Loading vocabulary">

      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-56 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
      </header>

      {/* Control Panel — Action Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-3 w-48 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Deck Grid — Card Grid */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
                <Skeleton className="h-6 w-6 rounded" />
              </div>
              {/* Progress bar */}
              <Skeleton className="h-2 w-full rounded-full" />
              {/* Stats row */}
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
              {/* Action button */}
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
