"use client";
import React from "react";
import VocabDeckCard from "./VocabDeckCard";
import { FolderOpen } from "lucide-react";

import { DeckItem, initialVocabDecks } from "@/app/vocab/data";

interface VocabDeckGridProps {
  decks?: DeckItem[];
}

export default function VocabDeckGrid({ decks = initialVocabDecks }: VocabDeckGridProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-sky-600" />
          Thư Mục Từ Vựng Của Bạn
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-sky-100/60 border border-sky-200 px-2.5 py-1 rounded-md">
          Tổng cộng: {decks.length} Thư mục
        </span>
      </div>

      {/* Khối hiển thị lưới: hỗ trợ 4 cột trên màn hình rộng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {decks.map((deck) => (
          <VocabDeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </section>
  );
}