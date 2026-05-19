// Server Component — không có hooks hay event handler
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Flame } from "lucide-react";

interface ChallengeHeaderBannerProps {
  challenge: {
    title: string;
    progress: number;
    completedDaysCount: number;
    totalDays: number;
    streak: number;
    startDate: string;
    estimatedEndDate: string;
    category: string;
  };
}

export default function ChallengeHeaderBanner({ challenge }: ChallengeHeaderBannerProps) {
  // Định dạng ngày đẹp hơn
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-[#F1E7E2] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in fade-in duration-300">
      <div className="space-y-2 w-full md:w-2/3">

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
          {challenge.title}
        </h1>
        <p className="text-sm text-[#78716C]">
          Bắt đầu: <span className="font-semibold text-slate-800">{formatDate(challenge.startDate)}</span> • Dự kiến kết thúc: <span className="font-semibold text-slate-800">{formatDate(challenge.estimatedEndDate)}</span>
        </p>
        <div className="pt-2 max-w-md">
          <div className="flex justify-between text-xs font-bold text-[#78716C] mb-1">
            <span>TIẾN ĐỘ TỔNG QUAN</span>
            <span className="text-[#FF4500]">
              {challenge.progress}% ({challenge.completedDaysCount}/{challenge.totalDays} Ngày)
            </span>
          </div>
          <Progress 
            value={challenge.progress} 
            className="h-2.5 bg-slate-100 [&>div]:bg-linear-to-r [&>div]:from-[#FF4500] [&>div]:to-[#EF4444]" 
          />
        </div>
      </div>

      {/* Khối hiển thị Chuỗi Streak */}
      <div className="flex items-center gap-4 bg-linear-to-br from-[#FFF5F2] to-[#FFF1EC] border border-[#FFD9CC] px-6 py-4 rounded-2xl w-full md:w-auto shadow-xs">
        <div className="bg-white p-3 rounded-xl shadow-xs">
          <Flame className="w-8 h-8 text-[#FF4500] fill-current animate-pulse" />
        </div>
        <div>
          <div className="text-2xl font-black text-[#1E293B] font-mono leading-none">
            {challenge.streak} NGÀY
          </div>
          <div className="text-xs font-bold text-[#FF4500] tracking-wider mt-1.5 uppercase">
            Chuỗi Kỷ Luật (Streak)
          </div>
        </div>
      </div>
    </div>
  );
}
