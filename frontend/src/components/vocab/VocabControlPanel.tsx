"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, FilePlus, Puzzle, Layers, HelpCircle, LayoutGrid, Keyboard } from "lucide-react";

const gameModes = [
  { title: "Lật Thẻ Trực Quan", desc: "Học thuộc từ mới nhanh", icon: Layers, color: "text-sky-600 bg-sky-100" },
  { title: "Trắc Nghiệm Phản Xạ", desc: "Kiểm tra mức độ nhận diện", icon: HelpCircle, color: "text-blue-600 bg-blue-50" },
  { title: "Ghép Thẻ Tốc Độ", desc: "Tăng tốc độ liên tưởng", icon: LayoutGrid, color: "text-cyan-600 bg-cyan-50" },
  { title: "Chính Tả & Viết", desc: "Ghi nhớ chính xác ký tự", icon: Keyboard, color: "text-teal-600 bg-teal-50" },
];

export default function VocabControlPanel() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Khối quản lý tác vụ tạo nhanh */}
      <Card className="rounded-2xl p-6 border-[#E2EDF5] bg-linear-to-br from-white to-sky-50/30 shadow-sm flex flex-col justify-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Quản Lý Không Gian Học</h2>
          <p className="text-xs text-slate-500 mt-0.5">Xây dựng thư mục và hệ thống flashcard thông minh của bạn.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex flex-col items-center justify-center gap-2 h-28 bg-white border-sky-200 text-sky-600 hover:bg-sky-50/50 hover:text-sky-700 rounded-xl font-bold text-xs transition-all active:scale-[0.98] group">
            <FolderPlus className="w-7 h-7 text-sky-600 group-hover:scale-105 transition-transform" />
            Tạo thư mục mới
          </Button>
          <Button className="bg-sky-600 hover:bg-sky-700 text-white flex flex-col items-center justify-center gap-2 h-28 rounded-xl font-bold text-xs transition-all active:scale-[0.98] group shadow-md shadow-sky-600/10">
            <FilePlus className="w-7 h-7 text-white group-hover:scale-105 transition-transform" />
            Tạo thẻ từ mới
          </Button>
        </div>
      </Card>

      {/* Khối Lựa chọn 4 phương thức Mini Game */}
      <Card className="rounded-2xl p-6 xl:col-span-2 border-[#E2EDF5] shadow-sm bg-white">
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
            return (
              <Button 
                key={idx} 
                variant="ghost" 
                className="flex flex-col items-start gap-2 p-3 bg-slate-50 border border-slate-100 hover:bg-sky-50 hover:border-sky-200 h-auto rounded-xl text-left transition-all group whitespace-normal"
              >
                <div className={`p-2 rounded-lg ${mode.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-900 mt-1 block">{mode.title}</span>
                <span className="text-[10px] text-slate-400 block font-normal leading-normal">{mode.desc}</span>
              </Button>
            );
          })}
        </div>
      </Card>
    </section>
  );
}