import { Skeleton } from "@/components/ui/skeleton";

/**
 * Reusable skeleton fallbacks for Suspense boundaries.
 * Each skeleton mirrors the exact spatial structure of its real component
 * to achieve CLS = 0 when streaming completes.
 */

// ─── Dashboard Skeletons ────────────────────────────────────────────

/** Skeleton for GreetingBanner — full-width banner with avatar and date badge */
export function GreetingBannerSkeleton() {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-7 w-80 rounded-md" />
        <Skeleton className="h-4 w-96 rounded" />
      </div>
      <Skeleton className="h-9 w-36 rounded-xl hidden sm:block" />
    </div>
  );
}

/** Skeleton for FinancePots — 7-col card with progress bars and footer stats */
export function FinancePotsSkeleton() {
  return (
    <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-52 rounded" />
        </div>
        <Skeleton className="h-4 w-14 rounded" />
      </div>
      <div className="p-6 pt-4 space-y-4 flex-1">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-36 rounded" />
          <Skeleton className="h-8 w-44 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-36 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 p-6 pt-3 flex justify-between items-center">
        <Skeleton className="h-3 w-44 rounded" />
        <Skeleton className="h-5 w-28 rounded-full" />
      </div>
    </div>
  );
}

/** Skeleton for VocabEngine — 5-col card with deck folder and game mode buttons */
export function VocabEngineSkeleton() {
  return (
    <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-44 rounded" />
        </div>
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
      <div className="p-6 pt-4 space-y-3 flex-1">
        <Skeleton className="h-4 w-full rounded" />
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="space-y-1">
              <Skeleton className="h-3.5 w-32 rounded" />
              <Skeleton className="h-2.5 w-40 rounded" />
            </div>
          </div>
          <Skeleton className="h-4 w-4 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 border-t border-slate-100 p-6 pt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/** Skeleton for ChallengeTracker — 7-col card with progress and day chips */
export function ChallengeTrackerSkeleton() {
  return (
    <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-64 rounded" />
        </div>
        <Skeleton className="h-6 w-28 rounded-xl" />
      </div>
      <div className="p-6 pt-4 space-y-4">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Skeleton className="h-4 w-56 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
            <Skeleton className="h-9 w-32 rounded-xl" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded" />
            ))}
          </div>
        </div>
        <Skeleton className="h-3.5 w-full rounded" />
      </div>
    </div>
  );
}

/** Skeleton for TaskMatrix — 5-col card with checkboxes and add button */
export function TaskMatrixSkeleton() {
  return (
    <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-48 rounded" />
        </div>
        <Skeleton className="h-5 w-28 rounded-full" />
      </div>
      <div className="p-6 pt-4 space-y-3 flex-1">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <Skeleton className="h-4 w-4 rounded mt-0.5 shrink-0" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-3.5 w-44 rounded" />
              <Skeleton className="h-2.5 w-28 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 pt-0">
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

// ─── Tasks Page Skeletons ───────────────────────────────────────────

/** Skeleton for BigCalendar — calendar card with h-[620px] height lock */
export function BigCalendarSkeleton() {
  return (
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
  );
}

/** Skeleton for MiniDatePicker */
export function MiniDatePickerSkeleton() {
  return (
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
  );
}

/** Skeleton for TaskForm */
export function TaskFormSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <Skeleton className="h-5 w-28 rounded" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

/** Skeleton for TodayAgenda */
export function TodayAgendaSkeleton() {
  return (
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
  );
}

/** Skeleton for WeeklyHeatmap */
export function WeeklyHeatmapSkeleton() {
  return (
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
  );
}

/** Skeleton for ProductiveGarden */
export function ProductiveGardenSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <Skeleton className="h-5 w-36 rounded" />
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
