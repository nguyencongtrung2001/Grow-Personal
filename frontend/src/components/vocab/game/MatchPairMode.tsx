"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle } from "lucide-react";

interface Word {
  id: string;
  word: string;
  definition: string;
}

interface MatchCard {
  id: string;
  wordId: string;
  text: string;
  type: "en" | "vi";
  isMatched: boolean;
}

interface MatchPairModeProps {
  words: Word[];
}

// Hàm băm chuỗi để sinh hạt giống (seed) integer 32-bit từ string
function createSeededRandom(seedString: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedString.length; i++) {
    h = Math.imul(h ^ seedString.charCodeAt(i), 16777619);
  }
  return function () {
    h += 0xe120fc15;
    let z = h;
    z = Math.imul(z ^ (z >>> 16), 0x21f0aa7c);
    z = Math.imul(z ^ (z >>> 15), 0x735a2d97);
    z ^= z >>> 15;
    return (z >>> 0) / 4294967296;
  };
}

// Hàm khởi tạo bộ thẻ bài ghép cặp (Hoàn toàn thuần khiết và không dùng Math.random khi render)
function getInitialCards(playWords: Word[]) {
  if (!playWords || playWords.length === 0) return [];

  const newCards: MatchCard[] = [];
  playWords.forEach((w) => {
    newCards.push({
      id: `${w.id}-en`,
      wordId: w.id,
      text: w.word,
      type: "en",
      isMatched: false,
    });
    newCards.push({
      id: `${w.id}-vi`,
      wordId: w.id,
      text: w.definition,
      type: "vi",
      isMatched: false,
    });
  });

  // Sử dụng Seeded Random tạo từ ID các từ để xáo trộn thuần khiết (Pure Fisher-Yates)
  const seedSeed = playWords.map((w) => w.id).join("-");
  const rand = createSeededRandom(seedSeed);

  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const temp = newCards[i];
    newCards[i] = newCards[j];
    newCards[j] = temp;
  }

  return newCards;
}

