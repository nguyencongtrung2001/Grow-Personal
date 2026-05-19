// Link file: nguyencongtrung2001/grow-personal/Grow-Personal-9982e5e006562cbfcdb74ad2b1027d15e6d34a75/frontend/src/app/challenges/[slug]/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Flame, CheckCircle2, TrendingUp, Award, 
  Clock,  Image as ImageIcon, Search, Filter, Eye, 
Play, Info, Activity, Target, Check
} from "lucide-react";

// Định nghĩa Interfaces chặt chẽ cho hệ thống dữ liệu
interface MediaFile {
  type: "image" | "video";
  url: string;
  name?: string;
}

interface HistoryLog {
  day: number;
  date: string;
  mood: "🔥 Cực sung" | "🧘 Bình ổn" | "疲 Mệt mỏi";
  note: string;
  media: MediaFile[];
}

export default function ChallengeDetailPage() {

  // 1. STATE MOCK DATA TẬP TRUNG (Dữ liệu thực tế của Thử thách 30 ngày)
  const challengeData = {
    title: "30 Ngày Làm Chủ Từ Vựng Tiếng Anh",
    progress: 76,
    completedDaysCount: 23,
    totalDays: 30,
    streak: 23,
    startDate: "27/04/2026",
    estimatedEndDate: "27/05/2026",
    category: "Ngôn ngữ",
    efficiencyRate: 94,
    weeklyProgress: [
      { week: "Tuần 1", rate: 100, status: "Hoàn thành" },
      { week: "Tuần 2", rate: 100, status: "Hoàn thành" },
      { week: "Tuần 3", rate: 85, status: "Cần cố gắng" },
      { week: "Tuần 4", rate: 20, status: "Đang diễn ra" },
    ]
  };

  const [logs] = useState<HistoryLog[]>( [
    {
      day: 23,
      date: "19/05/2026",
      mood: "🔥 Cực sung",
      note: "Hôm nay hoàn thành xuất sắc 30 từ vựng chuyên ngành AI & Machine Learning. Đã quay lại video thực hành nói phản xạ (Shadowing) 5 phút không vấp.",
      media: [
        { type: "video", url: "#", name: "Reflex_Speaking_Day23.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" }
      ]
    },
    {
      day: 22,
      date: "18/05/2026",
      mood: "🧘 Bình ổn",
      note: "Học cụm từ chủ đề Phrasal Verbs thông dụng trong IELTS Writing Task 2. Ghi chép cẩn thận vào sổ tay cá nhân.",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80" },
        { type: "image", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80" }
      ]
    },
    {
      day: 21,
      date: "17/05/2026",
      mood: "疲 Mệt mỏi",
      note: "Ngày làm việc khá căng thẳng tại công ty nhưng vẫn cố gắng dành ra 15 phút ôn tập Flashcard trên hệ thống trước khi đi ngủ. Quyết tâm không ngắt chuỗi!",
      media: []
    }
  ]);

  // Các States phục vụ bộ lọc tìm kiếm Tab Nhật ký
  const [searchTerm, setSearchTerm] = useState("");  
  // State phục vụ việc click chọn xem nhanh thông tin ngày trên bản đồ nhiệt
  const [selectedHeatmapDay, setSelectedHeatmapDay] = useState<number | null>(23);

  // 2. LOGIC LỌC TÌM KIẾM DỮ LIỆU BẰNG USEMEMO (Tối ưu hiệu năng)
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = 
        log.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
        `ngày ${log.day}`.includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;    
      return true;
    });
  }, [logs, searchTerm]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto px-4 py-4 animate-in fade-in duration-200">
      
      {/* NÚT BACK & BREADCRUMB */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="rounded-xl font-semibold gap-2 text-[#78716C] hover:text-[#FF4500]">
          <Link href="/challenges">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách</span>
          </Link>
        </Button>
        <div className="text-xs text-[#78716C] font-medium hidden sm:block">
          Thử thách &gt; <span className="text-slate-900 font-semibold">{challengeData.title}</span>
        </div>
      </div>

      {/* BANNER THÔNG TIN CHÍNH */}
      <div className="bg-white border border-[#F1E7E2] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 w-full md:w-2/3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            {challengeData.title}
          </h1>
          <p className="text-sm text-[#78716C]">
            Bắt đầu: <span className="font-semibold text-slate-800">{challengeData.startDate}</span> • Dự kiến kết thúc: <span className="font-semibold text-slate-800">{challengeData.estimatedEndDate}</span>
          </p>
          <div className="pt-2 max-w-md">
            <div className="flex justify-between text-xs font-bold text-[#78716C] mb-1">
              <span>TIẾN ĐỘ TỔNG QUAN</span>
              <span className="text-[#FF4500]">{challengeData.progress}% ({challengeData.completedDaysCount}/{challengeData.totalDays} Ngày)</span>
            </div>
            <Progress value={challengeData.progress} className="h-2.5 bg-slate-100 [&>div]:bg-linear-to-r [&>div]:from-[#FF4500] [&>div]:to-[#EF4444]" />
          </div>
        </div>

        {/* Khối hiển thị Chuỗi Streak */}
        <div className="flex items-center gap-4 bg-linear-to-br from-[#FFF5F2] to-[#FFF1EC] border border-[#FFD9CC] px-6 py-4 rounded-2xl w-full md:w-auto shadow-xs">
          <div className="bg-white p-3 rounded-xl shadow-xs">
            <Flame className="w-8 h-8 text-[#FF4500] fill-current animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B] font-mono leading-none">
              {challengeData.streak} NGÀY
            </div>
            <div className="text-xs font-bold text-[#FF4500] tracking-wider mt-1.5 uppercase">
              Chuỗi Kỷ Luật (Streak)
            </div>
          </div>
        </div>
      </div>

      {/* 4 THẺ CHỈ SỐ METRICS DASHBOARD CAO CẤP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Chỉ số Kỷ luật</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-mono">{challengeData.efficiencyRate}%</div>
            <p className="text-[11px] text-[#78716C] mt-1">Tỷ lệ nộp minh chứng đúng hạn</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Tổng minh chứng</CardTitle>
            <ImageIcon className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-mono">18 Tệp</div>
            <p className="text-[11px] text-[#78716C] mt-1">Bao gồm 16 hình ảnh & 2 video</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Chặng đường còn lại</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-mono">7 Ngày</div>
            <p className="text-[11px] text-[#78716C] mt-1">Để hoàn thành mục tiêu 30 ngày</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Huy hiệu đạt được</CardTitle>
            <Award className="w-4 h-4 text-[#FF4500]" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold text-slate-900 truncate">Nhà Thông Thái Cấp 3</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Đã mở khóa 3 phần thưởng</p>
          </CardContent>
        </Card>
      </div>

      {/* KHU VỰC CHUYỂN ĐỔI TABS CHÍNH */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-xl w-full sm:w-auto flex">
          <TabsTrigger value="overview" className="flex-1 sm:flex-initial rounded-lg font-bold text-xs px-5 py-2">
            Bản đồ nhiệt & Chỉ số phân tích
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-initial rounded-lg font-bold text-xs px-5 py-2">
            Nhật ký & Minh chứng lịch sử ({logs.length})
          </TabsTrigger>
        </TabsList>

        {/* =========================================================
            TAB 1: BẢN ĐỒ NHIỆT & CHỈ SỐ PHÂN TÍCH (DIỄN GIẢI CHI TIẾT)
            ========================================================= */}
        <TabsContent value="overview" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Khối trái: Bản đồ nhiệt 30 ngày dạng Ma trận */}
            <Card className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="mb-4">
                <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#FF4500]" />
                  Ma Trận Kiểm Soát Thói Quen (Interactive Heatmap)
                </h3>
                <p className="text-xs text-[#78716C] mt-0.5">Bấm vào từng ô ngày đã hoàn thành để xem nhanh trạng thái ghi chép lịch sử.</p>
              </div>

              {/* Grid Bản đồ nhiệt phong cách Github */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
                  {Array.from({ length: challengeData.totalDays }).map((_, index) => {
                    const dayNum = index + 1;
                    const isCompleted = dayNum < challengeData.completedDaysCount;
                    const isToday = dayNum === challengeData.completedDaysCount;
                    const isSelected = selectedHeatmapDay === dayNum;

                    return (
                      <div
                        key={dayNum}
                        onClick={() => (isCompleted || isToday) && setSelectedHeatmapDay(dayNum)}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative cursor-pointer select-none border
                          ${isToday 
                            ? "bg-white border-2 border-[#FF4500] text-[#FF4500] shadow-md shadow-[#FF4500]/20 scale-105 z-10" 
                            : isCompleted 
                              ? "bg-linear-to-br from-[#FFECE6] to-[#FFD9CC] border-[#FF4500]/20 text-[#7A1A00] hover:border-[#FF4500]/50" 
                              : "bg-slate-100 border-slate-200/60 text-slate-400 cursor-not-allowed"
                          }
                          ${isSelected ? "ring-2 ring-slate-900 ring-offset-2" : ""}
                        `}
                      >
                        <span>N{dayNum}</span>
                        {isCompleted && <Check className="w-3 h-3 stroke-[3px] text-[#FF4500] mt-0.5" />}
                        {isToday && <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span></span>}
                      </div>
                    );
                  })}
                </div>

                {/* Chú thích màu sắc */}
                <div className="flex flex-wrap justify-end gap-4 text-[11px] font-bold text-[#78716C] pt-4 mt-4 border-t border-slate-200/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-slate-100 border border-slate-200 rounded-md"></div>
                    <span>Chưa mở khóa</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-[#FFD9CC] border border-[#FF4500]/20 rounded-md"></div>
                    <span>Không hoàn thành</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-[#5fe988] border border-[#FF4500]/20 rounded-md"></div>
                    <span>Đã hoàn thành</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-white border-2 border-[#FF4500] rounded-md"></div>
                    <span>Ngày hiện hành</span>
                  </div>
                </div>
              </div>

              {/* Khối liên kết động: Hiển thị nhanh nội dung của ngày được click chọn trên Heatmap */}
              {selectedHeatmapDay && (
                <div className="mt-4 p-4 bg-[#FFF8F5] border border-[#F1E7E2] rounded-xl animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#FF4500] uppercase tracking-wider">Thông tin nhanh Ngày {selectedHeatmapDay}</span>
                    <Badge variant="outline" className="bg-white text-slate-700 border-slate-200 text-[10px]">Trạng thái: Đã duyệt đạt</Badge>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedHeatmapDay === 23 
                      ? "Nội dung hôm nay: " + logs.find(l => l.day === 23)?.note
                      : selectedHeatmapDay === 22 
                        ? "Nội dung ngày trước: " + logs.find(l => l.day === 22)?.note
                        : "Hệ thống ghi nhận bạn đã hoàn thành đầy đủ mục tiêu đề ra và upload hình ảnh chứng thực hợp lệ cho ngày này."
                    }
                  </p>
                </div>
              )}
            </Card>

            {/* Khối phải: Phân tích Tiến độ theo từng Tuần */}
            <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#FF4500]" />
                    Hiệu Suất Theo Tuần
                  </h3>
                  <p className="text-xs text-[#78716C] mt-0.5">Phân rã hành trình kỷ luật theo từng mốc chu kỳ 7 ngày.</p>
                </div>

                <div className="space-y-4">
                  {challengeData.weeklyProgress.map((w, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800">{w.week} ({w.status})</span>
                        <span className={w.rate === 100 ? "text-emerald-600" : "text-[#FF4500]"}>{w.rate}%</span>
                      </div>
                      <Progress value={w.rate} className="h-2 bg-slate-100 [&>div]:bg-[#1E293B]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start gap-2 mt-4 lg:mt-0">
                <Info className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#78716C] leading-normal font-medium">
                  Tuần 3 ghi nhận chuỗi giảm 15% do có 1 ngày bạn hoàn thành sau 23h00. Hãy cố gắng duy trì khung giờ vàng ổn định trong tuần cuối cùng này!
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* =========================================================
            TAB 2: NHẬT KÝ & MINH CHỨNG LỊCH SỬ (TIMELINE HOÀN CHỈNH)
            ========================================================= */}
        <TabsContent value="history" className="space-y-6 outline-none">
          
          {/* Bộ điều khiển Tìm kiếm và Bộ lọc */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                type="text" 
                placeholder="Tìm nội dung bài học, số ngày..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-slate-50/50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-[#FF4500]"
              />
            </div>
          </div>

          {/* Render Cấu trúc Dòng thời gian dọc (Timeline Flow) */}
          {filteredLogs.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <Filter className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#1E293B]">Không tìm thấy nhật ký phù hợp</p>
              <p className="text-xs text-[#78716C] mt-1">Vui lòng thay đổi từ khóa hoặc bộ lọc của bạn.</p>
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 before:absolute before:left-[19px] sm:before:left-[23px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200/70 space-y-6">
              {filteredLogs.map((log) => (
                <div key={log.day} className="relative group animate-in slide-in-from-bottom-2 duration-200">
                  
                  {/* Timeline Indicator Point */}
                  <div className="absolute left-[-24px] sm:left-[-28px] top-1.5 w-10 h-10 rounded-full bg-white border-2 border-slate-200 group-hover:border-[#FF4500] flex items-center justify-center transition-all z-10 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-[#FF4500] fill-white transition-colors" />
                  </div>

                  {/* Log Content Card */}
                  <Card className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                    
                    {/* Log Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-extrabold text-[#1E293B]">
                          Ngày {log.day}
                        </span>
                        <Badge className="bg-slate-100 text-slate-700 border-none font-medium text-[11px] rounded-md px-2 py-0.5">
                          {log.date}
                        </Badge>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-orange-50 text-[#FF4500] border border-orange-100/50">
                          {log.mood}
                        </span>
                      </div>

                    </div>

                    {/* Đoạn text note nhật ký */}
                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4 whitespace-pre-line bg-[#FAF9F8]/60 px-4 py-3 rounded-xl border border-slate-100/80">
                      {log.note}
                    </p>

                    {/* Hiển thị danh sách ảnh/video minh chứng */}
                    {log.media.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-[#78716C] mb-2 uppercase tracking-wider">
                          Tệp dữ liệu xác thực ({log.media.length}):
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                          {log.media.map((item, index) => (
                            <div 
                              key={index} 
                              className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group/media cursor-pointer shadow-xs hover:border-[#FF4500]/50 transition-all"
                            >
                              {item.type === "image" ? (
                                <>
                                  <Image src={item.url} alt={`Evidence day ${log.day}`} fill className="object-cover group-hover/media:scale-105 transition-transform duration-200" />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/media:opacity-100 flex items-center justify-center transition-opacity z-10">
                                    <Eye className="w-5 h-5 text-white" />
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-linear-to-br from-slate-900 to-slate-800 text-white">
                                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover/media:bg-[#FF4500] flex items-center justify-center transition-colors mb-1.5">
                                    <Play className="w-3.5 h-3.5 text-white fill-current translate-x-0.5" />
                                  </div>
                                  <span className="text-[10px] font-medium text-slate-300 truncate w-full px-1">
                                    {item.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </Card>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}