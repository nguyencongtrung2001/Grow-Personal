"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Check, X as XIcon } from "lucide-react";
import { HistoryLog } from "@/types/challenge";

interface HeatmapProps {
  totalDays: number;
  completedDaysCount: number;
  startDate: string;
  logs: HistoryLog[];
}

export default function ChallengeHeatmap({ totalDays, startDate, logs }: HeatmapProps) {
  // Tính toán currentDay dựa trên startDate
  const currentDay = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(Math.max(1, diffDays), totalDays);
  }, [startDate, totalDays]);

  const [selectedDay, setSelectedDay] = useState<number | null>(currentDay);

  const selectedLog = useMemo(() => {
    if (!selectedDay) return null;
    return logs.find(l => l.day === selectedDay) || null;
  }, [selectedDay, logs]);

  const gridContainerClass = totalDays > 40 
    ? "p-4 bg-slate-50 border border-slate-100 rounded-xl max-h-[320px] overflow-y-auto"
    : "p-4 bg-slate-50 border border-slate-100 rounded-xl";

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF4500]" aria-hidden="true" />
            Ma Trận Kiểm Soát Thói Quen
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">Bấm vào từng ô ngày để xem nhanh trạng thái ghi chép lịch sử.</p>
        </div>
        
        {/* Chú giải màu sắc */}
        <div className="flex items-center gap-3 text-[11px] font-medium bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-400"></div> Hoàn thành
          </div>
          <div className="flex items-center gap-1.5 text-rose-700">
            <div className="w-3 h-3 rounded-full bg-rose-100 border border-rose-400"></div> Chưa làm
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300"></div> Chưa tới
          </div>
        </div>
      </div>

      {/* GRID CONTAINER */}
      <div className={gridContainerClass} role="grid" aria-label="Bản đồ phân phối hiệu suất">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
          {Array.from({ length: totalDays }).map((_, index) => {
            const dayNum = index + 1;
            const log = logs.find(l => l.day === dayNum);
            
            const isCompleted = !!log;
            const isMissed = !log && dayNum <= currentDay;
            const isLocked = dayNum > currentDay;
            
            const isToday = dayNum === currentDay;
            const isSelected = selectedDay === dayNum;

            return (
              <button
                key={dayNum}
                type="button"
                role="gridcell"
                disabled={isLocked}
                aria-label={`Ngày ${dayNum}`}
                aria-selected={isSelected}
                onClick={() => setSelectedDay(dayNum)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2
                  ${isLocked ? "bg-slate-100 border-slate-200/60 text-slate-400 cursor-not-allowed" : ""}
                  ${isCompleted && !isToday ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400" : ""}
                  ${isMissed && !isToday ? "bg-rose-50 border-rose-200 text-rose-700 hover:border-rose-400" : ""}
                  ${isToday && isCompleted ? "bg-emerald-50 border-2 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/20 scale-105 z-10" : ""}
                  ${isToday && isMissed ? "bg-white border-2 border-[#FF4500] text-[#FF4500] shadow-md shadow-[#FF4500]/20 scale-105 z-10" : ""}
                  ${isSelected ? "ring-2 ring-slate-900 ring-offset-2" : ""}
                `}
              >
                <span>N{dayNum}</span>
                {isCompleted && <Check className={`w-3 h-3 stroke-[3px] mt-0.5 ${isToday ? "text-emerald-500" : "text-emerald-600"}`} aria-hidden="true" />}
                {isMissed && dayNum < currentDay && <XIcon className="w-3 h-3 stroke-[3px] text-rose-500 mt-0.5" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* TRẠNG THÁI UI: HIỂN THỊ CHI TIẾT */}
      {selectedDay && selectedDay <= currentDay && (
        <div className={`mt-4 p-4 rounded-xl border animate-in fade-in slide-in-from-top-1 duration-150 ${selectedLog ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`} role="region" aria-live="polite">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-xs font-bold uppercase tracking-wider ${selectedLog ? "text-emerald-700" : "text-rose-700"}`}>
              Thông tin nhanh Ngày {selectedDay} {selectedDay === currentDay && "(Hôm nay)"}
            </span>
            <Badge variant="outline" className={`bg-white text-[10px] ${selectedLog ? "text-emerald-700 border-emerald-200" : "text-rose-700 border-rose-200"}`}>
              {selectedLog ? "Đã ghi nhận" : "Chưa hoàn thành"}
            </Badge>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {selectedLog ? (
              <span className="flex flex-col gap-1">
                <span className="font-bold">{selectedLog.mood}</span>
                <span>{selectedLog.note}</span>
              </span>
            ) : (
              "Bạn chưa cập nhật nhật ký và minh chứng cho ngày này. Hãy cố gắng duy trì chuỗi kỷ luật nhé!"
            )}
          </p>
        </div>
      )}
    </Card>
  );
}