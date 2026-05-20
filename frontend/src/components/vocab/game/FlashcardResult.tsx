// src/components/vocab/game/FlashcardResult.tsx
"use client";

import React from "react";
import GameResultBase from "./shared/GameResultBase";
import { Check, X, BookOpen, AlertCircle, Sparkles } from "lucide-react";

interface Word {
  id: string;
  word: string;
  type: string;
  definition: string;
  example?: string;
}

interface FlashcardResultProps {
  words: Word[];
  result: {
    knownIds: string[];
    unknownIds: string[];
    score: number;
  };
  onRestart: () => void;
  slug: string;
}

export default function FlashcardResult({
  words,
  result,
  onRestart,
  slug,
}: FlashcardResultProps) {
  const { knownIds, unknownIds, score } = result;
  const total = words.length;
  const knownCount = knownIds.length;
  const unknownCount = unknownIds.length;
  
  const knownPercent = total > 0 ? Math.round((knownCount / total) * 100) : 0;

  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (knownPercent / 100) * circumference;

  const unknownWords = words.filter((w) => unknownIds.includes(w.id));
  const knownWords = words.filter((w) => knownIds.includes(w.id));

  let commentTitle = "Cần cố gắng thêm!";
  let commentSubtitle = "Hãy ôn tập lại các từ chưa thuộc bên dưới nhé.";
  
  if (knownPercent >= 90) {
    commentTitle = "Trí nhớ siêu phàm!";
    commentSubtitle = "Bạn đã ghi nhớ xuất sắc hầu hết tất cả từ vựng!";
  } else if (knownPercent >= 70) {
    commentTitle = "Làm rất tốt!";
    commentSubtitle = "Chỉ còn một vài từ vựng chưa thuộc thôi, cố lên!";
  }

  const scoreCard = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Cột trái: Biểu đồ tròn SVG Ring Chart */}
      <div className="bg-slate-900/60 border border-slate-850 rounded-3xl p-5 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="rgba(239, 68, 68, 0.1)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#10b981"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black font-mono text-white leading-none">{knownPercent}%</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">Đã thuộc</span>
          </div>
        </div>
        <div className="flex gap-4 text-xs font-bold mt-2">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            {knownCount} Đã thuộc
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            {unknownCount} Chưa thuộc
          </span>
        </div>
      </div>

      {/* Cột phải: Live Score Summary */}
      <div className="bg-linear-to-br from-indigo-950/70 to-purple-950/70 border border-indigo-900/35 text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-xl pointer-events-none" />
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-300">Tổng điểm tích lũy</span>
          <div className="text-4.5xl sm:text-5.5xl font-black tracking-tight font-mono text-amber-400">{score}</div>
        </div>
        <div className="border-t border-indigo-900/30 pt-3 flex justify-between items-center text-xs text-indigo-200">
          <span>Tiến độ ván đấu:</span>
          <span className="font-bold text-white bg-indigo-900/60 px-2.5 py-1 rounded-lg border border-indigo-800/20">{total} / {total} Từ</span>
        </div>
      </div>
    </div>
  );

  const detailsElement = (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-indigo-950/20 pb-3">
        <BookOpen className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-slate-200 text-base">Báo Cáo Ôn Tập Từ Vựng</h3>
      </div>

      {unknownWords.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm bg-rose-950/20 border border-rose-900/30 px-3.5 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Cần ôn luyện lại ({unknownWords.length} từ)</span>
          </div>
          <div className="grid gap-2.5">
            {unknownWords.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between gap-3 p-3.5 bg-slate-950/40 border border-slate-900 rounded-2xl hover:border-rose-900/50 transition-colors"
              >
                <div>
                  <h4 className="font-extrabold text-slate-200 text-base tracking-tight">{w.word}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{w.definition}</p>
                </div>
                <div className="shrink-0 w-8 h-8 rounded-full bg-rose-950/30 border border-rose-900/30 flex items-center justify-center text-rose-400">
                  <X className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-emerald-400 font-bold text-sm bg-emerald-950/20 border border-emerald-900/30 rounded-3xl flex flex-col items-center gap-2">
          <Check className="w-8 h-8 bg-emerald-500 text-white rounded-full p-1.5 animate-bounce shadow-md shadow-emerald-500/20" />
          <span>Quá hoàn hảo! Bạn không có từ nào bị sai.</span>
        </div>
      )}

      {knownWords.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-indigo-950/20">
          <button
            onClick={() => {
              const el = document.getElementById("known-words-list");
              if (el) el.classList.toggle("hidden");
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-350 transition-colors flex items-center gap-1 cursor-pointer"
          >
            Xem thêm danh sách đã thuộc ({knownWords.length} từ) ...
          </button>
          <div id="known-words-list" className="hidden space-y-2 mt-2 max-h-48 overflow-y-auto pr-1">
            {knownWords.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-950/20 border border-slate-900 rounded-xl"
              >
                <div>
                  <h4 className="font-bold text-slate-300 text-sm">{w.word}</h4>
                  <p className="text-[11px] text-slate-400">{w.definition}</p>
                </div>
                <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-950/30 border border-emerald-900/30 flex items-center justify-center text-emerald-450">
                  <Check className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <GameResultBase
      title={commentTitle}
      subtitle={commentSubtitle}
      scoreCard={scoreCard}
      detailsElement={detailsElement}
      onRestart={onRestart}
      exitUrl={`/vocab/${slug}`}
    />
  );
}
