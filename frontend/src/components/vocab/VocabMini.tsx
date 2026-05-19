"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Puzzle, Layers, HelpCircle, LayoutGrid, Keyboard } from "lucide-react";
import Link from "next/link";

interface VocabControlPanelProps {
  slug: string;
}

const gameModes = [
  { title: "Lật Thẻ Trực Quan", desc: "Học thuộc từ mới nhanh", icon: Layers, color: "text-sky-600 bg-sky-100", mode: "flashcard" },
  { title: "Trắc Nghiệm Phản Xạ", desc: "Kiểm tra mức độ nhận diện", icon: HelpCircle, color: "text-blue-600 bg-blue-50", mode: "quiz" },
  { title: "Ghép Thẻ Tốc Độ", desc: "Tăng tốc độ liên tưởng", icon: LayoutGrid, color: "text-cyan-600 bg-cyan-50", mode: null },
  { title: "Chính Tả & Viết", desc: "Ghi nhớ chính xác ký tự", icon: Keyboard, color: "text-teal-600 bg-teal-50", mode: null },
];

export default function VocabControlPanel({ slug }: VocabControlPanelProps) {
  return (
    <Card className="rounded-2xl p-6 border-[#E2EDF5] shadow-sm bg-white">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Puzzle className="w-5 h-5 text-sky-600 fill-sky-600/10" />
          4 Chế Độ Mini Game Luyện Tập
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Chọn phương pháp học giúp kích hoạt tối đa khả năng phản xạ ngôn ngữ.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {gameModes.map((mode, idx) => {
          const Icon = mode.icon;
          const content = (
            <>
              <div className={`p-2 rounded-lg ${mode.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900 mt-1 block">{mode.title}</span>
              <span className="text-[10px] text-slate-400 block font-normal leading-normal">{mode.desc}</span>
              {!mode.mode && (
                <span className="absolute top-2 right-2 text-[8px] bg-slate-100 text-slate-400 px-1 py-0.5 rounded uppercase font-bold tracking-wider">Sắp có</span>
              )}
            </>
          );

          if (mode.mode) {
            return (
              <Button 
                key={idx} 
                variant="ghost" 
                asChild
                className="flex flex-col items-start gap-2 p-3 bg-slate-50 border border-slate-100 hover:bg-sky-50 hover:border-sky-200 h-auto rounded-xl text-left transition-all group whitespace-normal cursor-pointer relative"
              >
                <Link href={`/vocab/${slug}?game=${mode.mode}`}>
                  {content}
                </Link>
              </Button>
            );
          }

          return (
            <Button 
              key={idx} 
              variant="ghost" 
              disabled
              className="flex flex-col items-start gap-2 p-3 bg-slate-50/50 border border-slate-100/50 opacity-60 h-auto rounded-xl text-left transition-all group whitespace-normal relative cursor-not-allowed"
            >
              {content}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}