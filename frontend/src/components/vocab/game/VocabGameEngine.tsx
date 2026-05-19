// src/components/vocab/game/VocabGameEngine.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Tải bất đồng bộ các chế độ chơi để tối ưu JS Bundle Size
const FlashcardMode = dynamic(() => import("./FlashcardMode"), { loading: () => <p className="text-center py-12 text-slate-400 font-medium">Đang tải cấu hình Flashcard...</p> });
const QuizMode = dynamic(() => import("./QuizMode"), { loading: () => <p className="text-center py-12 text-slate-400 font-medium">Đang tải dữ liệu bộ đề...</p> });

interface Word {
  id: string;
  word: string;
  type: string;
  definition: string;
  example: string;
  image?: string;
}

interface GameEngineProps {
  mode: string;
  words: Word[];
  slug: string;
}

export default function VocabGameEngine({ mode, words, slug }: GameEngineProps) {
  if (!words || words.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto mt-12">
        <p className="text-slate-500 font-medium mb-4">Thư mục này chưa có từ vựng để luyện tập.</p>
        <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl"><Link href={`/vocab/${slug}`}>Quay lại</Link></Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      {/* Nút thoát nhanh chế độ chơi về lại danh mục gốc */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-900 gap-2 font-medium rounded-xl">
          <Link href={`/vocab/${slug}`}>
            <ArrowLeft className="w-4 h-4" /> Thoát chế độ chơi
          </Link>
        </Button>
        <div className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 font-mono font-bold uppercase tracking-wider rounded-lg border border-slate-200 shadow-none">
          Chế độ: {mode === "flashcard" ? "Thẻ ghi nhớ" : "Trắc nghiệm tốc độ"}
        </div>
      </div>

      {/* Phân phối luồng hiển thị giao diện theo chế độ */}
      {mode === "flashcard" && <FlashcardMode words={words} />}
      {mode === "quiz" && <QuizMode words={words} />}
    </div>
  );
}