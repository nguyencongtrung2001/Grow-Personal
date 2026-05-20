// src/components/vocab/game/TranslateResult.tsx
"use client";

import React from "react";
import GameResultBase from "./shared/GameResultBase";
import { Search, Sparkles } from "lucide-react";

interface Word {
  id: string;
  word: string;
  definition: string;
}

interface QuestionTranslateResult {
  wordId: string;
  wordText: string;
  userInput: string;
  correctAnswer: string;
  scoreEarned: number;
  similarity: number;
}

interface TranslateResultProps {
  words: Word[];
  result: {
    totalScore: number;
    history: QuestionTranslateResult[];
  };
  onRestart: () => void;
  slug: string;
}

export default function TranslateResult({
  words,
  result,
  onRestart,
  slug,
}: TranslateResultProps) {
  const { totalScore, history } = result;
  const total = words.length;
  
  const avgSimilarity = history.length > 0 
    ? Math.round(history.reduce((sum, item) => sum + item.similarity, 0) / history.length)
    : 0;

  let commentTitle = "Luyện tập hoàn tất";
  let commentSubtitle = "Ôn tập thường xuyên giúp ghi nhớ ký tự chính xác hơn.";
  
  if (avgSimilarity >= 90) {
    commentTitle = "Chính tả hoàn hảo!";
    commentSubtitle = "Khả năng viết chính xác từ vựng của bạn cực kỳ đáng nể!";
  } else if (avgSimilarity >= 75) {
    commentTitle = "Rất đáng khen!";
    commentSubtitle = "Hầu hết các từ vựng đều được dịch rất sát nghĩa.";
  }

  const scoreCard = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Cột trái: Độ chính xác trung bình (Accuracy %) */}
      <div className="bg-slate-900/60 border border-slate-850 rounded-3xl p-5 flex flex-col items-center justify-center space-y-2">
        <span className="text-xs font-mono font-bold text-slate-450 uppercase tracking-widest">Độ tương đồng</span>
        <span className="text-4xl font-black font-mono text-indigo-400 leading-none">{avgSimilarity}%</span>
        <span className="text-[10px] text-slate-400 font-medium text-center leading-normal mt-2.5 max-w-[140px]">
          Tỷ lệ khớp trung bình của chính tả
        </span>
      </div>

      {/* Cột phải: Live Score Summary */}
      <div className="bg-linear-to-br from-indigo-950/70 to-purple-950/70 border border-indigo-900/35 text-white rounded-3xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-xl pointer-events-none" />
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-300">Tổng điểm tích lũy</span>
          <div className="text-4.5xl sm:text-5.5xl font-black font-mono text-amber-400">{totalScore}</div>
        </div>
        <div className="border-t border-indigo-900/30 pt-3 flex justify-between items-center text-xs text-indigo-200">
          <span>Tổng số từ:</span>
          <span className="font-bold text-white bg-indigo-900/60 border border-indigo-800/20 px-2.5 py-0.5 rounded-md">{total} từ</span>
        </div>
      </div>
    </div>
  );

  const detailsElement = (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-indigo-950/20 pb-3">
        <Search className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-slate-200 text-base">Chi Tiết Viết Nghĩa</h3>
      </div>

      <div className="grid gap-3.5 max-h-[350px] overflow-y-auto pr-1">
        {history.map((h, idx) => {
          let badgeColor = "bg-rose-500/20 border border-rose-500/30 text-rose-400";
          let borderClass = "border-rose-900/35 bg-rose-950/15";
          let scoreText = `${h.scoreEarned} XP`;

          if (h.scoreEarned === 100) {
            badgeColor = "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400";
            borderClass = "border-emerald-900/35 bg-emerald-950/15";
          } else if (h.scoreEarned === 50) {
            badgeColor = "bg-amber-500/20 border border-amber-500/30 text-amber-400";
            borderClass = "border-amber-900/35 bg-amber-950/15";
            scoreText = `${h.scoreEarned} XP (Gần đúng)`;
          }

          return (
            <div
              key={idx}
              className={`p-4 border rounded-2xl transition-all ${borderClass}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-950 border border-slate-900 px-2 py-0.5 rounded-md mr-2">
                    {idx + 1}
                  </span>
                  <span className="text-base font-black text-slate-200 tracking-tight">
                    {h.wordText}
                  </span>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeColor}`}>
                  {scoreText}
                </span>
              </div>

              <div className="space-y-2 text-xs font-semibold leading-relaxed">
                <div className="flex items-start gap-1.5 text-slate-400">
                  <span className="shrink-0 text-[10px] bg-slate-900 border border-slate-850 text-slate-450 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Bạn đã nhập</span>
                  <span className="font-mono text-slate-300 font-bold select-text">{h.userInput || "(Để trống)"}</span>
                </div>
                
                <div className="flex items-start gap-1.5 text-emerald-450 border-t border-indigo-950/20 pt-1.5 mt-1.5">
                  <span className="shrink-0 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider font-sans">Đáp án đúng</span>
                  <span className="font-mono select-text">{h.correctAnswer}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
