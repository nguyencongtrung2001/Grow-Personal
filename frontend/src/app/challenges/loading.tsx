import { Skeleton } from "@/components/ui/skeleton";

/**
 * Challenges Route — Loading Skeleton.
 * Mirrors ChallengeHeader + ChallengeCard list layout.
 */
export default function ChallengesLoading() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto" aria-busy="true" aria-label="Loading challenges">

      {/* ChallengeHeader */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-56 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Challenge Cards */}
      <section className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
          >
            {/* Card header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-44 rounded" />
                  <Skeleton className="h-3 w-64 rounded" />
                </div>
              </div>
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            {/* Progress section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>

            {/* Milestone chips */}
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-8 w-24 rounded-lg" />
              ))}
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
