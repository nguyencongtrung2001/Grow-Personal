"use client";
import React, { useState, useEffect } from "react";
import VocabDeckGrid, { initialVocabDecks, DeckItem, WordPreview } from "@/components/vocab/VocabDeckGrid";
import VocabAddFolder from "@/components/vocab/VocabAddFolder";
import VocabAddWord from "@/components/vocab/VocabAddWord";
import { Button } from "@/components/ui/button";
import { FolderPlus as FolderPlusIcon } from "lucide-react";
import VocabMotion from "@/components/vocab/VocabMotion";

export default function VocabularyPage() {
  const [decks, setDecks] = useState<DeckItem[]>(initialVocabDecks);
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);

  // Initialize and load decks from localStorage on client-side
  useEffect(() => {
    const saved = localStorage.getItem("vocab-decks");
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        // Upgrade check: if default mock words are missing their high-fidelity images/usage, migrate them
        const needsMigration = parsed.some((d: DeckItem) =>
          d.words.some((w: WordPreview) => w.word === "Resilient" && !w.imageUrl)
        );
        if (needsMigration) {
          localStorage.setItem("vocab-decks", JSON.stringify(initialVocabDecks));
          parsed = initialVocabDecks;
        }

        const timer = setTimeout(() => {
          setDecks(parsed);
        }, 0);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error("Failed to load vocabulary decks from localStorage", e);
      }
    } else {
      localStorage.setItem("vocab-decks", JSON.stringify(initialVocabDecks));
    }
  }, []);

  const handleCreateFolder = (title: string, description: string) => {
    const colors = [
      "text-sky-600",
      "text-blue-500",
      "text-cyan-500",
      "text-emerald-500",
      "text-indigo-500",
      "text-violet-500",
      "text-rose-500"
    ];
    const themeColor = colors[Math.floor(Math.random() * colors.length)];

    const newDeck: DeckItem = {
      id: `custom-${Date.now()}`,
      title,
      description: description || "Chưa có mô tả chi tiết.",
      totalCards: 0,
      themeColor,
      words: []
    };

    const updatedDecks = [newDeck, ...decks];
    setDecks(updatedDecks);
    localStorage.setItem("vocab-decks", JSON.stringify(updatedDecks));
  };

  const handleCreateWord = (wordData: {
    word: string;
    type: string;
    definition: string;
    imageUrl?: string;
    usage?: string;
    folderId: string;
  }) => {
    const updatedDecks = decks.map((deck) => {
      if (deck.id === wordData.folderId) {
        return {
          ...deck,
          totalCards: deck.totalCards + 1,
          words: [
            {
              word: wordData.word,
              type: wordData.type,
              definition: wordData.definition,
              isStarred: false,
              imageUrl: wordData.imageUrl,
              usage: wordData.usage
            },
            ...deck.words,
          ],
        };
      }
      return deck;
    });

    setDecks(updatedDecks);
    localStorage.setItem("vocab-decks", JSON.stringify(updatedDecks));
  };

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
          onClick={() => setIsAddFolderOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 h-11 rounded-xl shadow-md shadow-sky-600/10 flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-center transition-all active:scale-[0.98]"
        >
          <FolderPlusIcon className="w-4 h-4 text-white" />
          Tạo thư mục mới
        </Button>
      </header>

      {/* Phân hệ Control Panel (Tạo mới & Lựa chọn chế độ học) */}
      <VocabMotion
      />

      {/* Phân hệ Thư mục lưu trữ tệp từ vựng */}
      <VocabDeckGrid decks={decks} />

      {/* Component Modal thêm thư mục mới */}
      {isAddFolderOpen && (
        <VocabAddFolder
          isOpen={isAddFolderOpen}
          onClose={() => setIsAddFolderOpen(false)}
          onSave={handleCreateFolder}
        />
      )}

      {/* Component Modal thêm thẻ từ mới */}
      {isAddWordOpen && (
        <VocabAddWord
          isOpen={isAddWordOpen}
          onClose={() => setIsAddWordOpen(false)}
          decks={decks}
          onSave={handleCreateWord}
        />
      )}
    </div>
  );
}