// src/components/vocab/game/QuizABCDMode.tsx
"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, Keyboard, Sparkles } from "lucide-react";
import GameHeader from "./shared/GameHeader";
import ConfettiEffect from "./shared/ConfettiEffect";

interface Word {
  id: string;
  word: string;
  definition: string;
  type?: string;
  example?: string;
}

interface QuestionResult {
  wordId: string;
  wordText: string;
  selectedOption: string | null;
  correctOption: string;
  isCorrect: boolean;
}

interface QuizABCDModeProps {
  words: Word[];
  onFinish: (result: { score: number; history: QuestionResult[] }) => void;
  slug: string;
}

function createSeededRandom(seedString: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedString.length; i++) {
    h = Math.imul(h ^ seedString.charCodeAt(i), 16777619);
  }
  return function () {
    h += 0xe120fc15;
    let z = h;
    z = Math.imul(z ^ (z >>> 16), 0x21f0aa7c);
    z = Math.imul(z ^ (z >>> 15), 0x735a2d97);
    z ^= z >>> 15;
    return (z >>> 0) / 4294967296;
  };
}

export default function QuizABCDMode({ words, onFinish, slug }: QuizABCDModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<QuestionResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentWord = words && words.length >= 4 ? words[currentIndex] : null;
  const isFinished = history.length === words.length && isAnswered;

  const options = useMemo(() => {
    if (!currentWord || !words || words.length < 4) return [];

    const otherDefinitions = words
      .filter((w) => w.id !== currentWord.id)
      .map((w) => w.definition);

    const uniqueOthers = Array.from(new Set(otherDefinitions));
    const rand = createSeededRandom(`${currentWord.id}-${words.length}`);

    const wrongOptions: string[] = [];
    const tempOthers = [...uniqueOthers];

    while (wrongOptions.length < 3 && tempOthers.length > 0) {
      const randIdx = Math.floor(rand() * tempOthers.length);
      wrongOptions.push(tempOthers[randIdx]);
      tempOthers.splice(randIdx, 1);
    }

    if (wrongOptions.length < 3) {
      const fallbackOthers = [...otherDefinitions];
      while (wrongOptions.length < 3 && fallbackOthers.length > 0) {
        const randIdx = Math.floor(rand() * fallbackOthers.length);
        wrongOptions.push(fallbackOthers[randIdx]);
        fallbackOthers.splice(randIdx, 1);
      }
    }

    const allOptions = [currentWord.definition, ...wrongOptions];

    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const temp = allOptions[i];
      allOptions[i] = allOptions[j];
      allOptions[j] = temp;
    }

    return allOptions;
  }, [currentWord, words]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const triggerFinish = useCallback((updatedHistory: QuestionResult[], finalScore: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const accuracy = (finalScore / words.length) * 100;
    if (accuracy >= 80) {
      setShowConfetti(true);
    }

    setTimeout(() => {
      onFinish({
        score: finalScore,
        history: updatedHistory,
      });
    }, 1500);
  }, [words.length, onFinish]);

  const handleSelectOption = useCallback((option: string | null, isTimeout = false) => {
    if (isAnswered || !currentWord) return;
    setIsAnswered(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = option === currentWord.definition;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    const newHistoryItem: QuestionResult = {
      wordId: currentWord.id,
      wordText: currentWord.word,
      selectedOption: option,
      correctOption: currentWord.definition,
      isCorrect,
    };
    const nextHistory = [...history, newHistoryItem];
    setHistory(nextHistory);
    setSelectedOption(option);

    if (!isCorrect && option !== null) {
      const idx = options.indexOf(option);
      setShakeIndex(idx);
      setTimeout(() => setShakeIndex(null), 500);
    }

    if (isTimeout) {
      setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setTimeLeft(30);
        } else {
          triggerFinish(nextHistory, newScore);
        }
      }, 1500);
    }
  }, [isAnswered, currentWord, score, history, options, currentIndex, words.length, triggerFinish]);

  useEffect(() => {
    if (isAnswered || isFinished) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSelectOption(null, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, isFinished, handleSelectOption]);

  const handleNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      triggerFinish(history, score);
    }
  }, [currentIndex, words.length, history, score, triggerFinish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswered) {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
          e.preventDefault();
          handleNext();
        }
        return;
      }

      let choiceIdx: number | null = null;
      if (e.code === "KeyA" || e.code === "Digit1") choiceIdx = 0;
      else if (e.code === "KeyB" || e.code === "Digit2") choiceIdx = 1;
      else if (e.code === "KeyC" || e.code === "Digit3") choiceIdx = 2;
      else if (e.code === "KeyD" || e.code === "Digit4") choiceIdx = 3;

      if (choiceIdx !== null && choiceIdx < options.length) {
        e.preventDefault();
        handleSelectOption(options[choiceIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswered, options, handleSelectOption, handleNext]);

  if (!currentWord || words.length < 4) {
    return (
      <div className="w-full bg-slate-950 border border-slate-900 rounded-3xl p-12 text-center text-slate-400 space-y-4">
        <p className="text-xl font-bold">Không đủ dữ liệu câu hỏi</p>
        <p className="text-sm text-slate-500">Chế độ này cần ít nhất 4 từ vựng trong thư mục để hoạt động.</p>
      </div>
    );
  }

  const timerRadius = 16;
  const timerCircumference = 2 * Math.PI * timerRadius;
  const strokeDashoffset = timerCircumference - (timeLeft / 30) * timerCircumference;

  const timerElement = (
    <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-full shadow-inner shadow-indigo-500/10">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={timerRadius}
          className="stroke-slate-850 fill-none"
          strokeWidth="3"
        />
        <circle
          cx="20"
          cy="20"
          r={timerRadius}
          className="stroke-amber-400 fill-none transition-all duration-1000 ease-linear"
          strokeWidth="3"
          strokeDasharray={timerCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-mono font-black text-amber-400">
        {timeLeft}s
      </span>
    </div>
  );

  return (
    <div className="w-full min-h-[750px] bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      {showConfetti && <ConfettiEffect />}

      <div className="z-10">
        <GameHeader
          title="Trắc nghiệm phản xạ"
          currentIndex={currentIndex}
          totalQuestions={words.length}
          score={score}
          slug={slug}
          timerElement={timerElement}
        />
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 grow flex flex-col justify-center gap-6 z-10 py-6">
        {/* Khối Câu Hỏi Panel (Dạng hologram neon cực ngầu) */}
        <Card className="p-8 text-center bg-slate-900/60 border border-slate-850 text-white rounded-3xl shadow-xl relative overflow-hidden transition-all hover:border-slate-800">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-850 w-fit mx-auto">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Chọn định nghĩa đúng</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-350 mt-6 tracking-tight drop-shadow-sm select-text">
            {currentWord.word}
          </h2>
        </Card>

        {/* Lưới Đáp Án 2x2 (Phong cách tactile keycap gaming) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {options.map((option, idx) => {
            const labelKey = ["A", "B", "C", "D"][idx];
            const isSelected = selectedOption === option;
            const isCorrectAnswer = option === currentWord.definition;
            const isShake = shakeIndex === idx;

            let cardStyles = "border-slate-850 bg-slate-900/40 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700/80 active:scale-[0.98]";
            let keyStyle = "bg-slate-950 border-slate-800 text-slate-400 group-hover:border-slate-700";

            if (isAnswered) {
              if (isCorrectAnswer) {
                cardStyles = "border-emerald-500 bg-emerald-950/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                keyStyle = "bg-emerald-900/50 border-emerald-500 text-emerald-300";
              } else if (isSelected) {
                cardStyles = "border-rose-500 bg-rose-950/20 text-rose-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]";
                keyStyle = "bg-rose-900/50 border-rose-500 text-rose-300";
              } else {
                cardStyles = "border-slate-900 bg-slate-950/30 text-slate-600 opacity-40 cursor-not-allowed";
                keyStyle = "bg-slate-950 border-slate-900 text-slate-700";
              }
            }

            return (
              <Card
                key={idx}
                onClick={() => !isAnswered && handleSelectOption(option)}
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer border font-bold text-sm tracking-tight transition-all duration-200 select-none group relative overflow-hidden ${cardStyles} ${isShake ? "animate-shake" : ""
                  }`}
              >
                {/* Visual tactile mechanical-keycap style badge */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 transition-all font-mono shadow-inner ${keyStyle}`}>
                  {labelKey}
                </div>

                <span className="grow leading-snug select-text">{option}</span>

                {isAnswered && (
                  <div className="shrink-0">
                    {isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      isSelected && <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Nút Chuyển Câu Kế Tiếp */}
        {isAnswered && (
          <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
            <Button
              onClick={handleNext}
              className="w-full h-14 rounded-2xl text-base font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10 active:scale-95 transition-all gap-2 cursor-pointer"
            >
              {currentIndex === words.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5 text-slate-600" />
              <span>Nhấn phím [<span className="font-mono">Enter</span>] để tiếp tục</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}