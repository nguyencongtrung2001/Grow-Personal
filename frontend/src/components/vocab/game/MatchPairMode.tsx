// src/components/vocab/game/MatchPairMode.tsx
"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Clock, Zap, Sparkles } from "lucide-react";
import GameHeader from "./shared/GameHeader";
import ConfettiEffect from "./shared/ConfettiEffect";

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
  onFinish: (result: { timeElapsed: number; bestStreak: number; score: number }) => void;
  slug: string;
}

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

function getInitialSeparatedCards(playWords: Word[]) {
  if (!playWords || playWords.length === 0) return { enCards: [], viCards: [] };

  const enCards: MatchCard[] = playWords.map((w) => ({
    id: `${w.id}-en`,
    wordId: w.id,
    text: w.word,
    type: "en",
    isMatched: false,
  }));

  const viCards: MatchCard[] = playWords.map((w) => ({
    id: `${w.id}-vi`,
    wordId: w.id,
    text: w.definition,
    type: "vi",
    isMatched: false,
  }));

  const seedBase = playWords.map((w) => w.id).join("-");
  const randEn = createSeededRandom(seedBase + "-en");
  const randVi = createSeededRandom(seedBase + "-vi");

  for (let i = enCards.length - 1; i > 0; i--) {
    const j = Math.floor(randEn() * (i + 1));
    const temp = enCards[i];
    enCards[i] = enCards[j];
    enCards[j] = temp;
  }

  for (let i = viCards.length - 1; i > 0; i--) {
    const j = Math.floor(randVi() * (i + 1));
    const temp = viCards[i];
    viCards[i] = viCards[j];
    viCards[j] = temp;
  }

  return { enCards, viCards };
}

