import React from "react";
import VocabDeckGrid from "@/components/vocab/VocabDeckGrid";
import VocabAddFolder from "@/components/vocab/VocabAddFolder";
import VocabAddWord from "@/components/vocab/VocabAddWord";
import { FolderPlus as FolderPlusIcon } from "lucide-react";
import VocabMotion from "@/components/vocab/VocabMotion";
import { getDecksAction } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Không Gian Từ Vựng | Grow Personal",
  description: "Xây dựng vốn từ, bứt phá phản xạ thông qua hệ thống thẻ thông minh.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VocabularyPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const decks = await getDecksAction();
  
  const isAddFolderOpen = resolvedSearchParams.addFolder === "true";
  const isAddWordOpen = resolvedSearchParams.addWord === "true";

  return (
    <div className="max-w-[1440px] mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Không gian tiêu đề đầu trang */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Không Gian Từ Vựng
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Xây dựng vốn từ, bứt phá phản xạ thông qua hệ thống thẻ thông minh và mini-games.
          </p>
        </div>
        <Button 
          asChild
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 h-11 rounded-xl shadow-md shadow-sky-600/10 flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-center transition-all active:scale-[0.98]"
        >
          <Link href="?addFolder=true" scroll={false}>
            <FolderPlusIcon className="w-4 h-4 text-white" />
            Tạo thư mục mới
          </Link>
        </Button>
      </header>

      {/* Phân hệ Control Panel (Tạo mới & Lựa chọn chế độ học) */}
      <VocabMotion />

      {/* Phân hệ Thư mục lưu trữ tệp từ vựng */}
      <VocabDeckGrid decks={decks} />

      {/* Component Modal thêm thư mục mới */}
      {isAddFolderOpen && (
        <VocabAddFolder isOpen={true} />
      )}

      {/* Component Modal thêm thẻ từ mới */}
      {isAddWordOpen && (
        <VocabAddWord isOpen={true} decks={decks} />
      )}
    </div>
  );
}