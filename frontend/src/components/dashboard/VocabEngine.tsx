"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Folder, ArrowRight, Layers, HelpCircle, Grid, Keyboard } from "lucide-react";

const gameModes = [
  { title: "Lật Thẻ", icon: Layers },
  { title: "Quiz trắc nghiệm", icon: HelpCircle },
  { title: "Ghép từ tốc độ", icon: Grid },
  { title: "Viết chính tả", icon: Keyboard },
];

export default function VocabEngine() {
  return (
    <Card className="lg:col-span-5 flex flex-col justify-between shadow-sm border-slate-200 transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3 space-y-0">
        <div className="flex items-center gap-2 text-sky-600">
          <BookOpen className="w-5 h-5" />
          <CardTitle className="text-base font-bold text-slate-900">
            Không Gian Học Từ Vựng
          </CardTitle>
        </div>
        <Badge variant="secondary" className="text-[11px] font-bold text-sky-600 font-mono bg-sky-50 shadow-none hover:bg-sky-50 px-2 py-0.5 rounded-md">
          18 / 20 Từ
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        <p className="text-xs text-slate-500">Mục tiêu hằng ngày của bạn sắp hoàn thành. Luyện tập nhanh qua các bộ từ của thư mục chính:</p>
        
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center hover:border-sky-600/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-2 truncate">
            <Folder className="w-5 h-5 text-sky-600 fill-current" />
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">IELTS Core Academic</p>
              <p className="text-[10px] text-slate-400 truncate">45 từ • Lần cuối ôn tập: Hôm qua</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100">
        {gameModes.map((mode, idx) => {
          const Icon = mode.icon;
          return (
            <Button key={idx} variant="ghost" className="p-2 bg-slate-50 hover:bg-sky-50 text-slate-500 hover:text-sky-600 h-9 rounded-lg transition-colors flex items-center justify-center" title={mode.title}>
              <Icon className="w-4 h-4" />
            </Button>
          );
        })}
      </CardFooter>
    </Card>
  );
}