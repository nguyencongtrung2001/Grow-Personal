import React, { Suspense } from "react";
import GreetingBanner from "@/components/dashboard/GreetingBanner";
import TaskMatrix from "@/components/dashboard/TaskMatrix";
import VocabEngine from "@/components/dashboard/VocabEngine";
import FinancePots from "@/components/dashboard/FinancePots";
import ChallengeTracker from "@/components/dashboard/ChallengeTracker";
import {
  GreetingBannerSkeleton,
  FinancePotsSkeleton,
  VocabEngineSkeleton,
  ChallengeTrackerSkeleton,
  TaskMatrixSkeleton,
} from "@/components/ui/card-skeletons";

/**
 * Dashboard Home — Server Component with granular Suspense streaming.
 *
 * Architecture:
 * ┌───────────────────────────────────────────────────┐
 * │  <Suspense> GreetingBanner (FCP — streams first)  │
 * ├──────────────────────┬────────────────────────────┤
 * │ <Suspense>           │ <Suspense>                 │
 * │ FinancePots (7 cols) │ VocabEngine (5 cols)        │
 * ├──────────────────────┼────────────────────────────┤
 * │ <Suspense>           │ <Suspense>                 │
 * │ ChallengeTracker     │ TaskMatrix                  │
 * └──────────────────────┴────────────────────────────┘
 *
 * Each widget is wrapped in its own <Suspense> boundary so it streams
 * independently as its data resolves. The banner streams first (lightweight),
 * then the heavier data cards progressively fill in without blocking each other.
 */
export default function Home() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner chào mừng — lightest widget, streams first for fast FCP */}
      <Suspense fallback={<GreetingBannerSkeleton />}>
        <GreetingBanner />
      </Suspense>

      {/* Grid Dashboard chính — each widget streams independently */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Row 1: Hũ tài chính (7 cols) + Không gian từ vựng (5 cols) */}
        <Suspense fallback={<FinancePotsSkeleton />}>
          <FinancePots />
        </Suspense>
        <Suspense fallback={<VocabEngineSkeleton />}>
          <VocabEngine />
        </Suspense>

        {/* Row 2: Thử thách bản thân (7 cols) + Nhiệm vụ trọng tâm (5 cols) */}
        <Suspense fallback={<ChallengeTrackerSkeleton />}>
          <ChallengeTracker />
        </Suspense>
        <Suspense fallback={<TaskMatrixSkeleton />}>
          <TaskMatrix />
        </Suspense>
      </div>
    </div>
  );
}
