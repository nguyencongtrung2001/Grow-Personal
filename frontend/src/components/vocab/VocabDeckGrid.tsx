"use client";
import React from "react";
import VocabDeckCard from "./VocabDeckCard";
import { FolderOpen } from "lucide-react";

export interface WordPreview {
  word: string;
  type: string;
  definition: string;
  isStarred: boolean;
}

export interface DeckItem {
  id: string;
  title: string;
  description: string;
  totalCards: number;
  themeColor: string; // Tailwind class định hình màu icon folder
  words: WordPreview[];
}

const vocabDecks: DeckItem[] = [
  {
    id: "ielts-core",
    title: "IELTS Core Academic",
    description: "Từ vựng nâng cao phục vụ kỹ năng Speaking & Writing đạt Band 7.0+",
    totalCards: 45,
    themeColor: "text-sky-600",
    words: [
      { word: "Resilient", type: "adj", definition: "Kiên cường, phục hồi nhanh", isStarred: true },
      { word: "Ubiquitous", type: "adj", definition: "Phổ biến khắp mọi nơi", isStarred: false },
      { word: "Pragmatic", type: "adj", definition: "Thực tế, thực dụng", isStarred: true },
    ]
  },
  {
    id: "tech-it",
    title: "Tech & Software Engineering",
    description: "Thuật ngữ chuyên ngành, thiết kế hệ thống và cấu trúc dữ liệu cơ bản.",
    totalCards: 28,
    themeColor: "text-blue-500",
    words: [
      { word: "Idempotent", type: "adj", definition: "Giao dịch lặp lại không đổi trạng thái", isStarred: true },
      { word: "Asynchronous", type: "adj", definition: "Bất đồng bộ, không cùng thời gian", isStarred: false },
      { word: "Concurrency", type: "n", definition: "Sự thực thi đồng thời hệ thống", isStarred: false },
    ]
  },
  {
    id: "daily-life",
    title: "Daily Life & Communication",
    description: "Cụm từ thông dụng, thành ngữ giao tiếp tự nhiên hàng ngày.",
    totalCards: 64,
    themeColor: "text-cyan-500",
    words: [
      { word: "Bite the bullet", type: "idiom", definition: "Cắn răng chịu đựng khó khăn", isStarred: false },
      { word: "Break a leg", type: "idiom", definition: "Chúc may mắn trước khi diễn", isStarred: true },
      { word: "Hit the sack", type: "idiom", definition: "Đi ngủ vì quá mệt mỏi", isStarred: false },
    ]
  }
];

export default function VocabDeckGrid() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-sky-600" />
          Thư Mục Từ Vựng Của Bạn
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-sky-100/60 border border-sky-200 px-2.5 py-1 rounded-md">
          Tổng cộng: {vocabDecks.length} Thư mục
        </span>
      </div>

      {/* Khối hiển thị lưới */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {vocabDecks.map((deck) => (
          <VocabDeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </section>
  );
}