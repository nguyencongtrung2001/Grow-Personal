// src/components/vocab/game/VocabGameEngine.tsx
"use client";

import React, { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

import FlashcardMode from "./FlashcardMode";
import QuizABCDMode from "./QuizABCDMode";
import TranslateInputMode from "./TranslateInputMode";
import MatchPairMode from "./MatchPairMode";

import FlashcardResult from "./FlashcardResult";
import QuizResult from "./QuizResult";
import TranslateResult from "./TranslateResult";
import MatchResult from "./MatchResult";

interface Word {
  id: string;
  word: string;
  type: string;
  definition: string;
  example: string;
  imageUrl?: string;
}

interface GameEngineProps {
  mode: string;
  words: Word[];
  slug: string;
}

export default function VocabGameEngine({ mode, words, slug }: GameEngineProps) {
  const [resultData, setResultData] = useState<unknown | null>(null);

  const handleRestart = useCallback(() => {
    setResultData(null);
  }, []);

  const handleGameFinish = useCallback((data: unknown) => {
    setResultData(data);
  }, []);

  if (!words || words.length < 2) {
    return (
      <div className="text-center py-12 bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-2xl max-w-md mx-auto mt-12 px-6 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <BrainCircuit className="w-16 h-16 text-amber-400 mx-auto mb-6 animate-pulse" />
        <p className="text-white font-extrabold text-lg mb-2">Thư mục cần tối thiểu 2 từ vựng.</p>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Hãy thêm từ vựng vào thư mục &quot;{slug}&quot; trước khi bắt đầu các thử thách phản xạ.
        </p>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-50 text-white rounded-2xl h-12 px-6 font-bold cursor-pointer transition-all active:scale-95 shadow-lg shadow-indigo-600/10">
          <Link href={`/vocab/${slug}`}>Quay lại thêm từ</Link>
        </Button>
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-2">
        {mode === "flashcard" && (
          <FlashcardResult
            words={words}
            result={resultData as { knownIds: string[]; unknownIds: string[]; score: number }}
            onRestart={handleRestart}
            slug={slug}
          />
        )}
        {mode === "quiz" && (
          <QuizResult
            words={words}
            result={resultData as { score: number; history: Array<{ wordId: string; wordText: string; selectedOption: string | null; correctOption: string; isCorrect: boolean }> }}
            onRestart={handleRestart}
            slug={slug}
          />
        )}
        {mode === "translate" && (
          <TranslateResult
            words={words}
            result={{
              totalScore: (resultData as { score: number }).score,
              history: (resultData as { history: Array<{ wordId: string; wordText: string; userInput: string; correctAnswer: string; scoreEarned: number; similarity: number }> }).history,
            }}
            onRestart={handleRestart}
            slug={slug}
          />
        )}
        {mode === "match" && (
          <MatchResult
            words={words}
            result={resultData as { timeElapsed: number; bestStreak: number; score: number }}
            onRestart={handleRestart}
            slug={slug}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {mode === "flashcard" && (
        <FlashcardMode words={words} onFinish={handleGameFinish} slug={slug} />
      )}
      {mode === "quiz" && (
        <QuizABCDMode words={words} onFinish={handleGameFinish} slug={slug} />
      )}
      {mode === "translate" && (
        <TranslateInputMode words={words} onFinish={handleGameFinish} slug={slug} />
      )}
      {mode === "match" && (
        <MatchPairMode words={words} onFinish={handleGameFinish} slug={slug} />
      )}
    </div>
  );
}