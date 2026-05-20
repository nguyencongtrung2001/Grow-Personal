// src/components/vocab/game/MatchResult.tsx
"use client";

import React from "react";
import GameResultBase from "./shared/GameResultBase";
import { Clock, Zap, CheckCircle2 } from "lucide-react";

interface Word {
  id: string;
  word: string;
  definition: string;
}

interface MatchResultProps {
  words: Word[];
  result: {
    timeElapsed: number;
    bestStreak: number;
    score: number;
  };
  onRestart: () => void;
  slug: string;
}

export default function MatchResult({
  words,
  result,
  onRestart,
  slug,
}: MatchResultProps) {
  const { timeElapsed, bestStreak, score } = result;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const formattedTime = formatTime(timeElapsed);

  let speedRating = "Tốc độ cơ bản";
  let ratingColor = "text-blue-450 bg-blue-950/20 border-blue-900/30";
  
  if (timeElapsed <= 15) {
    speedRating = "Tốc độ thần sấm ⚡";
    ratingColor = "text-purple-400 bg-purple-950/20 border-purple-900/30 animate-pulse";
  } else if (timeElapsed <= 30) {
    speedRating = "Phản xạ nhanh nhẹn ✨";
    ratingColor = "text-emerald-400 bg-emerald-950/20 border-emerald-900/30";
  } else if (timeElapsed <= 60) {
    speedRating = "Tập trung cao độ 👍";
    ratingColor = "text-amber-400 bg-amber-950/20 border-amber-900/30";
  }

  const scoreCard = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Cột trái: Đồng hồ đếm xuôi (Time Elapsed) */}
      <div className="bg-slate-900/60 border border-slate-850 rounded-3xl p-5 flex flex-col items-center justify-center space-y-2">
        <Clock className="w-6 h-6 text-slate-400" />
        <span className="text-xs font-mono font-bold text-slate-450 uppercase tracking-widest">Thời gian</span>
        <span className="text-3xl font-black font-mono text-white leading-none">{formattedTime}</span>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border mt-2 ${ratingColor}`}>
          {speedRating}
        </span>
      </div>

      {/* Cột phải: Best Streak (Combo nhiều nhất) và Điểm số */}
      <div className="bg-linear-to-br from-indigo-950/70 to-purple-950/70 border border-indigo-900/35 text-white rounded-3xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-xl pointer-events-none" />
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-300">Combo tối đa</span>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded">+{score} XP</span>
          </div>
          <div className="text-4.5xl sm:text-5.5xl font-black font-mono text-amber-400 flex items-center gap-1">
            <Zap className="w-8 h-8 text-amber-400 fill-amber-400/20 animate-pulse" />
            <span>x{bestStreak}</span>
          </div>
        </div>
        <div className="border-t border-indigo-900/30 pt-3 flex justify-between items-center text-xs text-indigo-200">
          <span>Tổng số cặp ghép:</span>
          <span className="font-bold text-white bg-indigo-900/60 border border-indigo-800/20 px-2.5 py-0.5 rounded-md">{words.length} Cặp</span>
        </div>
      </div>
    </div>
  );

  const detailsElement = (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-indigo-950/20 pb-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-slate-200 text-base">Từ Vựng Đã Ghép Cặp Thành Công</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
        {words.map((w) => (
          <div
            key={w.id}
            className="p-3.5 bg-slate-950/30 border border-slate-900 rounded-2xl flex items-center justify-between"
          >
            <div>
              <h4 className="font-extrabold text-slate-200 text-sm tracking-tight">{w.word}</h4>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-tight">{w.definition}</p>
            </div>
            <div className="shrink-0 w-6 h-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-450 shadow-sm shadow-emerald-500/10">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <GameResultBase
      title="Ghép cặp hoàn tất!"
      subtitle="Bạn sở hữu khả năng liên tưởng từ vựng vô cùng tuyệt vời."
      scoreCard={scoreCard}
      detailsElement={detailsElement}
      onRestart={onRestart}
      exitUrl={`/vocab/${slug}`}
    />
  );
}
