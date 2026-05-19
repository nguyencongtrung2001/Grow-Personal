"use client";
import React from "react";
import CardWord from "./CardWord";
import { WordPreview } from "@/app/vocab/data";
import { Button } from "@/components/ui/button";
import { BookOpen, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";
import { toggleStarAction } from "@/app/vocab/actions";

interface VocabListWordProps {
  words: WordPreview[];
  viewMode: "grid" | "list";
  searchQuery: string;
  onClearSearch: () => void;
  folderId: string;
}

export default function VocabListWord({
  words,
  viewMode,
  searchQuery,
  onClearSearch,
  folderId,
}: VocabListWordProps) {
  
  if (words.length > 0) {
    return (
      <div 
        className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-12"
            : "flex flex-col gap-4 pb-12"
        }
      >
        {words.map((card, idx) => (
          <CardWord
            key={`${card.word}-${idx}`}
            word={card.word}
            type={card.type}
            definition={card.definition}
            usage={card.usage}
            imageUrl={card.imageUrl}
            isStarred={card.isStarred}
            onToggleStar={() => toggleStarAction(card.word, folderId)}
            viewMode={viewMode}
          />
        ))}
      </div>
    );
  }

  // Fallback states when list is empty
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl py-16 gap-3">
      {searchQuery ? (
        <>
          <HelpCircle className="w-12 h-12 text-slate-300 animate-bounce duration-1000" />
          <div>
            <h4 className="text-base font-bold text-slate-800">Không tìm thấy kết quả phù hợp</h4>
            <p className="text-xs text-slate-500 mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc dọn sạch bộ lọc.</p>
          </div>
          <Button 
            variant="outline" 
            onClick={onClearSearch} 
            className="mt-2 font-bold text-xs border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Xóa bộ lọc
          </Button>
        </>
      ) : (
        <>
          <BookOpen className="w-12 h-12 text-sky-300 animate-pulse" />
          <div>
            <h4 className="text-base font-bold text-slate-800">Thư mục trống</h4>
            <p className="text-xs text-slate-500 mt-1">Bắt đầu quá trình học bằng cách thêm thẻ từ vựng đầu tiên của bạn!</p>
          </div>
          <Button 
            asChild
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs mt-2 px-4 py-2 rounded-xl shadow-md shadow-sky-600/10 cursor-pointer flex items-center gap-1.5"
          >
            <Link href="?addWord=true" scroll={false}>
              <Plus className="w-3.5 h-3.5" />
              Thêm thẻ từ ngay
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
