"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Word { id: string; word: string; definition: string; }
interface MatchCard { id: string; wordId: string; text: string; type: "en" | "vi"; isMatched: boolean; }

export default function MatchPairMode({ words }: { words: Word[] }) {
  // Lấy tối đa 6 từ (tạo thành 12 thẻ) để không làm vỡ UI
  const playWords = useMemo(() => words.slice(0, 6), [words]);
  
  // Khởi tạo dữ liệu bảng game
  const initializeGameData = useCallback((wordsList: Word[]) => {
    const newCards: MatchCard[] = [];
    wordsList.forEach(w => {
      newCards.push({ id: `${w.id}-en`, wordId: w.id, text: w.word, type: "en", isMatched: false });
      newCards.push({ id: `${w.id}-vi`, wordId: w.id, text: w.definition, type: "vi", isMatched: false });
    });
    // Thuật toán trộn bài Fisher-Yates (Shuffle)
    return newCards.sort(() => 0.5 - Math.random());
  }, []);

  const [cards, setCards] = useState<MatchCard[]>(() => initializeGameData(playWords));
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchesFound, setMatchesFound] = useState(0);

  // Xử lý nút chơi lại
  const handleRestartGame = useCallback(() => {
    setCards(initializeGameData(playWords));
    setSelectedIndices([]);
    setMatchesFound(0);
  }, [playWords, initializeGameData]);

  const handleCardClick = (index: number) => {
    // Nếu thẻ đã được khớp, hoặc đã được chọn, hoặc đang có 2 thẻ được chọn thì không làm gì
    if (cards[index].isMatched || selectedIndices.includes(index) || selectedIndices.length >= 2) return;

    const newSelection = [...selectedIndices, index];
    setSelectedIndices(newSelection);

    if (newSelection.length === 2) {
      const [firstIdx, secondIdx] = newSelection;
      const card1 = cards[firstIdx];
      const card2 = cards[secondIdx];

      if (card1.wordId === card2.wordId && card1.type !== card2.type) {
        // MATCH: Đúng cặp
        setCards(prev => {
          const updated = [...prev];
          updated[firstIdx].isMatched = true;
          updated[secondIdx].isMatched = true;
          return updated;
        });
        setMatchesFound(prev => prev + 1);
        setSelectedIndices([]);
      } else {
        // NO MATCH: Sai cặp, lật úp lại sau 800ms
        setTimeout(() => {
          setSelectedIndices([]);
        }, 800);
      }
    }
  };

  if (matchesFound === playWords.length && playWords.length > 0) {
    return (
      <div className="text-center mt-20 animate-in zoom-in">
        <h2 className="text-4xl font-black text-emerald-600 mb-4">Tuyệt vời!</h2>
        <p className="text-slate-500 font-medium mb-8">Bạn đã tìm được toàn bộ {playWords.length} cặp thẻ.</p>
        <Button onClick={handleRestartGame} className="h-12 px-8 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">
          <RefreshCw className="w-4 h-4 mr-2"/> Chơi ván mới
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 perspective-[1000px]">
        {cards.map((card, idx) => {
          const isSelected = selectedIndices.includes(idx);
          const isMatched = card.isMatched;

          let cardStyle = "bg-white border-slate-200 text-slate-800 shadow-sm hover:border-amber-400 hover:shadow-md cursor-pointer";
          if (isSelected) cardStyle = "bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-500/20";
          if (isMatched) cardStyle = "bg-emerald-50 border-emerald-200 text-emerald-400 opacity-40 scale-95 pointer-events-none";

          return (
            <Card 
              key={card.id} 
              onClick={() => handleCardClick(idx)}
              className={`flex items-center justify-center p-4 h-32 md:h-40 rounded-2xl border-2 transition-all duration-300 transform-gpu select-none ${cardStyle}`}
            >
              <span className={`text-center font-bold ${card.type === "en" ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
                {card.text}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}