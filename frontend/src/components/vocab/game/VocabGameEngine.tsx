// src/components/vocab/game/VocabGameEngine.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BrainCircuit } from "lucide-react";
import Link from "next/link";

// Lazy Load các component game để tối ưu JS Bundle Size
const Loading = () => <p className="text-center py-16 text-slate-400 font-medium animate-pulse">Đang tải cấu hình game...</p>;

const FlashcardMode = dynamic(() => import("./FlashcardMode"), { loading: Loading });
const QuizABCDMode = dynamic(() => import("./QuizABCDMode"), { loading: Loading });
const TranslateInputMode = dynamic(() => import("./TranslateInputMode"), { loading: Loading });
const MatchPairMode = dynamic(() => import("./MatchPairMode"), { loading: Loading });

interface Word {
  id: string; word: string; type: string; definition: string; example: string; 
  imageUrl?: string;
}

interface GameEngineProps { mode: string; words: Word[]; slug: string; }

export default function VocabGameEngine({ mode, words, slug }: GameEngineProps) {
  if (!words || words.length < 2) { // Hầu hết các game cần tối thiểu 2 từ (đặc biệt là Match)
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto mt-12">
        <BrainCircuit className="w-16 h-16 text-amber-300 mx-auto mb-6" />
        <p className="text-slate-600 font-semibold mb-2">Thư mục cần tối thiểu 2 từ vựng.</p>
        <p className="text-sm text-slate-500 mb-6 px-6">Hãy thêm từ vựng vào thư mục &quot;{slug}&quot; trước khi bắt đầu thử thách.</p>
        <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl"><Link href={`/vocab/${slug}`}>Quay lại thêm từ</Link></Button>
      </div>
    );
  }

  // Map mode name sang tên hiển thị
  const modeNames: Record<string, string> = {
    flashcard: "Lật thẻ ghi nhớ",
    quiz: "Trắc nghiệm ABCD",
    translate: "Viết nghĩa từ vựng",
    match: "Ghép cặp từ - nghĩa",
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-2">
      {/* Nút thoát & Tiêu đề chế độ */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-2 z-40">
        <Button variant="ghost" asChild className="text-slate-600 hover:text-rose-600 hover:bg-rose-50 gap-2 font-medium rounded-xl h-10 px-4">
          <Link href={`/vocab/${slug}`}>
            <ArrowLeft className="w-4 h-4" /> Thoát game
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-lg shadow-inner">MODE</span>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">{modeNames[mode] || "Chế độ luyện tập"}</h1>
        </div>
      </div>

      {/* Phân phối hiển thị theo chế độ */}
      {mode === "flashcard" && <FlashcardMode words={words} />}
      {mode === "quiz" && <QuizABCDMode words={words} />}
      {mode === "translate" && <TranslateInputMode words={words} />}
      {mode === "match" && <MatchPairMode words={words} />}
    </div>
  );
}