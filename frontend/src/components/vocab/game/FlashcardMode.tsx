'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

export default function FlashcardMode({ words }: { words: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < words.length - 1) setCurrentIndex((i) => i + 1);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    }, 150);
  };

  const currentWord = words[currentIndex];

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-8">
      <div className="text-sm font-medium text-muted-foreground bg-secondary px-4 py-1 rounded-full">
        {currentIndex + 1} / {words.length}
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="relative w-full aspect-[4/3] cursor-pointer group perspective-[1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

          {/* Mặt trước (Thuật ngữ) */}
          <div className="absolute inset-0 backface-hidden bg-card border-2 border-border rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">{currentWord.term}</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <RotateCw className="w-4 h-4" /> Nhấn để lật
            </p>
          </div>

          {/* Mặt sau (Định nghĩa) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary text-primary-foreground rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">{currentWord.definition}</h3>
            {currentWord.example && (
              <p className="italic opacity-90">"{currentWord.example}"</p>
            )}
          </div>

        </div>
      </div>

      {/* Điều hướng */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-4 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-50 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
          className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}