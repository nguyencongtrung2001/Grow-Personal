import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JourneyWorkspace from "./JourneyWorkspace";
import { Flame, CheckCircle2, Circle, Lock } from "lucide-react";

export default function ChallengeCard() {
  const completedDays = [1, 2, 3, 4, 5];
  const lockedDays = [24, 25, 26];

  return (
    <Card className="bg-white border border-[#F1E7E2] rounded-2xl p-6 shadow-sm [transition:all_0.2s_ease-in-out] hover:shadow-md">
      {/* Header Info */}
      <CardHeader className="p-0 flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-100 pb-4 mb-6 gap-4 space-y-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Badge className="bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20 hover:bg-[#FF4500]/10 shadow-none text-xs font-bold px-2.5 py-0.5 rounded-md">
              Đang thực hiện
            </Badge>
            <h4 className="text-xl font-bold text-[#1E293B]">30 Ngày Làm Chủ Từ Vựng Tiếng Anh</h4>
          </div>
          <p className="text-xs font-medium text-[#78716C]">
            Tiến độ đạt được: <span className="text-[#FF4500] font-bold">23 / 30 ngày</span> (76%)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl">
          <Flame className="w-5 h-5 text-[#EF4444] fill-current animate-pulse" />
          <span className="text-sm text-[#EF4444] font-bold font-sans">23 Ngày Chuỗi (Streak)</span>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Days Lưới Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-3 mb-6">
          {/* Trạng thái 1: Các ngày đã Hoàn thành */}
          {completedDays.map((day) => (
            <div key={day} className="aspect-square bg-[#FFECE6]/60 border border-[#FF4500]/30 rounded-xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-[#FFECE6] transition-all">
              <span className="text-[11px] font-bold text-[#7A1A00] mb-0.5">N{day}</span>
              <CheckCircle2 className="w-5 h-5 fill-[#FF4500] text-white" />
              {day === 1 && (
                <div className="absolute bottom-1 right-1 flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                </div>
              )}
            </div>
          ))}

          {/* Khối rút gọn hiển thị tiến trình tầm trung */}
          <div className="col-span-3 lg:col-span-1 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xs font-bold text-[#78716C]">
            ... N6 - N22 ...
          </div>

          {/* Trạng thái 2: Ngày Hiện tại (ACTIVE GLOWING) */}
          <div className="aspect-square bg-white border-2 border-[#FF4500] shadow-lg shadow-[#FF4500]/20 rounded-xl flex flex-col items-center justify-center relative cursor-pointer transform scale-105 z-10 p-1">
            <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider mb-0.5 animate-pulse">Hôm nay</span>
            <span className="text-xs font-bold text-[#1E293B]">Ngày 23</span>
            <Circle className="w-4 h-4 text-slate-300 mt-0.5" />
          </div>

          {/* Trạng thái 3: Các ngày Tương lai (Bị khóa) */}
          {lockedDays.map((day) => (
            <div key={day} className="aspect-square bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
              <span className="text-[11px] font-bold mb-0.5">N{day}</span>
              <Lock className="w-3 h-3 opacity-60" />
            </div>
          ))}
        </div>

        {/* Khối Workspace chi tiết hành trình trong ngày */}
        <JourneyWorkspace />
      </CardContent>
    </Card>
  );
}