export default function MatchPairMode({ words }: MatchPairModeProps) {
  // 1. CẮT MẢNG LẤY TỐI ĐA 6 TỪ VỰNG ĐẦU TIÊN (Tối đa 12 thẻ để bảo vệ UI)
  const playWords = useMemo(() => {
    return words ? words.slice(0, 6) : [];
  }, [words]);

  // 2. KHỞI TẠO STATE BAN ĐẦU SỬ DỤNG LAZY INITIALIZER (Tránh setState trong useEffect)
  const [cards, setCards] = useState<MatchCard[]>(() => getInitialCards(playWords));
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchesFound, setMatchesFound] = useState(0);
  
  // Lưu trữ tham chiếu timeout để hủy kích hoạt khi unmount (Chống rò rỉ bộ nhớ)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Khôi phục đồng bộ State khi props playWords thay đổi (Lập trình hướng React 19)
  const [prevPlayWords, setPrevPlayWords] = useState(playWords);
  if (playWords !== prevPlayWords) {
    setPrevPlayWords(playWords);
    setCards(getInitialCards(playWords));
    setSelectedIndices([]);
    setMatchesFound(0);
  }

  // Dọn dẹp timeout cũ nếu có khi unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 3. HÀM CHƠI VÁN MỚI (Được kích hoạt bởi sự kiện click chuột)
  const handleRestart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Sử dụng Math.random() ngẫu nhiên hạt giống mới khi chơi lại (Hợp lệ vì nằm trong event handler)
    const newCards = getInitialCards(playWords);
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newCards[i];
      newCards[i] = newCards[j];
      newCards[j] = temp;
    }

    setCards(newCards);
    setSelectedIndices([]);
    setMatchesFound(0);
  };

  // 4. LOGIC TƯƠNG TÁC THẺ & KIỂM TRA MATCH (Trực tiếp trong Event Handler để tối ưu hiệu năng)
  const handleCardClick = (index: number) => {
    // CHỐNG SPAM CLICK: Bỏ qua nếu thẻ đã matched, đang lật hoặc đang chờ xử lý so sánh
    if (
      cards[index].isMatched ||
      selectedIndices.includes(index) ||
      selectedIndices.length === 2
    ) {
      return;
    }

    const nextIndices = [...selectedIndices, index];
    setSelectedIndices(nextIndices);

    // Khi đã lật đủ 2 thẻ, tiến hành kiểm tra trùng khớp
    if (nextIndices.length === 2) {
      const [firstIdx, secondIdx] = nextIndices;
      const card1 = cards[firstIdx];
      const card2 = cards[secondIdx];

      if (card1.wordId === card2.wordId && card1.type !== card2.type) {
        // ĐÚNG CẶP: Ghép thẻ thành công ngay lập tức
        setCards((prev) => {
          const updated = [...prev];
          updated[firstIdx] = { ...updated[firstIdx], isMatched: true };
          updated[secondIdx] = { ...updated[secondIdx], isMatched: true };
          return updated;
        });
        setMatchesFound((prev) => prev + 1);
        setSelectedIndices([]);
      } else {
        // SAI CẶP: Chờ 800ms để người học ghi nhớ thẻ, sau đó úp ngược lại
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setSelectedIndices([]);
        }, 800);
      }
    }
  };

  // 5. MÀN HÌNH HOÀN THÀNH (END SCREEN)
  const isFinished = playWords.length > 0 && matchesFound === playWords.length;

  if (isFinished) {
    return (
      <div className="text-center mt-16 max-w-md mx-auto py-12 px-6 bg-white rounded-3xl border border-slate-200 shadow-md animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
          <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-emerald-600 mb-3 tracking-tight">Tuyệt vời!</h2>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          Bạn đã tìm được toàn bộ <strong className="text-slate-800 text-lg">{playWords.length}</strong> cặp thẻ từ vựng.
        </p>
        <Button
          onClick={handleRestart}
          className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg cursor-pointer transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5 animate-spin-slow" /> Chơi ván mới
        </Button>
      </div>
    );
  }

  // 6. GIAO DIỆN GAME CHÍNH (PLAYING SCREEN)
  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 animate-in fade-in duration-300">
      {/* Thông tin tiến độ */}
      <div className="flex justify-between items-center mb-6 bg-slate-50 border border-slate-100 py-3 px-5 rounded-2xl shadow-inner">
        <span className="text-sm font-semibold text-slate-500">
          Tiến trình ghép cặp:
        </span>
        <span className="text-sm font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/50 px-3.5 py-1 rounded-lg">
          {matchesFound} / {playWords.length} Cặp thẻ
        </span>
      </div>

      {/* Lưới Thẻ Bài Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 perspective-distant">
        {cards.map((card, idx) => {
          const isSelected = selectedIndices.includes(idx);
          const isMatched = card.isMatched;

          let cardStyle =
            "bg-white border-slate-200 text-slate-800 shadow-sm hover:border-amber-400 hover:shadow-md hover:scale-[1.02]";

          if (isSelected) {
            cardStyle =
              "bg-amber-50/80 border-amber-400 text-amber-900 ring-2 ring-amber-500/20 scale-[1.02]";
          }

          if (isMatched) {
            cardStyle =
              "bg-emerald-50/50 border-emerald-200 text-emerald-400 opacity-40 scale-95 pointer-events-none";
          }

          return (
            <Card
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`flex items-center justify-center p-5 h-36 rounded-2xl border-2 transition-all duration-300 transform-gpu cursor-pointer select-none ${cardStyle}`}
            >
              <span
                className={`text-center font-bold leading-snug ${
                  card.type === "en"
                    ? "text-xl md:text-2xl text-slate-900"
                    : "text-base md:text-lg text-slate-700"
                } ${isMatched ? "text-emerald-500" : ""}`}
              >
                {card.text}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}