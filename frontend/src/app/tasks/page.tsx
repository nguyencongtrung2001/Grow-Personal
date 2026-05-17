"use client";
import React from "react";
import BigCalendar from "@/components/tasks/BigCalendar";
import MiniDatePicker from "@/components/tasks/MiniDatePicker";
import TaskForm from "@/components/tasks/TaskForm";
import TodayAgenda from "@/components/tasks/TodayAgenda";
import PomodoroTimer from "@/components/tasks/PomodoroTimer";
import WeeklyHeatmap from "@/components/tasks/WeeklyHeatmap";
import ProductiveGarden from "@/components/tasks/ProductiveGarden";

export default function TasksPage() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      {/* Page Title Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lịch Trình & Nhiệm Vụ</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý thời gian và độ ưu tiên công việc với tinh thần tích cực.</p>
      </header>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column (55%) */}
        <section className="w-full lg:w-[55%] flex flex-col gap-6">
          <BigCalendar />
        </section>

        {/* Right Column (45%) */}
        <section className="w-full lg:w-[45%] flex flex-col gap-6">
          <MiniDatePicker />
          <TaskForm />
          <TodayAgenda />
          <PomodoroTimer />
        </section>
      </div>

      {/* Analytics & Gamification Footers */}
      <WeeklyHeatmap />
      <ProductiveGarden />
    </div>
  );
}