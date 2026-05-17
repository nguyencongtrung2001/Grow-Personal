"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Plus, FolderOpen } from "lucide-react";

interface FolderItem {
  id: string;
  emoji: string;
  name: string;
  count: number;
  isActive?: boolean;
}

const foldersData: FolderItem[] = [
  { id: "ideas", emoji: "💡", name: "Ý tưởng sáng tạo", count: 12 },
  { id: "diary", emoji: "✍️", name: "Nhật ký hàng ngày", count: 4, isActive: true },
  { id: "books", emoji: "📚", name: "Tóm tắt sách", count: 7 },
  { id: "travel", emoji: "✈️", name: "Lịch trình du lịch", count: 2 },
];

export default function NoteSidebar() {
  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-4">
      {/* Nút hành động ưu tiên cao nhất */}
      <Button 
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm h-12 rounded-xl shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all gap-2"
      >
        <PlusCircle className="w-5 h-5" />
        Thêm Ghi Chú Mới
      </Button>

      {/* Card danh mục thư mục */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <FolderOpen className="w-4 h-4 text-amber-500" />
            Thư mục
          </h2>
          <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400 hover:text-amber-500 rounded-md">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <ul className="space-y-1">
          {foldersData.map((folder) => (
            <li
              key={folder.id}
              className={`px-3 py-2.5 rounded-lg text-sm flex items-center justify-between cursor-pointer transition-colors ${
                folder.isActive
                  ? "bg-amber-50 text-amber-900 font-semibold border-l-4 border-amber-500"
                  : "text-slate-500 hover:bg-amber-50/50 hover:text-amber-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{folder.emoji}</span> {folder.name}
              </span>
              <Badge 
                variant={folder.isActive ? "default" : "secondary"}
                className={`text-xs font-mono px-1.5 py-0.5 rounded-md ${
                  folder.isActive 
                    ? "bg-amber-500/20 text-amber-900 hover:bg-amber-500/20" 
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {folder.count}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}