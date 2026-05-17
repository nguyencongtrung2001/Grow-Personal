"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, Italic, Underline, Strikethrough, 
  List, ListOrdered, CheckSquare, Quote, 
  Code, Link, Trash2, Cloud, Save 
} from "lucide-react";

export default function NoteEditor() {
  return (
    <Card className="grow max-w-4xl bg-white border-slate-200 rounded-2xl shadow-sm min-h-[800px] flex flex-col relative overflow-hidden">
      
      {/* 1. Sticky Formatting Toolbar */}
      <div className="sticky top-0 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-2 z-30">
        <div className="flex items-center gap-1">
          {/* Heading Options */}
          {["H1", "H2", "H3"].map((h) => (
            <Button key={h} variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-amber-500 hover:bg-white border border-transparent hover:border-slate-200 font-bold text-xs rounded-md">
              {h}
            </Button>
          ))}
          
          <Separator orientation="vertical" className="h-5 mx-1 bg-slate-200" />
          
          {/* Inline Styles */}
          {[
            { icon: Bold, title: "Bold" },
            { icon: Italic, title: "Italic" },
            { icon: Underline, title: "Underline" },
            { icon: Strikethrough, title: "Strikethrough" },
          ].map((style, idx) => {
            const Icon = style.icon;
            return (
              <Button key={idx} variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-amber-500 hover:bg-white border border-transparent hover:border-slate-200 rounded-md" title={style.title}>
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
          
          <Separator orientation="vertical" className="h-5 mx-1 bg-slate-200" />
          
          {/* Lists & Structure */}
          {[
            { icon: List, title: "Bullet List" },
            { icon: ListOrdered, title: "Numbered List" },
            { icon: CheckSquare, title: "Checklist" },
          ].map((list, idx) => {
            const Icon = list.icon;
            return (
              <Button key={idx} variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-amber-500 hover:bg-white border border-transparent hover:border-slate-200 rounded-md" title={list.title}>
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
          
          <Separator orientation="vertical" className="h-5 mx-1 bg-slate-200" />

          {/* Blocks & Advanced */}
          {[
            { icon: Quote, title: "Blockquote" },
            { icon: Code, title: "Code Block" },
            { icon: Link, title: "Chèn liên kết" },
          ].map((block, idx) => {
            const Icon = block.icon;
            return (
              <Button key={idx} variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-amber-500 hover:bg-white border border-transparent hover:border-slate-200 rounded-md" title={block.title}>
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </div>

        {/* Delete Quick Action */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="h-8 px-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all flex items-center gap-1 text-xs font-medium">
            <Trash2 className="w-4 h-4" />
            Xóa nháp
          </Button>
        </div>
      </div>

      {/* 2. Content Area */}
      <CardContent className="p-8 grow flex flex-col">
        {/* Input Tiêu Đề */}
        <div className="mb-6">
          <Input 
            type="text" 
            defaultValue="Nhật ký ngày 23/10/2023"
            placeholder="Nhập tiêu đề ghi chú..." 
            className="w-full border-none shadow-none focus-visible:ring-0 text-slate-900 text-3xl font-bold p-0 placeholder-slate-300 bg-transparent h-auto"
          />
          
          {/* Metadata Info */}
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 shadow-none font-mono text-xs flex items-center gap-1.5 py-1 px-2.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Thư mục: Nhật ký
            </Badge>
            <Badge variant="outline" className="text-slate-400 border-slate-200 font-mono text-xs py-1 px-2.5 rounded-lg shadow-none font-normal">
              Cập nhật: Vừa xong
            </Badge>
          </div>
        </div>

        <Separator className="bg-slate-100 mb-6" />

        {/* Rich Editor Container */}
        <div 
          className="grow focus:outline-none space-y-6 text-base text-slate-900 leading-relaxed min-h-[500px]" 
          contentEditable="true"
          suppressContentEditableWarning={true}
        >
          <h1 className="text-2xl font-bold text-slate-900">1. Hôm nay tôi đã học được điều gì mới?</h1>
          <p className="text-slate-600">
            Hôm nay tôi đã tối ưu hóa hiệu năng câu lệnh Prisma ORM bằng cách bổ sung thêm Index phức hợp và áp dụng chuẩn định danh UUID v7 vào PostgreSQL nhằm cải thiện tốc độ truy vấn đáng kể cho dự án SportLink.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900">2. Những việc cần lưu ý trong Design System</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Đồng bộ lại cấu trúc các Token màu sáng (Bright Theme) của hệ thống quản lý công việc.</li>
            <li>Thiết kế module &quot;Khu vườn sinh thái&quot; theo đúng chuẩn Atomic Design để tái sử dụng ở các màn hình con khác.</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-900">3. Mục tiêu ngày mai</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-600">
            <li>Hoàn thiện API tích hợp bản đồ địa điểm sân thao trường.</li>
            <li>Học 50 từ vựng IELTS mới trên nền tảng Chrome Extension.</li>
          </ol>

          <blockquote className="border-l-4 border-amber-500 bg-amber-50/40 pl-4 py-2 italic text-slate-600 rounded-r-lg">
            &quot;Tư duy như một Product Designer thực thụ: luôn kết hợp chặt chẽ giữa mục tiêu kinh doanh và trải nghiệm cốt lõi của người dùng.&quot;
          </blockquote>
        </div>
      </CardContent>

      {/* 3. Sticky Footer Action Bar */}
      <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Cloud className="w-4 h-4 text-amber-500 fill-amber-500/10" /> 
          Tự động lưu đám mây thành công
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" className="px-5 text-sm font-semibold text-slate-500 hover:bg-slate-200 rounded-xl h-10">
            Hủy bỏ
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 rounded-xl shadow-md shadow-amber-500/10 active:scale-[0.98] transition-all gap-1.5 h-10">
            <Save className="w-4 h-4" />
            Lưu ghi chú
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}