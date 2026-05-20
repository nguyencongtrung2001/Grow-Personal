'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, CornerDownLeft } from 'lucide-react';

export default function TranslateInputMode({ words }: { words: any[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentWord = words[currentIdx];

  // Auto focus input mỗi khi chuyển câu
  useEffect(() => {
    if (status === 'idle') {
      inputRef.current?.focus();
    }
  }, [currentIdx, status]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status !== 'idle' || !inputValue.trim()) return;

    // So sánh chuỗi (bỏ qua hoa thường và khoảng trắng thừa)
    const isCorrect = inputValue.trim().toLowerCase() === currentWord.term.trim().toLowerCase();

    setStatus(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx < words.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setInputValue('');
      setStatus('idle');
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="text-center animate-in fade-in duration-500 mt-20">
        <h2 className="text-3xl font-bold text-primary mb-4">Bài tập hoàn tất!</h2>
        <p className="text-xl mb-6">Bạn đã gõ đúng {score} / {words.length} từ.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-lg">
          Luyện tập lại
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6 mt-10">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Câu hỏi {currentIdx + 1} / {words.length}</span>
        <span>Điểm: {score}</span>
      </div>

      <Card className="p-8 shadow-sm border-2">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary mb-2">Viết từ tương ứng với định nghĩa sau:</p>
          <h3 className="text-2xl font-semibold text-foreground">{currentWord.definition}</h3>
          {currentWord.example && (
            <p className="text-muted-foreground mt-2 italic">Gợi ý: "{currentWord.example.replace(currentWord.term, '___')}"</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={status !== 'idle'}
              placeholder="Gõ câu trả lời của bạn..."
              className={`text-lg py-6 pl-4 pr-12 transition-colors ${status === 'correct' ? 'border-green-500 bg-green-500/10 text-green-700' :
                  status === 'wrong' ? 'border-red-500 bg-red-500/10 text-red-700' :
                    'focus-visible:ring-primary'
                }`}
            />
            {status === 'idle' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50 flex items-center">
                <CornerDownLeft className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Feedback Area */}
          {status !== 'idle' && (
            <div className={`p-4 rounded-lg animate-in slide-in-from-top-2 ${status === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {status === 'correct' ? (
                <p className="text-green-700 dark:text-green-400 font-medium">Chính xác!</p>
              ) : (
                <div>
                  <p className="text-red-700 dark:text-red-400 font-medium mb-1">Sai rồi. Đáp án đúng là:</p>
                  <p className="text-lg font-bold text-foreground">{currentWord.term}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end mt-4">
            {status === 'idle' ? (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                autoFocus // Tự động focus nút Next để user ấn Enter đi tiếp được
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
              >
                Tiếp tục <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}