"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCw, AlertCircle } from "lucide-react";

interface Word {
  id: string;
  word: string;
  definition: string;
  type?: string;
  example?: string;
}

interface QuizABCDModeProps {
  words: Word[];
}

// Hàm băm chuỗi để tạo hạt giống (seed) số nguyên 32-bit từ string
function createSeededRandom(seedString: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedString.length; i++) {
    h = Math.imul(h ^ seedString.charCodeAt(i), 16777619);
  }
  // Hàm sinh số ngẫu nhiên tuần tự dựa trên seed bằng thuật toán LCG / Mulberry32
  return function () {
    h += 0xe120fc15;
    let z = h;
    z = Math.imul(z ^ (z >>> 16), 0x21f0aa7c);
    z = Math.imul(z ^ (z >>> 15), 0x735a2d97);
    z ^= z >>> 15;
    return (z >>> 0) / 4294967296;
  };
}

export default function QuizABCDMode({ words }: QuizABCDModeProps) {
  // 1. Khởi tạo các state quản lý trò chơi trước bất kỳ câu lệnh rẽ nhánh nào (Tuân thủ React Hook Rules)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentWord = words && words.length >= 4 ? words[currentIndex] : null;

  // 2. Sử dụng useMemo kết hợp Seeded Random để sinh đáp án thuần khiết (Pure & Idempotent)
  // Giải quyết triệt để cảnh báo React 19 về impure function (Math.random) và cascading setState trong useEffect.
  const options = useMemo(() => {
    if (!currentWord || !words || words.length < 4) return [];

    // Trích xuất toàn bộ định nghĩa từ các từ khác câu hỏi hiện tại
    const otherDefinitions = words
      .filter((w) => w.id !== currentWord.id)
      .map((w) => w.definition);

    // Lọc trùng lặp để đáp án phong phú và chuyên nghiệp hơn
    const uniqueOthers = Array.from(new Set(otherDefinitions));

    // Khởi tạo seeded random dựa trên ID từ vựng hiện tại và số lượng từ
    const rand = createSeededRandom(`${currentWord.id}-${words.length}`);

    // Lấy ngẫu nhiên 3 định nghĩa sai từ danh sách khác bằng seeded random
    const wrongOptions: string[] = [];
    const tempOthers = [...uniqueOthers];

    while (wrongOptions.length < 3 && tempOthers.length > 0) {
      const randIdx = Math.floor(rand() * tempOthers.length);
      wrongOptions.push(tempOthers[randIdx]);
      tempOthers.splice(randIdx, 1);
    }

    // Nếu dữ liệu bị trùng lặp nhiều khiến uniqueOthers < 3, lấy thêm từ mảng ban đầu
    if (wrongOptions.length < 3) {
      const fallbackOthers = [...otherDefinitions];
      while (wrongOptions.length < 3 && fallbackOthers.length > 0) {
        const randIdx = Math.floor(rand() * fallbackOthers.length);
        wrongOptions.push(fallbackOthers[randIdx]);
        fallbackOthers.splice(randIdx, 1);
      }
    }

    // Gộp đáp án đúng với 3 đáp án sai
    const allOptions = [currentWord.definition, ...wrongOptions];

    // Trộn các phần tử thuần khiết bằng thuật toán Fisher-Yates dùng seeded random
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const temp = allOptions[i];
      allOptions[i] = allOptions[j];
      allOptions[j] = temp;
    }

    return allOptions;
  }, [currentWord, words]);

  // 3. Kiểm tra điều kiện đầu vào sau khi các Hooks đã được khai báo
  if (!words || words.length < 4) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto mt-12 px-6 animate-in zoom-in duration-300">
        <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-6 animate-bounce" />
        <h3 className="text-slate-800 font-bold text-lg mb-2">Không đủ dữ liệu câu hỏi</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Chế độ này cần ít nhất 4 từ vựng trong thư mục để hoạt động.
        </p>
      </div>
    );
  }

  if (!currentWord) return null;

  // Tính phần trăm tiến trình câu hỏi
  const progressPercent = ((currentIndex + 1) / words.length) * 100;

  // 4. Xử lý khi người dùng chọn một đáp án
  const handleSelectOption = (option: string) => {
    if (isAnswered) return; // Chống spam click khi đã trả lời

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentWord.definition) {
      setScore((prev) => prev + 1);
    }
  };

  // 5. Xử lý chuyển tiếp câu hỏi tiếp theo
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  // 6. Xử lý chơi lại từ đầu
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  // 7. MÀN HÌNH KẾT QUẢ (END SCREEN)
  if (isFinished) {
    const accuracy = (score / words.length) * 100;
    const isExcellent = accuracy > 80;

    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-12 bg-white rounded-3xl border border-slate-200 shadow-md p-8 animate-in zoom-in-95 duration-500">
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-amber-50 rounded-full border border-amber-200/50 shadow-inner">
          <Trophy className="w-16 h-16 text-amber-500 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hoàn thành thử thách!</h2>
          <p className="text-slate-500 font-medium">Kết quả học tập của bạn</p>
        </div>

        {/* Khối hiển thị điểm số */}
        <div className="py-4 px-6 bg-slate-50 rounded-2xl inline-block border border-slate-100 shadow-inner">
          <span className="text-4xl font-extrabold text-slate-800">{score}</span>
          <span className="text-slate-400 text-2xl font-medium"> / {words.length}</span>
          <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Từ vựng chính xác</p>
        </div>

        {/* Phân loại đánh giá */}
        <div>
          {isExcellent ? (
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
              Xuất sắc ✨
            </span>
          ) : (
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm animate-pulse">
              Cố gắng lên 💪
            </span>
          )}
        </div>

        {/* Nút chơi lại */}
        <Button
          onClick={handleRestart}
          className="w-full h-14 rounded-2xl text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-95 transition-all gap-2 cursor-pointer mt-4"
        >
          <RotateCw className="w-5 h-5" /> Chơi lại ván mới
        </Button>
      </div>
    );
  }

  // 8. GIAO DIỆN GAME CHÍNH (PLAYING SCREEN)
  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8 animate-in fade-in duration-500">
      {/* Progress Bar ở trên cùng */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-mono font-medium">
          <span>Câu hỏi: {currentIndex + 1}/{words.length}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress
          value={progressPercent}
          className="h-2.5 bg-slate-100 [&>div]:bg-amber-500 rounded-full shadow-inner"
        />
      </div>

      {/* Khối Câu Hỏi */}
      <Card className="p-10 text-center border-slate-200 shadow-sm rounded-3xl bg-slate-900 text-white select-none">
        <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">
          Chọn nghĩa đúng của từ vựng sau
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-amber-400 mt-4 tracking-tight">
          {currentWord.word}
        </h2>
        {currentWord.type && (
          <span className="inline-block text-xs font-mono italic text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mt-3">
            {currentWord.type}
          </span>
        )}
      </Card>

      {/* Khối 4 Đáp Án (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, idx) => {
          const isCorrectOption = option === currentWord.definition;
          const isSelectedOption = option === selectedOption;

          let btnStyles = "bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/30";
          let Icon = null;

          if (isAnswered) {
            if (isCorrectOption) {
              // Nút là đáp án đúng
              btnStyles = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-sm";
              Icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            } else if (isSelectedOption) {
              // Nút là đáp án sai người dùng đã chọn
              btnStyles = "bg-rose-50 border-rose-500 text-rose-900 font-semibold shadow-sm";
              Icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
            } else {
              // Các nút còn lại làm mờ đi
              btnStyles = "bg-white border-slate-100 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={`${currentIndex}-${idx}`}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`w-full min-h-16 p-5 rounded-2xl border-2 flex items-center justify-between gap-3 text-base md:text-lg font-medium text-left transition-all cursor-pointer ${
                !isAnswered ? "active:scale-[0.98]" : ""
              } ${btnStyles}`}
            >
              <span className="leading-snug">{option}</span>
              {Icon}
            </button>
          );
        })}
      </div>

      {/* Nút chuyển câu chỉ hiện sau khi đã trả lời */}
      {isAnswered && (
        <div className="pt-2 animate-in slide-in-from-bottom duration-300 fill-mode-both">
          <Button
            onClick={handleNext}
            className="w-full h-14 rounded-2xl text-lg font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 active:scale-95 transition-all gap-2 cursor-pointer"
          >
            {currentIndex === words.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </Button>
        </div>
      )}
    </div>
  );
}