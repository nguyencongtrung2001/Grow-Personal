"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Flower, Leaf, Plus } from "lucide-react";

const activeTrees = [
  { icon: Leaf, label: "Task #1", color: "text-emerald-500 bg-emerald-50" },
  { icon: Flower, label: "IELTS 50", color: "text-teal-500 bg-teal-50" },
  { icon: Sprout, label: "Gym Done", color: "text-green-500 bg-green-50" },
  { icon: Leaf, label: "Code Review", color: "text-amber-500 bg-amber-50" },
];

export default function ProductiveGarden() {
  return (
    <Card className="border-slate-200 shadow-sm p-6 bg-linear-to-b from-white to-emerald-50/10 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-emerald-600 fill-emerald-600/20" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-sans">Khu Vườn Năng Suất (Productive Garden)</h3>
            <p className="text-xs text-slate-400 mt-0.5">Mỗi khi hoàn thành 1 task, 1 cây xanh mới sẽ lớn lên tại đây!</p>
          </div>
        </div>
        <Badge className="bg-emerald-100 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-none gap-1 py-1 px-3 rounded-lg">
          Đã trồng: 4 Cây
        </Badge>
      </div>

      {/* Vườn sinh thái lưới */}
      <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-3 bg-emerald-50/30 p-4 rounded-xl border border-dashed border-emerald-200">
        {activeTrees.map((tree, idx) => {
          const Icon = tree.icon;
          return (
            <div key={idx} className="aspect-square bg-white border border-emerald-100 rounded-lg flex flex-col items-center justify-center relative group shadow-sm hover:scale-105 transition-transform cursor-pointer">
              <Icon className={`w-8 h-8 ${tree.color.split(" ")[0]} drop-shadow-sm`} />
              <span className={`absolute bottom-1 text-[9px] font-bold px-1 rounded truncate max-w-[90%] ${tree.color}`}>
                {tree.label}
              </span>
            </div>
          );
        })}

        {/* Đất trống chờ mở khóa */}
        <div className="aspect-square bg-slate-100/60 border border-dashed border-slate-200 rounded-lg flex items-center justify-center group relative cursor-pointer">
          <Plus className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
          <div className="opacity-0 group-hover:opacity-100 absolute bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded -top-7 whitespace-nowrap transition-opacity pointer-events-none z-20 shadow-sm">
            Đất trống chờ Task
          </div>
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="hidden sm:flex aspect-square bg-slate-100/60 border border-dashed border-slate-200 rounded-lg items-center justify-center" />
        ))}
      </div>
    </Card>
  );
}