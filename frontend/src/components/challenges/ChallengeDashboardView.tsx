"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Calendar, Flame } from "lucide-react";
import ChallengeHistoryLogs from "./ChallengeHistoryLogs";
import ChallengeHeatmap from "./ChallengeHeatmap";
import JourneyWorkspace from "./JourneyWorkspace";
import { HistoryLog } from "@/types/challenge";

interface DashboardViewProps {
  challengeId: string;
  challengeSlug: string;
  startDate: string;
  efficiencyRate: number;
  totalDays: number;
  completedDaysCount: number;
  logs: HistoryLog[];
}

export default function ChallengeDashboardView({ challengeId, challengeSlug, startDate, efficiencyRate, totalDays, completedDaysCount, logs }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* 4 CARD METRICS CHỈ SỐ DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Chỉ số Kỷ luật</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-mono">{efficiencyRate}%</div>
            <p className="text-[11px] text-[#78716C] mt-1">Tỷ lệ nộp minh chứng đúng hạn</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Ngày hoàn thành</CardTitle>
            <Calendar className="w-4 h-4 text-blue-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-mono">{completedDaysCount} / {totalDays} Ngày</div>
            <p className="text-[11px] text-[#78716C] mt-1">Tích lũy tiến độ {Math.round((completedDaysCount / totalDays) * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Chuỗi kỷ luật</CardTitle>
            <Flame className="w-4 h-4 text-amber-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-mono">{completedDaysCount} Ngày</div>
            <p className="text-[11px] text-[#78716C] mt-1">Duy trì chuỗi ngày liên tiếp tốt</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Huy hiệu đạt được</CardTitle>
            <Award className="w-4 h-4 text-[#FF4500]" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold text-slate-900 truncate">Nhà Thông Thái Cấp 3</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">ID: {challengeId} • Đã mở khóa 3 quà</p>
          </CardContent>
        </Card>
      </div>

      {/* TABS CONTROLLER ĐẠT CHUẨN WCAG 2.1 ACCESSIBILITY */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-xl w-full sm:w-auto flex" aria-label="Phân vùng dữ liệu thử thách">
          <TabsTrigger value="overview" className="flex-1 sm:flex-initial rounded-lg font-bold text-xs px-5 py-2.5 data-[state=active]:bg-white data-[state=active]:text-slate-900 focus-visible:ring-2 focus-visible:ring-[#FF4500]">
            Bản đồ nhiệt & Chỉ số phân tích
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-initial rounded-lg font-bold text-xs px-5 py-2.5 data-[state=active]:bg-white data-[state=active]:text-slate-900 focus-visible:ring-2 focus-visible:ring-[#FF4500]">
            Nhật ký & Minh chứng lịch sử
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="outline-none animate-in fade-in duration-200 space-y-6">
          <ChallengeHeatmap 
            totalDays={totalDays} 
            completedDaysCount={completedDaysCount} 
            startDate={startDate}
            logs={logs}
          />
          <JourneyWorkspace challengeSlug={challengeSlug} />
        </TabsContent>

        <TabsContent value="history" className="outline-none animate-in fade-in duration-200">
          <ChallengeHistoryLogs initialLogs={logs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}