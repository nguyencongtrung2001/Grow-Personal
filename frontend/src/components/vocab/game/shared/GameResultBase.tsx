// src/components/vocab/game/shared/GameResultBase.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";

interface GameResultBaseProps {
  title: string;
  subtitle: string;
  gradeBadge?: React.ReactNode;
  scoreCard: React.ReactNode;
  detailsElement?: React.ReactNode;
  onRestart: () => void;
  exitUrl: string;
}

export default function GameResultBase({
  title,
  subtitle,
  gradeBadge,
  scoreCard,
  detailsElement,
  onRestart,
  exitUrl,
}: GameResultBaseProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10 px-4 animate-in zoom-in-95 duration-500 text-white">
      {/* Khối chúc mừng hàng đầu */}
      <div className="text-center space-y-4">
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-linear-to-tr from-amber-500/15 to-orange-500/5 rounded-full border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] group">
          <Trophy className="w-14 h-14 text-amber-400 animate-pulse group-hover:scale-110 transition-transform duration-300" />
          {gradeBadge && (
            <div className="absolute -bottom-1 -right-1">
              {gradeBadge}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-350 tracking-tight drop-shadow-sm">
            {title}
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base max-w-[450px] mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Khối hiển thị thông tin thành tích (Điểm số, thời gian, combo...) */}
      <div className="w-full">
        {scoreCard}
      </div>

      {/* Chi tiết kết quả cụ thể (nếu có, e.g. list từ cần ôn, từng câu đúng/sai) */}
      {detailsElement && (
        <div className="w-full bg-slate-900/60 rounded-3xl border border-slate-850 p-6 space-y-4 shadow-xl backdrop-blur-md">
          {detailsElement}
        </div>
      )}

      {/* Nút điều hướng chân trang */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button
          onClick={onRestart}
          className="flex-1 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base cursor-pointer transition-all active:scale-95 shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" /> Chơi ván mới
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="flex-1 h-14 rounded-2xl border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900 hover:text-white font-bold text-base cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Link href={exitUrl}>
            <LogOut className="w-5 h-5" /> Quay lại thư mục
          </Link>
        </Button>
      </div>
    </div>
  );
}
