"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

export default function MiniDatePicker() {
  const days = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <Card className="border-slate-200 shadow-sm p-4 bg-white rounded-xl">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-500">
            <CalendarDays className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-800 font-sans">Chọn ngày đích cho Task</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400 mr-1 font-bold">Tháng 10, 2023</span>
            <Button variant="ghost" size="icon" className="w-6 h-6 p-0 text-slate-400 hover:bg-slate-100">
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="w-6 h-6 p-0 text-slate-400 hover:bg-slate-100">
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-mono">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
            <div key={d} className="text-[10px] font-bold text-slate-400 py-1">{d}</div>
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`prev-${i}`} className="text-xs p-1 text-slate-300 opacity-40">{25 + i}</div>
          ))}
          {days.map((d) => {
            const isTarget = d === 12;
            return (
              <div
                key={d}
                className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                  isTarget 
                    ? "bg-emerald-500 text-white font-bold shadow-sm shadow-emerald-500/30" 
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}