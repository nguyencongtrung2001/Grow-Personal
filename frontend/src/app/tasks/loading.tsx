import { Skeleton } from "@/components/ui/skeleton";

/**
 * Tasks Route — Loading Skeleton.
 * Mirrors the 62%/38% two-column layout with BigCalendar, MiniDatePicker,
 * TaskForm, TodayAgenda, and the analytics footer (WeeklyHeatmap + ProductiveGarden).
 */
export default function TasksLoading() {
  return (
    <div className="w-full space-y-6" aria-busy="true" aria-label="Loading tasks">

      {/* Page Header */}
      <header className="mb-8 space-y-2">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <Skeleton className="h-4 w-80 rounded-md" />
      </header>

      {/* Main 62/38 Grid */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Left — BigCalendar */}
        <section className="w-full lg:w-[62%] flex flex-col gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm h-[620px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-36 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-6 rounded" />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px flex-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="bg-slate-50/60 rounded p-1.5 space-y-1 min-h-[72px]">
                  <Skeleton className="h-3 w-5 rounded" />
                  {i % 7 === 2 && <Skeleton className="h-3.5 w-full rounded" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right — MiniDatePicker + TaskForm + TodayAgenda */}
        <section className="w-full lg:w-[38%] flex flex-col gap-6">
          {/* MiniDatePicker */}
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

          {/* TaskForm */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>

          {/* TodayAgenda */}
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
        </section>
      </div>

      {/* WeeklyHeatmap Skeleton */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <Skeleton className="h-5 w-40 rounded" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="space-y-1.5 text-center">
              <Skeleton className="h-3 w-6 mx-auto rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* ProductiveGarden Skeleton */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <Skeleton className="h-5 w-36 rounded" />
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
