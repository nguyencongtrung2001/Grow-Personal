"use client";
import React from "react";
import Link from "next/link";
import TaskMatrix from "@/components/dashboard/TaskMatrix";
import { ArrowLeft, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TasksPage() {
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nhiệm Vụ Công Việc</h1>
            <p className="text-xs text-slate-500">Quản lý nhiệm vụ theo phương pháp ma trận Eisenhower</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 font-bold text-xs h-9 rounded-xl flex items-center gap-1.5 text-slate-700">
            <Filter className="w-4 h-4" /> Bộ lọc
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <TaskMatrix />
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" /> Thống kê hiệu suất tuần
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Hoàn thành</span>
              <span className="text-2xl font-bold text-slate-900 mt-1 block">85%</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Đúng hạn (SLA)</span>
              <span className="text-2xl font-bold text-slate-900 mt-1 block">92%</span>
            </div>
          </div>
          
          <div className="mt-5 p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl">
            <p className="text-xs text-slate-600 font-medium">💡 Gợi ý làm việc: Bạn đạt hiệu suất cao nhất vào khoảng **8:00 - 10:00 sáng**. Hãy sắp xếp các nhiệm vụ &apos;Khẩn cấp &amp; Quan trọng&apos; vào khung giờ này để đạt kết quả tốt nhất!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
