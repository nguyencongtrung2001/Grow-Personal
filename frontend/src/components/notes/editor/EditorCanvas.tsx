import React, { forwardRef } from "react";
import { Separator } from "@/components/ui/separator";

const EditorCanvas = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <>
      <Separator className="bg-slate-100 mb-6" />

      {/* Rich Editor Container với cơ chế kiểm soát DOM an toàn */}
      <div 
        ref={ref}
        className="grow focus:outline-none space-y-6 text-base text-slate-900 leading-relaxed min-h-[500px]" 
        contentEditable="true"
        suppressContentEditableWarning={true}
      >
        <h1 className="text-2xl font-bold text-slate-900">1. Hôm nay tôi đã học được điều gì mới?</h1>
        <p className="text-slate-600">
          Hôm nay tôi đã tối ưu hóa hiệu năng câu lệnh Prisma ORM bằng cách bổ sung thêm Index phức hợp...
        </p>
      </div>
    </>
  );
});

EditorCanvas.displayName = "EditorCanvas";

export default EditorCanvas;
