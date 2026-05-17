import { Skeleton } from "@/components/ui/skeleton";

/**
 * Finance Route — Loading Skeleton.
 * Mirrors the 12-col grid (8/4 split) with FinancePots and the income/expense summary.
 */
export default function FinanceLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading finance">

      {/* Header: Back button + Title + Action button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <div className="space-y-1.5">
            <Skeleton className="h-7 w-48 rounded-md" />
            <Skeleton className="h-3 w-64 rounded" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 rounded-xl" />
      </div>

      {/* Main Grid: 8/4 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left — Finance Pots Grid */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-3 w-12 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Income/Expense Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
