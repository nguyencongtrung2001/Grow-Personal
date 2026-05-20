// src/components/vocab/game/FlashcardMode.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, ThumbsUp, ThumbsDown, Keyboard, Sparkles } from "lucide-react";
import GameHeader from "./shared/GameHeader";
import ConfettiEffect from "./shared/ConfettiEffect";

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
  onFinish: (result: { knownIds: string[]; unknownIds: string[]; score: number }) => void;
  slug: string;
}

export default function FlashcardMode({ words, onFinish, slug }: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<string[]>([]);
  const [unknownIds, setUnknownIds] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentWord = words[currentIndex];
  const score = useMemo(() => knownIds.length * 10, [knownIds]);

  const checkCompletion = useCallback((
    updatedKnown: string[], 
    updatedUnknown: string[]
  ) => {
    if (updatedKnown.length + updatedUnknown.length === words.length) {
      setShowConfetti(true);
      setTimeout(() => {
        onFinish({
          knownIds: updatedKnown,
          unknownIds: updatedUnknown,
          score: updatedKnown.length * 10
        });
      }, 1500);
    }
  }, [words.length, onFinish]);

  const handleKnown = useCallback(() => {
    if (currentIndex >= words.length) return;
    const wordId = currentWord.id;

    const nextKnown = [...knownIds];
    if (!nextKnown.includes(wordId)) nextKnown.push(wordId);
    const nextUnknown = unknownIds.filter(id => id !== wordId);

    setKnownIds(nextKnown);
    setUnknownIds(nextUnknown);

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      checkCompletion(nextKnown, nextUnknown);
    }
  }, [currentIndex, currentWord, knownIds, unknownIds, words.length, checkCompletion]);

  const handleUnknown = useCallback(() => {
    if (currentIndex >= words.length) return;
    const wordId = currentWord.id;

    const nextUnknown = [...unknownIds];
    if (!nextUnknown.includes(wordId)) nextUnknown.push(wordId);
    const nextKnown = knownIds.filter(id => id !== wordId);

    setUnknownIds(nextUnknown);
    setKnownIds(nextKnown);

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      checkCompletion(nextKnown, nextUnknown);
    }
  }, [currentIndex, currentWord, knownIds, unknownIds, words.length, checkCompletion]);

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleFlip();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleUnknown();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleKnown();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFlip, handleKnown, handleUnknown]);

  const customProgressElement = useMemo(() => {
    return (
      <div className="flex gap-2 max-w-full overflow-x-auto px-4 py-2.5 items-center justify-center scrollbar-none">
        {words.map((w, idx) => {
          const isCurrent = idx === currentIndex;
          const isKnown = knownIds.includes(w.id);
          const isUnknown = unknownIds.includes(w.id);

          let dotClass = "bg-slate-800 w-2.5 h-2.5 border border-slate-700";
          if (isCurrent) {
            dotClass = "bg-amber-400 w-4 h-4 ring-4 ring-amber-400/30 border border-amber-300 shadow-md shadow-amber-400/20";
          } else if (isKnown) {
            dotClass = "bg-emerald-500 w-2.5 h-2.5 shadow-sm shadow-emerald-500/30";
          } else if (isUnknown) {
            dotClass = "bg-rose-500 w-2.5 h-2.5 shadow-sm shadow-rose-500/30";
          }

          return (
            <div
              key={w.id}
              className={`rounded-full transition-all duration-300 ${dotClass}`}
            />
          );
        })}
      </div>
    );
  }, [words, currentIndex, knownIds, unknownIds]);

  return (
    <div className="w-full min-h-[750px] bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
      {/* Phông nền không gian sâu với các vệt sáng nghệ thuật */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti khi thắng */}
      {showConfetti && <ConfettiEffect />}

      {/* Header cao cấp thiết kế mượt */}
      <div className="z-10">
        <GameHeader
          title="Lật thẻ ghi nhớ"
          currentIndex={currentIndex}
          totalQuestions={words.length}
          score={score}
          slug={slug}
          customProgressElement={customProgressElement}
        />
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 grow flex flex-col justify-center gap-8 z-10 py-8">
        {/* Khối Perspective 3D Flip Card */}
        <div
          className="w-full h-[380px] cursor-pointer select-none perspective-distant"
          onClick={toggleFlip}
        >
          <div
            className={`relative w-full h-full duration-500 transform-3d rounded-3xl shadow-2xl ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* MẶT TRƯỚC: Glassmorphism Tối Cao Cấp + Từ lớn + IPA */}
            <Card className="absolute inset-0 w-full h-full bg-slate-900/70 border border-slate-800 p-8 flex flex-col justify-between items-center backface-hidden rounded-3xl shadow-2xl overflow-hidden transition-all hover:border-slate-700/80 hover:shadow-indigo-500/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/3 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-850">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mặt Trước</span>
              </div>

              <div className="text-center grow flex flex-col justify-center gap-4">
                <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight drop-shadow-sm select-text">
                  {currentWord?.word}
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentWord?.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    /ɪt/ (IPA)
                  </span>
                </div>
              </div>

              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-bold pt-4 border-t border-slate-850 w-full justify-center">
                <RotateCw className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                <span>Nhấn thẻ hoặc phím [<span className="font-mono">Space</span>] để lật</span>
              </span>
            </Card>

            {/* MẶT SAU: Deep Indigo Glassmorphism + Nghĩa + Bôi đậm ví dụ */}
            <Card className="absolute inset-0 w-full h-full bg-indigo-950/50 border border-indigo-900/50 text-white p-8 flex flex-col justify-between items-center backface-hidden rotate-y-180 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-indigo-300 bg-indigo-950/80 px-4 py-1.5 rounded-full border border-indigo-900/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Mặt Sau</span>
              </div>

              <div className="text-center space-y-6 max-w-lg grow flex flex-col justify-center">
                <p className="text-3xl md:text-4xl font-black text-amber-400 leading-snug tracking-tight">
                  {currentWord?.definition}
                </p>
                {currentWord?.example && (
                  <p className="text-sm italic text-indigo-200/80 font-serif leading-relaxed border-t border-indigo-900/30 pt-5 max-w-[400px] mx-auto">
                    &ldquo;{currentWord.example}&rdquo;
                  </p>
                )}
              </div>

              <span className="text-xs text-indigo-400 flex items-center gap-1.5 font-bold pt-4 border-t border-indigo-900/30 w-full justify-center">
                <RotateCw className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>Nhấn thẻ hoặc phím [<span className="font-mono">Space</span>] để lật về</span>
              </span>
            </Card>
          </div>
        </div>

        {/* Thanh nút Swipe-like cao cấp */}
        <div className="flex gap-4 max-w-md mx-auto w-full">
          {/* Nút CHƯA BIẾT (Rose Matte Neon) */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <Button
              onClick={handleUnknown}
              className="w-full h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] text-rose-400 font-bold text-base cursor-pointer transition-all active:scale-[0.97] flex items-center justify-center gap-2 group"
            >
              <ThumbsDown className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Chưa thuộc
            </Button>
            <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5 text-slate-600" />
              <span>Phím [<span className="font-mono">←</span>]</span>
            </span>
          </div>

          {/* Nút ĐÃ BIẾT (Emerald Matte Neon) */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <Button
              onClick={handleKnown}
              className="w-full h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-450 font-bold text-base cursor-pointer transition-all active:scale-[0.97] flex items-center justify-center gap-2 group"
            >
              <ThumbsUp className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              Đã thuộc
            </Button>
            <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5 text-slate-600" />
              <span>Phím [<span className="font-mono">→</span>]</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}