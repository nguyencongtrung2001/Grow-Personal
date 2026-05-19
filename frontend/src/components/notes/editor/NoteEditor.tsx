"use client";
import React, { useActionState, useRef, startTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { saveNoteAction } from "@/app/notes/actions";

// Import các sub-components đã được tách biệt
import EditorToolbar from "@/components/notes/editor/EditorToolbar";
import EditorHeader from "@/components/notes/editor/EditorHeader";
import EditorCanvas from "@/components/notes/editor/EditorCanvas";
import EditorFooter from "@/components/notes/editor/EditorFooter";

export default function NoteEditor() {
  // Quản lý form action ở tầng cao nhất để phân phối xuống các component con
  const [state, formAction, isPending] = useActionState(saveNoteAction, { success: false, error: null });
  
  // Dùng Ref để lưu trữ giá trị thay vì State nhằm chặn re-render toàn cục
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCustomSubmit = () => {
    const titleValue = titleRef.current?.value || "";
    const htmlContent = contentRef.current?.innerHTML || "";
    
    const formData = new FormData();
    formData.append("noteTitle", titleValue);
    formData.append("noteContent", htmlContent);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Card className="grow max-w-4xl bg-white border-slate-200 rounded-2xl shadow-sm min-h-[800px] flex flex-col relative overflow-hidden">
      
      {/* 1. Thanh công cụ (Tĩnh, không bao giờ bị re-render vô lý) */}
      <EditorToolbar />

      <CardContent className="p-8 grow flex flex-col">
        {/* 2. Khu vực Tiêu đề (Quản lý độc lập) */}
        <EditorHeader 
          ref={titleRef} 
          defaultTitle="Nhật ký ngày 23/10/2023" 
          error={state.error} 
        />

        {/* 3. Khu vực Soạn thảo (Quản lý độc lập) */}
        <EditorCanvas ref={contentRef} />
      </CardContent>

      {/* 4. Thanh hành động Footer (Nhận trạng thái pending để disable nút) */}
      <EditorFooter 
        onSave={handleCustomSubmit} 
        isPending={isPending} 
      />

    </Card>
  );
}
