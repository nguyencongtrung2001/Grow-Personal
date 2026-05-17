"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Lock } from "lucide-react";

export default function ChallengeTracker() {
  const pastDays = ["01", "02", "...", "22", "23"];

  return (
    <Card className="lg:col-span-7 flex flex-col justify-between shadow-sm border-slate-200 transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3 space-y-0">
        <div className="flex items-center gap-2 text-orange-600">
          <Trophy className="w-5 h-5" />
          <CardTitle className="text-base font-bold text-slate-900">
            Thử Thách Bản Thân (30-Day Challenge)
          </CardTitle>
        </div>
        <Badge className="bg-orange-50 border border-orange-100 px-3 py-1 rounded-xl text-orange-600 text-xs font-bold shadow-none hover:bg-orange-50 gap-1">
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse" /> Chuỗi 23 Ngày
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="bg-orange-50/20 border border-orange-100/70 p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">30 Ngày Làm Chủ Từ Vựng Tiếng Anh</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tiến độ: <span className="text-orange-600 font-bold">23/30 Ngày</span> hoàn thành (76%)
              </p>
            </div>
            <Button className="bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold text-xs px-4 h-9 rounded-xl shadow-sm transition-transform active:scale-95 hover:opacity-90">
              Check-in Ngày 24
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {pastDays.map((day, idx) => (
              <span key={idx} className="w-6 h-6 bg-orange-600/10 border border-orange-600/20 text-[10px] font-bold text-orange-600 rounded flex items-center justify-center">
                {day}
              </span>
            ))}
            <span className="w-6 h-6 bg-white border-2 border-orange-600 text-[10px] font-bold text-slate-950 rounded flex items-center justify-center shadow-sm animate-bounce">
              24
            </span>
            <span className="w-6 h-6 bg-slate-100 text-[10px] font-bold text-slate-400 rounded flex items-center justify-center">
              <Lock className="w-3 h-3" />
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400">💡 Mẹo kỷ luật: Hoàn thành ghi chép hành trình bằng hình ảnh giúp tăng 80% khả năng duy trì chuỗi.</p>
      </CardContent>
    </Card>
  );
}