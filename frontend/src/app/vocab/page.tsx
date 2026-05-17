"use client";
import React from "react";
import VocabControlPanel from "@/components/vocab/VocabControlPanel";
import VocabDeckGrid from "@/components/vocab/VocabDeckGrid";

export default function VocabularyPage() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Không gian tiêu đề đầu trang */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Không Gian Từ Vựng
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Xây dựng vốn từ, bứt phá phản xạ thông qua hệ thống thẻ thông minh và mini-games.
          </p>
        </div>
      </header>

      {/* Phân hệ Control Panel (Tạo mới & Lựa chọn chế độ học) */}
      <VocabControlPanel />

      {/* Phân hệ Thư mục lưu trữ tệp từ vựng */}
      <VocabDeckGrid />
    </div>
  );
}