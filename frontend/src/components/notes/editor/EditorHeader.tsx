import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface EditorHeaderProps {
  defaultTitle: string;
  error?: string | null;
}

const EditorHeader = forwardRef<HTMLInputElement, EditorHeaderProps>(({ defaultTitle, error }, ref) => {
  return (
    <div className="mb-6">
      <Input 
        type="text" 
        ref={ref}
        defaultValue={defaultTitle}
        placeholder="Nhập tiêu đề ghi chú..." 
        className="w-full border-none shadow-none focus-visible:ring-0 text-slate-900 text-3xl font-bold p-0 placeholder-slate-300 bg-transparent h-auto"
      />
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 shadow-none font-mono text-xs flex items-center gap-1.5 py-1 px-2.5 rounded-lg">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
          Thư mục: Nhật ký
        </Badge>
        {error && (
          <span className="text-xs text-rose-500 font-medium pl-2">{error}</span>
        )}
      </div>
    </div>
  );
});

EditorHeader.displayName = "EditorHeader";

export default EditorHeader;
