"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClipboardPlus, CheckCircle2, FolderPlus } from "lucide-react";
import CategoryForm from "./CategoryForm";

interface CategoryOption {
  id: string;
  label: string;
  badgeClass: string;
}

const matrixOptions = [
  { id: "p1", label: "Khẩn cấp & Quan trọng", bg: "bg-rose-50/70 border-rose-200 text-rose-800", colorClass: "border-rose-400 text-rose-600" },
  { id: "p2", label: "Quan trọng, Không khẩn", bg: "bg-amber-50/70 border-amber-200 text-amber-800", colorClass: "border-amber-400 text-amber-600" },
  { id: "p3", label: "Khẩn cấp, Không quan trọng", bg: "bg-blue-50/70 border-blue-200 text-blue-800", colorClass: "border-blue-400 text-blue-600" },
  { id: "p4", label: "Không khẩn & Không quan trọng", bg: "bg-slate-50/70 border-slate-200 text-slate-700", colorClass: "border-slate-400 text-slate-600" },
];

export default function TaskForm() {
  // Quản lý danh sách danh mục mẫu (Sẵn sàng đồng bộ với Backend API)
  const [categories, setCategories] = useState<CategoryOption[]>([
    { id: "cat-finance", label: "Tài Chính", badgeClass: "bg-rose-50 text-rose-700 border-rose-200" },
    { id: "cat-english", label: "Tiếng Anh", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { id: "cat-gym", label: "Gym / Sức khỏe", badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { id: "cat-work", label: "Công Việc", badgeClass: "bg-sky-50 text-sky-700 border-sky-200" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("cat-work");
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

  // Hàm callback để nhận danh mục mới từ Component con
  const handleAddCategorySuccess = (newCat: CategoryOption) => {
    setCategories((prev) => [...prev, newCat]);
    setSelectedCategory(newCat.id); // Tự động chọn danh mục vừa tạo
    setShowAddCategory(false);
  };

  return (
    <div className="space-y-4 w-full">
      <Card className="border-slate-200 border-l-4 border-l-emerald-500 shadow-sm p-5 bg-white rounded-xl">
        <CardHeader className="p-0 pb-3 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <ClipboardPlus className="w-5 h-5 text-emerald-500" />
            <CardTitle className="font-bold text-slate-900 text-base">Tạo Nhiệm Vụ Mới</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 pt-4 space-y-4">
          {/* 1. Nhập tên Task */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tên công việc</label>
            <Input 
              type="text" 
              placeholder="Ví dụ: Review UI/UX Design System cho khách hàng..." 
              className="bg-slate-50 border-slate-200 rounded-lg text-slate-800 text-sm h-10 focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
          </div>

          {/* 2. CHỌN LOẠI DANH MỤC (UX nâng cấp: Inline Badge Picker) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Danh mục công việc</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="h-7 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1 px-2 rounded-md"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                Quản lý danh mục
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${cat.badgeClass} ${
                      isSelected 
                        ? "ring-2 ring-emerald-500 ring-offset-1 scale-[1.02] shadow-sm font-bold" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Chọn mức độ ưu tiên */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mức độ ưu tiên & Khẩn cấp</label>
            <RadioGroup defaultValue="p1" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {matrixOptions.map((opt) => (
                <label key={opt.id} className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${opt.bg}`}>
                  <RadioGroupItem value={opt.id} id={opt.id} className={opt.colorClass} />
                  <span className="text-xs font-semibold">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* 4. Nhóm nút Hành động */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="ghost" className="h-9 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-lg">Hủy</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs h-9 px-4 rounded-lg shadow-md shadow-emerald-500/20 gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Xác nhận thêm
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* HIỂN THỊ PANEL TẠO MỚI DANH MỤC KHI ĐƯỢC KÍCH HOẠT */}
      {showAddCategory && (
        <CategoryForm 
          onSuccess={handleAddCategorySuccess} 
          onCancel={() => setShowAddCategory(false)} 
        />
      )}
    </div>
  );
}