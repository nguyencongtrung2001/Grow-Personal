"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { initialVocabDecks, DeckItem, WordPreview } from "@/components/vocab/VocabDeckGrid";
import VocabWordSection from "@/components/vocab/VocabWordSection";
import VocabAddWord from "@/components/vocab/VocabAddWord";
import { Button } from "@/components/ui/button";
import { Plus, Folder } from "lucide-react";
import VocabMini from "@/components/vocab/VocabMini";

export default function VocabFolderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [decks, setDecks] = useState<DeckItem[]>([]);
  const [deck, setDeck] = useState<DeckItem | null>(null);
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load decks from localStorage and match current folder slug
  useEffect(() => {
    let currentDecks = initialVocabDecks;
    const saved = localStorage.getItem("vocab-decks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Upgrade check: if default mock words are missing their high-fidelity images/usage, migrate them
        const needsMigration = parsed.some((d: DeckItem) =>
          d.words.some((w: WordPreview) => w.word === "Resilient" && !w.imageUrl)
        );
        if (needsMigration) {
          localStorage.setItem("vocab-decks", JSON.stringify(initialVocabDecks));
          currentDecks = initialVocabDecks;
        } else {
          currentDecks = parsed;
        }
      } catch (e) {
        console.error("Failed to load vocab decks", e);
      }
    } else {
      localStorage.setItem("vocab-decks", JSON.stringify(initialVocabDecks));
    }

    const timer = setTimeout(() => {
      setDecks(currentDecks);
      const matchedDeck = currentDecks.find(d => d.id === slug);
      if (matchedDeck) {
        setDeck(matchedDeck);
      } else {
        router.push("/vocab");
      }
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [slug, router]);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto py-12 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
        <p className="text-sm text-slate-500 font-bold">Đang tải thư mục...</p>
      </div>
    );
  }

  if (!deck) return null;

  // Handle new word creation
  const handleCreateWord = (wordData: {
    word: string;
    type: string;
    definition: string;
    imageUrl?: string;
    usage?: string;
    folderId: string;
  }) => {
    const updatedDecks = decks.map((d) => {
      if (d.id === wordData.folderId) {
        const newWord = {
          word: wordData.word,
          type: wordData.type,
          definition: wordData.definition,
          isStarred: false,
          imageUrl: wordData.imageUrl,
          usage: wordData.usage
        };
        const updatedWords = [newWord, ...d.words];
        const updatedDeck = { ...d, totalCards: d.totalCards + 1, words: updatedWords };
        setDeck(updatedDeck);
        return updatedDeck;
      }
      return d;
    });
    setDecks(updatedDecks);
    localStorage.setItem("vocab-decks", JSON.stringify(updatedDecks));
  };

  // Toggle favorite / starred word — stable with useCallback would require memo; kept simple here
  const handleToggleStar = (wordName: string) => {
    const updatedDecks = decks.map((d) => {
      if (d.id === deck.id) {
        const updatedWords = d.words.map((w) =>
          w.word === wordName ? { ...w, isStarred: !w.isStarred } : w
        );
        const updatedDeck = { ...d, words: updatedWords };
        setDeck(updatedDeck);
        return updatedDeck;
      }
      return d;
    });
    setDecks(updatedDecks);
    localStorage.setItem("vocab-decks", JSON.stringify(updatedDecks));
  };

  return (
    <div className="max-w-[1440px] mx-auto space-y-8 animate-in fade-in duration-300">

      {/* Directory Folder Header — never re-renders on search/viewMode change */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white border border-slate-150 rounded-2xl p-6 shadow-sm bg-linear-to-br from-white to-sky-50/10">
        <div className="flex items-start gap-4">
          <div className={`p-3 bg-sky-50 rounded-2xl shrink-0 ${deck.themeColor}`}>
            <Folder className="w-8 h-8 fill-current" />
          </div>
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                {deck.title}
              </h2>
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full shrink-0">
                📁 {deck.totalCards} từ vựng
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              {deck.description}
            </p>
          </div>
        </div>

        {/* Action Add Word Button */}
        <Button
          onClick={() => setIsAddWordOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 h-11 rounded-xl shadow-md shadow-sky-600/10 flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-center transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Thêm thẻ từ mới
        </Button>
      </div>

       <VocabMini/>
     
      <VocabWordSection
        words={deck.words}
        onToggleStar={handleToggleStar}
        onAddWordClick={() => setIsAddWordOpen(true)}
      />

      {/* Add Word Modal */}
      {isAddWordOpen && (
        <VocabAddWord
          isOpen={isAddWordOpen}
          onClose={() => setIsAddWordOpen(false)}
          decks={[deck]}
          onSave={handleCreateWord}
        />
      )}

    </div>
  );
}
