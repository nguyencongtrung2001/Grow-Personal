"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarCell {
  day: number;
  isCurrentMonth: boolean;
  events?: { label: string; style: string }[];
}

export default function BigCalendar() {
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  
  // Mock data mô phỏng cấu trúc lưới từ thiết kế mẫu
  const cells: CalendarCell[] = [
    { day: 25, isCurrentMonth: false }, { day: 26, isCurrentMonth: false },
    { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false }, { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },   { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true, events: [{ label: "Tiếng Anh", style: "bg-emerald-50 text-emerald-700 border-emerald-200" }] },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true, events: [{ label: "Cá Nhân", style: "bg-indigo-50 text-indigo-700 border-indigo-200" }] },
    { day: 6, isCurrentMonth: true },   { day: 7, isCurrentMonth: true },   { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true, events: [{ label: "Tiếng Anh", style: "bg-emerald-50 text-emerald-700 border-emerald-200" }] },
    { day: 11, isCurrentMonth: true },
    { 
      day: 12, 
      isCurrentMonth: true, 
      events: [
        { label: "Tài Chính", style: "bg-rose-50 text-rose-700 border-rose-200" },
        { label: "Gym", style: "bg-indigo-50 text-indigo-700 border-indigo-200" }
      ] 
    },
    { day: 13, isCurrentMonth: true },  { day: 14, isCurrentMonth: true },  { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true, events: [{ label: "Tiếng Anh", style: "bg-emerald-50 text-emerald-700 border-emerald-200" }] },
    { day: 18, isCurrentMonth: true },  { day: 19, isCurrentMonth: true },  { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },  { day: 22, isCurrentMonth: true }
  ];

  return (
    <Card className="rounded-xl border-slate-200 shadow-sm p-5 flex flex-col bg-white h-[620px]">
      <CardHeader className="p-0 flex flex-row items-center justify-between mb-6 space-y-0">
        <CardTitle className="text-xl font-bold text-slate-900">Tháng 10, 2023</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 text-slate-500 rounded-lg">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 text-slate-500 rounded-lg">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200 flex-1">
          {weekdays.map((day) => (
            <div key={day} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 border-b border-slate-200">
              {day}
            </div>
          ))}
          {cells.map((cell, idx) => {
            const isToday = cell.day === 12 && cell.isCurrentMonth;
            return (
              <div 
                key={idx} 
                className={`bg-white min-h-[80px] p-2 border-b border-r border-slate-100 transition-all ${
                  !cell.isCurrentMonth ? "opacity-40" : ""
                } ${isToday ? "border-emerald-500 border-2 relative z-10" : ""}`}
              >
                <span className={`text-xs font-mono font-bold ${isToday ? "text-emerald-500" : "text-slate-800"}`}>
                  {cell.day}
                </span>
                <div className="mt-1 space-y-1">
                  {cell.events?.map((ev, eIdx) => (
                    <div key={eIdx} className={`text-[10px] font-sans font-semibold border rounded px-1.5 py-0.5 truncate ${ev.style}`}>
                      {ev.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}