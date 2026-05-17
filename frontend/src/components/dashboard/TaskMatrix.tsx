"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, PlusCircle } from "lucide-react";

export default function TaskMatrix() {
  return (
    <Card className="lg:col-span-5 flex flex-col justify-between shadow-sm border-slate-200 transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3 space-y-0">
        <div className="flex items-center gap-2 text-emerald-500">
          <CheckSquare className="w-5 h-5" />
          <CardTitle className="text-base font-bold text-slate-900">
            Nhiệm Vụ Trọng Tâm Hôm Nay
          </CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border-none px-2 py-0.5">
          Eisenhower Matrix
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        <label className="flex items-start gap-3 p-2.5 bg-rose-50/50 border border-rose-100 rounded-xl cursor-pointer hover:bg-rose-50 transition-colors">
          <Checkbox id="task-1" className="mt-0.5 border-slate-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" />
          <div>
            <p className="text-xs font-bold text-slate-900">Hoàn thành báo cáo tài chính Q3</p>
            <p className="text-[10px] text-rose-700 font-medium">Khẩn cấp & Quan trọng</p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
          <Checkbox id="task-2" className="mt-0.5 border-slate-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" />
          <div>
            <p className="text-xs font-bold text-slate-900">Học 50 từ vựng IELTS mới</p>
            <p className="text-[10px] text-sky-600 font-medium">Quan trọng, Không khẩn cấp</p>
          </div>
        </label>
      </CardContent>

      <div className="p-6 pt-0">
        <Button variant="outline" className="w-full bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 font-bold text-xs h-9 flex items-center justify-center gap-1.5 rounded-xl">
          <PlusCircle className="w-4 h-4" /> Xem và Thêm Task nhanh
        </Button>
      </div>
    </Card>
  );
}