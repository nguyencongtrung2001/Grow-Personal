"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, Search, Eye, Play, Filter
} from "lucide-react";
import { HistoryLog } from "@/types/challenge";

interface ChallengeHistoryLogsProps {
  initialLogs: HistoryLog[];
}

export default function ChallengeHistoryLogs({ initialLogs }: ChallengeHistoryLogsProps) {
  // 1. Dùng state từ props truyền từ Server Component
  const [logs] = useState<HistoryLog[]>(initialLogs.length > 0 ? initialLogs : [
    {
      id: "mock-1",
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
      id: "mock-2",
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
      id: "mock-3",
      day: 21,
      date: "17/05/2026",
      mood: "😴 Mệt mỏi",
      note: "Ngày làm việc khá căng thẳng tại công ty nhưng vẫn cố gắng dành ra 15 phút ôn tập Flashcard trên hệ thống trước khi đi ngủ. Quyết tâm không ngắt chuỗi!",
      media: []
    }
  ]);

  // Các States phục vụ bộ lọc tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // 2. LOGIC LỌC TÌM KIẾM DỮ LIỆU BẰNG USEMEMO
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = 
        log.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
        `ngày ${log.day}`.includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [logs, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Bộ điều khiển Tìm kiếm */}
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
          <p className="text-xs text-[#78716C] mt-1">Vui lòng thay đổi từ khóa của bạn.</p>
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
    </div>
  );
}