"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface Word { id: string; word: string; definition: string; }
interface TranslateProps { words: Word[]; }

export default function TranslateInputMode({ words }: TranslateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = words[currentIndex];

  // Tự động focus vào input khi chuyển câu
  useEffect(() => {
    if (status === "idle") inputRef.current?.focus();
  }, [currentIndex, status]);

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // So sánh chuỗi (bỏ qua hoa thường và khoảng trắng thừa)
    const isMatch = inputValue.trim().toLowerCase() === currentWord.definition.trim().toLowerCase();
    setStatus(isMatch ? "correct" : "wrong");
  };

  const nextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue("");
      setStatus("idle");
    } else {
      alert("Bạn đã hoàn thành bộ từ này!"); // Có thể thay bằng Component Kết quả như Quiz
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-8 animate-in slide-in-from-bottom-8 duration-500">
      <Card className="p-10 text-center border-slate-200 shadow-sm rounded-3xl bg-slate-900 text-white">
        <span className="text-slate-400 font-mono text-sm uppercase tracking-widest">Dịch sang tiếng Việt</span>
        <h2 className="text-5xl font-black text-amber-400 mt-4 tracking-tight">{currentWord.word}</h2>
      </Card>

      <form onSubmit={status === "idle" ? checkAnswer : (e) => { e.preventDefault(); nextQuestion(); }} className="space-y-4">
        <div className="relative">
          <Input 
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={status !== "idle"}
            placeholder="Nhập nghĩa tiếng Việt..."
            className={`h-16 text-xl px-6 rounded-2xl shadow-inner font-medium border-2 transition-colors ${
              status === "idle" ? "border-slate-200 focus:border-amber-500 focus:ring-amber-500/20" : 
              status === "correct" ? "border-emerald-500 bg-emerald-50 text-emerald-900" : 
              "border-rose-500 bg-rose-50 text-rose-900"
            }`}
          />
          {status === "correct" && <CheckCircle2 className="absolute right-5 top-5 w-6 h-6 text-emerald-500" />}
          {status === "wrong" && <XCircle className="absolute right-5 top-5 w-6 h-6 text-rose-500" />}
        </div>

        {status === "wrong" && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center justify-between animate-in fade-in">
            <span>Đáp án đúng là: <strong className="text-lg ml-1">{currentWord.definition}</strong></span>
          </div>
        )}

        <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold bg-amber-500 hover:bg-amber-600 text-white">
          {status === "idle" ? "Kiểm tra" : "Tiếp tục"} <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </form>
    </div>
  );
}