// src/components/vocab/game/FlashcardMode.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Tối ưu ảnh mặc định
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

interface Word {
  id: string;
  word: string;
  type: string;
  definition: string;
  example?: string;
  imageUrl?: string;
}

interface FlashcardModeProps {
  words: Word[];
}

export default function FlashcardMode({ words }: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentWord = words[currentIndex];
  const progressPercent = ((currentIndex + 1) / words.length) * 100;

  const handleNext = React.useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, words.length]);

  const handlePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  // Hỗ trợ phím tắt Space/Arrow (Accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        handleNext();
      } else if (e.code === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-mono font-medium">
          <span>Tiến độ: {currentIndex + 1}/{words.length} từ</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2.5 bg-slate-100 [&>div]:bg-amber-500 rounded-full shadow-inner" />
      </div>

      {/* Khối 3D Flashcard Perspective */}
      <div className="w-full h-[450px] cursor-pointer select-none perspective-distant" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full duration-500 transform-3d shadow-xl rounded-2xl ${isFlipped ? "transform-[rotateY(180deg)]" : ""}`}>
          
          {/* MẶT TRƯỚC: Image + English Word */}
          <Card className="absolute inset-0 w-full h-full bg-white border border-slate-200 p-8 flex flex-col justify-between items-center backface-hidden overflow-hidden rounded-2xl">
            {currentWord.imageUrl ? (
              <div className="w-full h-44 relative rounded-xl overflow-hidden border border-slate-100 mb-4 shadow-inner">
                <Image 
                  src={currentWord.imageUrl} 
                  alt={`Minh họa cho từ ${currentWord.word}`} 
                  fill
                  sizes="(max-w-768px) 100vw, 400px"
                  className="object-cover"
                  priority={currentIndex === 0} // Tải nhanh ảnh đầu tiên
                />
              </div>
            ) : (
              <div className="w-full h-44 bg-slate-50 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-100 mb-4 text-slate-300 text-sm font-medium">Không có hình ảnh</div>
            )}
            
            <div className="text-center grow flex flex-col justify-center gap-3">
              <h2 className="text-5xl font-extrabold text-slate-900 tracking-tighter">{currentWord.word}</h2>
              <span className="inline-block text-xs font-mono italic text-amber-700 bg-amber-50 border border-amber-200/50 px-3 py-1 rounded-full">{currentWord.type}</span>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium pt-4 border-t border-slate-100 w-full justify-center"><RotateCw className="w-3.5 h-3.5" /> Nhấn hoặc Space để lật</span>
          </Card>

          {/* MẶT SAU: Vietnamese Definition + Example */}
          <Card className="absolute inset-0 w-full h-full bg-slate-900 text-white border border-slate-800 p-8 flex flex-col justify-between items-center backface-hidden transform-[rotateY(180deg)] rounded-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Mặt sau (Định nghĩa)</span>
            <div className="text-center space-y-6 max-w-lg grow flex flex-col justify-center">
              <p className="text-3xl font-extrabold text-amber-400 leading-snug tracking-tight">{currentWord.definition}</p>
              {currentWord.example && (
                <p className="text-base italic text-slate-300 font-serif leading-relaxed border-t border-slate-800 pt-5">&quot;{currentWord.example}&quot;</p>
              )}
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium pt-4 border-t border-slate-800 w-full justify-center"><RotateCw className="w-3.5 h-3.5" /> Nhấn hoặc Space để lật về</span>
          </Card>
        </div>
      </div>

      <div className="flex justify-between items-center max-w-xs mx-auto pt-2">
        <Button onClick={handlePrev} disabled={currentIndex === 0} variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200 text-slate-600 shadow-sm disabled:opacity-40 transition-all active:scale-95"><ChevronLeft className="w-5 h-5" /></Button>
        <span className="text-sm font-mono font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-full shadow-inner border border-slate-100">{currentIndex + 1} / {words.length}</span>
        <Button onClick={handleNext} disabled={currentIndex === words.length - 1} variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200 text-slate-600 shadow-sm disabled:opacity-40 transition-all active:scale-95"><ChevronRight className="w-5 h-5" /></Button>
      </div>
    </div>
  );
}