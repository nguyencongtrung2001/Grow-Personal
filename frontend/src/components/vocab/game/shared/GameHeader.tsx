// src/components/vocab/game/shared/GameHeader.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, AlertTriangle, Sparkles } from "lucide-react";
import Link from "next/link";

interface GameHeaderProps {
  title: string;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  timerElement?: React.ReactNode;
  slug: string;
  customProgressElement?: React.ReactNode;
}

export default function GameHeader({
  title,
  currentIndex,
  totalQuestions,
  score,
  timerElement,
  slug,
  customProgressElement,
}: GameHeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-900/80 shadow-md animate-in fade-in slide-in-from-top duration-300">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Nút thoát ván game */}
        <Button
          variant="ghost"
          onClick={() => setShowConfirm(true)}
          className="text-slate-400 hover:text-rose-450 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 font-semibold rounded-xl h-10 px-3 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Thoát Game</span>
        </Button>

        {/* Thông tin ở giữa: Tiêu đề + Bộ đếm thời gian */}
        <div className="flex items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider block sm:inline mr-2">
              Chơi Luyện Tập
            </span>
            <h1 className="text-sm sm:text-base font-extrabold text-white inline-block tracking-tight">
              {title}
            </h1>
          </div>

          {timerElement && <div className="shrink-0">{timerElement}</div>}
        </div>

        {/* Điểm số tích lũy Live */}
        <div className="flex items-center gap-2 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl text-emerald-450 shadow-inner">
          <Trophy className="w-4 h-4 text-emerald-450 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Score:</span>
          <span className="text-sm font-black font-mono leading-none">{score}</span>
        </div>
      </div>

      {/* Thanh tiến trình Progress Bar / Custom dots ở đáy */}
      {customProgressElement ? (
        <div className="w-full bg-slate-950 py-1.5 border-t border-slate-900 flex justify-center items-center">
          {customProgressElement}
        </div>
      ) : (
        <div className="w-full relative h-1 bg-slate-900">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* CONFIRM DIALOG MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-850 max-w-sm w-full p-6 shadow-2xl rounded-3xl animate-in zoom-in-95 duration-200 text-center">
            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20 shadow-inner animate-bounce">
              <AlertTriangle className="w-7 h-7 text-rose-450" />
            </div>
            <h3 className="text-white font-black text-lg tracking-tight mb-2">Thoát trận giữa chừng?</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Mọi điểm số và tiến trình chơi của bạn trong ván này sẽ bị hủy bỏ. Bạn chắc chắn muốn thoát chứ?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 rounded-xl border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900 hover:text-white font-bold cursor-pointer"
              >
                Tiếp tục chơi
              </Button>
              <Button
                asChild
                className="flex-1 h-12 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
              >
                <Link href={`/vocab/${slug}`}>Thoát game</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
