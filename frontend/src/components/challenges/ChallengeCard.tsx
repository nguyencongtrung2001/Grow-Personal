// ============================================================
// ChallengeCard — Server Component (không có "use client")
// ✅ Nhận Challenge object từ props — không hardcode data
// ✅ Hiển thị data thực tế từ API
// ============================================================

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { Challenge } from "@/types/challenge";

interface ChallengeCardProps {
  challenge: Challenge;
}

const STATUS_LABELS: Record<Challenge["status"], string> = {
  active: "Đang thực hiện",
  completed: "Hoàn thành",
  paused: "Tạm dừng",
};

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { slug, title, status, completedDaysCount, totalDays, progress, streak } = challenge;

  // Tạo mảng ngày hiển thị: 5 ngày đã xong + hôm nay + 3 ngày khóa
  const displayedCompletedDays = Array.from(
    { length: Math.min(completedDaysCount - 1, 5) },
    (_, i) => i + 1
  );
  const lockedDays = Array.from(
    { length: Math.min(3, totalDays - completedDaysCount) },
    (_, i) => completedDaysCount + i + 1
  );

  return (
    <Card className="bg-white border border-[#F1E7E2] rounded-2xl p-6 shadow-sm [transition:all_0.2s_ease-in-out] hover:shadow-md">
      {/* Header Info */}
      <CardHeader className="p-0 flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-100 pb-4 mb-6 gap-4 space-y-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Badge className="bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20 hover:bg-[#FF4500]/10 shadow-none text-xs font-bold px-2.5 py-0.5 rounded-md">
              {STATUS_LABELS[status]}
            </Badge>
            <h4 className="text-xl font-bold text-[#1E293B]">{title}</h4>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xs font-medium text-[#78716C]">
              Tiến độ: <span className="text-[#FF4500] font-bold">{completedDaysCount} / {totalDays} ngày</span> ({progress}%)
            </p>
            <Button asChild variant="link" className="text-xs font-medium text-[#78716C] h-auto p-0 hover:text-[#FF4500]">
              <Link href={`/challenges/${slug}`}>Xem chi tiết</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl">
          <Flame className="w-5 h-5 text-[#EF4444] fill-current animate-pulse" />
          <span className="text-sm text-[#EF4444] font-bold">{streak} Ngày Chuỗi (Streak)</span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Days Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-3">
          {displayedCompletedDays.map((day) => (
            <div key={day} className="aspect-square bg-[#FFECE6]/60 border border-[#FF4500]/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFECE6] transition-all">
              <span className="text-[11px] font-bold text-[#7A1A00] mb-0.5">N{day}</span>
              <CheckCircle2 className="w-5 h-5 fill-[#FF4500] text-white" />
            </div>
          ))}

          {displayedCompletedDays.length < completedDaysCount - 1 && (
            <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xs font-bold text-[#78716C]">
              ...
            </div>
          )}

          {/* Hôm nay */}
          <div className="aspect-square bg-white border-2 border-[#FF4500] shadow-lg shadow-[#FF4500]/20 rounded-xl flex flex-col items-center justify-center relative cursor-pointer transform scale-105 z-10 p-1">
            <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider mb-0.5 animate-pulse">Hôm nay</span>
            <span className="text-xs font-bold text-[#1E293B]">Ngày {completedDaysCount}</span>
          </div>

          {lockedDays.map((day) => (
            <div key={day} className="aspect-square bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
              <span className="text-[11px] font-bold mb-0.5">N{day}</span>
              <Lock className="w-3 h-3 opacity-60" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}