"use client";
import React from "react";
import Link from "next/link";
import VocabEngine from "@/components/dashboard/VocabEngine";
import { ArrowLeft, Search, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VocabPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="h-9 w-9 p-0 rounded-xl">
            <Link href="/">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Từ Vựng Tiếng Anh</h1>
            <p className="text-xs text-slate-500">Không gian lưu trữ và ghi nhớ từ vựng thông minh</p>
          </div>
        </div>
        
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input placeholder="Tìm kiếm từ vựng..." className="pl-9 h-9 bg-white border-slate-200 text-xs rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <VocabEngine />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-4 h-4 text-sky-600" /> Thống kê ôn tập hôm nay
              </h3>
              <span className="text-[10px] bg-sky-50 text-sky-600 font-bold px-2 py-0.5 rounded-full">
                Phương pháp Spaced Repetition
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Cần ôn tập</span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">12 từ</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Đã thuộc</span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">88 từ</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Tổng tích lũy</span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">145 từ</span>
              </div>
            </div>

            <div className="mt-5 p-4 bg-sky-50/30 border border-sky-100 rounded-xl flex gap-3 items-start">
              <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Gợi ý lộ trình</h4>
                <p className="text-[11px] text-slate-600 mt-1">Hôm nay bạn có 5 từ vựng sắp bị lãng quên theo đường cong trí nhớ. Hãy luyện tập chế độ &apos;Lật Thẻ&apos; ngay để củng cố phản xạ!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
