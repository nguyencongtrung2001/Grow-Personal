"use client";
import React from "react";
import NoteSidebar from "@/components/notes/NoteSidebar";
import NoteEditor from "@/components/notes/NoteEditor";

export default function NotesPage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex gap-6 pt-6">
      {/* 1. Inner Sidebar quản lý danh mục và hành động thêm nhanh */}
      <NoteSidebar />

      {/* 2. Workspace xử lý văn bản tập trung */}
      <NoteEditor />
    </div>
  );
}