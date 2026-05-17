import React, { Suspense } from "react";
import BigCalendar from "@/components/tasks/BigCalendar";
import MiniDatePicker from "@/components/tasks/MiniDatePicker";
import TaskForm from "@/components/tasks/TaskForm";
import TodayAgenda from "@/components/tasks/TodayAgenda";
import WeeklyHeatmap from "@/components/tasks/WeeklyHeatmap";
import ProductiveGarden from "@/components/tasks/ProductiveGarden";
import {
  BigCalendarSkeleton,
  MiniDatePickerSkeleton,
  TaskFormSkeleton,
  TodayAgendaSkeleton,
  WeeklyHeatmapSkeleton,
  ProductiveGardenSkeleton,
} from "@/components/ui/card-skeletons";

/**
 * Tasks Page — Server Component with granular Suspense streaming.
 *
 * Architecture:
 * ┌──────────────────────────────────────────────────────────────┐
 * │  Header (static — renders immediately, no Suspense needed)   │
 * ├─────────────────────────────┬────────────────────────────────┤
 * │ <Suspense>                  │ <Suspense> MiniDatePicker      │
 * │ BigCalendar (62%)           │ <Suspense> TaskForm            │
 * │ h-[620px] locked            │ <Suspense> TodayAgenda         │
 * ├─────────────────────────────┴────────────────────────────────┤
 * │ <Suspense> WeeklyHeatmap                                     │
 * │ <Suspense> ProductiveGarden                                  │
 * └──────────────────────────────────────────────────────────────┘
 *
 * The static header paints instantly (FCP). Calendar streams next as the
 * heaviest component. Right-column widgets stream independently in parallel.
 */
export default function TasksPage() {
  return (
    <div className="w-full space-y-6">
      {/* Page Title Header — static content, renders instantly */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lịch Trình & Nhiệm Vụ</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý thời gian và độ ưu tiên công việc với tinh thần tích cực.</p>
      </header>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left Column (62%) — BigCalendar */}
        <section className="w-full lg:w-[62%] flex flex-col gap-6">
          <Suspense fallback={<BigCalendarSkeleton />}>
            <BigCalendar />
          </Suspense>
        </section>

        {/* Right Column (38%) — MiniDatePicker, TaskForm, TodayAgenda */}
        <section className="w-full lg:w-[38%] flex flex-col gap-6">
          <Suspense fallback={<MiniDatePickerSkeleton />}>
            <MiniDatePicker />
          </Suspense>
          <Suspense fallback={<TaskFormSkeleton />}>
            <TaskForm />
          </Suspense>
          <Suspense fallback={<TodayAgendaSkeleton />}>
            <TodayAgenda />
          </Suspense>
        </section>
      </div>

      {/* Analytics & Gamification Footers */}
      <Suspense fallback={<WeeklyHeatmapSkeleton />}>
        <WeeklyHeatmap />
      </Suspense>
      <Suspense fallback={<ProductiveGardenSkeleton />}>
        <ProductiveGarden />
      </Suspense>
    </div>
  );
}