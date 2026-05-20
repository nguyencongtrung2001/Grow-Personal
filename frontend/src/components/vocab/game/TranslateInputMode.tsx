// src/components/vocab/game/TranslateInputMode.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, ArrowRight, Keyboard, HelpCircle, Sparkles } from "lucide-react";
import GameHeader from "./shared/GameHeader";
import ConfettiEffect from "./shared/ConfettiEffect";

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

interface TranslateInputModeProps {
  words: Word[];
  onFinish: (result: { score: number; history: QuestionTranslateResult[] }) => void;
  slug: string;
}

function getLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) {
    tmp.push([i]);
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

function getSimilarityPercentage(s1: string, s2: string): number {
  const norm1 = s1.trim().toLowerCase();
  const norm2 = s2.trim().toLowerCase();
  if (norm1 === norm2) return 100;
  
  const distance = getLevenshteinDistance(norm1, norm2);
  const maxLength = Math.max(norm1.length, norm2.length);
  if (maxLength === 0) return 100;
  
  return Math.round((1 - distance / maxLength) * 100);
}

export default function TranslateInputMode({ words, onFinish, slug }: TranslateInputModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentSimilarity, setCurrentSimilarity] = useState<number | null>(null);
  const [score, setScore] = useState(100);
  const [history, setHistory] = useState<QuestionTranslateResult[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentWord = words[currentIndex];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentIndex]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !userInput.trim() || !currentWord) return;

    const similarity = getSimilarityPercentage(userInput, currentWord.definition);
    setCurrentSimilarity(similarity);
    setIsAnswered(true);

    let earned = 0;
    if (similarity === 100) {
      earned = 100;
    } else if (similarity >= 80) {
      earned = 50;
    } else {
      earned = -10;
    }

    const nextScore = Math.max(0, score + earned);
    setScore(nextScore);

    const newResult: QuestionTranslateResult = {
      wordId: currentWord.id,
      wordText: currentWord.word,
      userInput: userInput.trim(),
      correctAnswer: currentWord.definition,
      scoreEarned: earned,
      similarity,
    };

    const nextHistory = [...history, newResult];
    setHistory(nextHistory);

    const isLastQuestion = currentIndex === words.length - 1;
    if (isLastQuestion && nextScore >= words.length * 50) {
      setShowConfetti(true);
    }
  }, [isAnswered, userInput, currentWord, score, history, currentIndex, words.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setCurrentSimilarity(null);
      setIsAnswered(false);
    } else {
      onFinish({
        score,
        history,
      });
    }
  }, [currentIndex, words.length, score, history, onFinish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswered && (e.code === "Enter" || e.code === "NumpadEnter")) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswered, handleNext]);

  const lengthHint = currentWord?.definition.length || 0;
  const firstChar = currentWord?.definition[0] || "";
  const lastChar = currentWord?.definition[currentWord.definition.length - 1] || "";
  
  const hoverHint = useMemo(() => {
    if (!currentWord) return "";
    return `Từ này có ${lengthHint} ký tự. Bắt đầu bằng "${firstChar.toUpperCase()}" và kết thúc bằng "${lastChar.toUpperCase()}".`;
  }, [currentWord, lengthHint, firstChar, lastChar]);

  let inputBorderStyles = "border-slate-850 bg-slate-900/40 text-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 placeholder:text-slate-600";
  if (isAnswered && currentSimilarity !== null) {
    if (currentSimilarity === 100) {
      inputBorderStyles = "border-emerald-500 bg-emerald-950/20 text-emerald-350 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    } else if (currentSimilarity >= 80) {
      inputBorderStyles = "border-amber-500 bg-amber-950/20 text-amber-350 shadow-[0_0_15px_rgba(245,158,11,0.1)]";
    } else {
      inputBorderStyles = "border-rose-500 bg-rose-950/20 text-rose-350 animate-shake shadow-[0_0_15px_rgba(239,68,68,0.1)]";
    }
  }

  return (
    <div className="w-full min-h-[750px] bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      {showConfetti && <ConfettiEffect />}

      <div className="z-10">
        <GameHeader
          title="Dịch nghĩa chính tả"
          currentIndex={currentIndex}
          totalQuestions={words.length}
          score={score}
          slug={slug}
        />
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 grow flex flex-col justify-center gap-6 z-10 py-6">
        {/* Khối Câu Hỏi Panel (Hover phát hiện gợi ý) */}
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="p-8 text-center bg-slate-900/60 border border-slate-850 text-white select-none rounded-3xl shadow-xl relative overflow-hidden transition-all duration-350 hover:border-slate-800"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-center items-center gap-1.5 text-slate-400 font-mono text-[10px] uppercase font-bold tracking-widest bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-850 w-fit mx-auto cursor-help">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Rê chuột để xem Gợi ý</span>
          </div>

          <h2 className="text-4.5xl md:text-5.5xl font-black text-amber-400 mt-6 tracking-tight drop-shadow-sm select-text">
            {currentWord?.word}
          </h2>

          {/* Gợi ý hiển thị dạng hover */}
          <div
            className={`mt-4 px-4 py-2.5 bg-indigo-950/30 border border-indigo-900/30 rounded-2xl text-xs text-indigo-300 transition-all duration-300 ${
              isHovered ? "opacity-100 max-h-16" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            💡 <strong className="text-white">Gợi ý từ:</strong> {hoverHint}
          </div>
        </Card>

        {/* Khung nhập văn bản Form */}
        <form
          onSubmit={isAnswered ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}
          className="space-y-4"
        >
          <div className="relative">
            {userInput === "" && !isAnswered && (
              <div className="absolute left-6 top-[22px] text-lg sm:text-xl font-mono text-slate-700 pointer-events-none select-none opacity-20">
                {currentWord?.definition}
              </div>
            )}

            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isAnswered}
              placeholder="Nhập nghĩa tiếng Việt..."
              className={`h-16 text-lg sm:text-xl px-6 rounded-2xl shadow-inner font-bold font-mono border-2 transition-all duration-300 ${inputBorderStyles}`}
            />

            {isAnswered && currentSimilarity !== null && (
              <div className="absolute right-5 top-5">
                {currentSimilarity === 100 ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : currentSimilarity >= 80 ? (
                  <CheckCircle2 className="w-6 h-6 text-amber-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-450" />
                )}
              </div>
            )}
          </div>

          {/* Đáp án chi tiết khi trả lời sai hoặc gần đúng */}
          {isAnswered && currentSimilarity !== null && currentSimilarity < 100 && (
            <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 rounded-2xl text-sm font-semibold flex items-center justify-between animate-in slide-in-from-top-3 duration-250">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Đáp án chuẩn:{" "}
                  <strong className="text-base text-emerald-400 font-mono ml-1">
                    {currentWord?.definition}
                  </strong>
                </span>
              </span>
              <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                Khớp {currentSimilarity}%
              </span>
            </div>
          )}

          {/* Nút hành động */}
          <div className="flex flex-col items-center gap-2">
            <Button
              type="submit"
              disabled={!isAnswered && !userInput.trim()}
              className="w-full h-14 rounded-2xl text-base font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10 active:scale-95 transition-all gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {!isAnswered ? "Kiểm tra đáp án" : currentIndex === words.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5 text-slate-600" />
              <span>Nhấn phím [<span className="font-mono">Enter</span>] để kiểm tra hoặc tiếp tục</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}