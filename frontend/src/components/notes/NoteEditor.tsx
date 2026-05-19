"use client";
import React, { useActionState, useRef, useState, startTransition } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { saveNoteAction } from "@/app/notes/actions";
import { 
  Bold, Italic, Underline, Strikethrough, 
  Trash2, Cloud, Save, Loader2
} from "lucide-react";

// Tách mảng cấu hình static ra bên ngoài component để tránh khởi tạo lại khi re-render
const INLINE_STYLES = [
  { icon: Bold, title: "Bold" },
  { icon: Italic, title: "Italic" },
  { icon: Underline, title: "Underline" },
  { icon: Strikethrough, title: "Strikethrough" },
];

export default function NoteEditor() {
  const [state, formAction, isPending] = useActionState(saveNoteAction, { success: false, error: null });
  const contentRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("Nhật ký ngày 23/10/2023");

  const handleCustomSubmit = () => {
    // Thu thập dữ liệu từ phần tử contentEditable bảo mật và an toàn
    const htmlContent = contentRef.current?.innerHTML || "";
    const formData = new FormData();
    formData.append("noteTitle", title);
    formData.append("noteContent", htmlContent);

    // Kích hoạt Server Action trong một Transition
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Card className="grow max-w-4xl bg-white border-slate-200 rounded-2xl shadow-sm min-h-[800px] flex flex-col relative overflow-hidden">
      {/* 1. Sticky Formatting Toolbar */}
      <div className="sticky top-0 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-2 z-30">
        <div className="flex items-center gap-1">
          {["H1", "H2", "H3"].map((h) => (
            <Button key={h} type="button" variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-amber-500 hover:bg-white border border-transparent hover:border-slate-200 font-bold text-xs rounded-md">
              {h}
            </Button>
          ))}
          <Separator orientation="vertical" className="h-5 mx-1 bg-slate-200" />
          
          {INLINE_STYLES.map((style, idx) => {
            const Icon = style.icon;
            return (
              <Button key={idx} type="button" variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-amber-500 hover:bg-white border border-transparent hover:border-slate-200 rounded-md" title={style.title}>
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" className="h-8 px-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all flex items-center gap-1 text-xs font-medium">
            <Trash2 className="w-4 h-4" />
            Xóa nháp
          </Button>
        </div>
      </div>

      {/* 2. Content Area */}
      <CardContent className="p-8 grow flex flex-col">
        <div className="mb-6">
          <Input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề ghi chú..." 
            className="w-full border-none shadow-none focus-visible:ring-0 text-slate-900 text-3xl font-bold p-0 placeholder-slate-300 bg-transparent h-auto"
          />
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 shadow-none font-mono text-xs flex items-center gap-1.5 py-1 px-2.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Thư mục: Nhật ký
            </Badge>
            {state.error && (
              <span className="text-xs text-rose-500 font-medium pl-2">{state.error}</span>
            )}
          </div>
        </div>

        <Separator className="bg-slate-100 mb-6" />

        {/* Rich Editor Container với cơ chế kiểm soát DOM an toàn */}
        <div 
          ref={contentRef}
          className="grow focus:outline-none space-y-6 text-base text-slate-900 leading-relaxed min-h-[500px]" 
          contentEditable="true"
          suppressContentEditableWarning={true}
        >
          <h1 className="text-2xl font-bold text-slate-900">1. Hôm nay tôi đã học được điều gì mới?</h1>
          <p className="text-slate-600">
            Hôm nay tôi đã tối ưu hóa hiệu năng câu lệnh Prisma ORM bằng cách bổ sung thêm Index phức hợp...
          </p>
        </div>
      </CardContent>

      {/* 3. Sticky Footer Action Bar */}
      <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Cloud className="w-4 h-4 text-amber-500 fill-amber-500/10" /> 
          Tự động lưu đám mây thành công
        </span>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" className="px-5 text-sm font-semibold text-slate-500 hover:bg-slate-200 rounded-xl h-10">
            Hủy bỏ
          </Button>
          <Button 
            onClick={handleCustomSubmit}
            disabled={isPending}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 rounded-xl shadow-md shadow-amber-500/10 active:scale-[0.98] transition-all gap-1.5 h-10 min-w-[140px]"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Lưu ghi chú
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}