export default function MatchPairMode({ words, onFinish, slug }: MatchPairModeProps) {
  const playWords = useMemo(() => {
    return words ? words.slice(0, 6) : [];
  }, [words]);

  const [separatedCards, setSeparatedCards] = useState<{ enCards: MatchCard[]; viCards: MatchCard[] }>(() =>
    getInitialSeparatedCards(playWords)
  );

  const [selectedEnIdx, setSelectedEnIdx] = useState<number | null>(null);
  const [selectedViIdx, setSelectedViIdx] = useState<number | null>(null);
  
  const [matchesFound, setMatchesFound] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const [combo, setCombo] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showComboAnimation, setShowComboAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    stopwatchRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    };
  }, []);

  const triggerFinish = useCallback((finalTime: number, finalStreak: number) => {
    if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    setShowConfetti(true);

    setTimeout(() => {
      onFinish({
        timeElapsed: finalTime,
        bestStreak: finalStreak,
        score: playWords.length * 15 + finalStreak * 5,
      });
    }, 1500);
  }, [playWords.length, onFinish]);

  const checkMatch = useCallback((enIdx: number, viIdx: number) => {
    lockRef.current = true;
    const enCard = separatedCards.enCards[enIdx];
    const viCard = separatedCards.viCards[viIdx];

    if (enCard.wordId === viCard.wordId) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      if (nextCombo > bestStreak) setBestStreak(nextCombo);
      
      setShowComboAnimation(true);
      setTimeout(() => setShowComboAnimation(false), 800);

      setTimeout(() => {
        setSeparatedCards((prev) => {
          const updatedEn = [...prev.enCards];
          const updatedVi = [...prev.viCards];
          updatedEn[enIdx] = { ...updatedEn[enIdx], isMatched: true };
          updatedVi[viIdx] = { ...updatedVi[viIdx], isMatched: true };
          return { enCards: updatedEn, viCards: updatedVi };
        });

        const nextMatches = matchesFound + 1;
        setMatchesFound(nextMatches);
        setSelectedEnIdx(null);
        setSelectedViIdx(null);
        lockRef.current = false;

        if (nextMatches === playWords.length) {
          triggerFinish(timeElapsed, Math.max(nextCombo, bestStreak));
        }
      }, 200);
    } else {
      setCombo(0);
      setTimeout(() => {
        setSelectedEnIdx(null);
        setSelectedViIdx(null);
        lockRef.current = false;
      }, 600);
    }
  }, [separatedCards, combo, bestStreak, matchesFound, playWords.length, timeElapsed, triggerFinish]);

  const handleCardClick = (index: number, column: "en" | "vi") => {
    if (lockRef.current) return;

    if (column === "en") {
      const card = separatedCards.enCards[index];
      if (card.isMatched) return;
      
      if (selectedEnIdx === index) {
        setSelectedEnIdx(null);
        return;
      }

      if (selectedViIdx !== null) {
        setSelectedEnIdx(index);
        checkMatch(index, selectedViIdx);
      } else {
        setSelectedEnIdx(index);
      }
    } else {
      const card = separatedCards.viCards[index];
      if (card.isMatched) return;

      if (selectedViIdx === index) {
        setSelectedViIdx(null);
        return;
      }

      if (selectedEnIdx !== null) {
        setSelectedViIdx(index);
        checkMatch(selectedEnIdx, index);
      } else {
        setSelectedViIdx(index);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const timerElement = (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-inner text-amber-400 font-bold font-mono text-sm shadow-indigo-500/5">
      <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
      <span>{formatTime(timeElapsed)}</span>
    </div>
  );

  return (
    <div className="w-full min-h-[750px] bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      {showConfetti && <ConfettiEffect />}

      <div className="z-10">
        <GameHeader
          title="Ghép cặp từ - nghĩa"
          currentIndex={matchesFound}
          totalQuestions={playWords.length}
          score={matchesFound * 15 + combo * 5}
          slug={slug}
          timerElement={timerElement}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 grow flex flex-col justify-center gap-6 z-10 py-6">
        {/* Khối hiển thị nhân hệ số Combo tích lũy */}
        <div className="h-12 flex items-center justify-center relative">
          {combo > 1 && (
            <div className={`flex items-center gap-1 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-black text-sm tracking-wide shadow-md shadow-amber-500/5 animate-pulse ${
              showComboAnimation ? "scale-110 duration-200" : "transition-transform"
            }`}>
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>STREAK: {combo}x</span>
            </div>
          )}
        </div>

        {/* Lưới ghép thẻ phân chia 2 cột rõ rệt */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* CỘT EN: Cột Tiếng Anh */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-xl w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>TIẾNG ANH</span>
            </div>

            {separatedCards.enCards.map((card, idx) => {
              const isSelected = selectedEnIdx === idx;
              const isMatched = card.isMatched;

              let cardStyles = "border-slate-850 bg-slate-900/40 text-slate-350 hover:bg-slate-900/80 hover:border-slate-700/80 active:scale-[0.98]";
              if (isSelected) {
                cardStyles = "border-amber-400 bg-amber-950/20 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
              }

              return (
                <div key={card.id} className="h-20 relative">
                  <Card
                    onClick={() => handleCardClick(idx, "en")}
                    className={`absolute inset-0 p-4 rounded-2xl flex items-center justify-center font-black text-base md:text-lg border cursor-pointer select-none transition-all duration-300 ${cardStyles} ${
                      isMatched ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                    }`}
                  >
                    <span className="truncate select-text">{card.text}</span>
                  </Card>

                  {/* Ô trống placeholder tinh tế để giữ layout khi thẻ biến mất */}
                  {isMatched && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-900/30 flex items-center justify-center text-slate-700 pointer-events-none animate-in fade-in duration-300">
                      <div className="w-2.5 h-2.5 bg-slate-900/20 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CỘT VI: Cột Tiếng Việt */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-xl w-fit">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>ĐỊNH NGHĨA</span>
            </div>

            {separatedCards.viCards.map((card, idx) => {
              const isSelected = selectedViIdx === idx;
              const isMatched = card.isMatched;

              let cardStyles = "border-slate-850 bg-slate-900/40 text-slate-350 hover:bg-slate-900/80 hover:border-slate-700/80 active:scale-[0.98]";
              if (isSelected) {
                cardStyles = "border-amber-400 bg-amber-950/20 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
              }

              return (
                <div key={card.id} className="h-20 relative">
                  <Card
                    onClick={() => handleCardClick(idx, "vi")}
                    className={`absolute inset-0 p-4 rounded-2xl flex items-center justify-center font-bold text-xs md:text-sm border cursor-pointer select-none text-center transition-all duration-300 leading-snug ${cardStyles} ${
                      isMatched ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                    }`}
                  >
                    <span className="line-clamp-2 select-text">{card.text}</span>
                  </Card>

                  {/* Ô trống placeholder tinh tế để giữ layout khi thẻ biến mất */}
                  {isMatched && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-900/30 flex items-center justify-center text-slate-700 pointer-events-none animate-in fade-in duration-300">
                      <div className="w-2.5 h-2.5 bg-slate-900/20 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}