import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, Italic, Underline, Strikethrough, 
  Trash2
} from "lucide-react";

// Tách mảng cấu hình static ra bên ngoài component để tránh khởi tạo lại khi re-render
const INLINE_STYLES = [
  { icon: Bold, title: "Bold" },
  { icon: Italic, title: "Italic" },
  { icon: Underline, title: "Underline" },
  { icon: Strikethrough, title: "Strikethrough" },
];

const EditorToolbar = () => {
  return (
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
  );
};

export default memo(EditorToolbar);
