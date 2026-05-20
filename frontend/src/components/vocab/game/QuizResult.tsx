// src/components/vocab/game/QuizResult.tsx
"use client";

import React from "react";
import GameResultBase from "./shared/GameResultBase";
import { Check, X, HelpCircle, Sparkles } from "lucide-react";

interface Word {
  id: string;
  word: string;
  type?: string;
  definition: string;
}

interface QuestionResult {
  wordId: string;
  wordText: string;
  selectedOption: string | null;
  correctOption: string;
  isCorrect: boolean;
}

interface QuizResultProps {
  words: Word[];
  result: {
    score: number;
    history: QuestionResult[];
  };
  onRestart: () => void;
  slug: string;
}

export default function QuizResult({
  words,
  result,
  onRestart,
  slug,
}: QuizResultProps) {
  const { score, history } = result;
  const total = words.length;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  let grade = "D";
  let gradeColor = "text-rose-400 bg-rose-950/20 border-rose-800/35";
  let gradeText = "Cần cố gắng!";
  
  if (accuracy >= 95) {
    grade = "S";
    gradeColor = "text-purple-400 bg-purple-950/20 border-purple-800/35 animate-pulse";
    gradeText = "Thần sấm từ vựng!";
  } else if (accuracy >= 85) {
    grade = "A";
    gradeColor = "text-emerald-400 bg-emerald-950/20 border-emerald-800/35";
    gradeText = "Xuất sắc!";
  } else if (accuracy >= 70) {
    grade = "B";
    gradeColor = "text-blue-400 bg-blue-950/20 border-blue-800/35";
    gradeText = "Khá tốt!";
  } else if (accuracy >= 50) {
    grade = "C";
    gradeColor = "text-amber-400 bg-amber-950/20 border-amber-800/35";
    gradeText = "Đạt yêu cầu!";
  }

  const scoreCard = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Cột trái: Grade Badge */}
      <div className="bg-slate-900/60 border border-slate-850 rounded-3xl p-5 flex flex-col items-center justify-center space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Xếp loại</span>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black border shadow-inner ${gradeColor}`}>
          {grade}
        </div>
        <span className="text-xs font-black text-slate-200 mt-1">{gradeText}</span>
      </div>

      {/* Cột phải: Live Score Summary */}
      <div className="bg-linear-to-br from-indigo-950/70 to-purple-950/70 border border-indigo-900/35 text-white rounded-3xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-xl pointer-events-none" />
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-300">Độ chính xác</span>
          <div className="text-4.5xl sm:text-5.5xl font-black font-mono text-amber-400">{accuracy}%</div>
        </div>
        <div className="border-t border-indigo-900/30 pt-3 flex justify-between items-center text-xs text-indigo-200">
          <span>Tổng số câu đúng:</span>
          <span className="font-bold text-white bg-emerald-900/60 border border-emerald-800/20 px-2.5 py-0.5 rounded-md">{score} / {total} câu</span>
        </div>
      </div>
    </div>
  );

  const detailsElement = (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-indigo-950/20 pb-3">
        <HelpCircle className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-slate-200 text-base">Chi Tiết Từng Câu Hỏi</h3>
      </div>

      <div className="grid gap-3.5 max-h-[350px] overflow-y-auto pr-1">
        {history.map((h, idx) => (
          <div
            key={idx}
            className={`p-4 border rounded-2xl transition-all ${
              h.isCorrect
                ? "bg-emerald-950/15 border-emerald-900/35 hover:border-emerald-800/50"
                : "bg-rose-950/15 border-rose-900/35 hover:border-rose-800/50"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-950 border border-slate-900 px-2 py-0.5 rounded-md mr-2">
                  CÂU {idx + 1}
                </span>
                <span className="text-base font-black text-slate-200 tracking-tight">
                  {h.wordText}
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm ${
                  h.isCorrect ? "bg-emerald-500 shadow-emerald-500/20" : "bg-rose-500 shadow-rose-500/20"
                }`}
              >
                {h.isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex items-start gap-1.5 text-emerald-450">
                <span className="shrink-0 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Đáp án đúng</span>
                <span className="leading-snug select-text">{h.correctOption}</span>
              </div>
              
              {!h.isCorrect && (
                <div className="flex items-start gap-1.5 text-rose-400 border-t border-rose-950/30 pt-1.5 mt-1.5">
                  <span className="shrink-0 text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Bạn đã chọn</span>
                  <span className="leading-snug select-text">{h.selectedOption || "Không trả lời (Hết giờ)"}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <GameResultBase
      title={accuracy >= 85 ? "Rất xuất sắc!" : "Thử thách hoàn thành"}
      subtitle={accuracy >= 85 ? "Bạn đã làm chủ phần lớn từ vựng trong lượt này." : "Hãy xem lại các câu sai để ghi nhớ tốt hơn nhé."}
      scoreCard={scoreCard}
      detailsElement={detailsElement}
      onRestart={onRestart}
      exitUrl={`/vocab/${slug}`}
    />
  );
}
