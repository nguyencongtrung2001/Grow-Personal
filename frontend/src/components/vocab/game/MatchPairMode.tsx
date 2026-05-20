'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card'; // Giả định dùng Shadcn UI
import { CheckCircle2 } from 'lucide-react';

interface GameCard {
  id: string;
  pairId: string;
  content: string;
  isMatched: boolean;
  isFlipped: boolean;
}

export default function MatchPairMode({ words }: { words: any[] }) {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  // Chỉ lấy tối đa 8 từ (16 thẻ) để đảm bảo UI không bị vỡ trên Mobile
  const gamePairs = useMemo(() => words.slice(0, 8), [words]);
  const totalPairs = gamePairs.length;

  // Khởi tạo Game
  useEffect(() => {
    const initializeGame = () => {
      const initialCards = gamePairs
        .flatMap((word) => [
          { id: `${word.id}-term`, pairId: word.id, content: word.term, isMatched: false, isFlipped: false },
          { id: `${word.id}-def`, pairId: word.id, content: word.definition, isMatched: false, isFlipped: false },
        ])
        .sort(() => Math.random() - 0.5); // Shuffle array

      setCards(initialCards);
    };
    initializeGame();
  }, [gamePairs]);

  const handleCardClick = (clickedCard: GameCard) => {
    // Chặn click nếu thẻ đã lật, đã match, hoặc đang lật 2 thẻ rồi
    if (clickedCard.isFlipped || clickedCard.isMatched || flippedIds.length >= 2) return;

    const newCards = cards.map(c => c.id === clickedCard.id ? { ...c, isFlipped: true } : c);
    setCards(newCards);

    const newFlippedIds = [...flippedIds, clickedCard.id];
    setFlippedIds(newFlippedIds);

    // Xử lý logic khi đã lật 2 thẻ
    if (newFlippedIds.length === 2) {
      const [firstId, secondId] = newFlippedIds;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.pairId === secondCard?.pairId) {
        // MATCH: Trùng khớp
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true, isFlipped: false } : c
          ));
          setFlippedIds([]);

          setMatchedPairs(prev => {
            const newMatched = prev + 1;
            if (newMatched === totalPairs) setIsFinished(true);
            return newMatched;
          });
        }, 500);
      } else {
        // UNMATCH: Không khớp, úp lại sau 1s
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="text-center animate-in zoom-in duration-500 max-w-md mx-auto mt-20">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Tuyệt vời!</h2>
        <p className="text-muted-foreground mb-8">Bạn đã ghép chính xác toàn bộ {totalPairs} cặp từ.</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
        >
          Chơi lại
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between bg-card p-4 rounded-xl border">
        <span className="text-muted-foreground">Tiến độ</span>
        <span className="font-bold text-lg text-primary">{matchedPairs} / {totalPairs} cặp</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card) => {
          // Styling động dựa trên trạng thái
          const baseClass = "h-24 md:h-32 p-4 flex items-center justify-center text-center cursor-pointer transition-all duration-300 rounded-xl border-2 select-none";
          let stateClass = "bg-card hover:border-primary/50 text-transparent"; // Mặc định ẩn text

          if (card.isMatched) {
            stateClass = "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400 opacity-50 scale-95 pointer-events-none";
          } else if (card.isFlipped) {
            stateClass = "bg-primary text-primary-foreground border-primary shadow-lg scale-105";
          }

          return (
            <Card
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`${baseClass} ${stateClass}`}
            >
              <span className={`font-medium text-sm md:text-base ${!card.isFlipped && !card.isMatched ? 'opacity-0' : 'opacity-100'}`}>
                {card.content}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}