// src/components/vocab/game/QuizMode.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RotateCw, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface QuizModeProps {
  words: Array<{ id: string; word: string; type: string; definition: string; example: string }>;
}

export default function QuizMode({ words }: QuizModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState<Record<string, boolean>>({});

  const currentWord = words[currentIndex];
  const progressPercent = ((currentIndex + 1) / words.length) * 100;

  const handleNext = React.useCallback(() => { if (currentIndex < words.length - 1) { setCurrentIndex(currentIndex + 1); setIsFlipped(false); } }, [currentIndex, words.length]);
  const handlePrev = React.useCallback(() => { if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setIsFlipped(false); } }, [currentIndex]);

  // Hỗ trợ phím tắt điều hướng nhanh bàn phím (Tăng Accessibility - WCAG)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); setIsFlipped((prev) => !prev); }
      else if (e.code === "ArrowRight" && currentIndex < words.length - 1) { handleNext(); }
      else if (e.code === "ArrowLeft" && currentIndex > 0) { handlePrev(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, words.length, handleNext, handlePrev]);

  const toggleMastery = (id: string) => { setLearnedCount(prev => ({ ...prev, [id]: !prev[id] })); };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Thanh tiến trình học tập */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-mono font-medium">
          <span>Tiến độ: {currentIndex + 1}/{words.length} từ</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-slate-100 [&>div]:bg-amber-500 rounded-full" />
      </div>

      {/* Toàn bộ khối Flashcard 3D Perspective */}
      <div 
        className="w-full h-[400px] cursor-pointer select-none perspective-[1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 transform-3d ${isFlipped ? "transform-[rotateY(180deg)]" : ""}`}>
          
          {/* MẶT TRƯỚC: Thuật ngữ tiếng Anh */}
          <Card className="absolute inset-0 w-full h-full bg-white border border-slate-200 shadow-md rounded-2xl p-8 flex flex-col justify-between items-center backface-hidden">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Mặt trước (Từ vựng)</span>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{currentWord.word}</h2>
              <span className="inline-block text-xs font-mono italic text-amber-700 bg-amber-50 border border-amber-200/50 px-2.5 py-0.5 rounded-md">{currentWord.type}</span>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium"><RotateCw className="w-3.5 h-3.5 animate-pulse" /> Nhấn chuột hoặc phím Space để xem nghĩa</span>
          </Card>

          {/* MẶT SAU: Định nghĩa & Ví dụ ngữ cảnh */}
          <Card className="absolute inset-0 w-full h-full bg-slate-900 text-white border border-slate-800 shadow-md rounded-2xl p-8 flex flex-col justify-between items-center backface-hidden transform-[rotateY(180deg)]">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Mặt sau (Định nghĩa)</span>
            <div className="text-center space-y-6 max-w-md">
              <p className="text-2xl font-bold text-amber-400 leading-snug">{currentWord.definition}</p>
              {currentWord.example && (
                <p className="text-sm italic text-slate-400 font-serif leading-relaxed border-t border-slate-800 pt-4">&quot;{currentWord.example}&quot;</p>
              )}
            </div>
            <div className="flex gap-3 w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
              <Button 
                onClick={() => toggleMastery(currentWord.id)}
                variant="ghost" 
                className={`w-full text-xs font-semibold rounded-xl h-10 gap-1.5 border transition-all ${
                  learnedCount[currentWord.id] 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                    : "text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {learnedCount[currentWord.id] ? "Đã thuộc lòng" : "Chưa thuộc"}
              </Button>
            </div>
          </Card>

        </div>
      </div>

      {/* Thanh điều hướng chân trang */}
      <div className="flex justify-between items-center max-w-xs mx-auto pt-2">
        <Button onClick={handlePrev} disabled={currentIndex === 0} variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200 text-slate-600 shadow-sm disabled:opacity-40"><ChevronLeft className="w-5 h-5" /></Button>
        <span className="text-sm font-mono font-bold text-slate-600">{currentIndex + 1} / {words.length}</span>
        <Button onClick={handleNext} disabled={currentIndex === words.length - 1} variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200 text-slate-600 shadow-sm disabled:opacity-40"><ChevronRight className="w-5 h-5" /></Button>
      </div>
    </div>
  );
}