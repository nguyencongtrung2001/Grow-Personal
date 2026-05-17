"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Flag, GitBranch } from "lucide-react";

export default function TodayAgenda() {
  return (
    <Card className="border-slate-200 shadow-sm p-6 bg-white rounded-xl flex-1 flex flex-col">
      <CardHeader className="p-0 pb-4 flex flex-row items-center gap-2 space-y-0">
        <CalendarCheck className="w-5 h-5 text-emerald-500" />
        <CardTitle className="text-base font-bold text-slate-900">Lịch Trình Hôm Nay</CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-4 overflow-y-auto max-h-[320px] pr-1">
        {/* Urgent & Important */}
        <div>
          <h3 className="text-xs font-bold text-rose-600 mb-2 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Flag className="w-3 h-3 fill-current" /> Khẩn cấp & Quan trọng
          </h3>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-start gap-3 hover:bg-slate-100/80 transition-colors">
            <Checkbox id="agenda-1" className="mt-0.5 border-slate-300 data-[state=checked]:bg-emerald-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Hoàn thành báo cáo tài chính Q3</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="h-6 text-[10px] bg-white text-slate-500 px-2 border-slate-200 hover:text-slate-800 rounded flex items-center gap-1 font-sans">
                  <GitBranch className="w-3 h-3" /> Sub-tasks (0/3)
                </Button>
                <Badge className="bg-rose-50 text-rose-700 font-bold border border-rose-200 hover:bg-rose-50 shadow-none text-[10px] px-2 py-0">
                  Tài Chính
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Important but Not Urgent */}
        <div>
          <h3 className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Flag className="w-3 h-3" /> Quan trọng, Không khẩn cấp
          </h3>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-start gap-3 hover:bg-slate-100/80 transition-colors">
            <Checkbox id="agenda-2" className="mt-0.5 border-slate-300 data-[state=checked]:bg-emerald-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Học 50 từ vựng IELTS mới</p>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 hover:bg-emerald-50 shadow-none text-[10px] px-2 py-0">
                  Tiếng Anh
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}