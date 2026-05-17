"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClipboardPlus, CheckCircle2 } from "lucide-react";

const matrixOptions = [
  { id: "p1", label: "Khẩn cấp & Quan trọng", bg: "bg-rose-50/70 border-rose-200 text-rose-800", colorClass: "border-rose-400 text-rose-600" },
  { id: "p2", label: "Quan trọng, Không khẩn", bg: "bg-amber-50/70 border-amber-200 text-amber-800", colorClass: "border-amber-400 text-amber-600" },
  { id: "p3", label: "Khẩn cấp, Không quan trọng", bg: "bg-blue-50/70 border-blue-200 text-blue-800", colorClass: "border-blue-400 text-blue-600" },
  { id: "p4", label: "Không khẩn & Không quan trọng", bg: "bg-slate-50/70 border-slate-200 text-slate-700", colorClass: "border-slate-400 text-slate-600" },
];

export default function TaskForm() {
  return (
    <Card className="border-slate-200 border-l-4 border-l-emerald-500 shadow-sm p-5 bg-white rounded-xl">
      <CardHeader className="p-0 pb-3 border-b border-slate-100 flex flex-row items-center gap-2 space-y-0">
        <ClipboardPlus className="w-5 h-5 text-emerald-500" />
        <CardTitle className="font-bold text-slate-900 text-base">Tạo Nhiệm Vụ Mới</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 pt-4 space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tên công việc</label>
          <Input 
            type="text" 
            placeholder="Ví dụ: Review UI/UX Design System cho khách hàng..." 
            className="bg-slate-50 border-slate-200 rounded-lg text-slate-800 text-sm h-10 focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mức độ ưu tiên & Khẩn cấp</label>
          <RadioGroup defaultValue="p1" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {matrixOptions.map((opt) => (
              <label key={opt.id} className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${opt.bg}`}>
                <RadioGroupItem value={opt.id} id={opt.id} className={opt.colorClass} />
                <span className="text-xs font-semibold">{opt.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button variant="ghost" className="h-9 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-lg">Hủy</Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs h-9 px-4 rounded-lg shadow-md shadow-emerald-500/20 gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Xác nhận thêm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}