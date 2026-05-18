"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderHeart, Check } from "lucide-react";

interface CategoryOption {
  id: string;
  label: string;
  badgeClass: string;
}

interface CategoryFormProps {
  onSuccess: (newCategory: CategoryOption) => void;
  onCancel: () => void;
}

// Bảng Palette màu Token phối sẵn đảm bảo tính thẩm mỹ cao (Aesthetic UI)
const colorTokens = [
  { id: "rose", name: "Đỏ hồng", badgeClass: "bg-rose-50 text-rose-700 border-rose-200" },
  { id: "emerald", name: "Xanh lá", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "indigo", name: "Xanh chàm", badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: "sky", name: "Xanh biển", badgeClass: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: "amber", name: "Vàng cam", badgeClass: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "purple", name: "Tím Thạch anh", badgeClass: "bg-purple-50 text-purple-700 border-purple-200" },
];

export default function CategoryForm({ onSuccess, onCancel }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("rose");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const targetToken = colorTokens.find((t) => t.id === selectedToken);
    
    const newCategory: CategoryOption = {
      id: `cat-${Date.now()}`, // Tạo ID unique tạm thời bằng timestamp
      label: categoryName.trim(),
      badgeClass: targetToken?.badgeClass || "bg-slate-50 text-slate-700 border-slate-200",
    };

    onSuccess(newCategory);
    setCategoryName("");
  };

  return (
    <Card className="border-dashed border-2 border-emerald-500/30 shadow-sm p-4 bg-slate-50/50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
      <CardHeader className="p-0 pb-2.5 border-b border-slate-200/60 flex flex-row items-center gap-2 space-y-0">
        <FolderHeart className="w-4 h-4 text-emerald-600" />
        <CardTitle className="font-bold text-slate-800 text-sm">Tạo Danh Mục Mới</CardTitle>
      </CardHeader>

      <CardContent className="p-0 pt-3 space-y-3">
        {/* Tên Danh mục */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tên danh mục</label>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Ví dụ: Học Tập, Dự Án SportLink, Nghiên Cứu..."
            className="bg-white border-slate-200 rounded-lg text-slate-800 text-xs h-9 focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Mã Màu Đại Diện */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Màu sắc chủ đạo</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {colorTokens.map((token) => {
              const isCurrent = selectedToken === token.id;
              return (
                <button
                  key={token.id}
                  type="button"
                  onClick={() => setSelectedToken(token.id)}
                  className={`py-1 px-2 rounded border text-[10px] font-medium text-center transition-all ${token.badgeClass} ${
                    isCurrent 
                      ? "ring-2 ring-slate-800 ring-offset-1 font-bold scale-105" 
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {token.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nút hành động nội bộ */}
        <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-200/60">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            className="h-8 text-[11px] font-semibold text-slate-500 hover:bg-slate-100 rounded-md"
          >
            Hủy bỏ
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={!categoryName.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] h-8 px-3 rounded-md gap-1 disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Tạo mục
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}