import { Skeleton } from "@/components/ui/skeleton";

/**
 * Dashboard Route — Loading Skeleton.
 * Mirrors the GreetingBanner + 12-col grid (7/5 split ×2) with
 * FinancePots, VocabEngine, ChallengeTracker, TaskMatrix.
 */
export default function DashboardLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">

      {/* GreetingBanner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-5">
        <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-72 rounded-md" />
          <Skeleton className="h-4 w-96 rounded" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl hidden sm:block" />
      </div>

      {/* Main 12-col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* FinancePots (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-7 w-20 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* VocabEngine (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-7 w-16 rounded-lg" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
                <Skeleton className="h-3 w-10 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* ChallengeTracker (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40 rounded" />
            <Skeleton className="h-7 w-20 rounded-lg" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-4 w-36 rounded" />
                  </div>
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* TaskMatrix (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-7 w-16 rounded-lg" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg">
                <Skeleton className="h-5 w-5 rounded shrink-0" />
                <Skeleton className="h-4 flex-1 rounded" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
