"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, List, X } from "lucide-react";

interface SearchWordsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export default function SearchWords({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: SearchWordsProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Search Input Box */}
      <div className="flex-1 flex items-center gap-3 relative bg-slate-50/50 border border-slate-100 rounded-xl px-3 py-1.5 focus-within:border-sky-500/30 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500/5 transition-all">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <Input
          type="text"
          placeholder="Tìm kiếm thẻ từ nhanh... (Nhập từ tiếng Anh hoặc nghĩa tiếng Việt)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-slate-800 placeholder:text-slate-400 flex-1 h-9 text-sm bg-transparent"
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onSearchChange("")}
            className="w-7 h-7 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Grid / List Layout Switcher */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl shrink-0 self-end sm:self-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className={`flex items-center gap-1.5 font-bold text-xs h-9 px-3 rounded-lg transition-all cursor-pointer ${
            viewMode === "grid"
              ? "bg-white text-sky-600 shadow-xs"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/40"
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          Lưới (Grid)
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange("list")}
          className={`flex items-center gap-1.5 font-bold text-xs h-9 px-3 rounded-lg transition-all cursor-pointer ${
            viewMode === "list"
              ? "bg-white text-sky-600 shadow-xs"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/40"
          }`}
        >
          <List className="w-3.5 h-3.5" />
          Danh sách (List)
        </Button>
      </div>
    </div>
  );
}
