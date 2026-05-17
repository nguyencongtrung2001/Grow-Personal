"use client";
import React from "react";
import { Card } from "@/components/ui/card";

export default function WeeklyHeatmap() {
  const weeklyData = [
    { label: "T2", height: "h-[30%]", active: false, bg: "bg-emerald-100 hover:bg-emerald-200" },
    { label: "T3", height: "h-[60%]", active: false, bg: "bg-emerald-200 hover:bg-emerald-300" },
    { label: "T4", height: "h-[90%]", active: false, bg: "bg-emerald-500 hover:bg-emerald-600" },
    { label: "T5", height: "h-[70%]", active: false, bg: "bg-emerald-300 hover:bg-emerald-400" },
    { label: "T6", height: "h-[10%]", active: true, bg: "bg-slate-100 border border-slate-200" },
    { label: "T7", height: "h-[0%]", active: false, bg: "bg-slate-100 border border-slate-200" },
    { label: "CN", height: "h-[0%]", active: false, bg: "bg-slate-100 border border-slate-200" },
  ];

  return (
    <Card className="border-slate-200 shadow-sm p-6 bg-white rounded-xl">
      <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider font-mono">
        Mức Độ Hoàn Thành Tuần (Heatmap)
      </h3>
      <div className="flex justify-between items-end h-24 gap-2">
        {weeklyData.map((day, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-2 group cursor-pointer">
            <div className={`w-full rounded-t-sm transition-all ${day.height} ${day.bg}`} />
            <span className={`text-xs font-mono font-bold ${day.active ? "text-emerald-500" : "text-slate-400"}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}